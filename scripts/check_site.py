#!/usr/bin/env python3
"""Run lightweight structural smoke checks against the portfolio's HTML pages.

These checks help catch common regressions; they are not a WCAG conformance
check or a complete accessibility audit.
"""

import posixpath
import sys
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class PageParser(HTMLParser):
    """Collect titles, main landmarks, IDs, and same-document fragments."""

    def __init__(self, filename):
        super().__init__(convert_charrefs=True)
        self.filename = filename
        self.title_seen = False
        self.title_text = []
        self.in_title = False
        self.main_count = 0
        self.ids = defaultdict(list)
        self.fragments = []

    def handle_starttag(self, tag, attrs):
        line, column = self.getpos()
        if tag == "title":
            self.title_seen = True
            self.in_title = True
        if tag == "main":
            self.main_count += 1

        for name, value in attrs:
            if name == "id":
                self.ids[value or ""].append((line, column))
            elif name == "href" and value:
                fragment = self._same_document_fragment(value)
                if fragment is not None:
                    self.fragments.append((fragment, line))

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title_text.append(data)

    def _same_document_fragment(self, href):
        """Return a decoded local fragment, or None for other links."""
        try:
            parts = urlsplit(href.strip())
        except ValueError:
            # Malformed URLs are outside this check; do not abort parsing.
            return None

        # A scheme or authority makes this an external/other-scheme URL.
        if parts.scheme or parts.netloc or not parts.fragment:
            return None

        if parts.path:
            target_path = unquote(parts.path)
            # Both pages live at the site root. Normalize relative and rooted
            # paths so ./index.html and /index.html resolve consistently.
            normalized = posixpath.normpath("/" + target_path.lstrip("/"))
            if normalized != "/" + self.filename:
                return None

        return unquote(parts.fragment)


def inspect_page(root, filename):
    """Return a list of actionable problems found in one HTML file."""
    path = root / filename
    problems = []

    try:
        raw = path.read_bytes()
    except FileNotFoundError:
        return ["file is missing"]
    except OSError as error:
        return ["cannot read file: {}".format(error)]

    if not raw or not raw.strip():
        return ["file is empty"]

    try:
        html = raw.decode("utf-8")
    except UnicodeDecodeError as error:
        return ["file is not valid UTF-8: {}".format(error)]

    parser = PageParser(filename)
    try:
        parser.feed(html)
        parser.close()
    except Exception as error:
        return ["could not parse HTML: {}".format(error)]

    if not parser.title_seen or not "".join(parser.title_text).strip():
        problems.append("document title is missing or empty")

    if parser.main_count != 1:
        problems.append(
            "expected exactly one <main> landmark; found {}".format(
                parser.main_count
            )
        )

    for identifier, positions in sorted(parser.ids.items()):
        if len(positions) > 1:
            lines = ", ".join(str(line) for line, _ in positions)
            label = repr(identifier) if identifier else "an empty ID"
            problems.append(
                "duplicate id {} on lines {}".format(label, lines)
            )

    for fragment, line in parser.fragments:
        if fragment not in parser.ids:
            problems.append(
                "line {}: same-document fragment '#{}' has no matching id".format(
                    line, fragment
                )
            )

    return problems


def main():
    root = Path(__file__).resolve().parent.parent
    failed = False

    for filename in ("index.html", "404.html"):
        problems = inspect_page(root, filename)
        if problems:
            failed = True
            for problem in problems:
                print("FAIL {}: {}".format(filename, problem))
        else:
            print(
                "PASS {}: title, one <main>, unique IDs, and local fragments".format(
                    filename
                )
            )

    print(
        "Scope: static HTML smoke checks only; not a WCAG conformance or full "
        "accessibility audit."
    )
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())

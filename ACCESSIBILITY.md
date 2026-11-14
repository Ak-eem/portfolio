# Accessibility review notes

This static portfolio should remain easy to navigate and understand across input methods, viewport sizes, and motion preferences. Use this checklist when editing the site. It describes review steps; it does not claim that an accessibility audit has been completed or that the site conforms to a WCAG level.

## Before publishing a change

- **Structure:** Keep a logical heading order and use native landmarks and controls (`header`, `nav`, `main`, `footer`, links for navigation, and buttons for actions). Give icon-only controls accessible names.
- **Keyboard:** Navigate the page using Tab and Shift+Tab; activate links and controls with the keyboard. Confirm focus is visible and not hidden behind fixed or sticky content. Keep a working skip link if the page provides one.
- **Motion:** Check the page with the operating system's reduced-motion preference enabled. Remove or simplify non-essential movement while preserving content and functionality.
- **Small screens and zoom:** Check that content and controls remain usable at narrow widths and when zoomed; avoid horizontal scrolling for ordinary text.
- **Pointer targets:** Aim for interactive targets at least 24 by 24 CSS pixels, or sufficient spacing between smaller targets, considering WCAG 2.2 exceptions.
- **Contrast and meaning:** Verify text and controls have sufficient contrast. Do not rely on color alone to communicate status or links.
- **Images and media:** Provide meaningful alternative text for informative images; use empty alt text for decorative images. Ensure media controls are operable and provide captions or transcripts when appropriate.

## Record what was actually checked

For each review, note the changed page, browser or assistive technology used, input method, and any issues fixed or left open. Automated checks can help find issues but do not replace keyboard, visual, and assistive-technology review. Do not claim WCAG conformance unless the relevant scope has been evaluated against the standard.

## References

- WCAG 2.2, Focus Not Obscured (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
- WCAG 2.2, Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WCAG 2.2, Animation from Interactions: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- WAI Tutorials, Page Structure: https://www.w3.org/WAI/tutorials/page-structure/
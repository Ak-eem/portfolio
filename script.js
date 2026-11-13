document.getElementById('year').textContent = new Date().getFullYear();

const hero = document.querySelector('.hero');
const track = hero?.querySelector('.hero-track');
const stage = hero?.querySelector('.hero-stage');
const frame = hero?.querySelector('.hero-frame');
const artwork = hero?.querySelector('.hero-art');
const scrim = hero?.querySelector('.hero-scrim');
const title = hero?.querySelector('.hero-copy');
const details = hero?.querySelector('.hero-details');
const header = document.querySelector('.site-header');

if (!hero || !track || !stage || !frame || !artwork || !scrim || !title || !details || !header) {
  console.error('Scroll expansion could not start: required intro elements are missing.');
} else {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const smoothstep = (start, end, value) => {
    const t = clamp((value - start) / (end - start), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const scrollDistance = 1.2;
  const holdDistance = 0.35;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stageHeight = 0;
  let current = 0;
  let target = 0;
  let animationFrame = 0;

  const applyProgress = (progress) => {
    const eased = smoothstep(0, 1, progress);
    const width = 42 + (100 - 42) * eased;
    const height = 58 + (100 - 58) * eased;
    const insetX = (100 - width) / 2;
    const insetY = (100 - height) / 2;

    frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${24 * (1 - eased)}px)`;
    artwork.style.transform = `scale(${1.35 - 0.35 * eased})`;
    scrim.style.opacity = `${0.45 * eased}`;

    const titleOut = smoothstep(0.4, 0.88, progress);
    title.style.opacity = `${1 - titleOut}`;
    title.style.transform = `translate3d(0, ${-28 * titleOut}px, 0) scale(${1 + 0.06 * titleOut})`;

    const detailsIn = smoothstep(0.68, 1, progress);
    details.style.opacity = `${detailsIn}`;
    details.style.transform = `translate3d(0, ${18 * (1 - detailsIn)}px, 0)`;
  };

  const measure = () => {
    stageHeight = window.innerHeight;
    stage.style.height = `${stageHeight}px`;
    track.style.height = `${stageHeight * (1 + scrollDistance + holdDistance)}px`;
  };

  const readProgress = () => clamp(
    -track.getBoundingClientRect().top / (stageHeight * scrollDistance),
    0,
    1
  );

  hero.classList.add('is-enhanced');
  header.classList.add('is-over-intro');
  measure();

  if (reduceMotion) {
    hero.classList.add('motion-reduced');
    track.style.height = 'auto';
    applyProgress(1);
  } else {
    const tick = () => {
      current += (target - current) * (1 - Math.exp(-1 / 6));
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        animationFrame = 0;
      } else {
        animationFrame = window.requestAnimationFrame(tick);
      }

      (() => {
        const loop = document.querySelector('.stack-loop');
        const track = loop?.querySelector('.stack-loop-track');
        const group = loop?.querySelector('.stack-loop-group:not([aria-hidden="true"])');

        if (!track || !group) return;

        const speed = 100;
        const measure = () => {
          const width = group.getBoundingClientRect().width;
          if (width > 0) {
            track.style.setProperty('--stack-loop-duration', `${width / speed}s`);
          }
        };

        measure();
        new ResizeObserver(measure).observe(group);

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduceMotion && 'IntersectionObserver' in window) {
          loop.classList.add('is-pending');
          const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              loop.classList.add('is-visible');
              observer.disconnect();
              window.setTimeout(() => loop.classList.remove('is-pending'), 900);
            }
          }, { threshold: 0.15 });
          observer.observe(loop);
        }
      })();

      (() => {
        const robot = document.querySelector('.robot-backdrop');
        const pupils = robot?.querySelectorAll('.robot-pupil');
        if (!robot || !pupils?.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return;
        }

        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let frame = 0;

        const moveEyes = () => {
          currentX += (targetX - currentX) * 0.18;
          currentY += (targetY - currentY) * 0.18;
          pupils.forEach((pupil) => {
            pupil.setAttribute('transform', `translate(${currentX} ${currentY})`);
          });

          if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) < 0.08) {
            currentX = targetX;
            currentY = targetY;
            pupils.forEach((pupil) => {
              pupil.setAttribute('transform', `translate(${currentX} ${currentY})`);
            });
            frame = 0;
          } else {
            frame = window.requestAnimationFrame(moveEyes);
          }
        };

        window.addEventListener('pointermove', (event) => {
          const bounds = robot.getBoundingClientRect();
          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height * 0.48;
          targetX = clamp((event.clientX - centerX) / (window.innerWidth / 2), -1, 1) * 9;
          targetY = clamp((event.clientY - centerY) / (window.innerHeight / 2), -1, 1) * 7;

          if (!frame) {
            frame = window.requestAnimationFrame(moveEyes);
          }
        }, { passive: true });
      })();
      applyProgress(current);
    };

    const onScroll = () => {
      target = readProgress();
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    target = readProgress();
    current = target;
    applyProgress(current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
  }
}

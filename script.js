document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const orb = document.querySelector('.hero-orbit');
  window.addEventListener('pointermove', (event) => {
    if (!orb || window.innerWidth < 700) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    orb.style.transform = `translate(${x}px, calc(-50% + ${y}px))`;
  });
}

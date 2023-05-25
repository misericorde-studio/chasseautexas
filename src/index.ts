import Lenis from '@studio-freight/lenis';

import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Misericorde';
  greetUser(name);
});

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  orientation: 'vertical', // vertical, horizontal
  gestureOrientation: 'vertical', // vertical, horizontal, both
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

//get scroll value
lenis.on(
  'scroll',
  ({
    scroll,
    limit,
    velocity,
    direction,
    progress,
  }: {
    scroll: number;
    limit: number;
    velocity: number;
    direction: string;
    progress: string;
  }) => {
    // eslint-disable-next-line no-console
    console.log({ scroll, limit, velocity, direction, progress });
  }
);

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

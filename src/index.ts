import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Ukiyo from 'ukiyojs';

import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Misericorde';
  greetUser(name);
});

// ------------------------------ Lenis
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
// ------------------------------ fin Lenis
//
//
//
// ------------------------------ Clocks
type ClockElement = HTMLElement & {
  dataset: {
    timezone: string;
  };
};

const clocks = document.getElementsByClassName('clock') as HTMLCollectionOf<ClockElement>;

function updateClocks() {
  for (const clock of clocks) {
    const { timezone } = clock.dataset;
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timezone,
    });
    clock.textContent = time;
  }
}
window.addEventListener('load', updateClocks);
setInterval(updateClocks, 1000);
// ------------------------------ Fin Clocks
//
//
//
// ------------------------------ Ukiyo
const parallax = document.querySelectorAll('.ukiyo');
new Ukiyo(parallax, {
  scale: 1.2, // 1~2 is recommended
  speed: 1.8, // 1~2 is recommended
  willChange: true, // This may not be valid in all cases
});
// ------------------------------ fin Ukiyo
//
//
//
// ------------------------------ Gsap
// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Définir le type de l'objet counter
type Counter = {
  value: number;
};

// Définir les variables loaderDuration et customEase
let loaderDuration = 2;
const customEase =
  'M0,0 C0,0 0.02397,0.17379 0.045,0.27622 0.05021,0.30163 0.05802,0.31941 0.07,0.34098 0.07786,0.35515 0.08578,0.37051 0.1,0.37531 0.35289,0.46067 0.58635,0.52082 0.875,0.6127 0.89126,0.61788 0.90428,0.62388 0.915,0.63474 0.92846,0.64839 0.93676,0.6643 0.945,0.68362 0.95523,0.7076 0.96035,0.72519 0.965,0.75195 0.98137,0.84613 1,1 1,1';

// Initialiser l'objet counter selon la valeur de sessionStorage
const counter: Counter = {
  value: sessionStorage.getItem('visited') !== null ? 75 : 0,
};

// Modifier la valeur de loaderDuration selon la valeur de sessionStorage
if (sessionStorage.getItem('visited') !== null) {
  loaderDuration = 0;
}

// Stocker la valeur "true" dans sessionStorage
sessionStorage.setItem('visited', 'true');

// Définir la fonction qui met à jour le texte du loader
function updateLoaderText() {
  const progress = Math.round(counter.value);
  $('.loader_number').text(progress);
}

// Définir la fonction qui termine l'animation du loader
function endLoaderAnimation() {
  $('.trigger').click();
}

// Créer une timeline gsap avec la fonction endLoaderAnimation comme callback
const tl = gsap.timeline({ onComplete: endLoaderAnimation });

// Ajouter des animations à la timeline
tl.to(counter, {
  onUpdate: updateLoaderText,
  value: 100,
  duration: loaderDuration,
  ease: CustomEase.create('custom', customEase),
});
tl.to(
  '.loader_bar-progress',
  {
    height: '100%',
    duration: loaderDuration,
    ease: CustomEase.create('custom', customEase),
  },
  0
);

// Appeler la méthode on de l'élément lenis avec l'événement 'scroll' et la fonction ScrollTrigger.update
lenis.on('scroll', ScrollTrigger.update);

// ------------------------------ Fin Gsap
//
//
//
// ------------------------------ mouse position
// Définir le type de l'objet event
type MouseEvent = {
  pageX: number;
  pageY: number;
};

// Récupérer l'élément body et le typer
const box = document.querySelector('body') as HTMLElement;

// Récupérer les éléments x et y et les typer
const pageX = document.getElementById('x') as HTMLElement;
const pageY = document.getElementById('y') as HTMLElement;

// Définir la fonction qui met à jour le texte des éléments x et y
function updateDisplay(event: MouseEvent) {
  pageX.innerText = event.pageX.toString();
  pageY.innerText = event.pageY.toString();
}

// Ajouter des écouteurs d'événements à l'élément body
box.addEventListener('mousemove', updateDisplay, false);
box.addEventListener('mouseenter', updateDisplay, false);
box.addEventListener('mouseleave', updateDisplay, false);
// ------------------------------ fin mouse position
//
//
//
// ------------------------------ fin mouse position
const typeSplit = new SplitType('.animate', {
  types: 'lines, words, chars',
  tagName: 'span',
});

gsap.from('.animate .line', {
  y: '100%',
  opacity: 0,
  duration: 0.5,
  ease: 'power1.out',
  stagger: 0.05,
  rotationX: 75,
  transformOrigin: 'center center',
  z: -150,
  scrollTrigger: {
    trigger: '.animate',
    start: 'top center',
  },
});
// ------------------------------ fin mouse position

// ------------------------------ Progress
// Définir le type de la fonction prog
type ProgFunction = () => void;

// Assigner la fonction prog à la propriété onscroll de l'objet window
window.onscroll = function () {
  prog();
} as ProgFunction;

// Définir la fonction prog
function prog() {
  // Récupérer la valeur du défilement vertical de la page
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

  // Récupérer la hauteur totale de la page
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  // Calculer le pourcentage de défilement
  const scrolled = (winScroll / height) * 100;

  // Récupérer l'élément progbar
  const progbar = document.getElementById('progbar');

  // Vérifier si l'élément progbar n'est pas null
  if (progbar) {
    // Modifier la largeur de l'élément progbar selon le pourcentage de défilement
    progbar.style.width = scrolled + '%';
  }
}
// ------------------------------ fin Progress

// ------------------------------ Dark mode toggle
// Définir le type des fonctions
type ThemeFunction = () => void;

// Définir la fonction qui applique le thème selon le cookie
function setThemeFromCookie() {
  // Récupérer l'élément content et le typer
  const themeState = document.getElementById('content') as HTMLElement;

  // Modifier la classe de l'élément content selon le cookie
  themeState.className = isThemeSelected() ? 'light-mode' : 'dark-mode';
}

// Définir la fonction qui met à jour l'état du bouton toggleTheme
function setThemeSwitchState() {
  // Récupérer l'élément toggleTheme et le typer
  const toggleTheme = document.getElementById('toggleTheme') as HTMLInputElement;

  // Modifier la propriété checked de l'élément toggleTheme
  toggleTheme.checked = isThemeSelected();
}

// Définir la fonction qui vérifie si le thème clair est sélectionné dans le cookie
function isThemeSelected() {
  // Retourner true si le cookie contient 'theme=light', false sinon
  return document.cookie.match(/theme=light/i) != null;
}

// Définir la fonction qui bascule le thème et le cookie
function switchTheme() {
  // Récupérer l'élément content et le typer
  const themeState = document.getElementById('content') as HTMLElement;

  // Récupérer la classe actuelle de l'élément content
  const currentState = themeState.className;

  // Déterminer la nouvelle classe de l'élément content
  const newState = themeState.className === 'light-mode' ? 'dark-mode' : 'light-mode';

  // Modifier la classe de l'élément content
  themeState.className = newState;

  // Modifier le cookie selon la nouvelle classe
  document.cookie = 'theme=' + (newState === 'dark-mode' ? 'dark' : 'light');
}

// Appeler les fonctions au chargement de la page
(
  (function () {
    setThemeFromCookie();
    setThemeSwitchState();
    const toggleTheme = document.getElementById('toggleTheme') as HTMLInputElement;

    // Vérifier si l'élément toggleTheme n'est pas null
    if (toggleTheme) {
      // Modifier la propriété onchange de l'élément toggleTheme
      toggleTheme.onchange = switchTheme;
    }
  }) as ThemeFunction
)();

// ------------------------------ fin Dark mode toggle

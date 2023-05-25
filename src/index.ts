import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Misericorde';
  greetUser(name);
});

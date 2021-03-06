
import Demo from '../packages/demo/index.js';
import Hello from '../packages/hello/index.js';
import Roll from '../packages/roll/index.js';
import Rank1 from '../packages/rank-1/index.js';

export { default as Demo } from '../packages/demo/index.js';
export { default as Hello } from '../packages/hello/index.js';
export { default as Roll } from '../packages/roll/index.js';
export { default as Rank1 } from '../packages/rank-1/index.js';

const components = [
  Demo,
  Hello,
  Roll,
  Rank1
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.2.2',
  install,
  Demo,
  Hello,
  Roll,
  Rank1
}

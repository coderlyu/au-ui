/* Automatically generated by './build/bin/build-entry.js' */

import Demo from '../packages/demo/index.js';
import Hello from '../packages/hello/index.js';
import Roll from '../packages/roll/index.js';
import Rank1 from '../packages/rank-1/index.js';

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
  version: '1.0.4',
  install,
  Demo,
  Hello,
  Roll,
  Rank1
};

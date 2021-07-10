import Demo from './packages/demo/index.js';
import Hello from './packages/hello/index.js';

const components = [
  Demo,
  Hello
];

// eslint-disable-next-line no-unused-vars
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
  version: '1.0.0',
  install,
  Demo,
  Hello
};

import App from './src/app';
import Root from '../../src/index';

const root = new Root(App, {});

root.mount(
    document.querySelector('#app')
);

// for debugging purposes
// _root._tree() — module tree with id's and props
// _root.handlers - all app handlers
window._root = root;

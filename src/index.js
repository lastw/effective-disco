import ModuleInstance from './module';
import Slot from './slot';
import { tree } from './tools';
import { hashHandler, hashKey, getHashPath } from './utils';
import { resolveHandlers } from './events';

const ROOT_ID = 'root';
const EVENTS = ['click', 'keydown', 'input', 'change'];

/**
 * Root is for:
 * 1) init root module
 * 2) mount this module to DOM
 * 3) store handlers and handle events on root node
 *
 * On server you can just .render() or .toString() Root into the layout.
 */
export default class Root {
    constructor(moduleConstructor, props) {
        this.handlers = {};

        this.slot = new Slot(ROOT_ID, undefined, this);
        const moduleInstance = new ModuleInstance(moduleConstructor, props, this.slot);
        this.slot.linkModule(moduleConstructor, moduleInstance);
        this.slot.name = moduleConstructor.name;
    }

    registerHandler(moduleId, fn) {
        const hash = hashHandler(moduleId, fn);
        const path = getHashPath(hash);
        this.handlers[path[0]] = this.handlers[path[0]] || {};
        this.handlers[path[0]][path[1]] = fn;
        return hash;
    }

    removeHandlers(moduleId) {
        delete this.handlers[hashKey(moduleId)];
    }

    render() {
        return this.slot.moduleInstance.render();
    }

    toString() {
        return this.render();
    }

    mount(node) {
        this.slot.node = node;
        this.slot.moduleInstance.renderTo(this.slot.node);

        EVENTS.forEach(eventType => node.addEventListener(eventType, resolveHandlers(eventType, this.handlers)));
    }

    queryRef(hash) {
        return this.slot.node.querySelector(`[data-ref="${hash}"]`);
    }

    _tree() {
        tree(this.slot);
    }
}

// @TODO some handlers have same toString, think about it

export { Slot, ModuleInstance };

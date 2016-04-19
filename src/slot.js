import { hashRef } from './utils';
import ModuleInstance from './module';

const DEFAULT_ID = 'root';

/**
 * Slot is responsible for:
 * 1) modules tree — each Slot stores links to children
 * 2) reference to module
 * 3) communication with root — handlers, refs, etc.
 */
export default class Slot {
    constructor(id = DEFAULT_ID, key, root) {
        this.id = id;
        this.key = key;
        this.root = root;

        this.idCounter = 0;

        this.children = [];
        this.refs = [];
    }

    /**
     * Init module
     * @return {Module} - module instance. You can .render() it.
     */
    init(moduleConstructor, props, key) {
        // before creating new slot, search for existing child with
        // same moduleConstructor and key. If found, update this slot
        // with new props and return module instance.
        const matchingSlot = resolveSlot(this._gone, moduleConstructor, key);

        if (matchingSlot) {
            matchingSlot.update(props);

            this.children.push(matchingSlot);

            return matchingSlot.moduleInstance;
        }

        // create new slot and connect it with current slot (push to children — it's enough)
        const slot = new Slot(getChildId(this.id, this.idCounter++), key, this.root);
        this.children.push(slot);

        // create new module instance
        // maybe, we should pass not slot inself, but some kind of slot poor proxy
        // (i.e. only slot.init, slot.hander, slot.ref, slot.rerender)
        const moduleInstance = new ModuleInstance(moduleConstructor, props, slot);
        slot.name = moduleConstructor.name;
        // link module with new slot
        slot.linkModule(moduleConstructor, moduleInstance);

        return moduleInstance;
    }

    linkModule(moduleConstructor, moduleInstance) {
        this._moduleConstructor = moduleConstructor;
        this.moduleInstance = moduleInstance;
    }

    /**
     * Registers handler for this slot
     * @param  {Function} fn
     * @return {String} - hash to use in template
     */
    handler(fn) {
        return this.root.registerHandler(this.id, fn)
    }

    /**
     * Registers ref for this slot
     * @param {String} [key]
     * @return {String} - hash to use in template
     */
    ref(key) {
        const hash = hashRef(this.id, key);
        this.refs[key] = hash;
        return hash;
    }

    /**
     * Get node, associated with specified ref
     * (maybe it is bad idea)
     * @param {String} [key]
     * @return {Element}
     */
    getNode(key) {
        const hash = this.refs[key];
        return this.root.queryRef(hash);
    }

    /**
     * Update module view with new props and rerender
     * @param {*} props
     */
    rerender(props) {
        this.removeHandlers();
        this.update(props);

        // @TODO think about binding module to node via ref/getNode
        // now only root module is able to rerender
        if (!this.node) {
            throw new Error('There is no node associated with this module instance');
        }
        this.moduleInstance.renderTo(this.node);
    }

    /**
     * Update module view with new props
     * @param {*} props
     */
    update(props) {
        // move all children to temporary array.
        this._gone = this.children;

        this.children = [];
        this.moduleInstance.updateView(props);

        // kill all no longer needed children
        this._gone = [];
    }

    removeHandlers() {
        this.root.removeHandlers(this.id);

        this.children.forEach(slot => slot.removeHandlers());
    }
}

/**
 * Searches for slot with specified moduleConstructor and key
 * @param  {Slot[]} slots
 * @param  {Function} moduleConstructor
 * @param  {String} key
 * @return {ModuleInstance|null}
 */
function resolveSlot(slots = [], moduleConstructor, key) {
    const matched = slots.filter(slot => {
        if (slot._moduleConstructor != moduleConstructor) {
            return false;
        }

        if (slot.key != key) {
            return false;
        }

        return true;
    });

    if (matched.length == 1) {
        return matched[0];
    }

    if (matched.length > 1) {
        // moduleConstructor functions can have names to impove debug experience
        console.warn(`There are more than 1 matching slots (${moduleConstructor.name}). Give them correct keys`);
    }

    return null;
}

function getChildId(parentId, childNumber) {
    return `${parentId}-${childNumber}`;
}

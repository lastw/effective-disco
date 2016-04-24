import morphdom from 'morphdom';

/**
 * Module can:
 *
 * 1) return html (render/toString)
 * 2) render to specified node
 * 3) update view configuration through new props
 *
 * That's all.
 */
export default class ModuleInstance {
    constructor(moduleConstructor, props, slot) {
        this.getView = moduleConstructor(slot);
        // @TODO throw warnings if slot methods are used in moduleConstructor outside getView
        this.updateView(props);
    }

    render() {
        if (typeof this.view == 'string') {
            return this.view.trim(); // trim for morphdom: https://github.com/patrick-steele-idem/morphdom/issues/51
        }

        return this.view.template(this.view.context).trim();
    }

    toString() {
        return this.render();
    }

    renderTo(node) {
        return morphChildren(node, this.render());
    }

    renderOver(node) {
        return morphdom(node, this.render());
    }

    updateView(props) {
        this._props = props;
        this.view = this.getView(props, this._state);
    }

    updateState(state) {
        this._state = {...state};
    }
}

function morphChildren(node, html) {
    const wrapper = document.createElement(node.tagName);

    wrapper.innerHTML = html;

    morphdom(node, wrapper, {
        childrenOnly: true
    });
}

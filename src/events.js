import { getHashPath } from './utils';

export function resolveHandlers(eventType, handlers) {
    // resolves handlers for event and invokes them on corresponding nodes
    return event => {
        const rootElement = event.currentTarget;

        // 1. Capture hashes chain before handlers invokation
        // We must do it before, because handlers can trigger tree rerender,
        // so event can bubble up to non-relevant node
        const chain = [];
        let element = event.target;
        do {
            const hash = element.dataset[`on${eventType}`]; // i.e. onclick, onkeydown
            if (hash) {
                chain.push({hash, element});
            }
            element = element.parentNode;
        } while (element != rootElement);

        // 2. Invoke handlers in bubble order
        let bubble;
        while (bubble = chain.pop()) {
            if (bubble.hash && bubble.hash != 'noop') {
                const path = getHashPath(bubble.hash);
                const handler = (handlers[path[0]] || [])[path[1]]

                if (handler) {
                    const result = bubble.element::handler(event);

                    // if handler returned falsy, stop propagation
                    // @TODO proper e.stopPropagation() handling
                    if (!result && result != undefined) {
                        return null;
                    }
                }
            }
        }
    };
}



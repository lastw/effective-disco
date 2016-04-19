function Add(slot) {
    const template = require('./templates/add');

    // example of stateful module — input stores value in state object
    const state = {};

    return function({ value = '', onSave }) {
        if (value || !state.value) {
            state.value = value;
        }

        const handleInput = function() {
            state.value = this.value;
        };

        const handleKeydown = function(e) {
            if (e.keyCode == 13 && state.value) {
                const text = state.value;
                state.value = '';
                // onSave will trigger rerender, so we need to clear state.value before
                onSave(text);
            }
        };

        return {
            template: template,

            context: {
                value: state.value,
                handleInput: slot.handler(handleInput),
                handleKeydown: slot.handler(handleKeydown)
            }
        };
    };
}

export { Add };

function Add(slot) {
    const template = require('./templates/add');

    return function({ onSave }, state = { value: '' }) {

        const handleInput = function() {
            slot.setState({value: this.value});
        };

        const handleKeydown = function(e) {
            if (e.keyCode == 13 && state.value) {
                const text = state.value;

                slot.setState({value: ''});
                onSave(text);
            }
        };

        return {
            template: template,

            context: {
                ref: slot.ref(),
                value: state.value,
                handleInput: slot.handler(handleInput),
                handleKeydown: slot.handler(handleKeydown)
            }
        };
    };
}

export { Add };

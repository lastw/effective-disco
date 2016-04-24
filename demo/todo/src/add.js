function Add(slot) {
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

        return `
            <input class="add"
                value="${state.value}"
                data-ref="${slot.ref()}"
                placeholder="What needs to be done?"
                data-oninput="${slot.handler(handleInput)}"
                data-onkeydown="${slot.handler(handleKeydown)}"/>
        `;
    };
}

export { Add };

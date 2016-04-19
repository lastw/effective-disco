function Filters(slot) {
    const template = require('./templates/filters');

    return function({ current, onChange }) {
        const handleChange = function() {
            onChange(this.value);
        };

        return {
            template,

            context: {
                current,
                handleChange: slot.handler(handleChange)
            }
        };
    };
}

export { Filters };

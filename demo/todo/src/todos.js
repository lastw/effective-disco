function TodoItem(slot) {
    const template = require('./templates/item');

    return function({ text = '', done = false, onClick, onRemoveClick }) {

        const remove = slot.init(Remove, { onClick: onRemoveClick });

        return {
            template: template,

            context: {
                text,
                done,
                handleClick: slot.handler(onClick),

                remove
            }
        };
    };
}

function TodoList(slot) {
    const template = require('./templates/list');

    return function(list = []) {
        const items = list.map(item => slot.init(TodoItem, item, item.id));

        return {
            template: template,

            context: {
                items
            }
        };
    };
}

function Remove(slot) {
    return function({ onClick }) {
        return {
            template: ({ handleClick }) => `<span class="delete" data-onclick="${handleClick}">✖</span>`,

            context: {
                handleClick: slot.handler(onClick)
            }
        };
    };
}

export { TodoItem, TodoList };

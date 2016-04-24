function TodoItem(slot) {
    return function({ text = '', done = false, onClick, onRemoveClick }) {
        const remove = slot.init(Remove, { onClick: onRemoveClick });

        return `
            <div class="item ${done ? '_done' : ''}" data-onclick=${slot.handler(onClick)}>
                ${text} ${remove}
            </div>
        `;
    };
}

function Remove(slot) {
    return function({ onClick }) {
        return `<span class="delete" data-onclick="${slot.handler(onClick)}">✖</span>`;
    };
}

function TodoList(slot) {
    return function(list = []) {
        const items = list.map(item => slot.init(TodoItem, item, item.id));

        return `
            <div class="list">
                ${items.join('')}
            </div>
        `;
    };
}


export { TodoList };

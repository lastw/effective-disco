module.exports = function({ value, handleInput, handleKeydown }) {
    return `
        <input class="add" value="${value}" placeholder="What needs to be done?" data-oninput="${handleInput}" data-onkeydown="${handleKeydown}"/>
    `;
};

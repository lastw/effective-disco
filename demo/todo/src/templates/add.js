module.exports = function({ ref, value, handleInput, handleKeydown }) {
    return `
        <input data-ref="${ref}" class="add" value="${value}"
            placeholder="What needs to be done?"
            data-oninput="${handleInput}"
            data-onkeydown="${handleKeydown}"/>
    `;
};

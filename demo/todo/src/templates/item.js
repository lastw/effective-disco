module.exports = function({ done, text, handleClick, remove }) {
    return `
        <div class="item ${done ? '_done' : ''}" data-onclick=${handleClick}>
            ${text} ${remove}
        </div>
    `;
};

module.exports = function({ items }) {
    return `
        <div class="list">
            ${items.join('')}
        </div>
    `;
};

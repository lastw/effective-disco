module.exports = function({ add, list, filters }) {
    return `
        <div class="app">
            <header class="app__header">${add}</header>
            <div class="app__list">${list}</div>
            <footer class="app__footer">${filters}</footer>
        </div>
    `;
};
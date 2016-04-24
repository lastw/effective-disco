import { Add } from './add';
import { TodoList } from './todos';
import { Filters } from './filters';
import Store from './store';

function App(slot) {
    const store = new Store({
        todos: [
            {
                id: 0,
                text: 'Some todo'
            },
            {
                id: 1,
                text: 'Another todo'
            }
        ],
        filter: 'SHOW_ALL'
    });

    store.subscribe(() => slot.rerender());

    return function() {
        const add = slot.init(Add, {
            onSave: text => store.addTodo(text)
        });

        const visibleTodos = store.getState().todos.filter(todo => !todo.hidden);
        const list = slot.init(TodoList, visibleTodos.map(todo => ({
            onClick: store.toggleTodo.bind(store, todo.id),
            onRemoveClick: store.removeTodo.bind(store, todo.id),
            ...todo
        })));

        const filters = slot.init(Filters, {
            current: store.getState().filter,
            onChange: value => store.setFilter(value)
        });

        return `
            <div class="app">
                <header class="app__header">${add}</header>
                <div class="app__list">${list}</div>
                <footer class="app__footer">${filters}</footer>
            </div>
        `;
    };
}

export default App;

// There is some simple dirty store implementation for slot-ui TODO app.
//
// We recommend you to use Redux.

const DEFAULT_STATE = {
    todos: [],
    filter: 'SHOW_ALL'
};

export default class Store {
    constructor(state = DEFAULT_STATE) {
        this.state = state;
        this.listeners = [];

        this.counter = this.state.todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    getState() {
        return this.state;
    }

    addTodo(text) {
        const todo = {
            text,
            id: this.counter
        };

        this.counter++;

        this.state.todos.push({
            ...todo,
            hidden: !this._isTodoVisible(todo)
        });
        this._emitChange();
    }

    toggleTodo(id) {
        this.state.todos = this.state.todos.map(todo => {
            if (todo.id == id) {
                const toggledTodo = {
                    ...todo,
                    done: !todo.done
                };

                return {
                    ...toggledTodo,
                    hidden: !this._isTodoVisible(toggledTodo)
                };
            }

            return todo;
        });

        this._emitChange();
    }

    removeTodo(id) {
        this.state.todos = this.state.todos.filter(todo => todo.id != id);

        this._emitChange();
    }

    setFilter(filterValue) {
        this.state.filter = filterValue;

        this._updateTodosVisibility();

        this._emitChange();
    }

    _emitChange() {
        this.listeners.forEach(listener => listener(this.state));
    }

    _updateTodosVisibility() {
        this.state.todos = this.state.todos.map(todo => ({
            ...todo,
            hidden: !this._isTodoVisible(todo)
        }));
    }

    _isTodoVisible(todo) {
        switch (this.state.filter) {
            case 'SHOW_COMPLETED':
                return !!todo.done;
            case 'SHOW_ACTIVE':
                return !todo.done;
            default:
                return true;
        }
    }
}

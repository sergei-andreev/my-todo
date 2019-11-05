import uuidv4 from 'uuid/v4';

export default class Model {
    constructor(controller) {
        this.controller = controller;
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }

    updateView() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.controller.updateView(this.todos);
    }

    addTodo(todoText = '') {
        const todo = {
            id: uuidv4(),
            text: todoText,
            complete: false,
        };

        this.todos.push(todo);
        this.updateView(this.todos);
    }

    editTodo(id, todoText) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? {
                id: todo.id,
                text: todoText,
                complete: todo.complete
            } : todo
        )

        this.updateView();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);

        this.updateView();
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? {
                id: todo.id,
                text: todo.text,
                complete: !todo.complete
            } : todo
        )
        this.updateView();
    }
}

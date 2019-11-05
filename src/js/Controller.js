import Model from './Model'
import View from './View'

export default class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this);

        this.model.updateView();
    }

    addTodo(todoText) {
        this.model.addTodo(todoText);
    }

    editTodo(id, todoText) {
        this.model.editTodo(id, todoText);
    }

    deleteTodo(id) {
        this.model.deleteTodo(id);
    }

    toggleTodo(id) {
        this.model.toggleTodo(id);
    }

    updateView(todos) {
        this.view.updateView(todos);
    }

    getTodos() {
        return this.model.todos;
    }
}

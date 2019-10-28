// ---------------------------------------------------------- Model
class Model {
    constructor(controller) {
        this.controller = controller;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.controller.updateView(this.todos);
    }
}

// ---------------------------------------------------------- Controller
class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this);

        this.view.addTodo();
    }

    addTodo(todo) {
        this.model.addTodo(todo);
    }

    updateView(todos) {
        this.view.updateView(todos);
    }

    getTodos() {
        console.log(this.model.todos);
    }
}

// ---------------------------------------------------------- View
class View {
    constructor(controller) {
        this.controller = controller;
    }

    getInputText() {
        let inputText = document.querySelector('.text-input').value;

        return inputText;
    }

    clearInput() {
        document.querySelector('.text-input').value = '';
    }

    updateView(todoText) {
        const todoList = document.querySelector('.todo-list');
        const li = document.createElement('li');
        li.innerText = todoText;

        todoList.appendChild(li);
    }

    addTodo() {
        const btn = document.querySelector('.add');

        btn.addEventListener('click', (event) => {
            event.preventDefault();

            if (this.getInputText() !== '') {
                console.log('Инпут не пустой')
                this.controller.addTodo(this.getInputText());
                this.clearInput();
            }
        });
    }
}


const app = new Controller();

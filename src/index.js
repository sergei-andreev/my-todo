const uuidv4 = require('uuid/v4');

// ---------------------------------------------------------- Model
class Model {
    constructor(controller) {
        this.controller = controller;
        this.todos = [];
    }

    addTodo(todoText) {
        const todo = {
            id: uuidv4(),
            text: todoText
        }

        this.todos.push(todo);
        this.controller.updateView(this.todos);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);

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

    deleteTodo(id) {
        this.model.deleteTodo(id);
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

    getInputValue() {
        let inputText = document.querySelector('.form__input-text').value;

        return inputText;
    }

    clearInput() {
        document.querySelector('.form__input-text').value = '';
    }

    updateView(todos) {
        createTodoItem = (todo) => {
            const li = document.createElement('li');
            li.classList.add('list__item', 'list-item');
            li.innerText = todo.text;
            li.dataset.id = todo.id;

            const deleteTodo = document.createElement('button');
            deleteTodo.classList.add('list-item__delete');
            deleteTodo.innerHTML = 'X';

            deleteTodo.addEventListener('click', () => {
                this.controller.deleteTodo(li.dataset.id);
            });

            li.append(deleteTodo);
            todoList.appendChild(li);
        };

        const todoList = document.querySelector('.list');
        todoList.innerHTML = '';

        todos.forEach(todo => {
            createTodoItem(todo);
        });

        console.log(todos);
    }

    addTodo() {
        const addBtn = document.querySelector('.form__btn-add');

        addBtn.addEventListener('click', (event) => {
            event.preventDefault();

            if (this.getInputValue() !== '') {
                this.controller.addTodo(this.getInputValue());
                this.clearInput();
            }
        });
    }

    deleteTodo() {
        const deleteBtn = document.querySelector('.list-item__delete');

        deleteBtn.addEventListener('click', () => {
            this.controller.deleteTodo(todo);
        });
    }
}

const app = new Controller();

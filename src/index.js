import "./styles/main.scss";

const uuidv4 = require('uuid/v4');

// ---------------------------------------------------------- Model
class Model {
    constructor(controller) {
        this.controller = controller;
        this.todos = [
            {id: 1, text: 'First', complete: true},
            {id: 2, text: 'Second', complete: false},
            {id: 3, text: 'Third', complete: true},
            {id: 4, text: 'Fourth', complete: false}
        ];
    }

    addTodo(todoText) {
        const todo = {
            id: uuidv4(),
            text: todoText,
            complete: false
        };

        this.todos.push(todo);
        this.controller.updateView(this.todos);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);

        this.controller.updateView(this.todos);
    }

    displayAll() {

        this.controller.updateView(this.todos);
    }

    displayComplete() {
        console.log(
            this.todos.map((todo) => {
                if (todo.complete === true) {
                    return todo;
                } else {
                    return {};
                }
            })
        );

        this.controller.updateView(
            this.todos.filter((todo) => {
                if (todo.complete === true) {
                    return todo;
                }
            })
        );
    }

    displayNotComplete() {
        this.controller.updateView(
            this.todos.filter((todo) => {
                if (todo.complete === false) {
                    return todo;
                }
        }));
    }
}


// ---------------------------------------------------------- Controller
class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this);

        this.view.addTodo();
        this.view.handlerFilter();
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

    displayAll() {
        this.model.displayAll();
    }

    displayComplete() {
        this.model.displayComplete();
    }

    displayNotComplete() {
        this.model.displayNotComplete();
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
        return document.querySelector('.form__input-text').value;
    }

    clearInput() {
        document.querySelector('.form__input-text').value = '';
    }

    updateView(todos) {
        // ПЕРЕД ДОБАВЛЕНИЕМ ЭЛЕМЕНТОВ УДАЛЯЕМ ВСЕ
        const todoList = document.querySelector('.list');
        todoList.innerHTML = '';

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.classList.add('list__item', 'list-item');
            li.dataset.id = todo.id;

            // CHECKBOX
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            // TEXT
            const span = document.createElement('span');
            span.innerText = todo.text;

            // DELETE BUTTON
            const deleteTodo = document.createElement('button');
            deleteTodo.classList.add('list-item__delete');
            deleteTodo.innerHTML = 'X';

            deleteTodo.addEventListener('click', () => {
                this.controller.deleteTodo(li.dataset.id);
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.append(deleteTodo);

            todoList.appendChild(li);
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

    handlerFilter() {
        document.querySelector('#rb-1').addEventListener('click', () => {
            this.controller.displayAll();
        });

        document.querySelector('#rb-2').addEventListener('click', () => {
            this.controller.displayComplete();
        });

        document.querySelector('#rb-3').addEventListener('click', () => {
            this.controller.displayNotComplete();
        });
    }
}

const app = new Controller();

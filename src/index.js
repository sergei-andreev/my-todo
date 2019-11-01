import "./styles/main.scss";
import { parse } from "querystring";

const uuidv4 = require('uuid/v4');

// ---------------------------------------------------------- Model
class Model {
    constructor(controller) {
        this.controller = controller;

        this.todos = JSON.parse(localStorage.getItem('todos')) || [];

        // this.todos = [
        //     {id: "8e030252-3fc2-4757-b165-c7bd21acb430", text: 'hello', complete: false},
        //     {id: "8e030252-3fc2-4757-b165-c7bd21acb439", text: 'hi', complete: true},
        //     {id: "8e030252-3fc2-4757-b165-c7bd21acb431", text: 'buy', complete: false},
        //     {id: "8e030252-3fc2-4757-b165-c7bd21acb432", text: 'good', complete: true},
        //     {id: "8e030252-3fc2-4757-b165-c7bd21acb433", text: 'well', complete: false},
        //     {id: "8e030252-3fc2-4757-b165-c7bd21acb434", text: 'bad', complete: true},
        // ];
    }

    updateView() {
        console.log('Сработал метод UpdateView - Model');
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.controller.updateView(this.todos);
    }

    addTodo(todoText = '') {
        console.log('Сработал метод AddTodo - Model');
        const todo = {
            id: uuidv4(),
            text: todoText,
            complete: false
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

        this.updateView()
    }

    deleteTodo(id) {
        console.log('Сработал метод deleteTodo - Model');
        this.todos = this.todos.filter(todo => todo.id !== id);

        this.updateView()
    }

    toggleTodo(id) {
        console.log('Сработал метод toggleTodo - Model');
        this.todos = this.todos.map(todo =>
            todo.id === id ? {
                id: todo.id,
                text: todo.text,
                complete: !todo.complete
            } : todo
        )

        this.updateView()
    }
}


// ---------------------------------------------------------- Controller
class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this);

        this.model.updateView();
        this.view.addTodo();
        this.view.filterHandlers();

    }

    addTodo(todoText) {
        console.log('Сработал метод addTodo - Controller');

        this.model.addTodo(todoText);
    }

    editTodo(id, todoText) {
        console.log('Сработал метод editTodo - Controller');

        this.model.editTodo(id, todoText);
    }

    deleteTodo(id) {
        console.log('Сработал метод deleteTodo - Controller')

        this.model.deleteTodo(id);
    }

    toggleTodo(id) {
        console.log('Сработал метод toggleTodo - Controller')

        this.model.toggleTodo(id);
    }

    updateView(todos) {
        console.log('Сработал метод UpdateView - Controller')

        this.view.updateView(todos);
    }

    getTodos() {
        return this.model.todos;
    }

}

// ---------------------------------------------------------- View
class View {
    constructor(controller) {
        this.controller = controller;
        this.todoList = document.querySelector('.list');
        this.form = document.querySelector('.form');
        this.inputNewTodo = document.querySelector('.form__input-text');
    }

    filterHandlers() {
        ['#rb-1', '#rb-2', '#rb-3'].forEach(selector => {
            document.querySelector(selector).addEventListener('change', () => {
                console.log(`Нажата кнопка фильтра ${selector}`);

                this.updateView(this.controller.getTodos());
            });
        })
    }

    getInputValue() {
        console.log('Сработал метод getInputValue - View');

        return this.inputNewTodo.value;
    }

    clearInput() {
        console.log('Сработал метод clearInput - View');

        this.inputNewTodo.value = '';
    }

    addTodo() {
        console.log('Сработал метод addTodo - View')

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Нажатие кнопки addTodo - View')

            if (this.getInputValue() !== '') {
                this.controller.addTodo(this.getInputValue());
                this.clearInput();
            }
        });
    }

    updateView(todos) {
        console.log('Сработал метод UpdateView - View')

        this.todoList.innerHTML = '';

        if (document.querySelector('#rb-2').checked) {
            todos = todos.filter((todo) => {
                if (todo.complete === true) {
                    return todo;
                }
            })
        }

        if (document.querySelector('#rb-3').checked) {
            todos = todos.filter((todo) => {
                if (todo.complete === false) {
                    return todo;
                }
            })
        }

        if (todos.length === 0) {
            console.log('Массив пустой');

            const p = document.createElement('p')
            p.textContent = 'Nothing to do! Add a task?'
            this.todoList.append(p)
        } else {
            todos.forEach(todo => {
                console.log('Массив не пусто');

                const li = document.createElement('li');
                li.classList.add('list__item', 'list-item');
                li.dataset.id = todo.id;
                todo.complete ? li.classList.add('list-item--complete') : 0;

                // CHECKBOX
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('click', () => {
                    li.classList.toggle('list-item--complete');
                    this.controller.toggleTodo(li.dataset.id);
                });

                // TEXT
                const span = document.createElement('span');
                span.classList.add('textElementTodo');
                span.innerText = todo.text;

                span.addEventListener('click', () => {
                    let newTodoText = prompt('Изменяем todo', 'Пусто');

                    this.controller.editTodo(li.dataset.id, newTodoText);
                });


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

                this.todoList.appendChild(li);
            });
            // console.log(todos);

        }
        console.log(todos);
    }
}

const app = new Controller();

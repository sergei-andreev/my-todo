// ---------------------------------------------------------- Model
class Model {
    constructor(controller) {
        this.controller = controller;
        this.todos = [];
        this.id = 0;
    }

    addTodo(todoText) {
        const todo = {
            id: this.id++,
            text: todoText
        }

        this.todos.push(todo);
        this.controller.updateView(this.todos);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)

        this.controller.updateView(this.todos);
    }


    deleteFirstTodo() {
        this.todos.pop();
        this.controller.updateView(this.todos);
    }

    deleteLastTodo() {
        this.todos.shift();
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

    deleteFirstTodo() {
        this.model.deleteLastTodo();
    }

    deleteLastTodo() {
        this.model.deleteFirstTodo();
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

    updateView(todos) {
        const todoList = document.querySelector('.todo-list');
        todoList.innerHTML = '';


        todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerText = todo.text;
            todoList.appendChild(li);
        });

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

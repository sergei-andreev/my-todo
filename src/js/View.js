export default class View {
    constructor(controller) {
        this.controller = controller;
        this.todoList = document.querySelector('.list');
        this.form = document.querySelector('.form');
        this.inputNewTodo = document.querySelector('.form__input-text');

        this.initHandlers();
    }

    initHandlers() {
        this.filterHandlers();
        this.addTodo();

    }

    filterHandlers() {
        ['#rb-1', '#rb-2', '#rb-3'].forEach(selector => {
            document.querySelector(selector).addEventListener('change', () => {
                this.updateView(this.controller.getTodos());
            });
        })
    }

    getInputValue() {
        return this.inputNewTodo.value;
    }

    clearInput() {
        this.inputNewTodo.value = '';
    }

    addTodo() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (this.getInputValue() !== '') {
                this.controller.addTodo(this.getInputValue());
                this.clearInput();
            }
        });
    }

    updateView(todos) {
        this.todoList.innerHTML = '';

        if (document.querySelector('#rb-2').checked) {
            todos = todos.filter((todo) => {
                if (todo.complete === false) {
                    return todo;
                }
            })
        }

        if (document.querySelector('#rb-3').checked) {
            todos = todos.filter((todo) => {
                if (todo.complete === true) {
                    return todo;
                }
            })
        }

        if (todos.length === 0) {
            const p = document.createElement('p')
            p.textContent = 'Nothing to do! Add a task?'
            this.todoList.append(p)
        } else {
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.classList.add('list__item', 'list-item');
                li.dataset.id = todo.id;
                todo.complete ? li.classList.add('list-item--complete') : 0;

                const label = document.createElement('label');
                label.classList.add('list-item__label');

                const checkbox = document.createElement('input');
                checkbox.classList.add('list-item__checkbox');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('click', () => {
                    li.classList.toggle('list-item--complete');
                    this.controller.toggleTodo(li.dataset.id);
                });

                const mark = document.createElement('span');
                mark.classList.add('list-item__mark');

                const span = document.createElement('span');
                span.classList.add('list-item__text');
                span.innerText = todo.text;

                const deleteTodo = document.createElement('button');
                deleteTodo.classList.add('list-item__btn', 'list-item__btn--delete');
                deleteTodo.innerHTML = 'd';

                deleteTodo.addEventListener('click', () => {
                    this.controller.deleteTodo(li.dataset.id);
                });

                const editTodo = document.createElement('button');
                editTodo.classList.add('list-item__btn', 'list-item__btn--edit');
                editTodo.innerHTML = 'e';

                editTodo.addEventListener('click', () => {
                    let currentTodoText = span.innerText;
                    let newTodoText = prompt('You edit todo', currentTodoText);
                    newTodoText == null ? newTodoText = currentTodoText : this.controller.editTodo(li.dataset.id, newTodoText);
                    
                });

                label.appendChild(checkbox);
                label.appendChild(mark);
                label.appendChild(span);
                li.appendChild(label);
                li.append(deleteTodo);
                li.append(editTodo);

                this.todoList.appendChild(li);
            });
        }
        console.log(todos);
    }
}

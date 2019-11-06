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
        ['#rb-all', '#rb-no', '#rb-yes'].forEach(selector => {
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

    viewPlug() {
        const p = document.createElement('p')
        p.textContent = 'Nothing to do! Add a task?'
        this.todoList.append(p)
    }

    createLi(todo) {
        const li = document.createElement('li');
        li.classList.add('list__item', 'list-item');
        li.dataset.id = todo.id;
        todo.complete ? li.classList.add('list-item--complete') : 0;

        return li;
    }

    createLabel() {
        const label = document.createElement('label');
        label.classList.add('list-item__label');

        return label;
    }

    createCheckbox(li) {
        const checkbox = document.createElement('input');
        checkbox.classList.add('list-item__checkbox');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('click', () => {
            li.classList.toggle('list-item--complete');
            this.controller.toggleTodo(li.dataset.id);
        });

        return checkbox;
    }

    createMark() {
        const mark = document.createElement('span');
        mark.classList.add('list-item__mark');

        return mark;

    }

    createSpan(todo) {
        const span = document.createElement('span');
        span.classList.add('list-item__text');
        span.innerText = todo.text;

        return span;
    }

    createTodoElement(todo) {
        const li = this.createLi(todo);
        const label = this.createLabel();
        const checkbox = this.createCheckbox(li);
        const mark = this.createMark();
        const span = this.createSpan(todo);

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

        return li;
    }

    updateView(todos) {
        this.todoList.innerHTML = '';

        if (document.querySelector('#rb-no').checked) {
            todos = todos.filter((todo) => {
                if (todo.complete === false) {
                    return todo;
                }
            })
        }

        if (document.querySelector('#rb-yes').checked) {
            todos = todos.filter((todo) => {
                if (todo.complete === true) {
                    return todo;
                }
            })
        }

        if (todos.length === 0) {
            this.viewPlug();
        } else {
            todos.forEach(todo => {
                const li = this.createTodoElement(todo);
                this.todoList.appendChild(li);
            });
        }
        console.log(todos);
    }
}

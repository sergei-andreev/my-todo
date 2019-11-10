import 'babel-polyfill';
import {config} from './firebaseConfig.js';
import * as firebase from "firebase/app";
import "firebase/firestore";
import uuidv4 from 'uuid/v4';

export default class Model {
    constructor(controller) {
        this.controller = controller;

        firebase.initializeApp(config);
        this.db = firebase.firestore().collection('todos');

        this.todos = [];
        
        this.initTodos();
    }

    async initTodos() {
        const snapshot = await this.db.get();
        this.todos = snapshot.docs.map(doc => doc.data());

        this.updateView();
    }

    updateView() {
        this.controller.updateView(this.todos);
    }

    async addTodo(todoText = '') {
        try {
            const todo = {
                id: uuidv4(),
                text: todoText,
                complete: false,
            };

            await this.db.doc(`${todo.id}`).set(todo);

            const snapshot = await this.db.get();

            this.todos = snapshot.docs.map(doc => doc.data());
            this.updateView();

        } catch(error) {
            console.log(error)
        }
    }

    async editTodo(id, todoText) {
        await this.db.doc(`${id}`).update({
            text: todoText
        });

        this.initTodos();
    }

    async deleteTodo(id) {
        await this.db.doc(`${id}`).delete();

        this.initTodos();
    }

    async toggleTodo(id) {
        let snapShot = await this.db.doc(`${id}`).get();
        let currentComplete = await snapShot.data().complete;

        await this.db.doc(`${id}`).update({
            complete: !currentComplete
        });

        this.initTodos();
    }
}

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: [
            { id: 1, title: 'Todo 1', is_done: true },
            { id: 2, title: 'Todo 2', is_done: false }
        ]
    },
    getters: {
        finishedTodos: (state) => state.filter(x => x.is_done),
        unFinishedTodos: (state) => state.filter(x => !x.is_done)
    },
    actions: {
        getTodoById: (state) => (id) => state.find(x => x.id === id)
    }
})
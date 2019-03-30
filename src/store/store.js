// library
import Vue from 'vue';
import Vuex from 'vuex';

// shared
import { CONSTANTS } from '../shared/constants';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        categories: CONSTANTS.TODOS.CATEGORIES,
        todos: [
            { id: 1, title: 'Todo 1', is_done: true, due_at: new Date('2019-03-31 15:00:00').toLocaleString() },
            { id: 2, title: 'Todo 2', is_done: false, due_at: new Date('2019-03-31 16:00:00').toLocaleString() }
        ],
    },
    getters: {
        completedTodos: (state) => state.filter(x => x.is_done),
        uncompletedTodos: (state) => state.filter(x => !x.is_done)
    },
    actions: {
        getTodoById: (state) => (id) => state.find(x => x.id === id)
    }
})
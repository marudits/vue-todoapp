// library
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

// shared
import { CONSTANTS } from '../shared/constants';

const vuexPersist = new VuexPersist({
    key: CONSTANTS.APP.KEY,
    storage: localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        categories: CONSTANTS.TODOS.CATEGORIES,
        todos: [],
    },
    getters: {
        sortedData: (state) => state.todos.sort((a,b) => a.due_at - b.due_at),
        completedTodos: (state) => state.todos.filter(x => x.is_done),
        uncompletedTodos: (state) => state.todos.filter(x => !x.is_done),
        filteredCategories: (state) => (categories) => state.todos.filter(x => categories.indexOf(x.category) !== -1)
    },
    actions: {
        TODO_ADD: (context, todo) => {
            context.commit(CONSTANTS.ACTIONS.TODO.ADD, todo)
        },
        TODO_REMOVE: (context, todo) => {
            context.commit(CONSTANTS.ACTIONS.TODO.REMOVE, todo)
        },
        TODO_TOGGLE_IS_DONE: (context, todo) => {
            context.commit(CONSTANTS.ACTIONS.TODO.TOGGLE_IS_DONE, todo)
        }
    },
    mutations: {
        TODO_ADD: (state, todo) => {
            state.todos.push(todo);
        },
        TODO_REMOVE: (state, todo) => {
            let { todos } = state;
            todos.splice(todos.indexOf(todo), 1)
        },
        TODO_TOGGLE_IS_DONE : (state, todo) => {
            todo.is_done = !todo.is_done;
        }
    },
    plugins: [
        vuexPersist.plugin
    ]
})
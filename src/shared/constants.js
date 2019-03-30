export const CONSTANTS = {
    ACTIONS: {
        TODO: {
            ADD: 'TODO_ADD',
            GET: 'TODO_GET',
            REMOVE: 'TODO_REMOVE',
            TOGGLE_IS_DONE: 'TODO_TOGGLE_IS_DONE'
        }
    },
    APP: {
        KEY: 'whattodo',
        NAME: 'WhatTodo'
    },
    TODOS: {
        CATEGORIES: [
            { name: 'Shopping', key: 'shopping', icon: 'el-icon-goods' },
            { name: 'Meeting', key: 'meeting', icon: 'el-icon-date' },
            { name: 'Work', key: 'work', icon: 'el-icon-news' },
            { name: 'Task', key: 'task', icon: 'el-icon-edit-outline' },
            { name: 'Call', key: 'call', icon: 'el-icon-phone-outline' }
        ]
    }
}
const CONSTANTS = {
    TODOS: {
        CATEGORIES: [
            { name: 'Shopping', key: 'shopping' },
            { name: 'Meeting', key: 'meeting'},
            { name: 'Work', key: 'work' },
            { name: 'Task', key: 'task' },
            { name: 'Call', key: 'call' }
        ],
        STATUS: {
            COMPLETED: 'completed',
            UNCOMPLETED: 'uncompleted'
        }
    },
    RESPONSE: {
        CODE: {
            400: 'INVALID_DATA',
            401: 'UNAUTHORIZED',
            404: 'NOT_FOUND',
            500: 'INTERNAL_SERVER_ERROR'
        }
    }
}

module.exports = CONSTANTS;
// library
const uuidv4 = require('uuid/v4');

// shared
const CONSTANTS = require('../shared/constants');

// utils
const Envelope = require('../utils/envelope');

let data = [];

const posts = {
    addPost: (req, res) => {
        const START_EXEC = process.hrtime();

        let { title, category, due_at } = req.body;

        if(!title || !category || !due_at){
            res.status(400).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'] }, { exec_time: process.hrtime(START_EXEC) }));
            return;
        }

        if(!CONSTANTS.TODOS.CATEGORIES.find(x => x.key === category.toLowerCase())){
            res.status(400).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'], details: "Cant find category." }, { exec_time: process.hrtime(START_EXEC) }));
            return;
        }

        const payload = {
            id: uuidv4(),
            title: title,
            category: category.toLowerCase(),
            due_at: new Date(due_at).getTime(),
            is_done: false
        };

        data.push(payload);

        res.status(200).json(new Envelope(true, payload, { exec_time: process.hrtime(START_EXEC) }));
    },
    getPosts: (req, res) => {
        const START_EXEC = process.hrtime();

        const payload = data;

        res.status(200).json(new Envelope(true, payload, { exec_time: process.hrtime(START_EXEC) }));
    },
    getPostDetail: (req, res) => {
        const START_EXEC = process.hrtime();

        const { id } = req.params;

        const payload = data.find(x => x.id === id);

        res.status(200).json(new Envelope(payload !== null, payload ? payload : { message: CONSTANTS.RESPONSE.CODE['404'] }, { exec_time: process.hrtime(START_EXEC) }));
    },
    removePost: (req, res) => {
        const START_EXEC = process.hrtime();
        res.status(200).json(new Envelope(true, { message: 'REMOVE_POSTS', params: req.params }, { exec_time: process.hrtime(START_EXEC) }));
    },
    updatePost: (req, res) => {
        const START_EXEC = process.hrtime();
        res.status(200).json(new Envelope(true, { message: 'UPDATE_POSTS', params: req.params }, { exec_time: process.hrtime(START_EXEC) }));
    }
}

module.exports = posts;
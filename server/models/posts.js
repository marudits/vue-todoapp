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

        const { status, categories } = req.query;

        let payload = data;

        if(status && status.toLowerCase() === CONSTANTS.TODOS.STATUS.COMPLETED){
            payload = payload.filter(x => x.is_done);
        }

        if(status && status.toLowerCase() === CONSTANTS.TODOS.STATUS.UNCOMPLETED){
            payload = payload.filter(x => !x.is_done);
        }

        if(categories){
            payload = payload.filter(item => categories.toLowerCase().split(',').indexOf(item.category) !== -1);
        }

        payload.sort((a,b) => a.due_at - b.due_at)

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

        const { id } = req.params;

        const payload = data.find(x => x.id === id);

        if(!payload){
            res.status(200).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['404'], details: `Cant find post with id ${id}` }, { exec_time: process.hrtime(START_EXEC) }));
            return;
        }

        data.splice(data.findIndex(x => x.id === id), 1);

        res.status(200).json(new Envelope(true, payload, { exec_time: process.hrtime(START_EXEC) }));
    },
    updatePost: (req, res) => {
        const START_EXEC = process.hrtime();
        
        const { id } = req.params;
        const { title, category, is_done, due_at } = req.body;

        const postIndex = data.findIndex(x => x.id === id);

        if(postIndex < 0){
            res.status(200).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['404'], details: `Cant find post with id ${id}` }, { exec_time: process.hrtime(START_EXEC) }));
        }

        if(!req.body){
            res.status(400).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['400'], details: `Value in request body is mandatory` }, { exec_time: process.hrtime(START_EXEC) }));
            return;
        }

        data[postIndex] = Object.assign({}, data[postIndex], {
            title: title || data[postIndex].title,
            category: category || data[postIndex].category,
            is_done: is_done || data[postIndex].is_done,
            due_at: new Date(due_at).getTime() || data[postIndex].due_at,
        });

        res.status(200).json(new Envelope(true, data[postIndex], { exec_time: process.hrtime(START_EXEC) }));
    }
}

module.exports = posts;
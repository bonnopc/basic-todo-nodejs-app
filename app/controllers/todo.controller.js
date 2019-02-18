const Todo = require('../models/todo.model');

// create and save
exports.create = (req, res) => {
    // validate request
    if(!req.body.content){
        return res.status(400).send({
            message: "Todo content can not be empty"
        })
    }

    // create a todo
    const todo = new Todo({
        title: req.body.title || "Untitled Todo",
        content: req.body.content
    })

    // save todo in the DB
    todo.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the Todo."
        })
    })
};

// retrieve all
exports.findAll = (req, res) => {
    Todo.find()
    .then(todos => {
        res.send(todos);
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Some error occured while retrieving todos."
        });
    });
};

// retrieve one
exports.findOne = (req, res) => {
    Note.findById(req.params.todoId)
    .then(todo => {
        if(!todo){
            return res.status(404).send({
                message: "Todo not found with id " + req.params
            });
        }
        res.send(todo);
    })
    .catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        return res.status(500).send({
            message: "Error retriving todo with id " + req.params.todoId
        });
    });
};

// update
exports.update = (req, res) => {
    // validate
    if(!req.body.content){
        return res.status(400).send({
            message: "Todo content can not be empty"
        });
    }

    Note.findByIdAndUpdate(req.params.todoId, {
        title: req.body.title || "Untitled Todo",
        content: req.body.content
    }, { new: true })
    .then(todo => {
        if(!todo){
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        res.send(todo);
    })
    .catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        return res.status(500).send({
            message: "Error updating todo with id " + req.params.todoId
        });
    })
}

// delete
exports.delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.todoId)
    .then(todo => {
        if(!todo){
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        res.send({ message: "Todo deleted successfully" });
    })
    .catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound"){
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        return res.status(500).send({
            message: "Could not delete todo with id " + req.params.todoId
        });
    })
}
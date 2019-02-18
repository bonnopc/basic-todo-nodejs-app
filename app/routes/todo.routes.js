module.exports = app => {
    const todo = require('../controllers/todo.controller.js');

    // create
    app.post('/todo', todo.create);

    // retrieve all todos
    app.get('/todo', todo.findAll);

    // retrieve a single todo with Id
    app.get('/todo/:todoId', todo.findOne);

    // update a todo
    app.put('/todo/:todoId', todo.update);

    // Delete a todo
    app.delete('/todo/:todoId', todo.delete);
}
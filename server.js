
// https://devcenter.heroku.com/articles/mongolab
// http://todomvc.com/examples/angularjs/#/
var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),

    // Mongoose Schema definition
    Schema = new mongoose.Schema({
      id       : String, 
      title    : String,
      completed: Boolean
    }),

    Todo = mongoose.model('Todo', Schema);

/*
 * I’m sharing my credential here.
 * Feel free to use it while you’re learning.
 * After that, create and use your own credential.
 * Thanks.
 *
 * MONGOLAB_URI=mongodb://example:example@ds053312.mongolab.com:53312/todolist
 * 'mongodb://example:example@ds053312.mongolab.com:53312/todolist'
 */

const db = "mongodb+srv://rezrim:1sampai8@node-api-zazzy.mongodb.net/test?retryWrites=true&w=majority"

// mongoose.connect(db, function (error) {
//     if (error) console.error(error);
//     else console.log('mongo connected');
// })

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(res => {
    console.log("MongoDB is Connected...");
  })

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true
//     });
//     console.log("MongoDB is Connected...");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

express()
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

  .get('/api/todos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Todo.find( function ( err, todos ){
      res.status(200).json(todo);
    });
  })

  .post('/api/todos', function (req, res) {
    var todo = new Todo( req.body );
    todo.id = todo._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.status(200).json(todo);
    });
  })

  .delete('/api/todos', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    Todo.remove({ completed: true }, function ( err ) {
      res.status(200).json(todo);
    });
  })

  .get('/api/todos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Todo.findById( req.params.id, function ( err, todo ) {
      res.status(200).json(todo);
    });
  })

  .put('/api/todos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Todo.findById( req.params.id, function ( err, todo ) {
      todo.title = req.body.title;
      todo.completed = req.body.completed;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      todo.save( function ( err, todo ){
        res.status(200).json(todo);
      });  
    });
  })

  .delete('/api/todos/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Todo.findById( req.params.id, function ( err, todo ) {
      // http://mongoosejs.com/docs/api.html#model_Model.remove
      todo.remove( function ( err, todo ){
        res.status(200).json({msg:'ok'});
      });
    });
  })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);

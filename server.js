const express  = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

    Schema1 = new mongoose.Schema({
      id       : String, 
      title    : String,
      image  : String,
      description : String,
    },
    {
      timestamps:{ date: 'created_at' }
    }),

    News = mongoose.model('News', Schema1);

    Schema2 = new mongoose.Schema({
      id       : String, 
      newsId    : String,
      user  : String,
      comment : String,
    },
    {
      timestamps:{ date: 'created_at' }
    }),

    Comment = mongoose.model('Comments', Schema2);

const db = "mongodb+srv://rezrim:1sampai8@node-api-zazzy.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(res => {
    console.log("MongoDB is Connected...");
  })

express()
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

  .get('/api/news', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    News.find( function ( err, news ){
      res.status(200).json(news);
    });
  })

  .post('/api/news', function (req, res) {
    var news = new News( req.body );
    News.id = news._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    news.save(function (err) {
      res.status(200).json(news);
    });
  })

  .delete('/api/news', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    News.remove({ completed: true }, function ( err, news ) {
      res.status(200).json(news);
    });
  })

  .get('/api/news/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    News.findById( req.params.id, function ( err, news ) {
      res.status(200).json(news);
    });
  })

  .put('/api/news/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    News.findById( req.params.id, function ( err, news ) {
      news.title = req.body.title;
      news.image = req.body.image;
      news.description = req.body.description;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      News.save( function ( err, news ){
        res.status(200).json(news);
      });  
    });
  })

  .delete('/api/news/:id', function (req, res) {
    News.findById( req.params.id, function ( err, news ) {
      News.remove( function ( err, news ){
        res.status(200).json({msg:'ok'});
      });
    });
  })

  // API Comment
  .get('/api/comment', function (req, res) {
    Comment.find( function ( err, comment ){
      res.status(200).json(comment);
    });
  })

  .get('/api/comment/:newsid', function (req, res) {
    console.log(req.params.newsid)
    Comment.find({"newsId" : req.params.newsid}, function ( err, comment ) {
      res.status(200).json(comment);
    });
  })

  .post('/api/comment', function (req, res) {
    var comment = new Comment( req.body );
    comment.id = comment._id;
    comment.save(function (err) {
      res.status(200).json(comment);
    });
  })

  .delete('/api/comment', function (req, res) {
    Comment.remove({ completed: true }, function ( err, comment ) {
      res.status(200).json(comment);
    });
  })
  

  .put('/api/comment/:id', function (req, res) {
    Comment.findById( req.params.id, function ( err, comment ) {
      comment.title = req.body.title;
      comment.image = req.body.image;
      comment.description = req.body.description;
      comment.save( function ( err, comment ){
        res.status(200).json(comment);
      });  
    });
  })

  .delete('/api/comment/:id', function (req, res) {
    Comment.findById( req.params.id, function ( err, comment ) {
      Comment.remove( function ( err, comment ){
        res.status(200).json({msg:'ok'});
      });
    });
  })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);

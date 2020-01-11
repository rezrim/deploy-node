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

    Schema3 = new mongoose.Schema({
      id       : String, 
      namaLengkap : String,
      email  : String,
      username : String,
      password : String,
    },
    {
      timestamps:{ date: 'created_at' }
    }),

    User = mongoose.model('Users', Schema3);

const db = "mongodb://rezrim:1sampai8@node-api-shard-00-00-zazzy.mongodb.net:27017,node-api-shard-00-01-zazzy.mongodb.net:27017,node-api-shard-00-02-zazzy.mongodb.net:27017/test?ssl=true&replicaSet=node-api-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(res => {
    console.log("MongoDB is Connected...");
  })

express()
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json({limit: '20mb', extended: true})) // support json encoded bodies
  .use(bodyParser.urlencoded({limit: '20mb', extended: true})) // support encoded bodies

  .get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

//API News =================================================================================================

  .get('/api/news', function (req, res) {
    News.find( function ( err, news ){
      res.status(200).json(news);
    });
  })

  .post('/api/news', function (req, res) {
    console.log(req.body)
    var news = new News( req.body );
    News.id = news.id;
    news.save(function (err) {
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

// API Comment ========================================================================================
  .get('/api/comment', function (req, res) {
    Comment.find( function ( err, comment ){
      res.status(200).json(comment);
    });
  })

  .get('/api/comment/:newsid', function (req, res) {
    Comment.find({"newsId" : req.params.newsid}, function ( err, comment ) {
      res.status(200).json(comment);
    });
  })

  .post('/api/comment', function (req, res) {
    var comment = new Comment( req.body );
    comment.id = comment.id;
    comment.save(function (err) {
      res.status(200).json(comment);
    });
  })
  

  .put('/api/comment/:id', function (req, res) {
    Comment.findById( req.params.id, function ( err, comment ) {
      comment.comment = req.body.comment;
      comment.save( function ( err, comment ){
        res.status(200).json(comment);
      });  
    });
  })

  .delete('/api/comment/:id', function (req, res) {
    Comment.findById( req.params.id, function ( err, comment ) {
      comment.remove( function ( err, comment ){
        res.status(200).json({msg:'ok'});
      });
    });
  })

//API User =================================================================================================
  .get('/api/user', function (req, res) {
    User.find( function ( err, data ){
      res.status(200).json(data);
    });
  })

  .get('/api/user/:id', function (req, res) {
    User.findById(req.params.id, function ( err, data ) {
      res.status(200).json(data);
    });
  })

  .post('/api/user', function (req, res) {
    var user = new User( req.body );
    user.id = user.id;
    user.namaLengkap = user.namaLengkap;
    user.email = user.email;
    user.username = user.username;
    user.password = user.password;
    user.save(function (err,data) {
      res.status(200).json(data);
    });
  })

  //API Login
  .post('/api/user/login', function (req, res) {
    User.find({"username" : req.body.username, "password" : req.body.password}, function ( err, data ) {
      res.status(200).json(data);
    });
  })

  .put('/api/user/:id', function (req, res) {
    User.findById( req.params.id, function ( err, user ) {
      user.namaLengkap = req.body.namaLengkap;
      user.email = req.body.email;
      user.password = req.body.password;
      user.username = req.body.username;
      user.save( function ( err, data ){
        res.status(200).json(data);
      });  
    });
  })

  .delete('/api/user/:id', function (req, res) {
    User.findById( req.params.id, function ( err, user ) {
      user.remove( function ( err, data ){
        res.status(200).json({msg:'ok'});
      });
    });
  })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 6000);

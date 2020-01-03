const mongoose = require('mongoose'),   

Schema = new mongoose.Schema({
    id       : String, 
    title    : String,
    image  : String,
    description : String,
  },
  {
    timestamps:{ date: 'created_at' }
  }),

News = mongoose.model('News', Schema);
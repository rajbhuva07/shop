
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  mobile:{
    type: Number,
    required: true,
    
  },
  firstname:{
    type: String,
    required: true,
    
  },
  lastname:{
    type: String,
 
    
    
  },
  googleId: {
    type: String,
 
    
    
  },
});
const user=mongoose.model('User', userSchema);
module.exports = user
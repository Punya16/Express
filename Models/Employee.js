const mongoose = require('mongoose')

const { Schema } = mongoose

const EmployeeModel = new Schema({
  name:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String,
    required:false
  },
  date:{
    type:Date,
    default:Date.now()
  },
})

module.exports = mongoose.model("employees",EmployeeModel)
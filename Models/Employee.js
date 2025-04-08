const mongoose = require('mongoose')

const { Schema } = mongoose

const EmployeeModel = new Schema({

  //emp_id = 1001
  //designation = "software developer"
  //salary = 20000
  //experience = 2 years

  emp_id:{
    type:Number,
    required: true,
    unique: true
  },
  name:{
    type:String,
    required:true
  },
  designation:{
    type:String,
    required:true
  },
  experience:{
    type:String,
  },
  salary:{
    type:Number,
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
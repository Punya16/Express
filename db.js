const express = require('express')
const mongoose = require('mongoose')

const ConnectToMongoDB = async()=>{
  try {
    await mongoose.connect("mongodb://localhost:27017/demo") // localhost or 127.0.0.1
    console.log("MongoDB Connected!!!")
  } catch (error)  {
    console.log("MongoDB Connection Unsuccessful!!!"+error.message)
    
  }
}
module.exports = { ConnectToMongoDB }
const express = require('express')
const UserModel = require('../Models/Users')


const Insert = async (req, res) => {

  try {
    console.log(req.body)

    let { name, phone, email, address, dob } = req.body  //second name

    let checknum = await UserModel.find({ phone: phone })

    if (checknum.length > 0) {
      return res.json({ success: false, message: "Phone already exists" })
    }

    let checkemail = await UserModel.find({ email: email })

    if (checkemail.length > 0) {
      return res.json({ success: false, message: "Email already exists" })
    }


    const data = await UserModel({
      name: name, //first  name is the name in schema, second name is the name above
      phone: phone,
      email: email,
      address: address,
      dob: dob,
    })
    let saveData = await data.save()  //saves data in mongoDB 
    //or
    //await data.save() 
    //res.send(saveData)
    // res.send(`Name : ${name}, Phone: ${phone}, Email: ${email}, Address: ${address}, Date:${date}`)

    res.json({ success: true, data: saveData })
    //or
    //res.json({ success: true, data: data })


  }
  catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }


}

const View = async (req, res) => {
  try {
    let users = await UserModel.findOne({ name: "Punya" })
    res.json({ success: true, users })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    }) //500 - internal server error
  }
}

const Delete = async (req, res) => {
  try {
    let user_id = req.params.id
    let check = await UserModel.findById(user_id)
    let deleted_user = await UserModel.findByIdAndDelete(user_id)
    if (deleted_user) {
      return res.json({
        success: true,
        deleted_user
      })
    }
    else {
      return res.json({ success: false, message: "User Not Found" })
    }

  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const SingleView = async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);

  if (!user) {
    console.log("USER NOT FOUND");
    res.json({
      message: "USER NOT FOUND",
    })
  } else {
    res.json({
      data: user
    })
  }
}


module.exports = { Insert, View, Delete, SingleView }

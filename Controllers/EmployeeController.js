const express = require('express')
const EmployeeModel = require('../Models/Employee')


const Insert = async (req, res) => {

  try {
    console.log(req.body)

    let { emp_id, name, designation, experience, salary, phone, email, address } = req.body

    let checkid = await EmployeeModel.find({ emp_id: emp_id })

    if (checkid.length > 0) {
      return res.json({ success: false, message: "ID already exists" })
    }

    let checknum = await EmployeeModel.find({ phone: phone })

    if (checknum.length > 0) {
      return res.json({ success: false, message: "Phone already exists" })
    }

    let checkemail = await EmployeeModel.find({ email: email })

    if (checkemail.length > 0) {
      return res.json({ success: false, message: "Email already exists" })
    }


    const data = await EmployeeModel({
      emp_id : emp_id,
      name: name,
      phone: phone,  
      email: email,
      address: address,
      designation: designation,
      experience: experience,
      salary: salary
    })
    let saveData = await data.save()

    res.json({ success: true, data: saveData })

  }
  catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }


}

const View = async (req, res) => {
  try {
    let users = await EmployeeModel.findOne({ name: "Punya" })
    res.json({ success: true, users })
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const Delete = async (req, res) => {
  try {
    let user_id = req.params.id
    let check = await EmployeeModel.findById(user_id)
    let deleted_user = await EmployeeModel.findByIdAndDelete(user_id)
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


module.exports = { Insert, View, Delete }

// const {name, Hello} = require("./demo.js")
// console.log(name,111)
// Hello()

const express = require('express')
const { ConnectToMongoDB } = require('./db')
ConnectToMongoDB()
const UserModel = require('./Models/Users')
const AgentModel = require('./Models/Agents')

const PORT = 5000
const app = express()
app.use(express.json())

app.get("/api/testing", (req, res) => {
  console.log("This is testing api")
  res.send("This is testing response")
})

app.get("/api/punya", (req, res) => {
  console.log("This is punya api")
  res.send("This is punya response")
})

app.post("/api/insert", async (req, res) => {

  try {
    console.log(req.body)

    let { name, phone, email, address,dob } = req.body  //second name

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
      dob:dob,
    })
    let saveData = await data.save()  //saves data in mongoDB 
    //or
    //await data.save() 

    // res.send(`Name : ${name}, Phone: ${phone}, Email: ${email}, Address: ${address}, Date:${date}`)

    res.json({ success: true, data: saveData })
    //or
    //res.json({ success: true, data: data })


  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }


})


app.post("/api/agent/insert", async (req, res) => {
  try {
    console.log(req.body)
    let { name, phone, email, address } = req.body 
    let checknum = await AgentModel.find({ phone: phone })
    if (checknum.length > 0) {
      return res.json({ success: false, message: "Phone already exists" })
    }
    let checkemail = await AgentModel.find({ email: email })
    if (checkemail.length > 0) {
      return res.json({ success: false, message: "Email already exists" })
    }
    const data = await AgentModel({
      name: name,
      phone: phone,
      email: email,
      address: address
    })
    let saveData = await data.save()  
    res.json({ success: true, data: saveData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
})

app.listen(PORT, () => {
  console.log("App listening on PORT : " + PORT)  //should be last line of this file
})
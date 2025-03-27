// const {name, Hello} = require("./demo.js")
// console.log(name,111)
// Hello()

const express = require('express')
const { ConnectToMongoDB } = require('./db')
ConnectToMongoDB()
// const UserModel = require('./Models/Users')
const AgentModel = require('./Models/Agents')
const UserRoutes = require('./Routes/UserRoutes')

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

app.use("/api/user",UserRoutes)

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

app.use("/api/user",UserRoutes )

app.get("/api/agent/view", async (req, res) => {
  try {
    let agents = await AgentModel.find({ email: "punyapoojary16@gmail.com" })
    res.json({ success: true, agents })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    }) //500 - internal server error
  }
})

app.delete("/api/user/delete/:id",)

app.delete("/api/agent/delete/:id", async (req, res) => {
  try {
    let user_id = req.params.id
    // let check = await UserModel.findById(user_id)
    let deleted_user = await AgentModel.findByIdAndDelete(user_id)
    if (deleted_user) {
      return res.json({
        success: true,
        deleted_user
      })
    }
    else {
      return res.json({ success: false, message: "User Not Found" })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})
app.listen(PORT, () => {
  console.log("App listening on PORT : " + PORT)  //should be last line of this file
})
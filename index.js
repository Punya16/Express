// const {name, Hello} = require("./demo.js")
// console.log(name,111)
// Hello()

const express = require('express')
const { ConnectToMongoDB } = require('./db')
ConnectToMongoDB()

// const UserModel = require('./Models/Users')
// const AgentModel = require('./Models/Agents')
const UserRoutes = require('./Routes/UserRoutes')
const AgentRoutes = require('./Routes/AgentRoutes')
const EmployeeRoutes = require('./Routes/EmployeeRoutes')

const PORT = 5000
const app = express()

const cors = require('cors')
app.use(express.json())
app.use(cors())

app.get("/api/testing", (req, res) => {
  console.log("This is testing api")
  res.send("This is testing response")
})

app.get("/api/punya", (req, res) => {
  console.log("This is punya api")
  res.send("This is punya response")
})

app.use("/api/user",UserRoutes)

app.use("/api/agent", AgentRoutes)

app.use("/api/employee", EmployeeRoutes)


// app.use("/api/user",UserRoutes )
// app.use("/api/agent", AgentRoutes)
// app.use("/api/user",UserRoutes)
// app.use("/api/agent",AgentRoutes )


app.listen(PORT, () => {
  console.log("App listening on PORT : " + PORT)  //should be last line of this file
})
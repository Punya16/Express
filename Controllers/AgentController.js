

const Insert = async (req, res) => {
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
}


const View = async (req, res) => {
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
}


const Delete = async (req, res) => {
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
}

module.exports = { Insert, View, Delete }
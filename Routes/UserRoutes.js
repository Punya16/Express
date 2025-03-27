const express = require('express')
// const UserModel = require('../Models/Users')

const routes = express.Router()
const { Insert, View, Delete } = require('../Controllers/UserController')


routes.post('/insert', Insert)
routes.get('/view', View)
routes.delete('/delete/:id', Delete)

module.exports = routes
const express = require('express')
const routes = express.Router()

const { Insert, View, Delete, SingleView } = require('../Controllers/UserController')


routes.post('/insert', Insert)
routes.get('/view', View)
routes.delete('/delete/:id', Delete)
routes.get('/singleview/:id', SingleView)

module.exports = routes
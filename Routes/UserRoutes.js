const express = require('express')
const routes = express.Router()

const { Insert, View, Delete, SingleView, Update } = require('../Controllers/UserController')


routes.post('/insert', Insert)
routes.get('/view', View)
routes.delete('/delete/:id', Delete)
routes.get('/singleview/:id', SingleView)
routes.put('/update/:id', Update)

module.exports = routes
const express = require('express')
const routes = express.Router()

const { Insert, View, Delete } = require('../Controllers/AgentController')


routes.post('/insert', Insert)
routes.get('/view', View)
routes.delete('/delete/:id', Delete)

module.exports = routes
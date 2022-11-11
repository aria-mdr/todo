const {indexController, create, getOne, getAll} = require('./controller')
const {INDEX_ROUTE, CREATE_ITEM, GET_ITEM, GET_ITEMS} = require('./constants')
const { authGaurd } = require('../auth/auth')

module.exports = (app) => {
    app.get(INDEX_ROUTE, authGaurd, indexController)
    app.post(CREATE_ITEM, authGaurd, create)
    app.get(GET_ITEMS, getAll)
    app.get(GET_ITEM, getOne)
}
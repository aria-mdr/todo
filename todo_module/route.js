const {indexController, createItem, getItem, getItems} = require('./controller')
const {INDEX_ROUTE, CREATE_ITEM, GET_ITEM, GET_ITEMS} = require('./constants')

module.exports = (app) => {
    app.get(INDEX_ROUTE, indexController)
    app.post(CREATE_ITEM, createItem)
    app.get(GET_ITEMS, getItems)
    app.get(GET_ITEM, getItem)
}
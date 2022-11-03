const {indexControlle} = require('./controller')
const {INDEX_ROUTE} = require('./constants')

module.exports = (app) => {
    app.get(INDEX_ROUTE, indexControlle)
}
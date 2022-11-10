const {create, getOne, getAll, login, signUp, loginPost, signUpPost} = require('./controller')
const {CREATE, GET_ONE, GET_ALL, LOGIN, SIGNUP} = require('./constants')

module.exports = (app) => {
    app.post(CREATE, create)
    app.get(GET_ALL, getAll)
    app.get(GET_ONE, getOne)
    app.get(LOGIN,  login)
    app.get(SIGNUP, signUp)
    app.post(LOGIN,  loginPost)
    app.post(SIGNUP, signUpPost)
}
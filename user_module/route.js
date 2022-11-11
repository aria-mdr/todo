const {create, getOne, getAll, login, signUp, loginPost, signUpPost, signout} = require('./controller')
const {CREATE, GET_ONE, GET_ALL, LOGIN, SIGNUP, SIGNOUT} = require('./constants')

module.exports = (app) => {
    app.post(CREATE, create)
    app.get(GET_ALL, getAll)
    app.get(GET_ONE, getOne)
    app.get(LOGIN,  login)
    app.get(SIGNUP, signUp)
    app.post(LOGIN,  loginPost)
    app.post(SIGNUP, signUpPost)
    app.get(SIGNOUT, signout)
}
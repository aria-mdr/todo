// bring in services and call service in the controleer
const service = require('./service');
const path = require('path');
const {createToken} = require('../auth/auth')

const getAll = async (req, res) => {
    try {
        const items = await service.getAll()
        res.status(200).json(items)
    } catch(error) {
        res.status(error.code).json({
            error: error.message
        })
    }
}

const getOne = async (req, res) => {
    try {
        const email = req.params.email
        if(!itemName || itemName.length === 0) { 
            throw {
                code: 401, 
                message: 'User ID is required'
            }
        }
        const item = await service.getOne(email)
        res.status(200).json(item)
    } catch(error) {
        console.log(error)
        res.status(error.code).json({
            error: error.message
        })
    }
}

const create = async (req, res) => { 
    try {
        const user = req.body
        if(!user) { 
            throw {
                code: 401, 
                message: 'user is required'
            }
        }
        const item = await service.create(newItem)
        res.status(200).json(item)
    } catch(error) {
        res.status(error.code).json({
            error: error.message,
            mongoError: error.mongoError
        })
    }
}

const login = (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/login.html'));
}

const signUp = (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/signup.html'));
}

const loginPost = async (req, res) => {
    try {
        const userDetail = req.body
        if(!userDetail) {
            throw {
                code: 401, 
                message: 'Invalid username or password'
            }
        }

        const user = await service.login(userDetail)

        if(!user) {
            throw {
                code: 401, 
                message: 'Invalid username or password'
            }
        }

        const token = await createToken(user.id)
        // TODO: generate a Auth token and add it to the cookie
        res.cookie('token', token)

        res.status(200).json({
            userId: user.id,
            token
        })
    } catch (err) {{
        res.status(err.code).json({
            error: err.message
        })
    }}
}

const signUpPost = async (req, res) => {
    try {
        const userDetails = req.body
        if(!userDetails) {
            throw new {
                code: 401, 
                message: "please provide all required information"
            }
        }

        const user = await service.create(userDetails)
        const token = await createToken(user.id)

        if(!user) { 
            throw new {
                code: 401, 
                message: "Can not user, please login first"
            }
        }

        // Optional: create an auth token and log the user automatically
        res.cookie('token', token)
        res.status(200).json({
            message: "Usern created successfully",
            userId: user.id
        })

    } catch(error) {
        res.status(error.code).json({
            error: error.message
        })
    }
}

module.exports = {
    getAll, 
    getOne, 
    create,
    login,
    signUp, 
    signUpPost, 
    loginPost
}
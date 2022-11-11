const jwt = require('jsonwebtoken');

const createToken = async (userId) => {
    return await jwt.sign(
        {userId},
        'SECRECT_KEY'
    )
}

const verifyToken = async (token) => {
    try {
        const data = await jwt.verify(token, 'SECRECT_KEY')

        if(!data || !data.userId) {
            throw {
                code: 401,
                message: 'Invalid token'
            }
        } 

        return data
    } catch (error) {
        throw {
            code: 401,
            message: 'Invalid token'
        }
    }

}

const authGaurd = async (req, res, next) => {
    // read the cookies
    const cookies = req.cookies;
    try {
        if(!cookies || !cookies.token) {
            throw {}
        }
        const data = await verifyToken(cookies.token)
        console.log(data.userId)
        req.userId = data.userId

        next()
    } catch (error) { 
        console.log('users needs to be logged in')
        res.redirect('/login')
        res.end()
    }

    // find the token and verify it
    // if verifed, continue on to the next call
    // if not verfied, then fail the request and send user to login page
}


module.exports = {
    createToken,
    verifyToken,
    authGaurd,
}
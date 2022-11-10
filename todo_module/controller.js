// bring in services and call service in the controleer
const service = require('./service');
const path = require('path');

const indexController = async (req, res) => {
    try {
        const items = await service.getAll()
        res.render('index', {
            layout: 'todo',
            items 
        })
        return
    } catch(error) {
        console.log(error)
        res.render('index')
    }

}

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
        const itemName = req.params.itemName
        if(!itemName || itemName.length === 0) { 
            throw {
                code: 401, 
                message: 'Item name is required'
            }
        }
        const item = await service.getOne(itemName)
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
        const newItem = req.body
        if(!newItem) { 
            throw {
                code: 401, 
                message: 'Item name is required'
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

module.exports = {
    indexController, 
    getAll, 
    getOne, 
    create
}
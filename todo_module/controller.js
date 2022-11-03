// bring in services and call service in the controleer
const service = require('./service');
const path = require('path');
const indexController = (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/index.html'));
}

const getItems = async (req, res) => {
    try {
        const items = await service.getItems()
        res.status(200).json(items)
    } catch(error) {
        res.status(error.code).json({
            error: error.message
        })
    }
}

const getItem = async (req, res) => {
    try {
        const itemName = req.params.itemName
        if(!itemName || itemName.length === 0) { 
            throw {
                code: 401, 
                message: 'Item name is required'
            }
        }
        const item = await service.getItem(itemName)
        res.status(200).json(item)
    } catch(error) {
        console.log(error)
        res.status(error.code).json({
            error: error.message
        })
    }
}

const createItem = async (req, res) => { 
    try {
        const newItem = req.body
        if(!newItem) { 
            throw {
                code: 401, 
                message: 'Item name is required'
            }
        }
        const item = await service.createItem(newItem)
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
    getItems, 
    getItem, 
    createItem
}
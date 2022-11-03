/// services defined and exported
const ToDoModel = require('./model')

const createItem = async (item) => {
    try {
        console.log(item)
        await ToDoModel.create(item)
    } catch (error) {
        throw {
            code: 401, 
            message: 'Invalid Item',
            mongoError: error
        }
    }
}

const getItem = async (itemName) => {``
    try {
        const item = await ToDoModel.findOne({
            name: itemName
        })

        if(!item) {
            throw ""
        }

        return item
    } catch (error) {
        throw {
            code: 401, 
            message: 'couldnt find item'
        }
    }
}

const getItems = async () => {
    try {
        const items = await ToDoModel.find({})

        if(!items || items.length === 0) { 
            throw ""
        }

        return items
    } catch (error) {
        throw {
            code: 401, 
            message: 'couldnt find any items'
        }
    }
}

module.exports = {
    createItem, 
    getItem, 
    getItems,
}
/// services defined and exported
const ToDoModel = require('./model')

const create = async (item) => {
    try {
        console.log(item)
        await ToDoModel.create(item)
    } catch (error) {
        throw {
            code: 401, 
            message: 'Invalid Item'
        }
    }
}

const getOne = async (itemName) => {``
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

const getAll = async () => {
    try {
        const items = await ToDoModel.find({}).lean()
        const documentItems = await ToDoModel.find({})
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
    create, 
    getOne, 
    getAll,
}
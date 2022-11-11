/// services defined and exported
const ToDoModel = require('./model')

const create = async (item, user_id) => {
    try {
        if(!user_id) {
            throw ""
        }
        // await ToDoModel.create({
        //     ...item, 
        //     user_id: user_id
        // })
        await ToDoModel.create({
            item: item.item, 
            subItems: item.subItems,
            user_id: user_id
        })
    } catch (error) {
        throw {
            code: 401, 
            message: 'Invalid Item',
            mongoError: error,
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

const getByUserId = async (user_id) => {
    try {
        const items = await ToDoModel.find({
            user_id: user_id
        }).lean()
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
    getByUserId
}
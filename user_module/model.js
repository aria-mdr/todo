// define and export the data model
const {mongoose, Schema} = require('../db/db');


const UserSchema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: String,
})

const UserModel = new mongoose.model('todo-users', UserSchema);

module.exports = UserModel;
// define and export the data model
const {mongoose, Schema} = require('../db/db');

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    done: Boolean
});
/**
 * {
 *  name: 'Drop the kids off', 
 *  done: false, 
 *  subItems: [
 *      { 
 *        name: 'turn on the car',
 *        done: true
 *      }
 *  ]
 * }
 */
// const ToDoSchema =  new Schema({
//     item: String, 
//     done: Boolean,
//     subItems: [ItemSchema]
// })


/**
 * {
 *  item: {
 *      name: 'drop the kids off',
 *      done: false
 *  }, 
 *  subItems: [
 *      {
 *          name: 'drop the kids off',
 *          done: false
 *      }
 *  ]
 * }
 */
const ToDoSchema = new Schema({
    item: ItemSchema,
    subItems: [ItemSchema]
})

const ToDoModel = new mongoose.model('todo', ToDoSchema);

module.exports = ToDoModel;

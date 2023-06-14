const mongoose = require('mongoose')

const { Schema } = mongoose;

const foodItemsSchema = new Schema({
    CategoryName: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required:true,
        unique: true
    },
    img:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    type:{
        type: Array,
        required:true,
    },
    price:{
        type:Array,
        required:true,
    },
    
});

module.exports = mongoose.model('foodItems', foodItemsSchema)
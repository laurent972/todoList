const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        
            title:{
                type: String, 
                required: true
            },
            description: {
                type: String, 
                required: true
            },
            date:{
                type: Date, 
                default: Date.now, 
            },
            todo: Boolean,
        
    }
)

module.exports = mongoose.model('task',taskSchema )
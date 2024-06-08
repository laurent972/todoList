const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    { 
        title:{
          type: String
        },
        description: {
          type: String
        },
        createDate:{
          type: Date, 
          default: Date.now, 
         },
        updateDate:{
          type: Date, 
          default: Date.now, 
         },
        todo: Boolean,       
    }
)

module.exports = mongoose.model('task',taskSchema )
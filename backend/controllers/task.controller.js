const TaskModel = require('../models/task.model');

module.exports.getTasks = async (req, res) => {
  try{
    const task = await TaskModel.find()
    res.status(200).json(task)
  }catch (err){
    console.log(err);
    res.json(err)
  }   
}


module.exports.setTask = async (req, res) => {
     try{
       const task = await TaskModel.create({
              title : req.body.title,
              description : req.body.description,
              todo : true,
        })
        res.status(200).json(task)
     }catch (err){
       console.log(err);
       res.json(err)
     }   
}
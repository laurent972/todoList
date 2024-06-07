const taskModel = require('../models/task.model');
const TaskModel = require('../models/task.model');

module.exports.getTasks = async (req, res) => {
  try{
    const task = await TaskModel.find();
    res.status(200).json(task);
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
        });
        res.status(200).json(task);
     }catch (err){
       console.log(err);
       res.json(err)
     }   
}

module.exports.editTask = async (req, res) => {
  try{
    const task = await TaskModel.findById(req.params.id);
      const updateTask = await TaskModel.findByIdAndUpdate(
        task,
        req.body,
        {new: true}
      )
      res.status(200).json(updateTask);
  
  }catch (err){
    res.status(400).json({ err })
    console.log(err);
    res.json(err)
  }   
}

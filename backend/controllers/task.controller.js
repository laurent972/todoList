const taskModel = require('../models/task.model');
const TaskModel = require('../models/task.model');

module.exports.getTasks = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
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

module.exports.deleteTask = async (req, res) => {
  try{
    const task = await TaskModel.findById(req.params.id);
    await task.deleteOne();
    res.status(200).json("Tache supprimé " + task);  
  }catch (err){
    res.status(400).json({ err })
    console.log(err);
    res.json(err)
  }   
}

module.exports.toggleFalseTask = async (req, res) => {
  try{
   await taskModel.findByIdAndUpdate(
      req.params.id,
      {$set : {todo : false}},
      {new : true}
    )
    res.status(200).json(" Tâche accomplie"   );  
    
  }catch (err){
    res.status(400).json({ err })
    console.log(err);
    res.json(err)
  }   
}

module.exports.toggleTrueTask = async (req, res) => {
  try{
   await taskModel.findByIdAndUpdate(
      req.params.id,
      {$set : {todo : true}},
      {new : true}
    )
    res.status(200).json(" Tâche à faire "  );  
    
  }catch (err){
    res.status(400).json({ err })
    console.log(err);
    res.json(err)
  }   
}
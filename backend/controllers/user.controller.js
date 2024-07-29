const { FaRegCaretSquareUp } = require('react-icons/fa');
const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async(req,res) =>{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo =  async (req, res) => {
      if(!ObjectId.isValid(req.params.id))
      return res.status(400).send('Id unknown : '+ req.params.id)

        try {
          const user = await UserModel.findById(req.params.id).select('-password');
          if (user) {
            console.log('Document found:', user);
            return res.status(400).send(user);
          } else {
            console.log('Document not found');
          }
        } catch (err) {
          console.error('Error:', err);
        }
}

module.exports.updateUser = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('Uilisateur inconnu')
    try {
      const user = await UserModel.findByIdAndUpdate({ _id : req.params.id},{$set: req.body},{ new: true, upsert: true, setDefaultsOnInsert: true}).select('-password')
       
          if (user) {
            console.log('Document found:', user);
            return res.status(200).send(user);
          } else {
            console.log('Document not found');
          }
    
    } catch (err) {
      console.error('Error:', err);
      if(err) return res.status(500).send(err)
    }

}
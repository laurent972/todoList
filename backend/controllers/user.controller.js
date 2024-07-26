const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async(req,res) =>{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo =  async (req, res) => {
    console.log(req.params);
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown : '+ req.params.id)

   
        try {
          const doc = await UserModel.findById(req.params.id);
          if (doc) {
            console.log('Document found:', doc);
            return res.status(400).send(doc)
          } else {
            console.log('Document not found');
          }
        } catch (err) {
          console.error('Error:', err);
        }
    
}
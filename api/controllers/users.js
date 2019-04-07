var mongoose = require("mongoose");
var UserModel = require("../models/UserModel");

module.exports = {
    searchUsers,
    searchUser,
    deleteUser
  };

function searchUsers(req, res) {
    UserModel.find({}).then(result=>{
        res.send(JSON.stringify(result));

    }).catch(err=>{
        res.status(500).send(err);
    });

}
function searchUser(req, res) {

    const id  = req.swagger.params.userId.value;
    const castedId = mongoose.Types.ObjectId(id);

    if(!id){
        res.status(404).send("Wrong id");
    }
    UserModel.findById(castedId).then(
        result=>{
            if(!result){
                res.sendStatus(404);

            }
            res.send(JSON.stringify(result));

        }
    ).catch(err=>{
        res.send(err);

    })
}
function deleteUser(req, res) {

    const id  = req.swagger.params.userId.value;
    const castedId = mongoose.Types.ObjectId(id);

    if(!id){
        res.status(404).send("Wrong id");
    }
    UserModel.findById(castedId).remove().then(
        result=>{
            if(!result){
                res.sendStatus(404);

            }
            res.send(JSON.stringify(result));

        }
    ).catch(err=>{
        res.send(err);

    })
}
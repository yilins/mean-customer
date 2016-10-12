/**
 * Created by Administrator on 2016/5/27.
 */
var role = require("../models/role_model.js");
exports.roleList=function(req, res){
    role.find({}).exec(function (err,list) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0,"data":list});
        }
    });
};
exports.roleDetails=function(req, res){
    role.findOne({_id:req.params.id}).exec(function (err,details) {
        if( err){
            res.json({"code":1})
        }
        else{
            res.json({"code":0,"data":details});
        }
    });
};
exports.roleSave=function(req, res){
    if(req.body.roleName && req.body.role) {
        role.find({"roleName" : req.body.roleName}).exec(function(err,result) {
            if( result.length ) {
                res.json({"code":1,"err":"role name has repeat"});
            }else{
                var newRole =new role({
                    roleName:req.body.roleName,
                    role:req.body.role
                });
                newRole.save(function(err, result) {
                    if(err){
                        res.json({"code":1,"err":err});
                    }else{
                        res.json({"code":0});
                    }
                })
            }
        });
    }
};
exports.roleUpdate=function(req, res){
    role.findOne({_id:req.params.id}).exec(function (err,details) {
        if( err){
            res.json({"code":1})
        }
        else{
            details.update({$set:{roleName:req.body.roleName,role:req.body.role}},function(err){
                if( err){
                    res.json({"code":1})
                }else {
                    res.json({"code":0})
                }
            });
        }
    });
};
exports.roleDelete=function(req, res){
    role.remove({_id: req.params.id}).exec(function (err,doc) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0});
        }
    });
};
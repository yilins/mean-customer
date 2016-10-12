/**
 * Created by Administrator on 2016/5/25.
 */
var user = require("../models/user_model.js");
exports.login=function(req, res){
    user.findOne({username:req.body.username}).exec(function (err,user) {
        if (err){
            res.json({"code":1})
        }else if(user.password===req.body.password){
            // req.session.user=user;
            res.json({"code":0,"data":user});
        }
    });
};

exports.list=function(req, res){
    user.find({}).exec(function (err,list) {
        if (err){
            res.json({"code":1})
        }else{
            // req.session.user=user;
            res.json({"code":0,"data":list});
        }
    });
};
exports.search=function(req, res){
    user.find({role:req.params.role}).exec(function (err,list) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0,"data":list});
        }
    });
};
exports.userDetails=function(req, res){
    user.findOne({_id:req.params.id}).exec(function (err,details) {
        if( err){
            res.json({"code":1})
        }
        else{
            res.json({"code":0,"data":details});
        }
    });
};
exports.userSave=function(req, res){
    if( req.body.username && req.body.password) {
        user.find({"username" : req.body.username}).exec(function(err,result) {
            if( result.length ) {
                res.json({"code":1,"err":"user name has repeat"});
            }else{
                var newUser =new user({
                    username : req.body.username,
                    password : req.body.password,
                    role:req.body.role
                });
                newUser.save(function(err, result) {
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
exports.userUpdate=function(req, res){
    user.findOne({_id:req.params.id}).exec(function (err,details) {
        if( err){
            res.json({"code":1})
        }
        else{
            details.update({$set:{username:req.body.username,password:req.body.password,role:req.body.role}},function(err){
                if( err){
                    res.json({"code":1})
                }else {
                    res.json({"code":0})
                }
            });
        }
    });
};
exports.userDelete=function(req, res){
    user.remove({_id: req.params.id}).exec(function (err,doc) {
        if (err){
            res.json({"code":1})
        }else{
            // req.session.user=user;
            res.json({"code":0});
        }
    });
};
exports.password=function(req, res){
    user.findOne({username:req.params.username}).exec(function (err,details) {
        if(err){
            res.json({"code":1});
        }
        else if(req.body.oldPwd!=details.password){
            res.json({"code":1});
        }else {
            details.update({$set:{password:req.body.newPwd}},function(err){
                if(err){
                    res.json({"code":1})
                }else {
                    res.json({"code":0})
                }
            });
        }
    });
};
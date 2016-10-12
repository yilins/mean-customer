/**
 * Created by Administrator on 2016/6/7.
 */
var operatingRecords= require("../models/operatingRecord_model.js");

exports.operating=function (req,res,next) {
    var user=JSON.parse(req.cookies.user);
    if(user.username) {
        var newOperatingRecords = new operatingRecords({
            username: user.username,
            oprateContent: req.route
        });
        newOperatingRecords.save(function (err, result) {
            if (err) {
               res.json(err);
            } else {
                next();
            }
        })
    }
};

exports.operatingList=function(req, res){
    operatingRecords.find({}).exec(function (err,list) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0,"data":list});
        }
    });
};
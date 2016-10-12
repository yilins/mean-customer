/**
 * Created by Administrator on 2016/5/28.
 */
var expressModel= require("../models/express_model.js");
exports.expressList=function(req, res){
    expressModel.find({}).exec(function (err,list) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0,"data":list});
        }
    });
};
exports.expressSave=function(req, res){
    if(req.body.expressName) {
        expressModel.find({"expressName" : req.body.expressName}).exec(function(err,result) {
            if( result.length ) {
                res.json({"code":1,"err":"express name has repeat"});
            }else{
                var newExpress =new expressModel({
                    expressName:req.body.expressName,
                });
                newExpress.save(function(err, result) {
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
exports.expressDelete=function(req, res){
    expressModel.remove({_id: req.params.id}).exec(function (err,doc) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0});
        }
    });
};
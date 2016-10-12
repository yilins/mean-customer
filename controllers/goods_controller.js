/**
 * Created by Administrator on 2016/5/28.
 */
var goodsModel= require("../models/goods_model.js");
exports.goodsList=function(req, res){
    goodsModel.find({}).exec(function (err,list) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0,"data":list});
        }
    });
};
exports.goodsSave=function(req, res){
    if(req.body.goodsName) {
        goodsModel.find({"goodsName" : req.body.goodsName}).exec(function(err,result) {
            if( result.length ) {
                res.json({"code":1,"err":"goods name has repeat"});
            }else{
                var newGoods =new goodsModel({
                    goodsName:req.body.goodsName
                });
                newGoods.save(function(err, result) {
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
exports.goodsDelete=function(req, res){
    goodsModel.remove({_id: req.params.id}).exec(function (err,doc) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0});
        }
    });
};
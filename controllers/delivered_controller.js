/**
 * Created by Administrator on 2016/5/29.
 */
var delivereds = require("../models/delivered_model.js");
exports.deliveredList=function(req, res){
    delivereds.find({}).exec(function (err,list) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0,"data":list});
        }
    });
};

exports.deliveredSave=function(req, res){
    if(req.body.customerName) {
        delivereds.find({"customerName": req.body.customerName}).exec(function (err, result) {
            if (result.length) {
                res.json({"code": 1, "err": "customer name has repeat"});
            } else {
                var newDelivered = new delivereds({
                    customerName: req.body.customerName,
                    customerType: req.body.customerType,
                    pooxy: req.body.pooxy,
                    goods: req.body.goods,
                    counts:req.body. counts,
                    sendCargoAt: req.body.sendCargoAt,
                    mobile: req.body.mobile,
                    expressage: req.body.expressage,
                    adress: req.body.adress,
                    remark: req.body.remark,
                    deliveryAt:Date.now()
                });
                newDelivered.save(function (err, result) {
                    if (err) {
                        res.json({"code": 1, "err": err});
                    } else {
                        res.json({"code": 0});
                    }

                })
            }
        });
    }
};
exports.deliveredSearch=function (req,res) {
    function Search(){
        this.customerName = req.body.customerName;
        this.customerType =req.body.customerType;
        this.pooxy= req.body.pooxy;
        this.goods = req.body.goods ;
        this.expressage=req.body.expressage;
        this.mobile = req.body.mobile;
        this.sendCargoAt=req.body.sendCargoAt;
        this.deliveryAt=req.body.deliveryAt;
    }
    var aaa=new Search();
    for(var i in aaa){
        if(aaa[i]==""){
            delete aaa[i];
        }
    }
    delivereds.find(aaa,function (err, list) {
        if (err){
            res.json({"code":1})
        }
        else{

            res.json({"code":0,"data":list});
        }
    });
};

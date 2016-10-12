/**
 * Created by Administrator on 2016/5/25.
 */
var customers = require("../models/customer_model.js");
exports.customerList=function(req, res){
    customers.find({}).exec(function (err,list) {
        if (err){
            res.json({"code":1})
        }else{
            res.json({"code":0,"data":list,"route":req.route});
        }
    });
};
exports.customerDetails=function(req, res){
    customers.findOne({_id:req.params.id}).exec(function (err,details) {
        if( err){
            res.json({"code":1})
        }
        else{
            res.json({"code":0,"data":details});
        }
    });
};

exports.customerSave=function(req, res){
    if( req.body.customerName) {
        customers.find({"customerName": req.body.customerName}).exec(function (err, result) {
            if (result.length) {
                res.json({"code": 1, "err": "customer name has repeat"});
            } else {
                var newCustomer = new customers({
                    customerName: req.body.customerName,
                    customerType: req.body.customerType,
                    pooxy: req.body.pooxy,
                    goods: req.body.goods,
                    counts:req.body. counts,
                    sendCargoAt: req.body.sendCargoAt,
                    mobile: req.body.mobile,
                    expressage: req.body.expressage,
                    adress: req.body.adress,
                    remark: req.body.remark
                });
                newCustomer.save(function (err, result) {
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
exports.customerUpdate=function(req, res){
    customers.findOne({_id:req.params.id}).exec(function (err,details) {
        if( err){
            res.json({"code":1})
        }
        else{
            details.update({$set:{
                customerName:req.body.customerName,
                customerType:req.body.customerType,
                pooxy:req.body.pooxy,
                goods:req.body.goods,
                counts:req.body. counts,
                sendCargoAt:req.body.sendCargoAt,
                mobile: req.body.mobile,
                expressage:req.body.expressage,
                adress:req.body.adress,
                remark:req.body.remark}},function(err){
                if( err){
                    res.json({"code":1})
                }else {
                    res.json({"code":0})
                }
            });
        }
    });
};
exports.customerDelete=function(req, res){
    customers.remove({_id: req.params.id}).exec(function (err,doc) {
        if (err){
            res.json({"code":1})
        }else{
            // req.session.user=user;
            res.json({"code":0});
        }
    });
};

exports.customerSearch=function (req,res) {
    function fun(){
        this.customerName = req.body.customerName;
        this.customerType =req.body.customerType;
        this.pooxy= req.body.pooxy;
        this.goods = req.body.goods ;
        this.expressage=req.body.expressage;
        this.mobile = req.body.mobile;
        this.sendCargoAt=req.body.sendCargoAt
    }
    var aaa=new fun();
    for(var i in aaa){
        if(aaa[i]==""){
            delete aaa[i];
        }
    }
        customers.find(aaa,function (err, list) {
            if (err){
                res.json({"code":1})
            }
            else{

                res.json({"code":0,"data":list});
            }
        });
};


/**
 * Created by Administrator on 2016/5/25.
 */
var mongoose = require("mongoose");	//	顶会议用户组件
var Schema = mongoose.Schema;	//	创建模型
var customerSchema = new Schema({
    customerName:String,
    customerType:Number,
    pooxy:String,
    goods:String,
    counts:Number,
    sendCargoAt:Number,
    mobile: Number,
    expressage:String,
    adress:String,
    remark:String,
    createAt : {
            type : Date,
            default : Date.now()
        }
});	//	定义了一个新的模型，但是此模式还未和集合有关联

//每一次保存之前会调用这个方法;
customerSchema.pre("save",function(next) {
    next();
});
module.exports  = mongoose.model('customers', customerSchema); //	与集合关联
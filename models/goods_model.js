/**
 * Created by Administrator on 2016/5/28.
 */
var mongoose = require("mongoose");	//	顶会议用户组件
var Schema = mongoose.Schema;	//	创建模型
var goodsSchema = new Schema({
    goodsName:String
});	//	定义了一个新的模型，但是此模式还未和集合有关联

//每一次保存之前会调用这个方法;
goodsSchema.pre("save",function(next) {
    next();
});
module.exports = mongoose.model('goodsModel', goodsSchema); //	与集合关联
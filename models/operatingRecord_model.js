/**
 * Created by Administrator on 2016/6/7.
 */
var mongoose = require("mongoose");	//	顶会议用户组件
var Schema = mongoose.Schema;	//	创建模型
var operatingRecordSchema = new Schema({
    username: String,
    oprateContent:{},
    createAt : {
        type : Date,
        default : Date.now()
    }
});	//	定义了一个新的模型，但是此模式还未和集合有关联

//每一次保存之前会调用这个方法;
operatingRecordSchema.pre("save",function(next) {
    next();
});
module.exports = mongoose.model('operatingRecords', operatingRecordSchema); //	与集合关联
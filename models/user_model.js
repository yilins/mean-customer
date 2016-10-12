/**
 * Created by Administrator on 2016/5/23.
 */
var mongoose = require("mongoose");	//	顶会议用户组件
var Schema = mongoose.Schema;	//	创建模型
var userSchema = new Schema({
    username: String,
    password: String,
    role : {
        type : Number,
        default : 1
    }
});	//	定义了一个新的模型，但是此模式还未和users集合有关联

//每一次保存之前会调用这个方法;
userSchema.pre("save",function(next) {
    next();
});
module.exports = mongoose.model('users', userSchema); //	与users集合关联
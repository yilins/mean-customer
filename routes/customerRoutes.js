var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/khgl');

var userRouter= require("../controllers/users_controller.js");
var roleRouter=require("../controllers/role_controller.js");
var expressRouter=require("../controllers/express_controller.js");
var goodsRouter=require("../controllers/goods_controller.js");
var customerRouter=require("../controllers/customer_controller.js");
var deliveredRouter=require("../controllers/delivered_controller.js");
var operatingRouter=require("../controllers/operatingRecord_controller.js");
//登录
router.post('/login', userRouter.login);
//账号管理
router.get('/list', userRouter.list);
router.get('/list/:role', userRouter.search);
router.delete('/:id', userRouter.userDelete);
router.post('/', userRouter.userSave);
router.get('/:id',userRouter.userDetails);
router.put('/:id',userRouter.userUpdate);
//角色管理
router.get('/role/list', roleRouter.roleList);
router.delete('/role/:id', roleRouter.roleDelete);
router.post('/role', roleRouter.roleSave);
router.get('/role/:id',roleRouter.roleDetails);
router.put('/role/:id',roleRouter.roleUpdate);
//修改密码
router.put('/password/:username',userRouter.password);
//快递管理
router.get('/express/list', expressRouter.expressList);
router.delete('/express/:id', expressRouter.expressDelete);
router.post('/express', expressRouter.expressSave);
//商品管理
router.get('/goods/list', goodsRouter.goodsList);
router.delete('/goods/:id', goodsRouter.goodsDelete);
router.post('/goods', goodsRouter.goodsSave);
//客户管理
router.get('/customer/list', customerRouter.customerList);
router.get('/customer/:id',customerRouter.customerDetails);
router.post('/customer', operatingRouter.operating,customerRouter.customerSave);
router.put('/customer/:id',operatingRouter.operating,customerRouter.customerUpdate);
router.delete('/customer/:id',operatingRouter.operating, customerRouter.customerDelete);
router.post('/customerSearch',customerRouter.customerSearch);
//发货信息
router.get('/delivered/list', deliveredRouter.deliveredList);
router.post('/delivered',operatingRouter.operating, deliveredRouter.deliveredSave);
router.post('/deliveredSearch',deliveredRouter.deliveredSearch);
//操作记录
router.get('/operating/list',operatingRouter.operatingList);
module.exports = router;

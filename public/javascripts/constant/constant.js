/**
 * Created by ddqre12345 on 2016/4/27.
 */
angular.module('admin')
    //用户类型
    .constant('userType', [
        {type: 1, name: '普通用户'},
        {type: 10, name: '管理员'}
    ])
    //客户类型
    .constant('customerType', [
        {id: 1, name: '个人'},
        {id: 2, name: '企业'},
        {id: 3, name: 'vip'}
    ]);

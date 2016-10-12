/**
 * Created by Administrator on 2016/5/26.
 */
angular.module('admin')
    .filter('userTypeFilter', function() {
        return function(type) {
            if (type == 10) {
                return "管理员";
            } else if (type == 1) {
                return "普通员工";
            }
            return "";
        }
    })
    .filter('operatingRecordFilter', function() {
    return function(routes) {
        if(routes.path.indexOf('customer')!=-1){
            if(routes.stack[0].method=='put'){
                return "修改客户信息";
            }else if(routes.stack[0].method=='post'){
                return "客户信息录入";
            }else {
                return "删除客户信息";
            }
        }else{
            return "确认收货";
        }
    }
    });

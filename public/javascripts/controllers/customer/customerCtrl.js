/**
 * Created by Administrator on 2016/5/21.
 */
angular.module('admin')
    .controller('customerCtrl', ['$rootScope','$scope','$state','$http','customerType', function ($rootScope,$scope,$state,$http,customerType) {
        var vm = $scope.vm={};
        vm.params = $state.params;
        vm.customerType=customerType;
        //用户列表
        vm.getpooxy=function() {
                    $http.get('/u/list').then(function (res) {
                            vm.pooxy= res.data.data;
                    });
            };
        vm.getpooxy();
        //快递列表
        vm.expressList=function() {
                    $http.get('/u/express/list').then(function (res) {
                            vm.expressage = res.data.data;
                    });
            };
        vm.expressList();
        //商品列表
        vm.goodsList=function() {
                    $http.get('/u/goods/list').then(function (res) {
                            vm.goods = res.data.data;
                    });
        };
        vm.goodsList();
        //客户列表
        vm.customerList=function() {
                $http.get("/u/customer/list").then(function (res) {
                        if (res.data.code === 0) {
                                vm.list = res.data.data;
                                console.log(vm.list);
                        } else {
                                $rootScope.alert(res.data.message);
                        }
                });
        };
        vm.customerList();
        //搜索
         vm.search=function (params) {
                 $http.post('/u/customerSearch',params).then(function (res) {
                         vm.list = res.data.data;
                 });
         };
        //清空条件
        vm.clear=function () {
            vm.params.customerName="";
            vm.params.mobile="";
            vm.params.customerType="";
            vm.params.goods="";
            vm.params.expressage="";
            vm.params.pooxy="";
            vm.params.sendCargoAt="";
        };
        //删除客户 
        vm.customerDelete=function (id) {
                $rootScope.confirm("您确定要删除吗？", function() {
                        $http.delete('/u/customer/'+id).then(function (res) {
                                if(res.data.code===0){
                                        $rootScope.alert("删除成功！");
                                        $state.go(".",{}, { reload: true });
                                }
                                else {
                                        $rootScope.alert("删除失败！");
                                }
                        })
                });
        }

}]);
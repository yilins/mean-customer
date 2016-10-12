/**
 * Created by Administrator on 2016/5/21.
 */
angular.module('admin')
    .controller('deliveredCtrl', function($rootScope,$scope,$state,$http,customerType) {
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
        //列表
        vm.deliveredList=function() {
            $http.get("/u/delivered/list").then(function (res) {
                if (res.data.code === 0) {
                    vm.list = res.data.data;
                    console.log(vm.list);
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        };
        vm.deliveredList();
        //搜索
        vm.search=function (params) {
            $http.post('/u/deliveredSearch',params).then(function (res) {
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
            vm.params.deliveryAt="";
        };

    });
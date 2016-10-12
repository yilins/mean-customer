/**
 * Created by Administrator on 2016/5/21.
 */
angular.module('admin')
    .controller('customerInputCtrl', ['$rootScope','$scope','$state','$http','customerType', function ($rootScope,$scope, $state,$http,customerType) {
        var vm = $scope.vm = {};
        vm.id = $state.params.id;

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
                vm.expressage= res.data.data;
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
        //客户详情
        vm.customerDetails=function (){
            if(vm.id!=undefined&&vm.id!=""){
                $http.get("/u/customer/"+vm.id).then(function (res) {
                    if (res.data.code == 0) {
                        vm.params= res.data.data;
                    }
                });
                vm.status = 1;
            }
            else {
                vm.status = 0;
            }
        };
        vm.customerDetails();
        //修改或新增
        vm.update=function () {
            $http.put("/u/customer/"+vm.id,vm.params).then(function (res) {
                if(res.data.code==0){
                    $state.go("main.customInformation");
                }else {
                    $rootScope.alert(res.data.err);
                }
            })
        };
        vm.add = function () {
                $http.post("/u/customer", vm.params).then(function(res) {
                    if(res.data.code==0){
                        $state.go("main.customInformation");
                    }else {
                        $rootScope.alert(res.data.err);
                    }
                });
        };
    }]);
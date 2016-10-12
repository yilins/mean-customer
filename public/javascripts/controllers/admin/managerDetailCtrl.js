/**
 * Created by Administrator on 2016/5/26.
 */
angular.module('admin')
    .controller('managerDetailCtrl', function ($scope,$rootScope,$state,$http,userType) {
        var vm = $scope.vm = {};
        vm.id = $state.params.id;
        vm.roleList=userType;

        vm.userDetails=function (){
            if(vm.id!=undefined&&vm.id!=""){
                $http.get("/u/"+vm.id).then(function (res) {
                    if (res.data.code == 0) {
                        vm.data = res.data.data;
                    }
                });
            }
        };
        vm.userDetails();
        vm.saveOrUpdate = function () {
            var params = {
                username: vm.data.username,
                password: vm.data.password,
                role:vm.data.role
            };
            if(vm.id==undefined||vm.id==""){
                $http.post("/u", params).then(function(res) {
                    if(res.data.code==0){
                        $state.go("main.manager");
                    }else {
                        $rootScope.alert(res.data.err);
                    }
                });
            }
            else {
                $http.put("/u/"+vm.id,params).then(function (res) {
                    if(res.data.code==0){
                        $state.go("main.manager");
                    }else {
                        $rootScope.alert(res.data.err);
                    }
                })
            }
        }




    });
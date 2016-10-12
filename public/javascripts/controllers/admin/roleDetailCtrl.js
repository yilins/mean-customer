/**
 * Created by Administrator on 2016/5/27.
 */
angular.module('admin')
    .controller('roleDetailCtrl', function ($scope,$rootScope,$state,$http) {
        var vm = $scope.vm = {};
        vm.id = $state.params.id;
        vm.roleDetails=function (){
            if(vm.id!=undefined&&vm.id!=""){
                $http.get("/u/role/"+vm.id).then(function (res) {
                    if (res.data.code == 0) {
                        vm.data = res.data.data;
                    }
                });
            }
        };
        vm.roleDetails();
        vm.saveOrUpdate = function () {
            var params = {
                roleName: vm.data.roleName,
                role:vm.data.role
            };
            if(vm.id==undefined||vm.id==""){
                $http.post("/u/role", params).then(function(res) {
                    if(res.data.code==0){
                        $state.go("main.rolesList");
                    }else {
                        $rootScope.alert(res.data.err);
                    }
                });
            }
            else {
                $http.put("/u/role/"+vm.id,params).then(function (res) {
                    if(res.data.code==0){
                        $state.go("main.rolesList");
                    }else {
                        $rootScope.alert(res.data.err);
                    }
                })
            }
        }
    });
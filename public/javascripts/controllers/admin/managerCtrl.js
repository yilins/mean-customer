/**
 * Created by Administrator on 2016/5/22.
 */
angular.module('admin')
    .controller('managerCtrl', function($rootScope,$scope,$state,$http,userType) {
        var vm = $scope.vm= {};
        vm.roleList=userType;
        vm.getManagerList=function() {
            $http.get('/u/list').then(function (res) {
                vm.list = res.data.data;
            });
        };
        
        vm.getManagerList();

        vm.delete = function(id) {
            $rootScope.confirm("您确定要删除吗？", function() {
                $http.delete('/u/'+id).then(function (res) {
                    if(res.data.code===0){
                        $rootScope.alert("删除成功！");
                        $state.go(".",{}, { reload: true });
                    }
                    else {
                        $rootScope.alert("删除失败！");
                    }
                })
            });

        };

        vm.search = function(){

            if(vm.rid>0){
                vm.searchManager(vm.rid);
            }else{
                vm.getManagerList();
            }

        };
        vm.searchManager=function (param) {
            $http.get('/u/list/'+param).then(function (res) {
                vm.list = res.data.data;
            });
        };
      
    });
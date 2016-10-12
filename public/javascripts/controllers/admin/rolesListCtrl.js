/**
 * Created by Administrator on 2016/5/22.
 */
angular.module('admin')
    .controller('rolesListCtrl', function($rootScope,$scope,$state,$http,userType) {
        var vm = $scope.vm= {};
        vm.roleList=function() {
            $http.get('/u/role/list').then(function (res) {
                vm.list = res.data.data;
            });
        };
        vm.roleList();
        vm.roleDelete = function(id) {
            $rootScope.confirm("您确定要删除吗？", function() {
                $http.delete('/u/role/'+id).then(function (res) {
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
    });
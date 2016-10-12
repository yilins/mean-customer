/**
 * Created by Administrator on 2016/5/28.
 */
angular.module('admin')
    .controller('expressCtrl', function($rootScope,$scope,$state,$http) {
        var vm = $scope.vm= {};
        vm.expressList=function() {
            $http.get('/u/express/list').then(function (res) {
                vm.list = res.data.data;
            });
        };
        vm.expressList();
        vm.expressDelete = function(id) {
            $rootScope.confirm("您确定要删除吗？", function() {
                $http.delete('/u/express/'+id).then(function (res) {
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
        vm.add = function () {
            var params = {
                expressName: vm.data.expressName,
            };
            $http.post("/u/express", params).then(function(res) {
                if(res.data.code==0){
                    $state.go(".",{}, { reload: true });
                }else {
                    $rootScope.alert(res.data.err);
                }
            });
        }
    });
/**
 * Created by Administrator on 2016/5/28.
 */
angular.module('admin')
    .controller('goodsCtrl', function($rootScope,$scope,$state,$http) {
        var vm = $scope.vm= {};
        vm.goodsList=function() {
            $http.get('/u/goods/list').then(function (res) {
                vm.list = res.data.data;
            });
        };
        vm.goodsList();
        vm.goodsDelete = function(id) {
            $rootScope.confirm("您确定要删除吗？", function() {
                $http.delete('/u/goods/'+id).then(function (res) {
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
                goodsName: vm.data.goodsName
            };
            $http.post("/u/goods", params).then(function(res) {
                if(res.data.code==0){
                    $state.go(".",{}, { reload: true });
                }else {
                    $rootScope.alert(res.data.err);
                }
            });
        }
    });
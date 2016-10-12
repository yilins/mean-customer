/**
 * Created by Administrator on 2016/5/21.
 */
angular.module('admin')
    .controller('mainCtrl', function($rootScope,$scope,$state,$cookies) {
        var vm=$scope.vm={};
        
        // 是否登录检测，否则跳转到登录页
        if (!$rootScope.isLogin()) {
            $rootScope.alert("您还未登录");
            $state.go("login");
        }

       vm.user=JSON.parse($cookies.user);
        $scope.logout = function() {
            delete $cookies["login"];
            delete $cookies["user"];
            $state.go("login");
        };
    });
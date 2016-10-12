/**
 * Created by Administrator on 2016/5/23.
 */
angular.module("admin").controller('loginCtrl', ['$scope','$state','$timeout','$http','$cookies', loginCtrl]);

function loginCtrl($scope,$state,$timeout,$http,$cookies) {
    var vm = $scope.vm= {};
    
    vm.submit = function() {
        var params = {
            username: vm.name,
            password: vm.pwd
        };
        $http.post('/u/login',params).then(function(res) {
            if (res.data.code == 0) {
                $cookies.login = "true";
                $cookies.user = JSON.stringify(res.data.data);
                console.log(res.data);
                $state.go("main.home");
            } else {
                vm.errorTip = "账号或密码错误";
                $timeout(function() {
                    vm.errorTip = "";
                }, 3000);
            }
        });
    }
}
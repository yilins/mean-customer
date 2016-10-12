/**
 * Created by Administrator on 2016/5/22.
 */
angular.module('admin')
    .controller('changePasswordCtrl', function($rootScope,$scope,$state,$http) {
        var vm = $scope.vm= {};
        vm.username=$state.params.username;
        vm.changePassword = function () {
            var params = {
                oldPwd: vm.data.oldPwd,
                newPwd: vm.data.newPwd
            };
            if(vm.data.newPwd==vm.data.newPwdAgain){
                $http.put("/u/password/"+vm.username,params).then(function (res) {
                    if(res.data.code==0){
                        $rootScope.alert("修改成功", function() {
                            vm.data = {
                                oldPwd: "",
                                newPwd: "",
                                newPwdAgain: ""
                            };
                        });
                    }else {
                        $rootScope.alert(res.data.err);
                    }
                })
            }
            else {

            }
        }

    });
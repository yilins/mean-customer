/**
 * Created by Administrator on 2016/5/22.
 */
angular.module('admin')
    .controller('operatingRecordCtrl', function($scope,$state,$http) {
        var vm = $scope.vm= {};
        vm.operatingRecordList=function() {
            $http.get('/u/operating/list').then(function (res) {
                vm.list = res.data.data;
            });
        };
        vm.operatingRecordList();
        
    });
angular.module('admin', ['oc.lazyLoad', 'ui.router','ngCookies','mgcrea.ngStrap'])
    .config(lazyLoadConfig)
    .config(routeConfig)
    .run(function($rootScope,$modal,$cookies, $state, $location,$timeout) {
    
         $rootScope.isLogin = function() {
             return !!$cookies.login;
         };
        
        //alert confirm notify
        $rootScope.alert = function(content, okFn) {
            var modal = $modal({
                html: true,
                show: false,
                templateUrl: 'html/template/admin-alert.html',
                controller: function($scope) {
                    $scope.keydown = function ($event) {
                        alert($event.keyCode);
                     };
                    $scope.content = content;
                    $scope.ok = function() {
                    typeof okFn == 'function' && okFn();
                    modal.$promise.then(modal.hide);
                    };
                }
            });
             modal.$promise.then(modal.show);
         };



    $rootScope.confirm = function(content, okFn, cancelFn) {
        var modal = $modal({
            html: true,
            show: false,
            templateUrl: 'html/template/admin-confirm.html',
            controller: function($scope) {
                $scope.content = content;
                $timeout(function(){
                    $("#protect").focus();
                },0);
                $rootScope.ok = function() {
                    typeof okFn == 'function' && okFn();
                    modal.$promise.then(modal.hide);
                };
                $scope.cancel = function($scope) {
                    typeof cancelFn == 'function' && cancelFn();
                    modal.$promise.then(modal.hide);
                };
            }
        });
        modal.$promise.then(modal.show);
    };

});
function lazyLoadConfig($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [
            {
                name: 'simulateSelect',
                files: [
                    '/javascripts/directives/simulate-select/directive.css',
                    '/javascripts/directives/simulate-select/directive.js'
                ]
            }, 
            {
                name: 'promiseButton',
                files: [
                    '/javascripts/directives/promise-button/directive.css',
                    '/javascripts/directives/promise-button/directive.js'
                ]
            }
        ]
    });
}
function routeConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    var _lazyLoad = function(loaded) {
        return function($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };

    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });

    $urlRouterProvider.otherwise('/login');



    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'html/login.html',
            controller: 'loginCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/loginCtrl.js')
            }
        })
        .state('main', {
            url: '/main',
            templateUrl: 'html/main.html',
            controller: 'mainCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/mainCtrl.js')
            }
        })
        //欢迎页
        .state('main.home', {
            url: '/home',
            templateUrl: 'html/home.html',
            controller:'homeCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/homeCtrl.js')
            }
        })
        //客户信息
        .state('main.customInformation', {
            url: '/customInformation/:customerName/:mobile/:customerType/:goods/:expressage/:pooxy/:page',
            templateUrl: 'html/customer/customInformation.html',
            controller: 'customerCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/customer/customerCtrl.js')
            }
        })
        //客户录入
        .state('main.customerInput', {
            url: '/customerInput/:id',
            templateUrl: 'html/customer/customerInput.html',
            controller: 'customerInputCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/customer/customerInputCtrl.js')
            }
         })

        //待发货信息
        .state('main.undelivered', {
            url:'/undelivered/:status/:customerName/:mobile/:customerType/:goods/:espress/:pooxy/:sendCargoAt/:page',
            templateUrl: 'html/ship/undelivered.html',
            controller: 'undeliveredCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/ship/undeliveredCtrl.js')
            }
        })
        //已发货信息
        .state('main.delivered', {
            url:'/delivered/:status/:customerName/:mobile/:customerType/:goods/:espress/:pooxy/:sendCargoAt/:deliveryAt/:page',
            templateUrl: 'html/ship/delivered.html',
            controller: 'deliveredCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/ship/deliveredCtrl.js')
            }
        })
        //后台管理
        //账户管理
        .state('main.manager', {
            url: '/manager/:page',
            templateUrl: 'html/admin/manager.html',
            controller:'managerCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/admin/managerCtrl.js')
            }
        })
        .state('main.managerDetail', {
            url: '/managerDetail/:id',
            templateUrl: 'html/admin/managerDetail.html',
            controller:'managerDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/admin/managerDetailCtrl.js')
            }
        })    
        //角色列表
        .state('main.rolesList', {
            url: '/rolesList/:page',
            templateUrl: 'html/admin/rolesList.html',
            controller:'rolesListCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/admin/rolesListCtrl.js')
            }
        })
        .state('main.roleDetail', {
            url: '/roleDetail/:id',
            templateUrl: 'html/admin/roleDetail.html',
            controller:'roleDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/admin/roleDetailCtrl.js')
            }
        })
        //快递列表
        .state('main.expressList', {
            url: '/expressList/:page',
            templateUrl: 'html/admin/expressList.html',
            controller:'expressCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/admin/expressCtrl.js')
            }
        })
        //商品列表
        .state('main.goodsList', {
            url: '/goodsList/:page',
            templateUrl: 'html/admin/goodsList.html',
            controller:'goodsCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/admin/goodsCtrl.js')
            }
        })
        //修改密码
        .state('main.changePassword', {
            url: '/changePassword/:username',
            templateUrl: 'html/admin/changePassword.html',
            controller:'changePasswordCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/admin/changePasswordCtrl.js')
            }
        })
        //操作记录
        .state('main.operatingRecord', {
            url: '/operatingRecord/:page',
            templateUrl: 'html/admin/operatingRecord.html',
            controller:'operatingRecordCtrl',
            resolve: {
                loadMyFile: _lazyLoad('javascripts/controllers/admin/operatingRecordCtrl.js')
            }
        })
    ;
}
app.config(['$stateProvider',function($stateProvider) {
    $stateProvider.state('home', {
            url: '/',
            template: '<ui-view></ui-view>',
            onEnter: ['$state','$timeout','AuthService', function($state, $timeout, AuthService) {
                AuthService.getLoggedInUser().then(function(user) {
                    if (user) {
                        console.log('going dash');
                        $timeout(function() {
                            $state.go('home.dashboard');
                        });
                    } else {
                        $timeout(function() {
                            $state.go('home.landing');
                        });
                    }
                });
            }]
        }).state('home.landing', {
            url: '',
            templateUrl: 'app/home/home.html'
        }).state('home.dashboard', {
            url: '',
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        });
}]);
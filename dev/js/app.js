// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('syhp', ['ionic', 'ngCordova', 'configs', 'services', 'filters', 'directives', 'controllers']);
app.run(["$ionicPlatform", '$icu', '$rootScope', '$ionicHistory', '$timeout', function ($ionicPlatform, $icu, $rootScope, $ionicHistory, $timeout) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    window.alert(1);
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    document.addEventListener("offline", function () {
      $icu.showToast({
        msg: "网络已断开，请检查网络连接"
      });
    }, false);
    document.addEventListener("online", function () {
      $icu.showToast({
        msg: "网络已连接"
      });
    }, false);
  });
  $ionicPlatform.registerBackButtonAction(function (e) {
    if ($icu.getPath() == '/tab/dash') {
      if ($rootScope.backButtonPressedOnceToExit) {
        ionic.Platform.exitApp();
      } else {
        $rootScope.backButtonPressedOnceToExit = true;
        $icu.showToast({
          msg: "再按一次返回键退出应用"
        });
        $timeout(function () {
          $rootScope.backButtonPressedOnceToExit = false;
        }, 2000);
      }
    } else if ($ionicHistory.backView()) {
      $icu.back();
    } else {
      $rootScope.backButtonPressedOnceToExit = true;
      $icu.showToast({
        msg: "再按一次返回键退出应用"
      });
      $timeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);
}]);

app.config(["$stateProvider", "$urlRouterProvider", '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $ionicConfigProvider.tabs.style('standard');
  $ionicConfigProvider.tabs.position('bottom');
  // $ionicConfigProvider.navBar.alignTitle('center');
  // $ionicConfigProvider.views.transition('platform');
  $ionicConfigProvider.templates.maxPrefetch(20);
  $ionicConfigProvider.spinner.icon("ios-small");
  // $ionicConfigProvider.backButton.icon("ion-ios-arrow-left");
  $ionicConfigProvider.backButton.text("");
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.form.toggle("large");
  $ionicConfigProvider.form.checkbox("circle");
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.views.forwardCache(false);
  $ionicConfigProvider.views.maxCache(20);
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

}]);

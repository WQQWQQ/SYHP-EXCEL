angular.module('directives', [])

  .directive('hideTab', ["$icu", function ($icu) {
    return {
      restrict: 'A',
      link: function (scope, ele, attr) {
        scope.$on("$ionicView.beforeEnter", function () {
          $icu.showTab(attr.hideTab == "false");
        });
      }
    };
  }])
  .directive("statusBar", ["$icu", function ($icu) {
    return {
      restrict: "A",
      link: function (scope, ele, attr) {
        scope.$on("$ionicView.beforeEnter", function () {
          $icu.setStatusBarStyle(+attr.statusBar);
        });
      }
    };
  }])
  .directive("carousel", ["$icu", 'localImgUrl', function ($icu, localImgUrl) {
    return {
      restrict: "E",
      replace: true,
      scope: {
        images: "=",
        click: "&"
      },
      template: '<div class="carousel"><ion-slide-box show-pager="true" auto-play="true" does-continue="true" slide-interval="3000">' +
        '<ion-slide ng-repeat="img in images">' +
        '<img ng-click="click()" ng-src="' + localImgUrl + '{{img}}" width="100%"/>' +
        '</ion-slide>' +
        '</ion-slide-box></div>'
    };
  }]);


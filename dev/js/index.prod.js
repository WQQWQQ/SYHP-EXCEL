(function () {
  var URL = {
      js: 'http://192.168.23.3/js/',
      css: 'http://192.168.23.3/css/'
    },
    versions = Math.random();
  require.config({
    paths: {
      jQuery: "../lib/jquery-3.1.1.min",
      ionic: '../lib/ionic/js/ionic.bundle.min',
      ngCordova: '../lib/ng-cordova.min',
      app: URL.js + 'syhp.min.js?' + versions
    },
    map: {
      '*': {
        'css': '../lib/css.min'
      }
    },
    shim: {
      ionic: {
        deps: ['css!' + URL.css + 'syhp.min.css?' + versions, 'jQuery'],
        exports: "ionic"
      },
      ngCordova: {
        deps: ["ionic"],
        exports: "ngCordova"
      },
      app: {
        deps: ["ngCordova"],
        exports: "app"
      }
    }
  });
  require(['app'], function (app) {
    angular.bootstrap(document, ["syhp"]);
  });
}());

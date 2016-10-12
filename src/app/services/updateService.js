(function() {
  app.factory('updateService', ['$rootScope', '$http', '$mdDialog', 'nwService', updateService]);

  function updateService($rootScope, $http, $mdDialog, nwService) {
    var service = {};   
    var GITHUB = 'https://api.github.com/repos/FreaKzero/ssgl-doom-launcher/releases';

    service.genericDialog = function(title, msg) {
      var ad = $mdDialog.alert({
        title: title,
        content: msg,
        ok: 'OK'
      });

      $mdDialog
        .show(ad)
        .finally(function() {
          ad = undefined;
        });        
    };

    service.updateDialog = function(data, showDeny) {
      $mdDialog.show({
        controller: function($scope) {
          data.body = data.body;
          $scope.round = Math.round;
          $scope.data = data;

          $scope.showDeny = showDeny;

          $scope.dontShow = function() {
            $rootScope.config.dontShowUpdate = data.tag_name;
            nwService.writeJSON($rootScope.config, 'config.json', true);
            $mdDialog.cancel();
          };

          $scope.download = function(url) {
            nwService.getShell().openExternal(url);
          };

          $scope.close = function() {
            $mdDialog.cancel();
          };
        },

        templateUrl: 'app/templates/Update.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    };

    service.updateAvailable = function(data) {
      return data.tag_name.substr(1) !== $rootScope.APPVERSION && data.draft === false && $rootScope.APPVERSION !== '0.0.0';
    };

    service.forceUpdate = function() {
      $http.get(GITHUB).then(function(res) {
        if (service.updateAvailable(res.data[0])) {
          service.updateDialog(res.data[0], false);
        } else {
          service.genericDialog(
            'No update available',
            'You are using already the newest Version'
          );
        }
        
      }, function() {
        service.genericDialog(
          'Error',
          'Cant fetch data from GitHub'
        );
      });
    };

    service.autoUpdate = function() {
      $http.get(GITHUB).then(function(res) {
        var data = res.data[0];
        if (service.updateAvailable(data) && $rootScope.config.dontShowUpdate !== data.tag_name) {
          service.updateDialog(data, true);
        }
      });
    };

    return service;
  }
})();

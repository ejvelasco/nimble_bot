"use strict";

module.exports = (app, $) => {
	app.controller("NimbleCtrl",["$scope", "$http", "NimbleMethods", ($scope, $http, NimbleMethods) => {
		
		$scope.messages = [];
 		$scope.typing = false;
 		$scope.counter = 0;
 		$scope.webSocket = NimbleMethods.setUpConnection($scope);

		$scope.sendMsg = function($event){
			return NimbleMethods.send($scope, $event);
		}
		 
	}]);
}
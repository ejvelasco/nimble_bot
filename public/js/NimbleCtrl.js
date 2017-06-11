"use strict";

module.exports = (app, $) => {
	app.controller("NimbleCtrl",["$scope", "$http", "NimbleMethods", ($scope, $http, NimbleMethods) => {
		//Set up data
		$scope.messages = [];
 		$scope.typing = false;
 		$scope.counter = 0;
 		$scope.webSocket = NimbleMethods.setUpConnection($scope);
 		//Send function
		$scope.sendMsg = function($event){
			return NimbleMethods.send($scope, $event);
		}
		 
	}]);
}
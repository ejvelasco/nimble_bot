"use strict";

module.exports = (app, $) => {
	app.controller("NimbleCtrl",["$scope", "$http", "NimbleMethods", ($scope, $http, NimbleMethods) => {
		$scope.messages = [];
		const ws = new WebSocket('ws://localhost:1337', 'echo-protocol');
 		$scope.typing = false;
 		let counter = 0;
 		ws.onmessage = function (event) {
 			
 			const $body = $('body');
 			const $container = $("#chat");

 			if (counter === 0) {
 				$scope.$apply(() => {
 					$scope.typing = false;
		 			$scope.messages.push({
		 					subject: "Nimble",
		 					title_class: "message-data",
		 					class: "message you-message",
		 					data: event.data
		 			});
 				});
 				$body.animate({
 					scrollTop: $container.prop('scrollHeight')
 				}, 500);
 			} else{
 				setTimeout(() => {
 				$scope.$apply(() => {
 					$scope.typing = false;
		 			$scope.messages.push({
		 					subject: "Nimble",
		 					title_class: "message-data",
		 					class: "message you-message",
		 					data: event.data
		 			});
 				});
 				$body.animate({
 					scrollTop: $container.prop('scrollHeight')
 				}, 500);
 			}, 3000);
 			}

 			counter++;
 		}
 		ws.onclose = function (event) {
 			console.log('Connection closed.');
 		}
 		ws.onerror = function (event) {
 			console.log('An error occurred. Sorry for that.');
 		}
 		ws.onopen = function(event) {
 			ws.send("test");
 		}
		$scope.sendMsg = function($event){
			return NimbleMethods.send($scope, $event, ws);
		} 
	}]);
}
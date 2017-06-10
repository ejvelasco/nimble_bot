"use strict";

module.exports = (app, $) => {	

	app.factory("NimbleMethods", () => {
		
 		const NimbleMethods = {
			send($scope, $event){
				
				if ($event.keyCode !== 13) {
					return;
				}
				
				const $body = $('body');
				const $message = $("#chatInput");
				const $container = $("#chat");
				const message = $message.val();
				
				$scope.webSocket.send(message);
				setTimeout(() => {
					$scope.$apply(() => {
						$scope.typing = true;	
					});
					setTimeout(() => {
						$body.animate({
							scrollTop: $container.prop('scrollHeight')
						}, 500);
					});
				}, 1000);
				setTimeout(() => {
					$body.animate({
						scrollTop: $container.prop('scrollHeight')
					}, 500);
				});
				$scope.messages.push({
					subject: "Me",
					title_class: "message-data align-right",
					class: "message me-message",
					data: message
				});
				$message.val("");
			},
			setUpConnection($scope){
		 		
		 		const ws = new WebSocket('ws://localhost:1337', 'echo-protocol');
		 		let $body;
		 		let $container;

		 		ws.onmessage = function (event) {
		 			
		 			$body = $('body');
		 			$container = $("#chat");

		 			if ($scope.counter === 0) {
		 				$scope.$apply(() => {
		 					$scope.typing = false;
				 			$scope.messages.push({
				 					subject: "Nimble Bot",
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
					 					subject: "Nimble Bot",
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
		 			$scope.counter++;
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
		 		return ws;
			}
 		}
 		return NimbleMethods;
	});

}
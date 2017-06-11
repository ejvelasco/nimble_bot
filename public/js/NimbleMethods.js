"use strict";

module.exports = (app, $) => {	
	app.factory("NimbleMethods", () => {
		//format date
		function getDate() {
			const currentdate = new Date();
			let mins =  currentdate.getMinutes();
			let hours = currentdate.getHours();
			//checks
			if (hours < 12) {
				if (hours === 0) {
					hours = 12;
				}
				hours = hours; 
				mins = mins + "am";
			} else {
				hours = hours%12;
				mins = mins + "pm";
			}
			if (mins < 10) {
				mins = "0"+mins;
			}
			//finish
			let datetime = currentdate.getDay() + "/"+currentdate.getMonth()
			+ "/" + currentdate.getFullYear() + " at " 
			+ hours + ":" + mins;
			return datetime;
		}

 		const NimbleMethods = {
			send($scope, $event){
				//ensure enter key
				if ($event.keyCode !== 13) {
					return;
				}
				//add message
				const $body = $('body');
				const $message = $("#chatInput");
				const $container = $("#chat");
				const message = $message.val();
				//send message
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
				//slide messages up
				setTimeout(() => {
					$body.animate({
						scrollTop: $container.prop('scrollHeight')
					}, 500);
				});
				//push message
				$scope.messages.push({
					subject: "Me",
					title_class: "message-data align-right",
					class: "message me-message",
					data: message, 
					time: getDate()
				});
				//clear input
				$message.val("");
			},
			setUpConnection($scope){
		 		//configure ws
		 		const ws = new WebSocket('ws://localhost:1337', 'echo-protocol');
		 		let $body;
		 		let $container;
		 		//message event
		 		ws.onmessage = function (event) {
		 			$body = $('body');
		 			$container = $("#chat");
		 			//Response to test message
		 			if ($scope.counter === 0) {
		 				$scope.$apply(() => {
		 					$scope.typing = false;
				 			$scope.messages.push({
				 					subject: "Nimble Bot",
				 					title_class: "message-data",
				 					class: "message you-message",
				 					data: event.data, 
				 					time: getDate()
				 			});
		 				});
		 				$body.animate({
		 					scrollTop: $container.prop('scrollHeight')
		 				}, 500);
		 			} else {
		 				setTimeout(() => {
			 				$scope.$apply(() => {
			 					$scope.typing = false;
					 			$scope.messages.push({
					 					subject: "Nimble Bot",
					 					title_class: "message-data",
					 					class: "message you-message",
					 					data: event.data,
					 					time: getDate()
					 			});
			 				});
			 				$body.animate({
			 					scrollTop: $container.prop('scrollHeight')
			 				}, 500);
		 				}, 3000);
		 			}
		 			$scope.counter++;
		 		}
		 		//close event
		 		ws.onclose = function (event) {
		 			console.log('Connection closed.');
		 		}
		 		//error event
		 		ws.onerror = function (event) {
		 			console.log('An error occurred. Sorry for that.');
		 		}
		 		//open event
		 		ws.onopen = function(event) {
		 			ws.send("Hey!");
		 		}

		 		return ws;
			}
 		}
 		
 		return NimbleMethods;
	});

}
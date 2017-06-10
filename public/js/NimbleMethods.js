"use strict";

module.exports = (app, $) => {	

	app.factory("NimbleMethods", () => {
		
 		const NimbleMethods = {
			send($scope, $event, ws){
				if($event.keyCode === 13){
					const $body = $('body');
					const $message = $("#chatInput");
					const $container = $("#chat");
					const message = $message.val();
					ws.send(message);
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
				}
			}
 		}
 		return NimbleMethods;
	});

}
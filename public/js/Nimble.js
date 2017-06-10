"use strict";

(() => {

	const angular = require("angular");
	const $ = require("jquery");
	//angular
	const NimbleApp = angular.module("NimbleApp", []);
	require("./NimbleMethods")(NimbleApp, $);
	require("./NimbleCtrl")(NimbleApp, $);

})();
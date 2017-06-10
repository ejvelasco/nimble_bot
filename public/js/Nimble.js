"use strict";

(() => {

	
	const angular = require("angular");
	const $ = require("jquery");
	const NimbleApp = angular.module("NimbleApp", []);
	require("./NimbleMethods")(NimbleApp, $);
	require("./NimbleCtrl")(NimbleApp, $);

})();
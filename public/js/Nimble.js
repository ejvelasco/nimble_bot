"use strict";

(() => {
	//libraries
	const angular = require("angular");
	const $ = require("jquery");
	//configure Nible App
	const NimbleApp = angular.module("NimbleApp", []);
	require("./NimbleMethods")(NimbleApp, $);
	require("./NimbleCtrl")(NimbleApp, $);

})();
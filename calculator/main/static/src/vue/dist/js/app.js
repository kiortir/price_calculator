/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/src/vue/dist/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "2637":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_App_vue_vue_type_style_index_0_id_bcc0617e_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6c78");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_App_vue_vue_type_style_index_0_id_bcc0617e_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_App_vue_vue_type_style_index_0_id_bcc0617e_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3bd3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "469e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Result_vue_vue_type_style_index_0_id_4fed2380_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3bd3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Result_vue_vue_type_style_index_0_id_4fed2380_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Result_vue_vue_type_style_index_0_id_4fed2380_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// NAMESPACE OBJECT: ./src/store/formulas.js
var formulas_namespaceObject = {};
__webpack_require__.r(formulas_namespaceObject);
__webpack_require__.d(formulas_namespaceObject, "materialPrice", function() { return formulas_materialPrice; });
__webpack_require__.d(formulas_namespaceObject, "wallpanel_length", function() { return wallpanel_length; });
__webpack_require__.d(formulas_namespaceObject, "ladder", function() { return ladder; });
__webpack_require__.d(formulas_namespaceObject, "border", function() { return border; });
__webpack_require__.d(formulas_namespaceObject, "edge", function() { return edge; });
__webpack_require__.d(formulas_namespaceObject, "sink", function() { return sink; });
__webpack_require__.d(formulas_namespaceObject, "socket", function() { return socket; });
__webpack_require__.d(formulas_namespaceObject, "surface_docking", function() { return surface_docking; });
__webpack_require__.d(formulas_namespaceObject, "cutout", function() { return cutout; });
__webpack_require__.d(formulas_namespaceObject, "cookpanel", function() { return cookpanel; });
__webpack_require__.d(formulas_namespaceObject, "mounting", function() { return mounting; });
__webpack_require__.d(formulas_namespaceObject, "delivery", function() { return formulas_delivery; });
__webpack_require__.d(formulas_namespaceObject, "lifting", function() { return formulas_lifting; });
__webpack_require__.d(formulas_namespaceObject, "measurement", function() { return measurement; });
__webpack_require__.d(formulas_namespaceObject, "addon", function() { return formulas_addon; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm-bundler.js + 5 modules
var vue_esm_bundler = __webpack_require__("f2bf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/App.vue?vue&type=template&id=bcc0617e


var _hoisted_1 = {
  class: "row mx-0"
};
var _hoisted_2 = {
  class: "col-lg-7 gx-2 mb-5"
};
var _hoisted_3 = {
  class: "infocard"
};
var _hoisted_4 = {
  class: "sticky-top mb-4 bg-white border-bottom"
};
var _hoisted_5 = {
  class: "nav nav-pills nav-fill py-3"
};
var _hoisted_6 = ["id", "onClick", "innerHTML"];
var _hoisted_7 = {
  class: "tab-content",
  id: "mainContent"
};
var _hoisted_8 = ["id"];
var _hoisted_9 = {
  class: "offcanvas offcanvas-bottom h-100 border-0",
  tabindex: "-1",
  id: "offcanvas-result"
};

var _hoisted_10 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "offcanvas-header"
}, [/*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("h5", {
  class: "offcanvas-title"
}, "Итог"), /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
  type: "button",
  class: "btn btn-primary"
}, "Создать КП")], -1);

var _hoisted_11 = {
  class: "offcanvas-body container"
};
var _hoisted_12 = {
  class: "infocard"
};

var _hoisted_13 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "position-absolute bottom-0 start-50 translate-middle-x py-3 container bg-white border-top"
}, [/*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
  type: "button",
  class: "btn btn-danger w-100",
  "data-bs-dismiss": "offcanvas",
  "aria-label": "Close"
}, " Закрыть ")], -1);

var _hoisted_14 = {
  class: "col-5 d-none d-lg-block sticky-top"
};
var _hoisted_15 = {
  class: "card mb-2"
};
var _hoisted_16 = {
  class: "card-header bg-card-even row gx-0"
};

var _hoisted_17 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("ul", {
  class: "nav nav-tabs card-header-tabs col"
}, [/*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("li", {
  class: "nav-item"
}, [/*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
  class: "nav-link active",
  id: "home-tab",
  "data-bs-toggle": "tab",
  "data-bs-target": "#home",
  type: "button",
  role: "tab",
  "aria-controls": "home",
  "aria-selected": "true"
}, " Итог ")]), /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("li", {
  class: "nav-item"
}, [/*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
  class: "nav-link",
  id: "salary-tab",
  "data-bs-toggle": "tab",
  "data-bs-target": "#salary",
  type: "button",
  role: "tab",
  "aria-controls": "salary",
  "aria-selected": "false"
}, " Затраты ")])], -1);

var _hoisted_18 = {
  class: "col-3"
};
var _hoisted_19 = {
  class: "card-body px-0"
};
var _hoisted_20 = {
  class: "tab-content pb-4 overflow-auto result-block"
};
var _hoisted_21 = {
  class: "tab-pane fade show active",
  id: "home",
  role: "tabpanel",
  "aria-labelledby": "home-tab"
};
var _hoisted_22 = {
  class: "tab-pane fade",
  id: "salary",
  role: "tabpanel"
};
var _hoisted_23 = {
  class: "fixed-bottom container d-block d-lg-none bg-white border-top pb-2"
};
var _hoisted_24 = {
  class: "row py-3"
};
var _hoisted_25 = {
  class: "col"
};
var _hoisted_26 = {
  key: 0,
  class: "col"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_result = Object(vue_esm_bundler["q" /* resolveComponent */])("result");

  var _component_salary = Object(vue_esm_bundler["q" /* resolveComponent */])("salary");

  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_3, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_4, [Object(vue_esm_bundler["g" /* createElementVNode */])("ul", _hoisted_5, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])($data.tabs, function (tab) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
      class: "nav-item",
      key: tab.component
    }, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
      class: Object(vue_esm_bundler["k" /* normalizeClass */])(["nav-link category-toggle", {
        active: tab.component == $data.chosenTab
      }]),
      type: "button",
      id: "head-".concat(tab.component),
      onClick: function onClick($event) {
        return $options.switchTab(tab.component);
      },
      innerHTML: tab.name
    }, null, 10, _hoisted_6)]);
  }), 128))])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_7, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])($data.tabs, function (tab) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", {
      class: Object(vue_esm_bundler["k" /* normalizeClass */])(["tab-pane fade px-2 p-lg-0", {
        active: tab.component == $data.chosenTab,
        show: tab.component == $data.chosenTab
      }]),
      id: tab.component,
      key: tab.component
    }, [(Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["d" /* createBlock */])(Object(vue_esm_bundler["s" /* resolveDynamicComponent */])(tab.component), {
      key: tab.component,
      onFocusCard: $options.focusCard
    }, null, 8, ["onFocusCard"]))], 10, _hoisted_8);
  }), 128))]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_9, [_hoisted_10, Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_11, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_12, [Object(vue_esm_bundler["i" /* createVNode */])(_component_result, {
    class: "mb-5"
  }), _hoisted_13])])])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_14, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_15, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_16, [_hoisted_17, Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_18, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-primary p-0 w-100",
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.save && _ctx.save.apply(_ctx, arguments);
    })
  }, " Сохранить ")])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_19, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_20, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_21, [Object(vue_esm_bundler["i" /* createVNode */])(_component_result)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_22, [Object(vue_esm_bundler["i" /* createVNode */])(_component_salary)])])])])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_23, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_24, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_25, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-primary w-100",
    type: "button",
    "data-bs-toggle": "offcanvas",
    "data-bs-target": "#offcanvas-result",
    onTouchstartPassive: _cache[1] || (_cache[1] = function () {
      return _ctx.save && _ctx.save.apply(_ctx, arguments);
    })
  }, " Итог ", 32)]), $data.chosenTab != 'logistics' ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", _hoisted_26, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-primary w-100",
    type: "button",
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.addCard && $options.addCard.apply($options, arguments);
    })
  }, " + ")])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)])])], 64);
}
// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=bcc0617e

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js + 1 modules
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm-browser.js
var vuex_esm_browser = __webpack_require__("5502");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Materials.vue?vue&type=template&id=0d046ad5

var Materialsvue_type_template_id_0d046ad5_hoisted_1 = {
  class: "button-row row justify-content-center mt-3 d-none d-lg-block"
};
var Materialsvue_type_template_id_0d046ad5_hoisted_2 = {
  class: "w-50 mx-auto"
};
function Materialsvue_type_template_id_0d046ad5_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_material_card = Object(vue_esm_bundler["q" /* resolveComponent */])("material-card");

  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", null, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])($options.cards, function (card, index) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["d" /* createBlock */])(_component_material_card, {
      class: "material-block",
      card_index: index,
      key: index,
      id: 'material-card-' + index,
      onRemove: function onRemove($event) {
        return _ctx.removeMaterialCard(index);
      }
    }, null, 8, ["card_index", "id", "onRemove"]);
  }), 128)), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Materialsvue_type_template_id_0d046ad5_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Materialsvue_type_template_id_0d046ad5_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    type: "button",
    class: "btn btn-primary w-100",
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.addMaterialCard && _ctx.addMaterialCard.apply(_ctx, arguments);
    })
  }, " + ")])])]);
}
// CONCATENATED MODULE: ./src/components/Materials.vue?vue&type=template&id=0d046ad5

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/MaterialCard.vue?vue&type=template&id=921a8456&scoped=true


var MaterialCardvue_type_template_id_921a8456_scoped_true_withScopeId = function _withScopeId(n) {
  return Object(vue_esm_bundler["n" /* pushScopeId */])("data-v-921a8456"), n = n(), Object(vue_esm_bundler["m" /* popScopeId */])(), n;
};

var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_1 = {
  class: "card-wrapper"
};
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_2 = {
  class: "material card-body row g-3"
};
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_3 = {
  class: "col-12 col-sm-11 container"
};
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_4 = {
  class: "row row-cols-2 g-2"
};
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_5 = {
  class: "col-12 form-floating"
};
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_6 = ["id", "value"];
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_7 = ["for"];
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_8 = {
  class: "col-12 col-sm-8 form-floating"
};
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_9 = ["id", "value"];
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_10 = ["for"];
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_11 = {
  class: "col-12 col-sm-4 form-floating"
};
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_12 = ["id", "value"];
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_13 = ["for"];
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_14 = {
  class: "col-12 col-sm-1 d-none d-lg-block"
};
var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_15 = {
  class: "hidden-delete m-0"
};

var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_16 = /*#__PURE__*/MaterialCardvue_type_template_id_921a8456_scoped_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
    class: "vericaltext mx-auto"
  }, " У д а л и т ь", -1);
});

var MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_17 = [MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_16];
function MaterialCardvue_type_template_id_921a8456_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_touch = Object(vue_esm_bundler["r" /* resolveDirective */])("touch");

  return Object(vue_esm_bundler["z" /* withDirectives */])((Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
    class: Object(vue_esm_bundler["k" /* normalizeClass */])(["material-card card mt-5 mt-md-3", $options.group]),
    ref: 'mcard' + $props.card_index
  }, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_3, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_4, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    id: 'materialname-' + $props.card_index,
    value: $options.data.materialName,
    onInput: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.updateMaterialName({
        index: $props.card_index,
        value: $event.target.value
      });
    }),
    type: "text",
    class: "form-control border-info",
    placeholder: "название материала"
  }, null, 40, MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_6), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    for: 'materialname-' + $props.card_index
  }, "название материала", 8, MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_7)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_8, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    id: 'materialprice-' + $props.card_index,
    value: $options.data.materialPrice,
    onInput: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.updateMaterialField({
        index: $props.card_index,
        value: $event.target.value,
        field: 'materialPrice'
      });
    }),
    type: "number",
    class: "form-control",
    placeholder: "цена слэба"
  }, null, 40, MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_9), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    for: 'materialprice-' + $props.card_index
  }, "цена слэба", 8, MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_10)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_11, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    id: 'material-count-' + $props.card_index,
    value: $options.data.materialCount,
    onInput: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.updateMaterialField({
        index: $props.card_index,
        value: $event.target.value,
        field: 'materialCount'
      });
    }),
    type: "number",
    class: "form-control",
    placeholder: "число слэбов"
  }, null, 40, MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_12), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    for: 'material-count-' + $props.card_index
  }, "число слэбов", 8, MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_13)])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_14, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    type: "button",
    class: "btn btn-danger h-100 w-100 py-0 px-md-0",
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return _ctx.$emit('remove');
    })
  }, " - ")])])], 2), Object(vue_esm_bundler["g" /* createElementVNode */])("div", MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_15, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    type: "button",
    class: "btn btn-danger hidden-delete-button w-100 h-100 p-0 my-auto",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return _ctx.$emit('remove');
    })
  }, MaterialCardvue_type_template_id_921a8456_scoped_true_hoisted_17)])], 512)), [[_directive_touch, $options.showDel, "swipe", {
    right: true
  }], [_directive_touch, $options.showDel, "swipe", {
    left: true
  }]]);
}
// CONCATENATED MODULE: ./src/components/MaterialCard.vue?vue&type=template&id=921a8456&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/MaterialCard.vue?vue&type=script&lang=js






/* harmony default export */ var MaterialCardvue_type_script_lang_js = ({
  name: "MaterialCard",
  props: {
    card_index: Number
  },
  emits: ["remove"],
  data: function data() {
    return {
      pulled: null
    };
  },
  computed: {
    data: function data() {
      return this.$store.state.values.material_cards[this.card_index];
    },
    group: function group() {
      var code = this.data.materialName != null && this.data.materialName != "" ? this.data.materialName.slice(0, 1).charCodeAt(0) : 0;

      if (code > 1000) {
        code = code - 985;
      }

      code = code - 65;
      var c_group;

      if (code == -65) {
        c_group = 0;
      } else if (code < 10) {
        c_group = 1;
      } else if (code < 20) {
        c_group = 2;
      } else if (code < 32) {
        c_group = 3;
      }

      return "group-".concat(c_group);
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm_browser["d" /* mapMutations */])(["updateMaterialName", "updateMaterialField"])), {}, {
    showDel: function showDel(direction) {
      if (this.pulled == null && direction != "right") {
        this.pulled = true;
        this.$refs["mcard" + this.card_index].classList.toggle("pulled");
      } else if (!this.pulled && direction != "right") {
        this.pulled = true;
        this.$refs["mcard" + this.card_index].classList.toggle("pulled");
        this.$refs["mcard" + this.card_index].classList.toggle("slideback");
      } else if (this.pulled && direction == "right") {
        this.pulled = false;
        this.$refs["mcard" + this.card_index].classList.toggle("pulled");
        this.$refs["mcard" + this.card_index].classList.toggle("slideback");
      }

      console.log(this.pulled);
    }
  })
});
// CONCATENATED MODULE: ./src/components/MaterialCard.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/MaterialCard.vue?vue&type=style&index=0&id=921a8456&scoped=true&lang=scss
var MaterialCardvue_type_style_index_0_id_921a8456_scoped_true_lang_scss = __webpack_require__("8843");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/MaterialCard.vue







const __exports__ = /*#__PURE__*/exportHelper_default()(MaterialCardvue_type_script_lang_js, [['render',MaterialCardvue_type_template_id_921a8456_scoped_true_render],['__scopeId',"data-v-921a8456"]])

/* harmony default export */ var MaterialCard = (__exports__);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Materials.vue?vue&type=script&lang=js





/* harmony default export */ var Materialsvue_type_script_lang_js = ({
  name: "Material",
  computed: {
    cards: function cards() {
      return this.$store.state.values.material_cards;
    }
  },
  methods: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm_browser["d" /* mapMutations */])(["addMaterialCard", "removeMaterialCard"])),
  components: {
    MaterialCard: MaterialCard
  }
});
// CONCATENATED MODULE: ./src/components/Materials.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/Materials.vue





const Materials_exports_ = /*#__PURE__*/exportHelper_default()(Materialsvue_type_script_lang_js, [['render',Materialsvue_type_template_id_0d046ad5_render]])

/* harmony default export */ var Materials = (Materials_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Products.vue?vue&type=template&id=b53e8634

var Productsvue_type_template_id_b53e8634_hoisted_1 = {
  class: "button-row row justify-content-center mt-3 d-none d-lg-block"
};
var Productsvue_type_template_id_b53e8634_hoisted_2 = {
  class: "w-50 mx-auto"
};
function Productsvue_type_template_id_b53e8634_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_product_card = Object(vue_esm_bundler["q" /* resolveComponent */])("product-card");

  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])($options.cards, function (productCard, cardIndex) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["d" /* createBlock */])(_component_product_card, {
      class: "product-card",
      key: cardIndex,
      cardIndex: cardIndex,
      id: 'product-card-' + cardIndex,
      onRemove: function onRemove($event) {
        return _ctx.removeProductCard(cardIndex);
      }
    }, null, 8, ["cardIndex", "id", "onRemove"]);
  }), 128)), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Productsvue_type_template_id_b53e8634_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Productsvue_type_template_id_b53e8634_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    type: "button",
    class: "btn btn-primary w-100",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.newCard && $options.newCard.apply($options, arguments);
    })
  }, " + ")])])], 64);
}
// CONCATENATED MODULE: ./src/components/Products.vue?vue&type=template&id=b53e8634

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/ProductCard.vue?vue&type=template&id=96bacd72&scoped=true





var ProductCardvue_type_template_id_96bacd72_scoped_true_withScopeId = function _withScopeId(n) {
  return Object(vue_esm_bundler["n" /* pushScopeId */])("data-v-96bacd72"), n = n(), Object(vue_esm_bundler["m" /* popScopeId */])(), n;
};

var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_1 = {
  class: "card-wrapper"
};
var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_2 = {
  class: "option-head row g-1"
};

var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_3 = /*#__PURE__*/ProductCardvue_type_template_id_96bacd72_scoped_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    class: "bi bi-arrow-repeat",
    viewBox: "0 0 16 16"
  }, [/*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("path", {
    d: "M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
  }), /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("path", {
    "fill-rule": "evenodd",
    d: "M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
  })], -1);
});

var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_4 = [ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_3];
var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_5 = {
  class: "productCard col"
};
var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_6 = ["value"];

var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_7 = /*#__PURE__*/ProductCardvue_type_template_id_96bacd72_scoped_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
    disabled: "",
    value: ""
  }, "Тип изделия", -1);
});

var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_8 = {
  class: "col-2 align-self-end h-100 d-none d-md-block"
};
var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_9 = {
  class: "option-container row-cols-1 row gx-3 gy-2"
};
var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_10 = {
  class: "row mt-4 g-1 col-12"
};
var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_11 = {
  class: "col-10"
};

var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_12 = /*#__PURE__*/ProductCardvue_type_template_id_96bacd72_scoped_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
    value: "null",
    disabled: ""
  }, "Выберите опцию", -1);
});

var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_13 = {
  class: "col-2"
};
var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_14 = {
  key: 1,
  class: "back card-body"
};
var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_15 = {
  class: "hidden-delete m-0"
};

var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_16 = /*#__PURE__*/ProductCardvue_type_template_id_96bacd72_scoped_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
    class: "vericaltext mx-auto"
  }, " У д а л и т ь", -1);
});

var ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_17 = [ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_16];
function ProductCardvue_type_template_id_96bacd72_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_installation = Object(vue_esm_bundler["q" /* resolveComponent */])("installation");

  var _component_low_priority = Object(vue_esm_bundler["q" /* resolveComponent */])("low-priority");

  var _directive_touch = Object(vue_esm_bundler["r" /* resolveDirective */])("touch");

  return Object(vue_esm_bundler["z" /* withDirectives */])((Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
    class: Object(vue_esm_bundler["k" /* normalizeClass */])(["card mt-md-3 mt-5", $options.type]),
    ref: 'card' + $props.cardIndex
  }, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
    class: Object(vue_esm_bundler["k" /* normalizeClass */])(["card-header", {
      'border-bottom-0': $options.productCard.chosenType == ''
    }])
  }, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-lg col-2 col-lg-1 p-0 d-none d-md-block",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.flip && $options.flip.apply($options, arguments);
    })
  }, ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_4), Object(vue_esm_bundler["g" /* createElementVNode */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
    class: "form-select form-select-lg",
    value: $options.productCard.chosenType,
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.updateCardOptions({
        cardIndex: $props.cardIndex,
        choice: $event.target.value
      });
    })
  }, [ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_7, (Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(Object.keys($data.PRODUCTS), function (product) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("option", {
      key: product
    }, Object(vue_esm_bundler["t" /* toDisplayString */])(product), 1);
  }), 128))], 40, ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_6)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_8, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    type: "button",
    class: "btn btn-danger w-100 btn-lg px-0",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.$emit('remove');
    })
  }, " - ")])])], 2), Object(vue_esm_bundler["i" /* createVNode */])(vue_esm_bundler["b" /* Transition */], {
    name: "fade",
    mode: "out-in"
  }, {
    default: Object(vue_esm_bundler["y" /* withCtx */])(function () {
      return [!$data.flipped ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", {
        key: 0,
        class: Object(vue_esm_bundler["k" /* normalizeClass */])(["product card-body front", {
          'd-none': $options.productCard.chosenType == ''
        }])
      }, [Object(vue_esm_bundler["i" /* createVNode */])(_component_installation, {
        cardIndex: $props.cardIndex
      }, null, 8, ["cardIndex"]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_9, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])($options.productCard.option_card, function (option, optionIndex) {
        return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", {
          class: "col col-card",
          key: optionIndex + $props.cardIndex
        }, [(Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["d" /* createBlock */])(Object(vue_esm_bundler["s" /* resolveDynamicComponent */])(option.component_type), {
          class: "h-100 o-card",
          key: optionIndex + $props.cardIndex.toString(),
          cardIndex: $props.cardIndex,
          optionIndex: optionIndex,
          onRefresh: $options.updateOption,
          onRemoveoption: function onRemoveoption($event) {
            return _ctx.removeCardOption({
              optionIndex: optionIndex,
              cardIndex: $props.cardIndex
            });
          }
        }, null, 8, ["cardIndex", "optionIndex", "onRefresh", "onRemoveoption"]))]);
      }), 128))]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_10, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_11, [Object(vue_esm_bundler["z" /* withDirectives */])(Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
        class: "form-select",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          return $data.selectedAddOn = $event;
        })
      }, [ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_12, (Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])($data.options, function (option) {
        return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("option", {
          key: option
        }, Object(vue_esm_bundler["t" /* toDisplayString */])(option), 1);
      }), 128))], 512), [[vue_esm_bundler["w" /* vModelSelect */], $data.selectedAddOn]])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_13, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
        onClick: _cache[4] || (_cache[4] = function ($event) {
          return _ctx.addCardOption({
            choice: $data.selectedAddOn,
            cardIndex: $props.cardIndex
          });
        }),
        class: "btn btn-primary w-100 h-100 p-0"
      }, " + ")])])], 2)) : (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_14, [Object(vue_esm_bundler["i" /* createVNode */])(_component_low_priority, {
        cardIndex: $props.cardIndex
      }, null, 8, ["cardIndex"])]))];
    }),
    _: 1
  })], 2), Object(vue_esm_bundler["g" /* createElementVNode */])("div", ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_15, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    type: "button",
    class: "btn btn-danger hidden-delete-button w-100 h-100 p-0 my-auto",
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return _ctx.$emit('remove');
    })
  }, ProductCardvue_type_template_id_96bacd72_scoped_true_hoisted_17)])], 512)), [[_directive_touch, $options.flip, "swipe", {
    right: true
  }], [_directive_touch, $options.showDel, "swipe", {
    left: true
  }]]);
}
// CONCATENATED MODULE: ./src/components/ProductCard.vue?vue&type=template&id=96bacd72&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// CONCATENATED MODULE: ./src/store/product_refs.js
var options = {
  Кромка: {
    component: 'edge',
    type: 'primary',
    data: {
      width: '',
      length: null,
      type: '',
      angle: ''
    }
  },
  Мойка: {
    component: 'sink',
    type: 'primary',
    data: {
      quantity: null,
      type: ''
    }
  },
  Бортик: {
    component: 'border',
    type: 'primary',
    data: {
      type: 'Простой',
      length: null
    }
  },
  'Вырез под розетку': {
    component: 'socket',
    type: 'primary',
    data: {
      quantity: null
    }
  },
  'Варочная панель': {
    component: 'cookpanel',
    type: 'primary',
    data: {
      quantity: null,
      type: ''
    }
  },
  'Данные ступеней': {
    component: 'ladder',
    type: 'secondary',
    data: {
      edgeType: '',
      stepLength: null,
      underStepLength: null
    }
  },
  'Длина стеновой панели': {
    component: 'wallpanel-length',
    type: 'secondary',
    data: {
      length: null
    }
  },
  'Стыковка плоскости': {
    component: 'surface-docking',
    type: 'primary',
    data: {
      type: '',
      quantity: null
    }
  },
  'Отверстия D⌀ <= 35мм': {
    component: 'cutout',
    type: 'primary',
    data: {
      quantity: null
    }
  }
};
var products = {
  Столешница: {
    defaultOptions: [options.Кромка, options.Бортик, options['Вырез под розетку']]
  },
  'Барная стойка': {
    defaultOptions: [options.Кромка, options.Бортик, options['Варочная панель']]
  },
  Подоконник: {
    defaultOptions: [options.Кромка]
  },
  'Стеновая панель': {
    defaultOptions: [options['Длина стеновой панели']]
  },
  Ступени: {
    defaultOptions: [options['Данные ступеней']]
  }
};
var defaultAddons = [{
  name: 'Радиусный угол > 12',
  count: null,
  measurement: 'шт.'
}, {
  name: 'Другие отверстия',
  count: null,
  measurement: 'шт.'
}, {
  name: 'Обход пиластры',
  count: null,
  measurement: 'шт.'
}, {
  name: 'Конвекция',
  type: {
    selectors: ['вровень', 'фрезеровка'],
    selected: ''
  },
  count: null,
  measurement: 'шт.'
}, {
  name: 'Лучи под сток воды',
  count: null,
  measurement: 'шт.'
}, {
  name: 'Капельник',
  count: null,
  measurement: 'шт.'
}, {
  name: 'Монтаж хром опоры заказчика',
  count: null,
  measurement: 'шт.'
}, {
  name: 'Стыковка опорной ноги из камня под 45',
  count: null,
  measurement: 'шт.'
}, {
  name: 'Шлифовка подворота камня',
  type: {
    selectors: ['до 150 мм', 'более 150мм'],
    selected: ''
  },
  count: null,
  measurement: 'шт./м2'
}, {
  name: 'Подворот из камня',
  count: null,
  measurement: 'шт.'
}, {
  name: 'Демонтаж старых изделий (до 6 п.м.)',
  isChecked: false
}];

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Edge.vue?vue&type=template&id=55af5f48

var Edgevue_type_template_id_55af5f48_hoisted_1 = {
  class: "card"
};
var Edgevue_type_template_id_55af5f48_hoisted_2 = {
  class: "card-header container mx-0 bg-transparent"
};
var Edgevue_type_template_id_55af5f48_hoisted_3 = {
  class: "row g-0"
};

var Edgevue_type_template_id_55af5f48_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "col-10 h-100 my-auto"
}, "Кромка", -1);

var Edgevue_type_template_id_55af5f48_hoisted_5 = {
  class: "col-2"
};
var Edgevue_type_template_id_55af5f48_hoisted_6 = {
  class: "card-body"
};
var Edgevue_type_template_id_55af5f48_hoisted_7 = {
  class: "side-info row row-cols-1 row-cols-md-2 g-2"
};
var Edgevue_type_template_id_55af5f48_hoisted_8 = {
  class: "col"
};
var Edgevue_type_template_id_55af5f48_hoisted_9 = ["value"];

var Edgevue_type_template_id_55af5f48_hoisted_10 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  value: "",
  disabled: ""
}, "Тип кромки", -1);

var Edgevue_type_template_id_55af5f48_hoisted_11 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "№1", -1);

var Edgevue_type_template_id_55af5f48_hoisted_12 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "№2", -1);

var Edgevue_type_template_id_55af5f48_hoisted_13 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "№3", -1);

var Edgevue_type_template_id_55af5f48_hoisted_14 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "№4", -1);

var Edgevue_type_template_id_55af5f48_hoisted_15 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "№6", -1);

var Edgevue_type_template_id_55af5f48_hoisted_16 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "№7", -1);

var Edgevue_type_template_id_55af5f48_hoisted_17 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Утиный нос", -1);

var Edgevue_type_template_id_55af5f48_hoisted_18 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Фигурная", -1);

var Edgevue_type_template_id_55af5f48_hoisted_19 = [Edgevue_type_template_id_55af5f48_hoisted_10, Edgevue_type_template_id_55af5f48_hoisted_11, Edgevue_type_template_id_55af5f48_hoisted_12, Edgevue_type_template_id_55af5f48_hoisted_13, Edgevue_type_template_id_55af5f48_hoisted_14, Edgevue_type_template_id_55af5f48_hoisted_15, Edgevue_type_template_id_55af5f48_hoisted_16, Edgevue_type_template_id_55af5f48_hoisted_17, Edgevue_type_template_id_55af5f48_hoisted_18];
var Edgevue_type_template_id_55af5f48_hoisted_20 = {
  class: "col"
};
var Edgevue_type_template_id_55af5f48_hoisted_21 = ["value"];

var Edgevue_type_template_id_55af5f48_hoisted_22 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  value: "",
  disabled: ""
}, "Толщина кромки", -1);

var Edgevue_type_template_id_55af5f48_hoisted_23 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "20 мм", -1);

var Edgevue_type_template_id_55af5f48_hoisted_24 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "30 мм", -1);

var Edgevue_type_template_id_55af5f48_hoisted_25 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "40 мм", -1);

var Edgevue_type_template_id_55af5f48_hoisted_26 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Другая", -1);

var _hoisted_27 = [Edgevue_type_template_id_55af5f48_hoisted_22, Edgevue_type_template_id_55af5f48_hoisted_23, Edgevue_type_template_id_55af5f48_hoisted_24, Edgevue_type_template_id_55af5f48_hoisted_25, Edgevue_type_template_id_55af5f48_hoisted_26];
var _hoisted_28 = {
  class: "col"
};
var _hoisted_29 = ["value"];

var _hoisted_30 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  value: "",
  disabled: ""
}, "Угол склейки", -1);

var _hoisted_31 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  value: "45"
}, "45°", -1);

var _hoisted_32 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  value: "90"
}, "90°", -1);

var _hoisted_33 = [_hoisted_30, _hoisted_31, _hoisted_32];
var _hoisted_34 = {
  class: "col"
};
var _hoisted_35 = ["value"];
function Edgevue_type_template_id_55af5f48_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Edgevue_type_template_id_55af5f48_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Edgevue_type_template_id_55af5f48_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Edgevue_type_template_id_55af5f48_hoisted_3, [Edgevue_type_template_id_55af5f48_hoisted_4, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Edgevue_type_template_id_55af5f48_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-outline-danger w-100 p-0",
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('removeoption');
    })
  }, " - ")])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Edgevue_type_template_id_55af5f48_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Edgevue_type_template_id_55af5f48_hoisted_7, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Edgevue_type_template_id_55af5f48_hoisted_8, [Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
    class: "form-select form-select-sm",
    value: $options.data.type,
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return $options.update('type', $event.target.value);
    })
  }, Edgevue_type_template_id_55af5f48_hoisted_19, 40, Edgevue_type_template_id_55af5f48_hoisted_9)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Edgevue_type_template_id_55af5f48_hoisted_20, [Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
    class: "form-select form-select-sm",
    value: $options.data.width,
    onChange: _cache[2] || (_cache[2] = function ($event) {
      return $options.update('width', $event.target.value);
    })
  }, _hoisted_27, 40, Edgevue_type_template_id_55af5f48_hoisted_21)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_28, [Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
    class: "form-select form-select-sm",
    value: $options.data.angle,
    onChange: _cache[3] || (_cache[3] = function ($event) {
      return $options.update('angle', $event.target.value);
    })
  }, _hoisted_33, 40, _hoisted_29)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_34, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    class: "form-control form-control-sm",
    placeholder: "п.м. кромки",
    type: "number",
    value: $options.data.length,
    onInput: _cache[4] || (_cache[4] = function ($event) {
      return $options.update('length', $event.target.value);
    })
  }, null, 40, _hoisted_35)])])])]);
}
// CONCATENATED MODULE: ./src/components/options/Edge.vue?vue&type=template&id=55af5f48

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Edge.vue?vue&type=script&lang=js



/* harmony default export */ var Edgevue_type_script_lang_js = ({
  emits: ["removeoption", "refresh"],
  name: "edge",
  props: {
    optionIndex: Number,
    cardIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[this.optionIndex].data;
    }
  },
  methods: {
    update: function update(field, value) {
      this.$emit("refresh", this.optionIndex, field, value);
    } // update() {
    //   let data = this.edgeData.data;
    //   let pricing = this.$store.state.currentPriceList.edge;
    //   try {
    //     this.edgeData.result = {
    //       price:
    //         (pricing.type.finalPrice(data.type) +
    //           pricing.angle.finalPrice(data.angle) +
    //           pricing.width.finalPrice(data.width)) *
    //         data.length,
    //     };
    //     this.edgeData.salary = {
    //       price:
    //         (pricing.type[data.type].price +
    //           pricing.angle[data.angle].price +
    //           pricing.width[data.width].price) *
    //         data.length,
    //     };
    //     this.edgeData.consumables =
    //       (pricing.width.consumablePrice(data.width) +
    //         pricing.type.consumablePrice(data.type)) *
    //       data.length;
    //     this.edgeData.consumablesRaw =
    //       (pricing.width.consumableRaw(data.width) +
    //         pricing.type.consumableRaw(data.type)) *
    //       data.length;
    //   } catch (e) {
    //     return 0;
    //   }
    //   this.edgeData.name =
    //     `обработка кромки ${data.type} ${data.width}, склейка ${data.angle}°, ${data.length} п.м`.toLowerCase();
    // },

  }
});
// CONCATENATED MODULE: ./src/components/options/Edge.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/Edge.vue





const Edge_exports_ = /*#__PURE__*/exportHelper_default()(Edgevue_type_script_lang_js, [['render',Edgevue_type_template_id_55af5f48_render]])

/* harmony default export */ var Edge = (Edge_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Sink.vue?vue&type=template&id=7e004720

var Sinkvue_type_template_id_7e004720_hoisted_1 = {
  class: "card"
};
var Sinkvue_type_template_id_7e004720_hoisted_2 = {
  class: "card-header bg-transparent"
};
var Sinkvue_type_template_id_7e004720_hoisted_3 = {
  class: "row g-0"
};

var Sinkvue_type_template_id_7e004720_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "col-10 h-100 my-auto"
}, "Мойка", -1);

var Sinkvue_type_template_id_7e004720_hoisted_5 = {
  class: "col-2"
};
var Sinkvue_type_template_id_7e004720_hoisted_6 = {
  class: "card-body row"
};
var Sinkvue_type_template_id_7e004720_hoisted_7 = {
  class: "col-12 col-xl-8 m-xl-auto mb-1"
};
var Sinkvue_type_template_id_7e004720_hoisted_8 = ["value"];

var Sinkvue_type_template_id_7e004720_hoisted_9 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  disabled: "",
  value: ""
}, "Тип мойки", -1);

var Sinkvue_type_template_id_7e004720_hoisted_10 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Накладная", -1);

var Sinkvue_type_template_id_7e004720_hoisted_11 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Поджимная", -1);

var Sinkvue_type_template_id_7e004720_hoisted_12 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Интегрированная", -1);

var Sinkvue_type_template_id_7e004720_hoisted_13 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Интегрированная 45°", -1);

var Sinkvue_type_template_id_7e004720_hoisted_14 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Вровень", -1);

var Sinkvue_type_template_id_7e004720_hoisted_15 = [Sinkvue_type_template_id_7e004720_hoisted_9, Sinkvue_type_template_id_7e004720_hoisted_10, Sinkvue_type_template_id_7e004720_hoisted_11, Sinkvue_type_template_id_7e004720_hoisted_12, Sinkvue_type_template_id_7e004720_hoisted_13, Sinkvue_type_template_id_7e004720_hoisted_14];
var Sinkvue_type_template_id_7e004720_hoisted_16 = {
  class: "sink-quantity col-12 col-xl-4 m-xl-auto mb-1"
};
var Sinkvue_type_template_id_7e004720_hoisted_17 = ["value"];
function Sinkvue_type_template_id_7e004720_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Sinkvue_type_template_id_7e004720_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Sinkvue_type_template_id_7e004720_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Sinkvue_type_template_id_7e004720_hoisted_3, [Sinkvue_type_template_id_7e004720_hoisted_4, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Sinkvue_type_template_id_7e004720_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-outline-danger w-100 p-0",
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('removeoption');
    })
  }, " - ")])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Sinkvue_type_template_id_7e004720_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Sinkvue_type_template_id_7e004720_hoisted_7, [Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
    class: "form-select",
    value: $options.data.type,
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return $options.update('type', $event.target.value);
    })
  }, Sinkvue_type_template_id_7e004720_hoisted_15, 40, Sinkvue_type_template_id_7e004720_hoisted_8)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Sinkvue_type_template_id_7e004720_hoisted_16, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "шт.",
    value: $options.data.quantity,
    onInput: _cache[2] || (_cache[2] = function ($event) {
      return $options.update('quantity', $event.target.value);
    })
  }, null, 40, Sinkvue_type_template_id_7e004720_hoisted_17)])])]);
}
// CONCATENATED MODULE: ./src/components/options/Sink.vue?vue&type=template&id=7e004720

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Sink.vue?vue&type=script&lang=js



/* harmony default export */ var Sinkvue_type_script_lang_js = ({
  emits: ["removeoption", "refresh"],
  name: "sink",
  props: {
    optionIndex: Number,
    cardIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[this.optionIndex].data;
    }
  },
  methods: {
    update: function update(field, value) {
      this.$emit("refresh", this.optionIndex, field, value);
    }
  }
}); // update() {
//   let data = this.sinkData.data;
//   let pricing = this.$store.state.currentPriceList.sink;
//   try {
//     this.sinkData.result = {
//       price: pricing.type.finalPrice(data.type) * data.quantity,
//     };
//     this.sinkData.salary = {
//       price: pricing.type[data.type].price * data.quantity,
//     };
//     this.sinkData.consumables = 0;
//     this.sinkData.consumablesRaw = 0;
//   } catch (e) {
//     console.log(e);
//   }
//   this.sinkData.name =
//     `Тип мойки: ${data.type}, ${data.quantity} шт.`.toLowerCase();
// CONCATENATED MODULE: ./src/components/options/Sink.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/Sink.vue





const Sink_exports_ = /*#__PURE__*/exportHelper_default()(Sinkvue_type_script_lang_js, [['render',Sinkvue_type_template_id_7e004720_render]])

/* harmony default export */ var Sink = (Sink_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Socket.vue?vue&type=template&id=306b11da

var Socketvue_type_template_id_306b11da_hoisted_1 = {
  class: "card"
};
var Socketvue_type_template_id_306b11da_hoisted_2 = {
  class: "card-header bg-transparent"
};
var Socketvue_type_template_id_306b11da_hoisted_3 = {
  class: "row g-0"
};

var Socketvue_type_template_id_306b11da_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "col-10 h-100 my-auto"
}, "Вырез под розетку", -1);

var Socketvue_type_template_id_306b11da_hoisted_5 = {
  class: "col-2"
};
var Socketvue_type_template_id_306b11da_hoisted_6 = {
  class: "card-body"
};
var Socketvue_type_template_id_306b11da_hoisted_7 = {
  class: "col m-xl-auto my-auto"
};
var Socketvue_type_template_id_306b11da_hoisted_8 = ["value"];
function Socketvue_type_template_id_306b11da_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Socketvue_type_template_id_306b11da_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Socketvue_type_template_id_306b11da_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Socketvue_type_template_id_306b11da_hoisted_3, [Socketvue_type_template_id_306b11da_hoisted_4, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Socketvue_type_template_id_306b11da_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-outline-danger w-100 p-0",
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('removeoption');
    })
  }, " - ")])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Socketvue_type_template_id_306b11da_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Socketvue_type_template_id_306b11da_hoisted_7, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "шт.",
    value: $options.data.quantity,
    onInput: _cache[1] || (_cache[1] = function ($event) {
      return $options.update('quantity', $event.target.value);
    })
  }, null, 40, Socketvue_type_template_id_306b11da_hoisted_8)])])]);
}
// CONCATENATED MODULE: ./src/components/options/Socket.vue?vue&type=template&id=306b11da

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Socket.vue?vue&type=script&lang=js



/* harmony default export */ var Socketvue_type_script_lang_js = ({
  emits: ["removeoption", "refresh"],
  name: "socket",
  props: {
    optionIndex: Number,
    cardIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[this.optionIndex].data;
    }
  },
  methods: {
    update: function update(field, value) {
      this.$emit("refresh", this.optionIndex, field, value);
    } // update() {
    //   let data = this.socketData.data;
    //   let pricing = this.$store.state.currentPriceList.socket;
    //   try {
    //     this.socketData.result = {
    //       price: pricing.finalPrice() * data.quantity,
    //     };
    //     this.socketData.salary = {
    //       price: pricing.price * data.quantity,
    //     };
    //     this.socketData.consumables = 0;
    //     this.socketData.consumablesRaw = 0;
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.socketData.name =
    //     `вырез под розетку: ${data.quantity} шт.`.toLowerCase();
    // },

  }
});
// CONCATENATED MODULE: ./src/components/options/Socket.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/Socket.vue





const Socket_exports_ = /*#__PURE__*/exportHelper_default()(Socketvue_type_script_lang_js, [['render',Socketvue_type_template_id_306b11da_render]])

/* harmony default export */ var Socket = (Socket_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Cookpanel.vue?vue&type=template&id=78889ea8

var Cookpanelvue_type_template_id_78889ea8_hoisted_1 = {
  class: "card"
};
var Cookpanelvue_type_template_id_78889ea8_hoisted_2 = {
  class: "card-header bg-transparent"
};
var Cookpanelvue_type_template_id_78889ea8_hoisted_3 = {
  class: "row g-0"
};

var Cookpanelvue_type_template_id_78889ea8_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "col-10 h-100 my-auto"
}, "Варочная панель", -1);

var Cookpanelvue_type_template_id_78889ea8_hoisted_5 = {
  class: "col-2"
};
var Cookpanelvue_type_template_id_78889ea8_hoisted_6 = {
  class: "card-body row"
};
var Cookpanelvue_type_template_id_78889ea8_hoisted_7 = {
  class: "col-12 col-xl-8 m-xl-auto mb-1"
};
var Cookpanelvue_type_template_id_78889ea8_hoisted_8 = ["value"];

var Cookpanelvue_type_template_id_78889ea8_hoisted_9 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  disabled: "",
  value: ""
}, "Тип варки", -1);

var Cookpanelvue_type_template_id_78889ea8_hoisted_10 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Накладная", -1);

var Cookpanelvue_type_template_id_78889ea8_hoisted_11 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Интегрированная", -1);

var Cookpanelvue_type_template_id_78889ea8_hoisted_12 = [Cookpanelvue_type_template_id_78889ea8_hoisted_9, Cookpanelvue_type_template_id_78889ea8_hoisted_10, Cookpanelvue_type_template_id_78889ea8_hoisted_11];
var Cookpanelvue_type_template_id_78889ea8_hoisted_13 = {
  class: "col-12 col-xl-4 m-xl-auto mb-1"
};
var Cookpanelvue_type_template_id_78889ea8_hoisted_14 = ["value"];
function Cookpanelvue_type_template_id_78889ea8_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Cookpanelvue_type_template_id_78889ea8_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cookpanelvue_type_template_id_78889ea8_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cookpanelvue_type_template_id_78889ea8_hoisted_3, [Cookpanelvue_type_template_id_78889ea8_hoisted_4, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cookpanelvue_type_template_id_78889ea8_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-outline-danger w-100 p-0",
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('removeoption');
    })
  }, " - ")])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cookpanelvue_type_template_id_78889ea8_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cookpanelvue_type_template_id_78889ea8_hoisted_7, [Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
    class: "form-select",
    value: $options.data.type,
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return $options.update('type', $event.target.value);
    })
  }, Cookpanelvue_type_template_id_78889ea8_hoisted_12, 40, Cookpanelvue_type_template_id_78889ea8_hoisted_8)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cookpanelvue_type_template_id_78889ea8_hoisted_13, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "шт.",
    value: $options.data.quantity,
    onInput: _cache[2] || (_cache[2] = function ($event) {
      return $options.update('quantity', $event.target.value);
    })
  }, null, 40, Cookpanelvue_type_template_id_78889ea8_hoisted_14)])])]);
}
// CONCATENATED MODULE: ./src/components/options/Cookpanel.vue?vue&type=template&id=78889ea8

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Cookpanel.vue?vue&type=script&lang=js



/* harmony default export */ var Cookpanelvue_type_script_lang_js = ({
  emits: ["removeoption", "refresh"],
  name: "cook-panel",
  props: {
    optionIndex: Number,
    cardIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[this.optionIndex].data;
    }
  },
  methods: {
    update: function update(field, value) {
      this.$emit('refresh', this.optionIndex, field, value);
    } // update() {
    //   let data = this.cookData.data;
    //   let pricing = this.$store.state.currentPriceList.cookpanel;
    //   try {
    //     this.cookData.result = {
    //       price: pricing.finalPrice(data.type) * data.quantity,
    //     };
    //     this.cookData.salary = {
    //       price: pricing.type[data.type].price * data.quantity,
    //     };
    //     this.cookData.consumables = 0;
    //     this.cookData.consumablesRaw = 0;
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.cookData.name =
    //     `${data.type} варочная панель, ${data.quantity} шт.`.toLowerCase();
    // },

  }
});
// CONCATENATED MODULE: ./src/components/options/Cookpanel.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/Cookpanel.vue





const Cookpanel_exports_ = /*#__PURE__*/exportHelper_default()(Cookpanelvue_type_script_lang_js, [['render',Cookpanelvue_type_template_id_78889ea8_render]])

/* harmony default export */ var Cookpanel = (Cookpanel_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Border.vue?vue&type=template&id=32e8f687

var Bordervue_type_template_id_32e8f687_hoisted_1 = {
  class: "card"
};
var Bordervue_type_template_id_32e8f687_hoisted_2 = {
  class: "card-header bg-transparent"
};
var Bordervue_type_template_id_32e8f687_hoisted_3 = {
  class: "row g-0"
};

var Bordervue_type_template_id_32e8f687_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "col-10 h-100 my-auto"
}, "Бортик", -1);

var Bordervue_type_template_id_32e8f687_hoisted_5 = {
  class: "col-2"
};
var Bordervue_type_template_id_32e8f687_hoisted_6 = {
  class: "card-body row"
};
var Bordervue_type_template_id_32e8f687_hoisted_7 = {
  class: "col m-xl-auto"
};
var Bordervue_type_template_id_32e8f687_hoisted_8 = {
  class: "form-check"
};
var Bordervue_type_template_id_32e8f687_hoisted_9 = ["name", "id"];
var Bordervue_type_template_id_32e8f687_hoisted_10 = ["for"];
var Bordervue_type_template_id_32e8f687_hoisted_11 = {
  class: "form-check"
};
var Bordervue_type_template_id_32e8f687_hoisted_12 = ["name", "id"];
var Bordervue_type_template_id_32e8f687_hoisted_13 = ["for"];
var Bordervue_type_template_id_32e8f687_hoisted_14 = {
  class: "col m-xl-auto my-auto"
};
var Bordervue_type_template_id_32e8f687_hoisted_15 = ["value"];
function Bordervue_type_template_id_32e8f687_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Bordervue_type_template_id_32e8f687_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Bordervue_type_template_id_32e8f687_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Bordervue_type_template_id_32e8f687_hoisted_3, [Bordervue_type_template_id_32e8f687_hoisted_4, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Bordervue_type_template_id_32e8f687_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-outline-danger w-100 p-0",
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('removeoption');
    })
  }, " - ")])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Bordervue_type_template_id_32e8f687_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Bordervue_type_template_id_32e8f687_hoisted_7, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Bordervue_type_template_id_32e8f687_hoisted_8, [Object(vue_esm_bundler["z" /* withDirectives */])(Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    class: "form-check-input",
    type: "radio",
    value: "Простой",
    name: $props.cardIndex + 'borderRadio1' + $props.optionIndex,
    id: $props.cardIndex + 'borderRadio1' + $props.optionIndex,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $options.type = $event;
    })
  }, null, 8, Bordervue_type_template_id_32e8f687_hoisted_9), [[vue_esm_bundler["v" /* vModelRadio */], $options.type]]), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    class: "form-check-label",
    for: $props.cardIndex + 'borderRadio1' + $props.optionIndex
  }, " Простой ", 8, Bordervue_type_template_id_32e8f687_hoisted_10)]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Bordervue_type_template_id_32e8f687_hoisted_11, [Object(vue_esm_bundler["z" /* withDirectives */])(Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    class: "form-check-input",
    type: "radio",
    value: "Калиброванный",
    name: $props.cardIndex + 'borderRadio2' + $props.optionIndex,
    id: $props.cardIndex + 'borderRadio2' + $props.optionIndex,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $options.type = $event;
    })
  }, null, 8, Bordervue_type_template_id_32e8f687_hoisted_12), [[vue_esm_bundler["v" /* vModelRadio */], $options.type]]), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    class: "form-check-label",
    for: $props.cardIndex + 'borderRadio2' + $props.optionIndex
  }, " Калиброванный ", 8, Bordervue_type_template_id_32e8f687_hoisted_13)])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Bordervue_type_template_id_32e8f687_hoisted_14, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "п.м.",
    value: $options.data.length,
    onInput: _cache[3] || (_cache[3] = function ($event) {
      return $options.update('length', $event.target.value);
    })
  }, null, 40, Bordervue_type_template_id_32e8f687_hoisted_15)])])]);
}
// CONCATENATED MODULE: ./src/components/options/Border.vue?vue&type=template&id=32e8f687

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Border.vue?vue&type=script&lang=js



/* harmony default export */ var Bordervue_type_script_lang_js = ({
  emits: ["removeoption", "refresh"],
  name: "border",
  props: {
    cardIndex: Number,
    optionIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[this.optionIndex].data;
    },
    type: {
      get: function get() {
        return this.data.type;
      },
      set: function set(value) {
        this.update('type', value);
      }
    }
  },
  methods: {
    update: function update(field, value) {
      this.$emit('refresh', this.optionIndex, field, value);
    } // update() {
    //   let data = this.borderData.data;
    //   let pricing = this.$store.state.currentPriceList.border;
    //   try {
    //     this.borderData.result = {
    //       price: pricing.type.finalPrice(data.type) * data.length,
    //     };
    //     this.borderData.salary = {
    //       price: pricing.type[data.type].price * data.length,
    //     };
    //     this.borderData.consumables = 0;
    //     this.borderData.consumablesRaw = 0;
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.borderData.name =
    //     `Бортик: ${data.type}, ${data.length} шт.`.toLowerCase();
    // },

  }
});
// CONCATENATED MODULE: ./src/components/options/Border.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/Border.vue





const Border_exports_ = /*#__PURE__*/exportHelper_default()(Bordervue_type_script_lang_js, [['render',Bordervue_type_template_id_32e8f687_render]])

/* harmony default export */ var Border = (Border_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Ladder.vue?vue&type=template&id=64ba5ee6

var Laddervue_type_template_id_64ba5ee6_hoisted_1 = {
  class: "card"
};
var Laddervue_type_template_id_64ba5ee6_hoisted_2 = {
  class: "card-header bg-transparent"
};
var Laddervue_type_template_id_64ba5ee6_hoisted_3 = {
  class: "row g-0"
};

var Laddervue_type_template_id_64ba5ee6_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "col-10 h-100 my-auto"
}, "Данные ступеней", -1);

var Laddervue_type_template_id_64ba5ee6_hoisted_5 = {
  class: "col-2"
};
var Laddervue_type_template_id_64ba5ee6_hoisted_6 = {
  class: "card-body row g-1"
};
var Laddervue_type_template_id_64ba5ee6_hoisted_7 = ["value"];

var Laddervue_type_template_id_64ba5ee6_hoisted_8 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  value: ""
}, "тип фаски", -1);

var Laddervue_type_template_id_64ba5ee6_hoisted_9 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Верх", -1);

var Laddervue_type_template_id_64ba5ee6_hoisted_10 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Верх и низ", -1);

var Laddervue_type_template_id_64ba5ee6_hoisted_11 = [Laddervue_type_template_id_64ba5ee6_hoisted_8, Laddervue_type_template_id_64ba5ee6_hoisted_9, Laddervue_type_template_id_64ba5ee6_hoisted_10];
var Laddervue_type_template_id_64ba5ee6_hoisted_12 = ["value"];
var Laddervue_type_template_id_64ba5ee6_hoisted_13 = ["value"];
function Laddervue_type_template_id_64ba5ee6_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Laddervue_type_template_id_64ba5ee6_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Laddervue_type_template_id_64ba5ee6_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Laddervue_type_template_id_64ba5ee6_hoisted_3, [Laddervue_type_template_id_64ba5ee6_hoisted_4, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Laddervue_type_template_id_64ba5ee6_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-outline-danger w-100 p-0",
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('removeoption');
    })
  }, " - ")])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Laddervue_type_template_id_64ba5ee6_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
    class: "form-select",
    value: $options.data.edgeType,
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return $options.update('edgeType', $event.target.value);
    })
  }, Laddervue_type_template_id_64ba5ee6_hoisted_11, 40, Laddervue_type_template_id_64ba5ee6_hoisted_7), Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "длина ступеней, п.м.",
    value: $options.data.stepLength,
    onInput: _cache[2] || (_cache[2] = function ($event) {
      return $options.update('stepLength', $event.target.value);
    })
  }, null, 40, Laddervue_type_template_id_64ba5ee6_hoisted_12), Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "длина подступков, п.м.",
    value: $options.data.underStepLength,
    onInput: _cache[3] || (_cache[3] = function ($event) {
      return $options.update('underStepLength', $event.target.value);
    })
  }, null, 40, Laddervue_type_template_id_64ba5ee6_hoisted_13)])]);
}
// CONCATENATED MODULE: ./src/components/options/Ladder.vue?vue&type=template&id=64ba5ee6

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Ladder.vue?vue&type=script&lang=js



/* harmony default export */ var Laddervue_type_script_lang_js = ({
  emits: ["removeoption", "refresh"],
  name: "ladder",
  props: {
    optionIndex: Number,
    cardIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[this.optionIndex].data;
    }
  },
  methods: {
    update: function update(field, value) {
      this.$emit("refresh", this.optionIndex, field, value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/options/Ladder.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/Ladder.vue





const Ladder_exports_ = /*#__PURE__*/exportHelper_default()(Laddervue_type_script_lang_js, [['render',Laddervue_type_template_id_64ba5ee6_render]])

/* harmony default export */ var Ladder = (Ladder_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Cutout.vue?vue&type=template&id=86a5b696

var Cutoutvue_type_template_id_86a5b696_hoisted_1 = {
  class: "card"
};
var Cutoutvue_type_template_id_86a5b696_hoisted_2 = {
  class: "card-header bg-transparent"
};
var Cutoutvue_type_template_id_86a5b696_hoisted_3 = {
  class: "row g-0"
};

var Cutoutvue_type_template_id_86a5b696_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "col-10 h-100 my-auto"
}, "Отверстия D⌀ <= 35мм", -1);

var Cutoutvue_type_template_id_86a5b696_hoisted_5 = /*#__PURE__*/Object(vue_esm_bundler["h" /* createTextVNode */])();

var Cutoutvue_type_template_id_86a5b696_hoisted_6 = {
  class: "col-2"
};
var Cutoutvue_type_template_id_86a5b696_hoisted_7 = {
  class: "card-body row"
};
var Cutoutvue_type_template_id_86a5b696_hoisted_8 = {
  class: "col m-xl-auto my-auto"
};
var Cutoutvue_type_template_id_86a5b696_hoisted_9 = ["value"];
function Cutoutvue_type_template_id_86a5b696_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Cutoutvue_type_template_id_86a5b696_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cutoutvue_type_template_id_86a5b696_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cutoutvue_type_template_id_86a5b696_hoisted_3, [Cutoutvue_type_template_id_86a5b696_hoisted_4, Cutoutvue_type_template_id_86a5b696_hoisted_5, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cutoutvue_type_template_id_86a5b696_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-outline-danger w-100 p-0",
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('removeoption');
    })
  }, " - ")])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cutoutvue_type_template_id_86a5b696_hoisted_7, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Cutoutvue_type_template_id_86a5b696_hoisted_8, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "шт.",
    value: $options.data.quantity,
    onInput: _cache[1] || (_cache[1] = function ($event) {
      return $options.update('quantity', $event.target.value);
    })
  }, null, 40, Cutoutvue_type_template_id_86a5b696_hoisted_9)])])]);
}
// CONCATENATED MODULE: ./src/components/options/Cutout.vue?vue&type=template&id=86a5b696

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Cutout.vue?vue&type=script&lang=js



/* harmony default export */ var Cutoutvue_type_script_lang_js = ({
  emits: ["removeoption", "refresh"],
  name: "cutout",
  props: {
    optionIndex: Number,
    cardIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[this.optionIndex].data;
    }
  },
  methods: {
    update: function update(field, value) {
      this.$emit("refresh", this.optionIndex, field, value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/options/Cutout.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/Cutout.vue





const Cutout_exports_ = /*#__PURE__*/exportHelper_default()(Cutoutvue_type_script_lang_js, [['render',Cutoutvue_type_template_id_86a5b696_render]])

/* harmony default export */ var Cutout = (Cutout_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/WallpanelLength.vue?vue&type=template&id=44a7500e

var WallpanelLengthvue_type_template_id_44a7500e_hoisted_1 = {
  class: "card"
};
var WallpanelLengthvue_type_template_id_44a7500e_hoisted_2 = {
  class: "card-header bg-transparent"
};
var WallpanelLengthvue_type_template_id_44a7500e_hoisted_3 = {
  class: "row g-0"
};

var WallpanelLengthvue_type_template_id_44a7500e_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "col-10 h-100 my-auto"
}, "Длина стеновой панели", -1);

var WallpanelLengthvue_type_template_id_44a7500e_hoisted_5 = {
  class: "col-2"
};
var WallpanelLengthvue_type_template_id_44a7500e_hoisted_6 = {
  class: "card-body g-1"
};
var WallpanelLengthvue_type_template_id_44a7500e_hoisted_7 = ["value"];
function WallpanelLengthvue_type_template_id_44a7500e_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", WallpanelLengthvue_type_template_id_44a7500e_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", WallpanelLengthvue_type_template_id_44a7500e_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", WallpanelLengthvue_type_template_id_44a7500e_hoisted_3, [WallpanelLengthvue_type_template_id_44a7500e_hoisted_4, Object(vue_esm_bundler["g" /* createElementVNode */])("div", WallpanelLengthvue_type_template_id_44a7500e_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-outline-danger w-100 p-0",
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('removeoption');
    })
  }, " - ")])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", WallpanelLengthvue_type_template_id_44a7500e_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "длина панели, п.м.",
    value: $options.data.length,
    onInput: _cache[1] || (_cache[1] = function ($event) {
      return $options.update('length', $event.target.value);
    })
  }, null, 40, WallpanelLengthvue_type_template_id_44a7500e_hoisted_7)])]);
}
// CONCATENATED MODULE: ./src/components/options/WallpanelLength.vue?vue&type=template&id=44a7500e

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/WallpanelLength.vue?vue&type=script&lang=js



/* harmony default export */ var WallpanelLengthvue_type_script_lang_js = ({
  emits: ["removeoption", "refresh"],
  name: "wallpanel-length",
  props: {
    optionIndex: Number,
    cardIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[this.optionIndex].data;
    }
  },
  methods: {
    update: function update(field, value) {
      this.$store.commit("updateInstallationLength", {
        cardIndex: this.cardIndex,
        value: value
      });
      this.$emit("refresh", this.optionIndex, field, value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/options/WallpanelLength.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/WallpanelLength.vue





const WallpanelLength_exports_ = /*#__PURE__*/exportHelper_default()(WallpanelLengthvue_type_script_lang_js, [['render',WallpanelLengthvue_type_template_id_44a7500e_render]])

/* harmony default export */ var WallpanelLength = (WallpanelLength_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/SurfaceDocking.vue?vue&type=template&id=722f7ef8

var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_1 = {
  class: "card"
};
var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_2 = {
  class: "card-header bg-transparent"
};
var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_3 = {
  class: "row g-0"
};

var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "col-10 h-100 my-auto"
}, "Стыковка плоскости", -1);

var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_5 = {
  class: "col-2"
};
var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_6 = {
  class: "card-body row g-1"
};
var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_7 = ["value"];

var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_8 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  disabled: "",
  value: ""
}, "Тип стыковки", -1);

var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_9 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Прямая", -1);

var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_10 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", null, "Косая", -1);

var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_11 = [SurfaceDockingvue_type_template_id_722f7ef8_hoisted_8, SurfaceDockingvue_type_template_id_722f7ef8_hoisted_9, SurfaceDockingvue_type_template_id_722f7ef8_hoisted_10];
var SurfaceDockingvue_type_template_id_722f7ef8_hoisted_12 = ["value"];
function SurfaceDockingvue_type_template_id_722f7ef8_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", SurfaceDockingvue_type_template_id_722f7ef8_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", SurfaceDockingvue_type_template_id_722f7ef8_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", SurfaceDockingvue_type_template_id_722f7ef8_hoisted_3, [SurfaceDockingvue_type_template_id_722f7ef8_hoisted_4, Object(vue_esm_bundler["g" /* createElementVNode */])("div", SurfaceDockingvue_type_template_id_722f7ef8_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("button", {
    class: "btn btn-outline-danger w-100 p-0",
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('removeoption');
    })
  }, " - ")])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", SurfaceDockingvue_type_template_id_722f7ef8_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
    class: "form-select",
    value: $options.data.type,
    onChange: _cache[1] || (_cache[1] = function ($event) {
      return $options.update('type', $event.target.value);
    })
  }, SurfaceDockingvue_type_template_id_722f7ef8_hoisted_11, 40, SurfaceDockingvue_type_template_id_722f7ef8_hoisted_7), Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "количество склеек, шт..",
    value: $options.data.quantity,
    onInput: _cache[2] || (_cache[2] = function ($event) {
      return $options.update('quantity', $event.target.value);
    })
  }, null, 40, SurfaceDockingvue_type_template_id_722f7ef8_hoisted_12)])]);
}
// CONCATENATED MODULE: ./src/components/options/SurfaceDocking.vue?vue&type=template&id=722f7ef8

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/SurfaceDocking.vue?vue&type=script&lang=js



/* harmony default export */ var SurfaceDockingvue_type_script_lang_js = ({
  emits: ["removeoption", "refresh"],
  name: "surface-docking",
  props: {
    optionIndex: Number,
    cardIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[this.optionIndex].data;
    }
  },
  methods: {
    update: function update(field, value) {
      this.$emit("refresh", this.optionIndex, field, value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/options/SurfaceDocking.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/SurfaceDocking.vue





const SurfaceDocking_exports_ = /*#__PURE__*/exportHelper_default()(SurfaceDockingvue_type_script_lang_js, [['render',SurfaceDockingvue_type_template_id_722f7ef8_render]])

/* harmony default export */ var SurfaceDocking = (SurfaceDocking_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Installation.vue?vue&type=template&id=2ea7615a

var Installationvue_type_template_id_2ea7615a_hoisted_1 = {
  class: "input-group my-2 col-12"
};
var Installationvue_type_template_id_2ea7615a_hoisted_2 = {
  class: "input-group-text bg-white"
};
var Installationvue_type_template_id_2ea7615a_hoisted_3 = ["id"];
var Installationvue_type_template_id_2ea7615a_hoisted_4 = ["for"];
var Installationvue_type_template_id_2ea7615a_hoisted_5 = ["value"];
function Installationvue_type_template_id_2ea7615a_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Installationvue_type_template_id_2ea7615a_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Installationvue_type_template_id_2ea7615a_hoisted_2, [Object(vue_esm_bundler["z" /* withDirectives */])(Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    class: "form-check-input mt-0",
    type: "checkbox",
    id: 'checkbox_installation' + $props.cardIndex,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $options.checkBox = $event;
    })
  }, null, 8, Installationvue_type_template_id_2ea7615a_hoisted_3), [[vue_esm_bundler["u" /* vModelCheckbox */], $options.checkBox]]), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    class: "form-check-label mx-1 my-auto",
    for: 'checkbox_installation' + $props.cardIndex
  }, " Монтаж изделия, п.м. ", 8, Installationvue_type_template_id_2ea7615a_hoisted_4)]), Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    value: $options.data.length,
    ref: 'installation_field_' + $props.cardIndex,
    onInput: _cache[1] || (_cache[1] = function ($event) {
      return $options.setLength($event.target.value);
    })
  }, null, 40, Installationvue_type_template_id_2ea7615a_hoisted_5)]);
}
// CONCATENATED MODULE: ./src/components/options/Installation.vue?vue&type=template&id=2ea7615a

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/Installation.vue?vue&type=script&lang=js



/* harmony default export */ var Installationvue_type_script_lang_js = ({
  emits: ["refresh"],
  name: "installation",
  props: {
    cardIndex: Number
  },
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].installation;
    },
    checkBox: {
      get: function get() {
        return this.data.status;
      },
      set: function set(value) {
        if (value && !this.data.length) {
          this.$refs["installation_field_" + this.cardIndex].focus();
        }

        this.setCheckbox(value);
      }
    }
  },
  methods: {
    setLength: function setLength(value) {
      if (!this.checkBox) {
        this.setCheckbox(true);
      }

      if (!value) {
        this.setCheckbox(false);
      }

      this.$store.commit("updateInstallationLength", {
        cardIndex: this.cardIndex,
        value: value
      });
    },
    setCheckbox: function setCheckbox(value) {
      this.$store.commit("updateInstallationStatus", {
        cardIndex: this.cardIndex,
        value: value
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/options/Installation.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/Installation.vue





const Installation_exports_ = /*#__PURE__*/exportHelper_default()(Installationvue_type_script_lang_js, [['render',Installationvue_type_template_id_2ea7615a_render]])

/* harmony default export */ var Installation = (Installation_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/LowPriority.vue?vue&type=template&id=2981c311


var LowPriorityvue_type_template_id_2981c311_hoisted_1 = {
  class: "list-group backlist px-0"
};
var LowPriorityvue_type_template_id_2981c311_hoisted_2 = {
  class: "row g-2"
};
var LowPriorityvue_type_template_id_2981c311_hoisted_3 = {
  key: 0,
  class: "col-1 form-check"
};
var LowPriorityvue_type_template_id_2981c311_hoisted_4 = ["value", "id", "onChange"];
var LowPriorityvue_type_template_id_2981c311_hoisted_5 = ["for"];
var LowPriorityvue_type_template_id_2981c311_hoisted_6 = {
  key: 1,
  class: "col"
};
var LowPriorityvue_type_template_id_2981c311_hoisted_7 = ["placeholder", "value", "onInput"];
var LowPriorityvue_type_template_id_2981c311_hoisted_8 = {
  key: 2,
  class: "col-12"
};
var LowPriorityvue_type_template_id_2981c311_hoisted_9 = ["value", "onChange"];

var LowPriorityvue_type_template_id_2981c311_hoisted_10 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("option", {
  value: ""
}, "тип", -1);

function LowPriorityvue_type_template_id_2981c311_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("ul", LowPriorityvue_type_template_id_2981c311_hoisted_1, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])($options.data, function (addon, addonIndex) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
      key: addon.name,
      class: "list-group-item"
    }, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", LowPriorityvue_type_template_id_2981c311_hoisted_2, [typeof addon.isChecked !== 'undefined' ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", LowPriorityvue_type_template_id_2981c311_hoisted_3, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
      class: "form-check-input",
      type: "checkbox",
      value: addon.isChecked,
      id: 'checkbox' + addonIndex,
      onChange: function onChange($event) {
        return _ctx.updateAddonCheckbox({
          cardIndex: $props.cardIndex,
          addonIndex: addonIndex
        });
      }
    }, null, 40, LowPriorityvue_type_template_id_2981c311_hoisted_4)])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
      class: "col h6 form-check-label",
      for: 'checkbox' + addonIndex
    }, Object(vue_esm_bundler["t" /* toDisplayString */])(addon.name), 9, LowPriorityvue_type_template_id_2981c311_hoisted_5), typeof addon.count !== 'undefined' ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", LowPriorityvue_type_template_id_2981c311_hoisted_6, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
      type: "number",
      class: "form-control form-control-sm",
      placeholder: addon.measurement,
      value: addon.count,
      onInput: function onInput($event) {
        return _ctx.updateAddonInput({
          cardIndex: $props.cardIndex,
          addonIndex: addonIndex,
          field: 'count',
          value: $event.target.value
        });
      }
    }, null, 40, LowPriorityvue_type_template_id_2981c311_hoisted_7)])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true), typeof addon.type !== 'undefined' ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", LowPriorityvue_type_template_id_2981c311_hoisted_8, [Object(vue_esm_bundler["g" /* createElementVNode */])("select", {
      class: "form-select form-select-sm",
      value: addon.type.selected,
      onChange: function onChange($event) {
        return _ctx.updateAddonSelector({
          cardIndex: $props.cardIndex,
          addonIndex: addonIndex,
          field: 'type',
          value: $event.target.value
        });
      }
    }, [LowPriorityvue_type_template_id_2981c311_hoisted_10, (Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(addon.type.selectors, function (selector) {
      return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("option", {
        key: selector
      }, Object(vue_esm_bundler["t" /* toDisplayString */])(selector), 1);
    }), 128))], 40, LowPriorityvue_type_template_id_2981c311_hoisted_9)])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)])]);
  }), 128))]);
}
// CONCATENATED MODULE: ./src/components/options/LowPriority.vue?vue&type=template&id=2981c311

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/options/LowPriority.vue?vue&type=script&lang=js





/* harmony default export */ var LowPriorityvue_type_script_lang_js = ({
  name: "lowPriority",
  props: {
    cardIndex: Number
  },
  //  created() {
  //  this.$store.commit("insertAddons", this.cardIndex);
  //},
  computed: {
    data: function data() {
      return this.$store.state.values.product_cards[this.cardIndex].addons;
    }
  },
  methods: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm_browser["d" /* mapMutations */])(["updateAddonInput", "updateAddonSelector", "updateAddonCheckbox"]))
});
// CONCATENATED MODULE: ./src/components/options/LowPriority.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/options/LowPriority.vue





const LowPriority_exports_ = /*#__PURE__*/exportHelper_default()(LowPriorityvue_type_script_lang_js, [['render',LowPriorityvue_type_template_id_2981c311_render]])

/* harmony default export */ var LowPriority = (LowPriority_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/ProductCard.vue?vue&type=script&lang=js



















/* harmony default export */ var ProductCardvue_type_script_lang_js = ({
  name: "productCard",
  props: {
    cardIndex: Number
  },
  emits: ["remove", "next", "prev"],
  data: function data() {
    return {
      PRODUCTS: products,
      options: Object.keys(options).filter(function (option) {
        return options[option].type != "secondary";
      }),
      flipped: false,
      pulled: null,
      selectedAddOn: null
    };
  },
  computed: {
    productCard: function productCard() {
      return this.$store.state.values.product_cards[this.cardIndex];
    },
    type: function type() {
      switch (this.productCard.chosenType) {
        case "Столешница":
          return "countertop";

        case "Барная стойка":
          return "bar";

        case "Подоконник":
          return "sill";

        case "Стеновая панель":
          return "wall";

        default:
          return "none";
      }
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm_browser["d" /* mapMutations */])(["updateCardOptions", "addCardOption", "removeCardOption"])), {}, {
    flip: function flip() {
      if (this.$refs["card" + this.cardIndex].classList.contains("pulled")) {
        console.log(true);
        this.showDel({
          forced: true
        });
      } else {
        if (this.productCard.chosenType != "") {
          this.flipped = !this.flipped;
        }
      }
    },
    showDel: function showDel(_ref) {
      var _ref$forced = _ref.forced,
          forced = _ref$forced === void 0 ? false : _ref$forced;

      if (this.pulled == null) {
        this.pulled = true;
        this.$refs["card" + this.cardIndex].classList.toggle("pulled");
      } else if (!this.pulled || forced) {
        console.log([!this.pulled, forced]);
        this.pulled = !this.pulled;
        this.$refs["card" + this.cardIndex].classList.toggle("pulled");
        this.$refs["card" + this.cardIndex].classList.toggle("slideback");
      }
    },
    updateOption: function updateOption(optionIndex, field, value) {
      this.$store.commit("updateOptionValue", {
        cardIndex: this.cardIndex,
        optionIndex: optionIndex,
        field: field,
        value: value
      });
    }
  }),
  components: {
    Edge: Edge,
    Sink: Sink,
    Socket: Socket,
    Cookpanel: Cookpanel,
    Border: Border,
    Ladder: Ladder,
    Cutout: Cutout,
    WallpanelLength: WallpanelLength,
    SurfaceDocking: SurfaceDocking,
    LowPriority: LowPriority,
    Installation: Installation
  }
});
// CONCATENATED MODULE: ./src/components/ProductCard.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/ProductCard.vue?vue&type=style&index=0&id=96bacd72&lang=scss&scoped=true
var ProductCardvue_type_style_index_0_id_96bacd72_lang_scss_scoped_true = __webpack_require__("d380");

// CONCATENATED MODULE: ./src/components/ProductCard.vue







const ProductCard_exports_ = /*#__PURE__*/exportHelper_default()(ProductCardvue_type_script_lang_js, [['render',ProductCardvue_type_template_id_96bacd72_scoped_true_render],['__scopeId',"data-v-96bacd72"]])

/* harmony default export */ var ProductCard = (ProductCard_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Products.vue?vue&type=script&lang=js





/* harmony default export */ var Productsvue_type_script_lang_js = ({
  name: "productBlock",
  computed: {
    cards: function cards() {
      return this.$store.state.values.product_cards;
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm_browser["d" /* mapMutations */])(["addProductCard", "removeProductCard"])), {}, {
    // focusNew() {
    //   let id = this.cards.length;
    //   setTimeout(function () {
    //     document.getElementById("product-card-el-" + (id - 1)).scrollIntoView({
    //       block: "start",
    //       behavior: "smooth",
    //     });
    //   }, 100);
    // },
    newCard: function newCard() {
      this.addProductCard();
    }
  }),
  components: {
    ProductCard: ProductCard
  }
});
// CONCATENATED MODULE: ./src/components/Products.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/Products.vue





const Products_exports_ = /*#__PURE__*/exportHelper_default()(Productsvue_type_script_lang_js, [['render',Productsvue_type_template_id_b53e8634_render]])

/* harmony default export */ var Products = (Products_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Logistics.vue?vue&type=template&id=455c4d98

var Logisticsvue_type_template_id_455c4d98_hoisted_1 = {
  class: "row g-3 row-cols-1"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_2 = {
  class: "col col-12 col-md-6 h-100"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_3 = {
  class: "card"
};

var Logisticsvue_type_template_id_455c4d98_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "card-header"
}, "Замер", -1);

var Logisticsvue_type_template_id_455c4d98_hoisted_5 = {
  class: "card-body"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_6 = ["value"];
var Logisticsvue_type_template_id_455c4d98_hoisted_7 = ["value"];
var Logisticsvue_type_template_id_455c4d98_hoisted_8 = {
  class: "col col-12 col-md-6 h-100"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_9 = {
  class: "card"
};

var Logisticsvue_type_template_id_455c4d98_hoisted_10 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "card-header"
}, "Доставка", -1);

var Logisticsvue_type_template_id_455c4d98_hoisted_11 = {
  class: "card-body"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_12 = ["value"];
var Logisticsvue_type_template_id_455c4d98_hoisted_13 = {
  class: "col col-12 col-md-6 h-100"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_14 = {
  class: "card"
};

var Logisticsvue_type_template_id_455c4d98_hoisted_15 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "card-header"
}, "Монтаж", -1);

var Logisticsvue_type_template_id_455c4d98_hoisted_16 = {
  class: "card-body"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_17 = ["value"];
var Logisticsvue_type_template_id_455c4d98_hoisted_18 = {
  class: "col col-12 col-md-6 h-100"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_19 = {
  class: "card"
};

var Logisticsvue_type_template_id_455c4d98_hoisted_20 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "card-header"
}, "Расстояние за Мкад", -1);

var Logisticsvue_type_template_id_455c4d98_hoisted_21 = {
  class: "card-body"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_22 = ["value"];
var Logisticsvue_type_template_id_455c4d98_hoisted_23 = {
  class: "col col-12 col-md-6 h-100"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_24 = {
  class: "card"
};

var Logisticsvue_type_template_id_455c4d98_hoisted_25 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "card-header"
}, "Ручной подъем", -1);

var Logisticsvue_type_template_id_455c4d98_hoisted_26 = {
  class: "card-body"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_27 = ["value"];
var Logisticsvue_type_template_id_455c4d98_hoisted_28 = {
  class: "col col-12 col-md-6 h-100"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_29 = {
  class: "card"
};

var Logisticsvue_type_template_id_455c4d98_hoisted_30 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "card-header"
}, "Дополнительные работы", -1);

var Logisticsvue_type_template_id_455c4d98_hoisted_31 = {
  class: "card-body"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_32 = ["value"];
var Logisticsvue_type_template_id_455c4d98_hoisted_33 = {
  class: "col col-12 col-md-6 h-100"
};
var Logisticsvue_type_template_id_455c4d98_hoisted_34 = {
  class: "card"
};

var Logisticsvue_type_template_id_455c4d98_hoisted_35 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("div", {
  class: "card-header"
}, "Накрутка", -1);

var _hoisted_36 = {
  class: "card-body"
};
var _hoisted_37 = ["value"];
function Logisticsvue_type_template_id_455c4d98_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_1, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_3, [Logisticsvue_type_template_id_455c4d98_hoisted_4, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_5, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control mb-2",
    placeholder: "число выездов",
    value: $options.logistics.measurement,
    onInput: _cache[0] || (_cache[0] = function ($event) {
      return $options.update('measurement', $event.target.value);
    })
  }, null, 40, Logisticsvue_type_template_id_455c4d98_hoisted_6), Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "цена за шаблон",
    value: $options.logistics.templatePrice,
    onInput: _cache[1] || (_cache[1] = function ($event) {
      return $options.update('templatePrice', $event.target.value);
    })
  }, null, 40, Logisticsvue_type_template_id_455c4d98_hoisted_7)])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_8, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_9, [Logisticsvue_type_template_id_455c4d98_hoisted_10, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_11, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "число выездов",
    value: $options.logistics.delivery,
    onInput: _cache[2] || (_cache[2] = function ($event) {
      return $options.update('delivery', $event.target.value);
    })
  }, null, 40, Logisticsvue_type_template_id_455c4d98_hoisted_12)])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_13, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_14, [Logisticsvue_type_template_id_455c4d98_hoisted_15, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_16, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "число выездов",
    value: $options.logistics.mounting,
    onInput: _cache[3] || (_cache[3] = function ($event) {
      return $options.update('mounting', $event.target.value);
    })
  }, null, 40, Logisticsvue_type_template_id_455c4d98_hoisted_17)])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_18, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_19, [Logisticsvue_type_template_id_455c4d98_hoisted_20, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_21, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "км",
    value: $options.logistics.distance,
    onInput: _cache[4] || (_cache[4] = function ($event) {
      return $options.update('distance', $event.target.value);
    })
  }, null, 40, Logisticsvue_type_template_id_455c4d98_hoisted_22)])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_23, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_24, [Logisticsvue_type_template_id_455c4d98_hoisted_25, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_26, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "км",
    value: $options.logistics.manualLifting,
    onInput: _cache[5] || (_cache[5] = function ($event) {
      return $options.update('manualLifting', $event.target.value);
    })
  }, null, 40, Logisticsvue_type_template_id_455c4d98_hoisted_27)])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_28, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_29, [Logisticsvue_type_template_id_455c4d98_hoisted_30, Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_31, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "руб.",
    value: $options.logistics.additionalWork,
    onInput: _cache[6] || (_cache[6] = function ($event) {
      return $options.update('additionalWork', $event.target.value);
    })
  }, null, 40, Logisticsvue_type_template_id_455c4d98_hoisted_32)])])]), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_33, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Logisticsvue_type_template_id_455c4d98_hoisted_34, [Logisticsvue_type_template_id_455c4d98_hoisted_35, Object(vue_esm_bundler["g" /* createElementVNode */])("div", _hoisted_36, [Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "number",
    class: "form-control",
    placeholder: "руб.",
    value: $options.logistics.overPrice,
    onInput: _cache[7] || (_cache[7] = function ($event) {
      return $options.update('overPrice', $event.target.value);
    })
  }, null, 40, _hoisted_37)])])])]);
}
// CONCATENATED MODULE: ./src/components/Logistics.vue?vue&type=template&id=455c4d98

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Logistics.vue?vue&type=script&lang=js


/* harmony default export */ var Logisticsvue_type_script_lang_js = ({
  name: "LogisticsBlock",
  computed: {
    logistics: function logistics() {
      return this.$store.state.values.logistics;
    }
  },
  methods: {
    update: function update(field, value) {
      this.$store.commit("updateLogisticsInfo", {
        field: field,
        value: value
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/Logistics.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/Logistics.vue





const Logistics_exports_ = /*#__PURE__*/exportHelper_default()(Logisticsvue_type_script_lang_js, [['render',Logisticsvue_type_template_id_455c4d98_render]])

/* harmony default export */ var Logistics = (Logistics_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Result.vue?vue&type=template&id=4fed2380


var Resultvue_type_template_id_4fed2380_hoisted_1 = {
  class: "list-group list-group-flush"
};
var Resultvue_type_template_id_4fed2380_hoisted_2 = {
  key: 0,
  class: "list-group-item"
};
var Resultvue_type_template_id_4fed2380_hoisted_3 = {
  class: "row justify-content-between g-0 mb-2"
};

var Resultvue_type_template_id_4fed2380_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
  class: "col h4 mb-0 py-auto"
}, "Материал", -1);

var Resultvue_type_template_id_4fed2380_hoisted_5 = {
  key: 0,
  class: "col text-end fw-bold pb-0"
};
var Resultvue_type_template_id_4fed2380_hoisted_6 = {
  class: "res-list"
};
var Resultvue_type_template_id_4fed2380_hoisted_7 = {
  key: 0,
  class: "col h6 my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_8 = {
  key: 1,
  class: "col my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_9 = {
  class: "col text-end my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_10 = {
  key: 0,
  class: "row justify-content-between g-0 mt-2"
};

var Resultvue_type_template_id_4fed2380_hoisted_11 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
  class: "col my-auto"
}, "Материалы / расходники", -1);

var Resultvue_type_template_id_4fed2380_hoisted_12 = {
  class: "col text-end my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_13 = {
  key: 1,
  class: "list-group-item"
};
var Resultvue_type_template_id_4fed2380_hoisted_14 = {
  class: "row justify-content-between g-0 mb-2"
};

var Resultvue_type_template_id_4fed2380_hoisted_15 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
  class: "col h4 mb-0 py-auto"
}, "Изделие", -1);

var Resultvue_type_template_id_4fed2380_hoisted_16 = {
  key: 0,
  class: "col text-end fw-bold pb-0"
};
var Resultvue_type_template_id_4fed2380_hoisted_17 = {
  class: "res-list"
};
var Resultvue_type_template_id_4fed2380_hoisted_18 = {
  class: "col my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_19 = {
  class: "col text-end my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_20 = {
  class: "col-12 res-list"
};
var Resultvue_type_template_id_4fed2380_hoisted_21 = {
  class: "col my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_22 = {
  class: "col text-end my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_23 = {
  class: "col my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_24 = {
  class: "col text-end my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_25 = {
  key: 2,
  class: "list-group-item"
};
var Resultvue_type_template_id_4fed2380_hoisted_26 = {
  class: "row justify-content-between g-0 mb-2"
};

var Resultvue_type_template_id_4fed2380_hoisted_27 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
  class: "col h4 mb-0 py-auto"
}, "Логистика", -1);

var Resultvue_type_template_id_4fed2380_hoisted_28 = {
  key: 0,
  class: "col text-end fw-bold pb-0"
};
var Resultvue_type_template_id_4fed2380_hoisted_29 = {
  class: "res-list"
};
var Resultvue_type_template_id_4fed2380_hoisted_30 = {
  class: "col my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_31 = {
  class: "col text-end my-auto"
};
var Resultvue_type_template_id_4fed2380_hoisted_32 = {
  class: "list-group-item"
};
var Resultvue_type_template_id_4fed2380_hoisted_33 = {
  class: "btn-group w-100",
  role: "group"
};
function Resultvue_type_template_id_4fed2380_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Resultvue_type_template_id_4fed2380_hoisted_1, [$options.materialResult > 0 ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Resultvue_type_template_id_4fed2380_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Resultvue_type_template_id_4fed2380_hoisted_3, [Resultvue_type_template_id_4fed2380_hoisted_4, _ctx.materialSum.result != 0 ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Resultvue_type_template_id_4fed2380_hoisted_5, Object(vue_esm_bundler["t" /* toDisplayString */])($options.materialResult) + " руб.", 1)) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)]), Object(vue_esm_bundler["g" /* createElementVNode */])("ul", Resultvue_type_template_id_4fed2380_hoisted_6, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])($options.c_materials, function (material, index) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
      key: index,
      class: "row justify-content-between g-0 mb-2"
    }, [material.name ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Resultvue_type_template_id_4fed2380_hoisted_7, Object(vue_esm_bundler["t" /* toDisplayString */])(material.name), 1)) : (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Resultvue_type_template_id_4fed2380_hoisted_8, "Кварцевый агломерат")), Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_9, Object(vue_esm_bundler["t" /* toDisplayString */])(material.result + _ctx.overPrice.result / _ctx.materials.length) + " руб.", 1)]);
  }), 128)), $options.false_spendings > 0 ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", Resultvue_type_template_id_4fed2380_hoisted_10, [Resultvue_type_template_id_4fed2380_hoisted_11, Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_12, Object(vue_esm_bundler["t" /* toDisplayString */])($options.false_spendings) + " руб.", 1)])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)])])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true), _ctx.optionSum.length ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Resultvue_type_template_id_4fed2380_hoisted_13, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Resultvue_type_template_id_4fed2380_hoisted_14, [Resultvue_type_template_id_4fed2380_hoisted_15, _ctx.totalProductSum.discount ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Resultvue_type_template_id_4fed2380_hoisted_16, Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.totalProductSum.discount) + " руб.", 1)) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)]), Object(vue_esm_bundler["g" /* createElementVNode */])("ul", Resultvue_type_template_id_4fed2380_hoisted_17, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(_ctx.products, function (product, product_index) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
      key: product_index,
      class: "row justify-content-between g-0 mb-2"
    }, [Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_18, Object(vue_esm_bundler["t" /* toDisplayString */])(product.name), 1), Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_19, Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.optionSum[product_index].discount + _ctx.addonSumList[product_index].discount) + " руб.", 1), Object(vue_esm_bundler["g" /* createElementVNode */])("ul", Resultvue_type_template_id_4fed2380_hoisted_20, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(product.options, function (option, option_index) {
      return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
        class: "small-text row justify-content-between g-0 mb-2",
        key: option_index
      }, [Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_21, Object(vue_esm_bundler["t" /* toDisplayString */])(option.text), 1), Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_22, Object(vue_esm_bundler["t" /* toDisplayString */])(option.discount) + " руб.", 1)]);
    }), 128)), (Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(_ctx.addons[product_index], function (addon, addon_index) {
      return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
        class: "small-text row justify-content-between g-0 mb-2",
        key: addon_index
      }, [Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_23, Object(vue_esm_bundler["t" /* toDisplayString */])(addon.name), 1), Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_24, Object(vue_esm_bundler["t" /* toDisplayString */])(addon.discount) + " руб.", 1)]);
    }), 128))])]);
  }), 128))])])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true), _ctx.logisticsList.length ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Resultvue_type_template_id_4fed2380_hoisted_25, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Resultvue_type_template_id_4fed2380_hoisted_26, [Resultvue_type_template_id_4fed2380_hoisted_27, _ctx.logisticSum.salary ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Resultvue_type_template_id_4fed2380_hoisted_28, Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.logisticSum.result) + " руб.", 1)) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)]), Object(vue_esm_bundler["g" /* createElementVNode */])("ul", Resultvue_type_template_id_4fed2380_hoisted_29, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(_ctx.logisticsList, function (logistic, index) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
      key: index,
      class: "row justify-content-between g-0 mb-2"
    }, [Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_30, Object(vue_esm_bundler["t" /* toDisplayString */])(logistic.text), 1), Object(vue_esm_bundler["g" /* createElementVNode */])("span", Resultvue_type_template_id_4fed2380_hoisted_31, Object(vue_esm_bundler["t" /* toDisplayString */])(logistic.result) + " руб.", 1)]);
  }), 128))])])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Resultvue_type_template_id_4fed2380_hoisted_32, [Object(vue_esm_bundler["g" /* createElementVNode */])("h4", null, "Итог: " + Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.total), 1), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Resultvue_type_template_id_4fed2380_hoisted_33, [Object(vue_esm_bundler["z" /* withDirectives */])(Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "radio",
    class: "btn-check",
    name: "discountRadio",
    id: "discount0",
    value: "0",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $options.discount = $event;
    })
  }, null, 512), [[vue_esm_bundler["v" /* vModelRadio */], $options.discount]]), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    class: Object(vue_esm_bundler["k" /* normalizeClass */])(["btn btn-outline-primary", {
      'recommended-discount': _ctx.recommendedDiscount == 0
    }]),
    for: "discount0"
  }, "Без скидки", 2), Object(vue_esm_bundler["z" /* withDirectives */])(Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "radio",
    class: "btn-check",
    name: "discountRadio",
    id: "discount10",
    value: "10",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $options.discount = $event;
    })
  }, null, 512), [[vue_esm_bundler["v" /* vModelRadio */], $options.discount]]), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    class: Object(vue_esm_bundler["k" /* normalizeClass */])(["btn btn-outline-primary", {
      'recommended-discount': _ctx.recommendedDiscount == 10
    }]),
    for: "discount10"
  }, "Колонка 1", 2), Object(vue_esm_bundler["z" /* withDirectives */])(Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "radio",
    class: "btn-check",
    name: "discountRadio",
    id: "discount20",
    value: "20",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $options.discount = $event;
    })
  }, null, 512), [[vue_esm_bundler["v" /* vModelRadio */], $options.discount]]), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    class: Object(vue_esm_bundler["k" /* normalizeClass */])(["btn btn-outline-primary", {
      'recommended-discount': _ctx.recommendedDiscount == 20
    }]),
    for: "discount20"
  }, "Колонка 2", 2), Object(vue_esm_bundler["z" /* withDirectives */])(Object(vue_esm_bundler["g" /* createElementVNode */])("input", {
    type: "radio",
    class: "btn-check",
    name: "discountRadio",
    id: "discount30",
    value: "30",
    autocomplete: "off",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $options.discount = $event;
    })
  }, null, 512), [[vue_esm_bundler["v" /* vModelRadio */], $options.discount]]), Object(vue_esm_bundler["g" /* createElementVNode */])("label", {
    class: Object(vue_esm_bundler["k" /* normalizeClass */])(["btn btn-outline-primary", {
      'recommended-discount': _ctx.recommendedDiscount == 30
    }]),
    for: "discount30"
  }, "Колонка 3", 2)])])]);
}
// CONCATENATED MODULE: ./src/components/Result.vue?vue&type=template&id=4fed2380

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Result.vue?vue&type=script&lang=js






/* harmony default export */ var Resultvue_type_script_lang_js = ({
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm_browser["c" /* mapGetters */])(["materialSum", "optionSum", "productSum", "additionalWork", "templates", "logisticsList", "logisticRawSum", "logisticSum", "addonSumList", "addonSum", "rawTotal", "total", "spendings", "recommendedDiscount", "measurementPrice", "overPrice", "products", "addons", "materials", "totalProductSum"])), {}, {
    c_materials: function c_materials() {
      return this.materials.filter(function (material) {
        return material.name || material.count || material.result;
      });
    },
    materialResult: function materialResult() {
      return this.materialSum.result + this.measurementPrice.result + this.overPrice.result;
    },
    false_spendings: function false_spendings() {
      return this.measurementPrice.result + (this.c_materials.length > 0 ? 0 : this.overPrice.result);
    },
    discount: {
      get: function get() {
        return this.$store.state.values.discount || 0;
      },
      set: function set(value) {
        this.setDiscount(value);
      }
    }
  }),
  methods: {
    setDiscount: function setDiscount(value) {
      this.$store.commit("setDiscount", value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Result.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Result.vue?vue&type=style&index=0&id=4fed2380&lang=css
var Resultvue_type_style_index_0_id_4fed2380_lang_css = __webpack_require__("469e");

// CONCATENATED MODULE: ./src/components/Result.vue







const Result_exports_ = /*#__PURE__*/exportHelper_default()(Resultvue_type_script_lang_js, [['render',Resultvue_type_template_id_4fed2380_render]])

/* harmony default export */ var Result = (Result_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Salary.vue?vue&type=template&id=0c719ab8


var Salaryvue_type_template_id_0c719ab8_hoisted_1 = {
  class: "list-group list-group-flush"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_2 = {
  key: 0,
  class: "list-group-item"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_3 = {
  class: "row justify-content-between g-0 mb-2"
};

var Salaryvue_type_template_id_0c719ab8_hoisted_4 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
  class: "col h4 mb-0 py-auto"
}, "Материал", -1);

var Salaryvue_type_template_id_0c719ab8_hoisted_5 = {
  key: 0,
  class: "col text-end fw-bold pb-0"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_6 = {
  class: "res-list"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_7 = {
  key: 0,
  class: "col h6 my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_8 = {
  key: 1,
  class: "col my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_9 = {
  class: "col text-end my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_10 = {
  key: 1,
  class: "list-group-item"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_11 = {
  class: "row justify-content-between g-0 mb-2"
};

var Salaryvue_type_template_id_0c719ab8_hoisted_12 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
  class: "col h4 mb-0 py-auto"
}, "Зарплата", -1);

var Salaryvue_type_template_id_0c719ab8_hoisted_13 = {
  key: 0,
  class: "col text-end fw-bold pb-0"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_14 = {
  class: "res-list"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_15 = {
  class: "col my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_16 = {
  class: "col text-end my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_17 = {
  class: "col-12 res-list"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_18 = {
  class: "col my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_19 = {
  class: "col text-end my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_20 = {
  class: "col my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_21 = {
  class: "col text-end my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_22 = {
  key: 2,
  class: "list-group-item"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_23 = {
  class: "row justify-content-between g-0 mb-2"
};

var Salaryvue_type_template_id_0c719ab8_hoisted_24 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
  class: "col h4 mb-0 py-auto"
}, "Траты на логистику", -1);

var Salaryvue_type_template_id_0c719ab8_hoisted_25 = {
  key: 0,
  class: "col text-end fw-bold pb-0"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_26 = {
  class: "res-list"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_27 = {
  class: "col my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_28 = {
  key: 0,
  class: "col text-end my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_29 = {
  key: 1,
  class: "col text-end my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_30 = {
  key: 0,
  class: "row justify-content-between g-0 mt-2"
};

var Salaryvue_type_template_id_0c719ab8_hoisted_31 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
  class: "col my-auto"
}, "Замер", -1);

var Salaryvue_type_template_id_0c719ab8_hoisted_32 = {
  class: "col text-end my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_33 = {
  key: 1,
  class: "row justify-content-between g-0 mt-2"
};

var Salaryvue_type_template_id_0c719ab8_hoisted_34 = /*#__PURE__*/Object(vue_esm_bundler["g" /* createElementVNode */])("span", {
  class: "col my-auto"
}, "Накрутка", -1);

var Salaryvue_type_template_id_0c719ab8_hoisted_35 = {
  class: "col text-end my-auto"
};
var Salaryvue_type_template_id_0c719ab8_hoisted_36 = {
  class: "list-group-item"
};
function Salaryvue_type_template_id_0c719ab8_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Salaryvue_type_template_id_0c719ab8_hoisted_1, [_ctx.materials.length ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Salaryvue_type_template_id_0c719ab8_hoisted_2, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Salaryvue_type_template_id_0c719ab8_hoisted_3, [Salaryvue_type_template_id_0c719ab8_hoisted_4, _ctx.materialSum.salary != 0 ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_5, Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.materialSum.salary) + " руб.", 1)) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)]), Object(vue_esm_bundler["g" /* createElementVNode */])("ul", Salaryvue_type_template_id_0c719ab8_hoisted_6, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(_ctx.materials, function (material, index) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
      key: index,
      class: "row justify-content-between g-0 mb-2"
    }, [material.name ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_7, Object(vue_esm_bundler["t" /* toDisplayString */])(material.name), 1)) : (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_8, "Кварцевый агломерат")), Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_9, Object(vue_esm_bundler["t" /* toDisplayString */])(material.salary) + " руб.", 1)]);
  }), 128))])])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true), _ctx.optionSum.length ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Salaryvue_type_template_id_0c719ab8_hoisted_10, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Salaryvue_type_template_id_0c719ab8_hoisted_11, [Salaryvue_type_template_id_0c719ab8_hoisted_12, _ctx.totalProductSum.salary ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_13, Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.totalProductSum.salary) + " руб.", 1)) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)]), Object(vue_esm_bundler["g" /* createElementVNode */])("ul", Salaryvue_type_template_id_0c719ab8_hoisted_14, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(_ctx.products, function (product, product_index) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
      key: product_index,
      class: "row justify-content-between g-0 mb-2"
    }, [Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_15, Object(vue_esm_bundler["t" /* toDisplayString */])(product.name), 1), Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_16, Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.optionSum[product_index].salary + _ctx.addonSumList[product_index].salary) + " руб.", 1), Object(vue_esm_bundler["g" /* createElementVNode */])("ul", Salaryvue_type_template_id_0c719ab8_hoisted_17, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(product.options, function (option, option_index) {
      return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
        class: "small-text row justify-content-between g-0 mb-2",
        key: option_index
      }, [Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_18, Object(vue_esm_bundler["t" /* toDisplayString */])(option.text), 1), Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_19, Object(vue_esm_bundler["t" /* toDisplayString */])(option.salary) + " руб.", 1)]);
    }), 128)), (Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(_ctx.addons[product_index], function (addon, addon_index) {
      return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
        class: "small-text row justify-content-between g-0 mb-2",
        key: addon_index
      }, [Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_20, Object(vue_esm_bundler["t" /* toDisplayString */])(addon.name), 1), Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_21, Object(vue_esm_bundler["t" /* toDisplayString */])(addon.salary) + " руб.", 1)]);
    }), 128))])]);
  }), 128))])])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true), _ctx.logisticsList.length ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("div", Salaryvue_type_template_id_0c719ab8_hoisted_22, [Object(vue_esm_bundler["g" /* createElementVNode */])("div", Salaryvue_type_template_id_0c719ab8_hoisted_23, [Salaryvue_type_template_id_0c719ab8_hoisted_24, _ctx.logisticRawSum.salary ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_25, Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.logisticRawSum.salary) + " руб.", 1)) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)]), Object(vue_esm_bundler["g" /* createElementVNode */])("ul", Salaryvue_type_template_id_0c719ab8_hoisted_26, [(Object(vue_esm_bundler["l" /* openBlock */])(true), Object(vue_esm_bundler["f" /* createElementBlock */])(vue_esm_bundler["a" /* Fragment */], null, Object(vue_esm_bundler["p" /* renderList */])(_ctx.logisticsList, function (logistic, index) {
    return Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", {
      key: index,
      class: "row justify-content-between g-0 mb-2"
    }, [Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_27, Object(vue_esm_bundler["t" /* toDisplayString */])(logistic.text), 1), logistic.salary ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_28, Object(vue_esm_bundler["t" /* toDisplayString */])(logistic.salary) + " руб.", 1)) : (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_29, Object(vue_esm_bundler["t" /* toDisplayString */])(logistic.result) + " руб.", 1))]);
  }), 128)), _ctx.measurementPrice.salary > 0 ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", Salaryvue_type_template_id_0c719ab8_hoisted_30, [Salaryvue_type_template_id_0c719ab8_hoisted_31, Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_32, Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.measurementPrice.salary) + " руб.", 1)])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true), _ctx.overPrice.result > 0 ? (Object(vue_esm_bundler["l" /* openBlock */])(), Object(vue_esm_bundler["f" /* createElementBlock */])("li", Salaryvue_type_template_id_0c719ab8_hoisted_33, [Salaryvue_type_template_id_0c719ab8_hoisted_34, Object(vue_esm_bundler["g" /* createElementVNode */])("span", Salaryvue_type_template_id_0c719ab8_hoisted_35, Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.overPrice.result) + " руб.", 1)])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true)])])) : Object(vue_esm_bundler["e" /* createCommentVNode */])("", true), Object(vue_esm_bundler["g" /* createElementVNode */])("div", Salaryvue_type_template_id_0c719ab8_hoisted_36, [Object(vue_esm_bundler["g" /* createElementVNode */])("h4", null, "Итог: " + Object(vue_esm_bundler["t" /* toDisplayString */])(_ctx.rawTotal.salary), 1)])]);
}
// CONCATENATED MODULE: ./src/components/Salary.vue?vue&type=template&id=0c719ab8

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Salary.vue?vue&type=script&lang=js


/* harmony default export */ var Salaryvue_type_script_lang_js = ({
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm_browser["c" /* mapGetters */])(["materialSum", "optionSum", "productSum", "additionalWork", "templates", "logisticsList", "logisticRawSum", "logisticSum", "addonSumList", "addonSum", "rawTotal", "total", "spendings", "recommendedsalary", "measurementPrice", "overPrice", "products", "addons", "materials", "totalProductSum"]))
});
// CONCATENATED MODULE: ./src/components/Salary.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/Salary.vue?vue&type=style&index=0&id=0c719ab8&lang=css
var Salaryvue_type_style_index_0_id_0c719ab8_lang_css = __webpack_require__("80ed");

// CONCATENATED MODULE: ./src/components/Salary.vue







const Salary_exports_ = /*#__PURE__*/exportHelper_default()(Salaryvue_type_script_lang_js, [['render',Salaryvue_type_template_id_0c719ab8_render]])

/* harmony default export */ var Salary = (Salary_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/App.vue?vue&type=script&lang=js








/* harmony default export */ var Appvue_type_script_lang_js = ({
  name: "App",
  data: function data() {
    return {
      tabs: [{
        component: "materials",
        name: "Материал"
      }, {
        component: "products",
        name: "Изделия"
      }, {
        component: "logistics",
        name: "Логистика"
      }],
      chosenTab: "products"
    };
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm_browser["d" /* mapMutations */])(["addMaterialCard", "addProductCard"])), Object(vuex_esm_browser["b" /* mapActions */])(["save"])), {}, {
    focusCard: function focusCard(tab, id) {
      setTimeout(function () {
        var element = document.getElementById("".concat(tab, "-").concat(id));
        element.scrollIntoView({
          block: "center",
          behavior: "auto"
        });
      }, 0);
    },
    addCard: function addCard() {
      var functions = {
        materials: this.addMaterialCard,
        products: this.addProductCard
      };
      functions[this.chosenTab]();
    },
    switchTab: function switchTab(tab) {
      this.chosenTab = tab;
      window.localStorage.setItem("chosenTab", tab);
    }
  }),
  created: function created() {
    var preTab = window.localStorage.getItem("chosenTab");

    if (preTab != null) {
      this.chosenTab = preTab;
    } else {
      this.chosenTab = this.tabs[0].component;
    }
  },
  components: {
    Materials: Materials,
    Products: Products,
    Logistics: Logistics,
    Result: Result,
    Salary: Salary
  }
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&id=bcc0617e&lang=css
var Appvue_type_style_index_0_id_bcc0617e_lang_css = __webpack_require__("2637");

// CONCATENATED MODULE: ./src/App.vue







const App_exports_ = /*#__PURE__*/exportHelper_default()(Appvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var App = (App_exports_);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/store/formulas.js



var priceList = {
  materialDelivery: {
    raw: 3300,
    mul: 1.25,
    price: function price() {
      return this.raw * this.mul;
    }
  },
  border: {
    Простой: {
      raw: 500,
      mul: 3,
      price: function price() {
        return this.mul * this.raw;
      }
    },
    Калиброванный: {
      raw: 1000,
      mul: 3,
      price: function price() {
        return this.mul * this.raw;
      }
    }
  },
  edge: {
    type: {
      '№1': {
        raw: 0,
        consumables: 0
      },
      '№2': {
        raw: 400,
        consumables: 0
      },
      '№3': {
        raw: 0,
        consumables: 0
      },
      '№4': {
        raw: 400,
        consumables: 0
      },
      '№6': {
        raw: 750,
        consumables: 0
      },
      '№7': {
        raw: 1500,
        consumables: 0
      },
      'Утиный нос': {
        raw: 750,
        consumables: 0
      },
      Фигурная: {
        raw: 3130,
        consumables: 1000
      },
      mul: 3,
      cmul: 3,
      consumables: function consumables(choice) {
        return this[choice].consumables * this.cmul;
      },
      price: function price(choice) {
        return this[choice].raw * this.mul + this.consumables(choice);
      }
    },
    width: {
      '20 мм': {
        raw: 800,
        consumables: 300
      },
      '30 мм': {
        raw: 900,
        consumables: 300
      },
      '40 мм': {
        raw: 1870,
        consumables: 1000
      },
      Другая: {
        raw: 2170,
        consumables: 1000
      },
      mul: 3.2,
      cmul: 3,
      consumables: function consumables(choice) {
        return this[choice].consumables * this.cmul;
      },
      price: function price(choice) {
        return this[choice].raw * this.mul + this.consumables(choice);
      }
    },
    angle: {
      45: {
        raw: 500
      },
      90: {
        raw: 0
      },
      mul: 3,
      price: function price(choice) {
        return this[choice].raw * this.mul;
      }
    }
  },
  sink: {
    Накладная: {
      raw: 1000
    },
    Поджимная: {
      raw: 2500
    },
    Интегрированная: {
      raw: 12500
    },
    'Интегрированная 45°': {
      raw: 17500
    },
    Вровень: {
      raw: 3500
    },
    mul: 3,
    price: function price(choice) {
      return this[choice].raw * this.mul;
    }
  },
  cookpanel: {
    Накладная: {
      raw: 1000
    },
    Интегрированная: {
      raw: 3500
    },
    mul: 3,
    price: function price(choice) {
      return this[choice].raw * this.mul;
    }
  },
  socket: {
    raw: 300,
    mul: 3,
    price: function price() {
      return this.raw * this.mul;
    }
  },
  surface_docking: {
    Прямая: {
      raw: 800
    },
    Косая: {
      raw: 900
    },
    mul: 3,
    price: function price(choice) {
      return this[choice].raw * this.mul;
    }
  },
  cutout: {
    raw: 250,
    mul: 3,
    price: function price() {
      return this.mul * this.raw;
    }
  },
  wallpanel_length: {
    raw: 790,
    mul: 3,
    price: function price() {
      return this.raw * this.mul;
    }
  },
  ladder: {
    step: {
      raw: 800,
      mul: 3,
      price: function price() {
        return this.raw * this.mul;
      }
    },
    understep: {
      raw: 800,
      mul: 3,
      price: function price() {
        return this.raw * this.mul;
      }
    }
  },
  mounting: {
    fix: 4000,
    add: 500,
    mul: 1.3,
    distance: 20,
    price: function price(type) {
      return this[type] * this.mul;
    }
  },
  delivery: {
    fix: 1800,
    distance: 40,
    mul: 1.67,
    price: function price(type) {
      return this[type] * this.mul;
    }
  },
  manualLift: {
    raw: 600,
    mul: 1.334,
    price: function price() {
      return this.raw * this.mul;
    }
  },
  measurement: {
    fix: 2000,
    distance: 30,
    mul: 1.2,
    price: function price(type) {
      return this[type] * this.mul;
    }
  },
  template: {
    fix: 800,
    mul: 1.25,
    price: function price() {
      return this.fix * this.mul;
    }
  },
  'Радиусный угол > 12': {
    fix: 1000,
    mul: 3,
    price: function price() {
      return this.fix * this.mul;
    }
  },
  'Другие отверстия': {
    fix: 1000,
    mul: 3,
    price: function price() {
      return this.fix * this.mul;
    }
  },
  'Обход пиластры': {
    fix: 1500,
    mul: 3,
    price: function price() {
      return this.fix * this.mul;
    }
  },
  Конвекция: {
    type: {
      вровень: {
        raw: 500
      },
      фрезеровка: {
        raw: 3500
      },
      mul: 3,
      price: function price(type) {
        return this[type].raw * this.mul;
      }
    },
    price: function price() {
      return 0;
    }
  },
  'Лучи под сток воды': {
    fix: 500,
    mul: 3,
    price: function price() {
      return this.fix * this.mul;
    }
  },
  Капельник: {
    fix: 500,
    mul: 3,
    price: function price() {
      return this.fix * this.mul;
    }
  },
  'Монтаж хром опоры заказчика': {
    fix: 1500,
    mul: 3,
    price: function price() {
      return this.fix * this.mul;
    }
  },
  'Стыковка опорной ноги из камня под 45': {
    fix: 500,
    mul: 3,
    price: function price() {
      return this.fix * this.mul;
    }
  },
  'Шлифовка подворота камня': {
    type: {
      'до 150 мм': {
        raw: 300
      },
      'более 150мм': {
        raw: 2500
      },
      mul: 3,
      price: function price(type) {
        return this[type].raw * this.mul;
      }
    },
    price: function price() {
      return 0;
    }
  },
  'Подворот из камня': {
    fix: 1000,
    mul: 3,
    price: function price() {
      return this.fix * this.mul;
    }
  },
  'Демонтаж старых изделий (до 6 п.м.)': {
    fix: 4000,
    mul: 1.2,
    price: function price() {
      return this.fix * this.mul;
    }
  }
};
function formulas_materialPrice(count, price) {
  return count > 0 && price > 0 ? {
    result: count * price + ( // чистая цена материала
    count % 1 ? 1500 : 0) + // цена распила
    priceList.materialDelivery.price() + ( // надбавка за доставку
    price >= 100000 ? 10000 * count : price * 0.1 * count),
    salary: count * price + ( // чистая цена материала
    count % 1 ? 1500 : 0) + // цена распила
    priceList.materialDelivery.raw // надбавка за доставку,

  } : {
    result: 0,
    salary: 0
  };
}
function wallpanel_length(payload) {
  return payload.length > 0 ? {
    result: priceList.wallpanel_length.price() * payload.length,
    salary: priceList.wallpanel_length.raw * payload.length,
    consumables: 0,
    text: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430, ".concat(payload.length, " \u043F.\u043C.")
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function ladder(payload) {
  return payload.stepLength ? {
    result: (priceList.ladder.step.price() + priceList.edge.type.price('№2')) * payload.stepLength + priceList.ladder.understep.price() * payload.underStepLength,
    salary: (priceList.ladder.step.raw + priceList.edge.type['№2'].raw) * payload.stepLength + priceList.ladder.understep.raw * payload.underStepLength,
    consumables: 0,
    text: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0441\u0442\u0443\u043F\u0435\u043D\u0435\u0439"
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function border(payload) {
  return payload.length > 0 ? {
    result: priceList.border[payload.type].price() * payload.length,
    salary: priceList.border[payload.type].raw * payload.length,
    consumables: 0,
    text: "".concat(payload.type, " \u0431\u043E\u0440\u0442\u0438\u043A, ").concat(payload.length, " \u043F.\u043C.")
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function edge(payload) {
  var _ref = [payload.type, payload.width, payload.angle, payload.length],
      type = _ref[0],
      width = _ref[1],
      angle = _ref[2],
      length = _ref[3];
  var pricelist = priceList.edge;
  return type && width && angle && length > 0 ? {
    result: length * (pricelist.angle.price(angle) + pricelist.width.price(width) + pricelist.type.price(type)),
    salary: length * (pricelist.angle[angle].raw + pricelist.width[width].raw + pricelist.type[type].raw),
    consumables: length * (pricelist.width[width].consumables + pricelist.type[type].consumables),
    text: "\u041A\u0440\u043E\u043C\u043A\u0430 ".concat(type, ", ").concat(width, ", \u0441\u043A\u043B\u0435\u0439\u043A\u0430 ").concat(angle, "\xB0, ").concat(length, " \u043F.\u043C.")
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function sink(payload) {
  return payload.quantity > 0 && payload.type ? {
    result: priceList.sink.price(payload.type) * payload.quantity,
    salary: priceList.sink[payload.type].raw * payload.quantity,
    consumables: 0,
    text: "".concat(payload.type, " \u043C\u043E\u0439\u043A\u0430, ").concat(payload.quantity, " \u0448\u0442.")
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function socket(payload) {
  return payload.quantity ? {
    result: priceList.socket.price() * payload.quantity,
    salary: priceList.socket.raw * payload.quantity,
    consumables: 0,
    text: "\u0412\u044B\u0440\u0435\u0437 \u043F\u043E\u0434 \u0440\u043E\u0437\u0435\u0442\u043A\u0443, ".concat(payload.quantity, " \u0448\u0442.")
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function surface_docking(payload) {
  return payload.quantity && payload.type ? {
    result: priceList.surface_docking.price(payload.type) * payload.quantity,
    salary: priceList.surface_docking[payload.type].raw * payload.quantity,
    consumables: 0,
    text: "\u0421\u0442\u044B\u043A\u043E\u0432\u043A\u0430 \u043F\u043B\u043E\u0441\u043A\u043E\u0441\u0442\u0435\u0439 ".concat(payload.type.toLowerCase(), ", ").concat(payload.quantity, " \u0448\u0442.")
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function cutout(payload) {
  return payload.quantity ? {
    result: priceList.cutout.price() * payload.quantity,
    salary: priceList.cutout.raw * payload.quantity,
    consumables: 0,
    text: "\u041F\u0440\u043E\u0441\u0442\u043E\u0439 \u0432\u044B\u0440\u0435\u0437, ".concat(payload.quantity, " \u0448\u0442.")
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function cookpanel(payload) {
  return payload.quantity > 0 && payload.type ? {
    result: priceList.cookpanel.price(payload.type) * payload.quantity,
    salary: priceList.cookpanel[payload.type].raw * payload.quantity,
    consumables: 0,
    text: "".concat(payload.type, " \u0432\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043F\u0430\u043D\u0435\u043B\u044C, ").concat(payload.quantity, " \u0448\u0442.")
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function mounting(payload) {
  return payload.mounting > 0 && payload.product_length > 0 ? {
    text: 'Установка изделий',
    result: (payload.product_length >= 2 ? priceList.mounting.price('add') * payload.product_length : 0) + (payload.distance * priceList.mounting.price('distance') + priceList.mounting.price('fix')) * payload.mounting,
    salary: (payload.product_length >= 2 ? priceList.mounting.add * payload.product_length : 0) + (payload.distance * priceList.mounting.distance + priceList.mounting.fix) * payload.mounting,
    consumables: 0
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function formulas_delivery(payload) {
  return payload.delivery ? {
    text: 'Доставка изделий',
    result: Math.ceil((priceList.delivery.price('fix') + priceList.delivery.price('distance') * payload.distance) * payload.delivery),
    salary: (priceList.delivery.fix + priceList.delivery.distance * payload.distance) * payload.delivery
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function formulas_lifting(payload) {
  return payload.floor > 0 ? {
    text: "\u0420\u0443\u0447\u043D\u043E\u0439 \u043F\u043E\u0434\u044A\u0435\u043C, ".concat(payload.floor, " \u044D\u0442\u0430\u0436"),
    result: Math.ceil(priceList.manualLift.price() * payload.floor),
    salary: priceList.manualLift.raw * payload.floor
  } : {
    result: 0,
    salary: 0,
    consumables: 0,
    text: 'Незаполненная опция'
  };
}
function measurement(payload) {
  return payload.measurement > 0 ? {
    result: (priceList.measurement.price('fix') + payload.distance * priceList.measurement.price('distance') + priceList.template.price()) * payload.measurement,
    salary: (priceList.measurement.fix + payload.distance * priceList.measurement.distance + priceList.template.fix) * payload.measurement
  } : {
    result: 0,
    salary: 0,
    text: 'Незаполненная опция'
  };
}
function formulas_addon(payload) {
  var type = typeof payload.type != 'undefined' ? payload.type.selected : false;
  var count = typeof payload.count != 'undefined' ? payload.count : 0;
  var isChecked = typeof payload.isChecked != 'undefined' ? payload.isChecked : 0;
  var addon_pricelist = priceList[payload.name];
  return {
    name: payload.name,
    result: count * (addon_pricelist.price() + (type ? addon_pricelist.type.price(type) : 0)) + Number(isChecked) * addon_pricelist.price(),
    salary: count * (addon_pricelist.fix ? addon_pricelist.fix : 0 + (type ? addon_pricelist.type[type].raw : 0)) + Number(isChecked) * (addon_pricelist.fix ? addon_pricelist.fix : 0)
  };
}
// CONCATENATED MODULE: ./src/store/index.js


















function capitalize(str) {
  return str.split(' ').map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

function focusCard(tab, index) {
  setTimeout(function () {
    var element = document.getElementById("".concat(tab, "-").concat(index));
    element.scrollIntoView({
      block: 'center',
      behavior: 'auto'
    });
  }, 0);
}

/* harmony default export */ var store = (Object(vuex_esm_browser["a" /* createStore */])({
  state: JSON.parse(document.getElementById('values').textContent),
  actions: {
    save: function save(_ref) {
      var commit = _ref.commit,
          state = _ref.state;
      axios_default.a.put('save', {
        data: {
          state: state,
          updateTime: window.localStorage.getItem('lastUserInput')
        }
      }).then(function (response) {
        if (response.data.new) {
          window.history.pushState({}, "\u0420\u0430\u0441\u0447\u0435\u0442 ".concat(response.data.id), response.data.id);
          commit('setId', response.data.id);
        }
      }).catch(function (error) {
        alert(error);
      });
    }
  },
  getters: {
    totalProductSum: function totalProductSum(state, getters) {
      return {
        discount: getters.productSum.discount + getters.addonSum.discount,
        result: getters.productSum.result + getters.addonSum.result,
        salary: getters.productSum.salary + getters.addonSum.salary
      };
    },
    overPrice: function overPrice(state) {
      return {
        result: Number(state.values.logistics.overPrice)
      };
    },
    materialPrice: function materialPrice(state) {
      return function (index) {
        var card = state.values.material_cards[index];
        return formulas_materialPrice(card.materialCount, card.materialPrice);
      };
    },
    materials: function materials(state, getters) {
      return state.values.material_cards.map(function (card, index) {
        var prices = getters.materialPrice(index);
        return {
          name: card.materialName,
          count: card.materialCount,
          result: prices.result,
          salary: prices.salary
        };
      });
    },
    products: function products(state, getters) {
      return state.values.product_cards.map(function (card, index) {
        return {
          options: getters.optionsPrices(index),
          name: card.chosenType
        };
      });
    },
    optionsPrices: function optionsPrices(state) {
      return function (productIndex) {
        return state.values.product_cards[productIndex].option_card.map(function (option) {
          var price = formulas_namespaceObject[option.component_type.replace('-', '_')](option.data);
          price.discount = Math.ceil(price.result * (1 - state.values.discount / 100));
          return price;
        });
      };
    },
    installation: function installation(state) {
      var product_length = state.values.product_cards.filter(function (card) {
        return card.installation.status;
      });
      product_length = product_length.length > 0 ? product_length.map(function (card) {
        return Number(card.installation.length);
      }).reduce(function (x, y) {
        return x + y;
      }) : 0;
      return mounting({
        product_length: product_length,
        distance: state.values.logistics.distance,
        mounting: state.values.logistics.mounting
      });
    },
    delivery: function delivery(state) {
      return formulas_delivery({
        distance: state.values.logistics.distance,
        delivery: state.values.logistics.delivery
      });
    },
    lifting: function lifting(state) {
      return formulas_lifting({
        floor: state.values.logistics.manualLifting
      });
    },
    measurementPrice: function measurementPrice(state) {
      return measurement({
        distance: state.values.logistics.distance,
        measurement: state.values.logistics.measurement
      });
    },
    addons: function addons(state, getters) {
      return state.values.product_cards.map(function (card, index) {
        return getters.addonPrices(index);
      });
    },
    addonPrices: function addonPrices(state) {
      return function (productIndex) {
        var addons = state.values.product_cards[productIndex].addons;
        return addons.map(function (addon) {
          var price = formulas_addon(addon);
          price.discount = Math.ceil(price.result * (1 - state.values.discount / 100));
          return price;
        }).filter(function (addon) {
          return addon.result > 0;
        });
      };
    },
    ////////////////////////////
    materialSum: function materialSum(state, getters) {
      return getters.materials.length ? getters.materials.reduce(function (x, y) {
        return {
          result: x.result + y.result,
          salary: x.salary + y.salary
        };
      }) : {
        result: 0,
        salary: 0
      };
    },
    optionSum: function optionSum(state, getters) {
      return getters.products.map(function (product) {
        return product.options.length > 0 ? product.options.reduce(function (x, y) {
          return {
            result: x.result + y.result,
            salary: x.salary + y.salary,
            discount: x.discount + y.discount,
            consumables: x.consumables + y.consumables
          };
        }) : {
          result: 0,
          salary: 0,
          consumables: 0,
          discount: 0
        };
      });
    },
    productSum: function productSum(state, getters) {
      return getters.optionSum.length > 0 ? getters.optionSum.reduce(function (x, y) {
        return {
          result: x.result + y.result,
          salary: x.salary + y.salary,
          discount: x.discount + y.discount,
          consumables: x.consumables + y.consumables
        };
      }) : {
        result: 0,
        salary: 0,
        consumables: 0,
        discount: 0
      };
    },
    additionalWork: function additionalWork(state) {
      return {
        result: Number(state.values.logistics.additionalWork),
        text: 'Дополнительные работы'
      };
    },
    templates: function templates(state) {
      return {
        result: Number(state.values.logistics.templatePrice),
        text: 'Изготовление шаблонов'
      };
    },
    logisticsList: function logisticsList(state, getters) {
      return [getters.lifting, getters.delivery, getters.installation, getters.additionalWork, getters.templates].filter(function (price) {
        return price.result;
      });
    },
    logisticRawSum: function logisticRawSum(state, getters) {
      return getters.logisticsList.length > 0 ? function getRawSum(logisticsList) {
        var prices = logisticsList.filter(function (logistic) {
          return typeof logistic.salary != 'undefined';
        });
        return prices.length ? prices.reduce(function (x, y) {
          return {
            result: x.result + y.result,
            salary: x.salary + y.salary
          };
        }) : {
          result: 0,
          salary: 0
        };
      }(getters.logisticsList) : {
        result: 0,
        salary: 0
      };
    },
    logisticSum: function logisticSum(state, getters) {
      return {
        result: getters.logisticRawSum.result + getters.additionalWork.result + getters.templates.result
      };
    },
    addonSumList: function addonSumList(state, getters) {
      return getters.addons.map(function (addon) {
        return addon.length > 0 ? addon.reduce(function (x, y) {
          return {
            result: x.result + y.result,
            salary: x.salary + y.salary,
            discount: x.discount + y.discount
          };
        }) : {
          result: 0,
          salary: 0,
          discount: 0
        };
      });
    },
    addonSum: function addonSum(state, getters) {
      return getters.addonSumList.length > 0 ? getters.addonSumList.reduce(function (x, y) {
        return {
          result: x.result + y.result,
          salary: x.salary + y.salary,
          discount: x.discount + y.discount
        };
      }) : {
        result: 0,
        salary: 0,
        discount: 0
      };
    },
    rawTotal: function rawTotal(state, getters) {
      return [getters.materialSum, getters.measurementPrice, getters.addonSum, getters.productSum, getters.logisticRawSum].reduce(function (x, y) {
        if (typeof x.discount == 'undefined') {
          x.discount = x.result;
        }

        if (typeof y.discount == 'undefined') {
          y.discount = y.result;
        }

        return {
          result: x.result + y.result,
          salary: x.salary + y.salary,
          discount: x.discount + y.discount
        };
      });
    },
    total: function total(state, getters) {
      console.log(getters.rawTotal);
      return getters.rawTotal.discount + getters.templates.result + getters.overPrice.result + getters.additionalWork.result;
    },
    spendings: function spendings(state, getters) {
      return [getters.rawTotal.salary, getters.productSum.consumables].filter(function (x) {
        return typeof x != 'undefined';
      }).reduce(function (x, y) {
        return x + y;
      });
    },
    recommendedDiscount: function recommendedDiscount(state, getters) {
      var discount = function discount() {
        var delta = getters.spendings / getters.rawTotal.result;
        console.log(delta);

        if (delta >= 0.9) {
          return 0;
        } else if (delta >= 0.8) {
          return 10;
        } else if (delta >= 0.75) {
          return 20;
        } else if (delta < 0.75) {
          return 30;
        }
      };

      return discount();
    }
  },
  mutations: {
    setId: function setId(state, id) {
      state.id = id;
    },
    addMaterialCard: function addMaterialCard(state) {
      var cards = state.values.material_cards;
      cards.push({
        materialName: null,
        materialPrice: null,
        materialCount: null,
        result: 0
      });
      focusCard('material-card', cards.length - 1);
    },
    removeMaterialCard: function removeMaterialCard(state, index) {
      state.values.material_cards.splice(index, 1);
    },
    updateMaterialName: function updateMaterialName(state, payload) {
      state.values.material_cards[payload.index].materialName = capitalize(payload.value);
    },
    updateMaterialField: function updateMaterialField(state, payload) {
      state.values.material_cards[payload.index][payload.field] = payload.value;
    },
    addProductCard: function addProductCard(state) {
      var cards = state.values.product_cards;
      cards.push({
        chosenType: '',
        option_card: [],
        installation: {
          status: false,
          length: null
        },
        addons: JSON.parse(JSON.stringify(defaultAddons))
      });
      focusCard('product-card', cards.length - 1);
    },
    removeProductCard: function removeProductCard(state, index) {
      state.values.product_cards.splice(index, 1);
    },
    updateCardOptions: function updateCardOptions(state, payload) {
      var card = state.values.product_cards[payload.cardIndex];
      card.chosenType = payload.choice;
      card.option_card = products[payload.choice].defaultOptions.map(function (option) {
        return {
          component_type: option.component,
          data: JSON.parse(JSON.stringify(option.data)),
          result: null
        };
      });
    },
    addCardOption: function addCardOption(state, payload) {
      if (payload.choice != null) {
        var required_option = options[payload.choice];
        var card_option_list = state.values.product_cards[payload.cardIndex].option_card;
        card_option_list.push({
          component_type: required_option.component,
          data: JSON.parse(JSON.stringify(required_option.data)),
          result: null
        });
      }
    },
    removeCardOption: function removeCardOption(state, payload) {
      state.values.product_cards[payload.cardIndex].option_card.splice(payload.optionIndex, 1);
    },
    updateOptionValue: function updateOptionValue(state, payload) {
      var optionCard = state.values.product_cards[payload.cardIndex].option_card[payload.optionIndex];
      optionCard.data[payload.field] = payload.value;
    },
    insertAddons: function insertAddons(state, cardIndex) {
      state.values.product_cards[cardIndex].addons = JSON.parse(JSON.stringify(defaultAddons));
    },
    updateAddonInput: function updateAddonInput(state, payload) {
      state.values.product_cards[payload.cardIndex].addons[payload.addonIndex][payload.field] = payload.value;
    },
    updateAddonSelector: function updateAddonSelector(state, payload) {
      state.values.product_cards[payload.cardIndex].addons[payload.addonIndex][payload.field].selected = payload.value;
    },
    updateAddonCheckbox: function updateAddonCheckbox(state, payload) {
      var checkbox = state.values.product_cards[payload.cardIndex].addons[payload.addonIndex];
      checkbox.isChecked = !checkbox.isChecked;
    },
    updateInstallationLength: function updateInstallationLength(state, payload) {
      state.values.product_cards[payload.cardIndex].installation.length = payload.value;
    },
    updateInstallationStatus: function updateInstallationStatus(state, payload) {
      state.values.product_cards[payload.cardIndex].installation.status = payload.value;

      if (payload.value === true && state.values.logistics.mounting < 1) {
        state.values.logistics.mounting = 1;
      }
    },
    updateLogisticsInfo: function updateLogisticsInfo(state, payload) {
      state.values.logistics[payload.field] = payload.value;
    },
    setDiscount: function setDiscount(state, value) {
      state.values.discount = value;
    }
  }
}));
// EXTERNAL MODULE: ./node_modules/vue3-touch-events/index.js
var vue3_touch_events = __webpack_require__("9a7e");

// EXTERNAL MODULE: ./node_modules/vue-axios/dist/vue-axios.esm.min.js
var vue_axios_esm_min = __webpack_require__("130e");

// CONCATENATED MODULE: ./src/main.js















function keydown(e) {
  if (e.keyCode === 13) {
    document.activeElement.blur();
  }
}

document.addEventListener('keydown', keydown);

function getCookie(name) {
  var cookieValue = null;

  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

var csrftoken = getCookie('csrftoken');
axios_default.a.defaults.headers.common = {
  'X-CSRFToken': csrftoken
};

function queue_for_update() {
  setTimeout(function () {
    store.dispatch('save');
  }, 10000);
}

store.subscribe(function () {
  var now = Date.now();
  window.localStorage.setItem('lastUserInput', now);

  if (!window.localStorage.getItem('queue_for_update_start') || now - Number(window.localStorage.getItem('queue_for_update_start')) > 11000) {
    window.localStorage.setItem('queue_for_update_start', now);
    queue_for_update();
  }
});
var app = Object(vue_esm_bundler["c" /* createApp */])(App);
app.use(store);
app.use(vue3_touch_events["a" /* default */], {
  disableClick: true
});
app.use(vue_axios_esm_min["a" /* default */], axios_default.a);
app.mount('#app');

/***/ }),

/***/ "6c78":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "80ed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Salary_vue_vue_type_style_index_0_id_0c719ab8_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9bd1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Salary_vue_vue_type_style_index_0_id_0c719ab8_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Salary_vue_vue_type_style_index_0_id_0c719ab8_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8843":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_MaterialCard_vue_vue_type_style_index_0_id_921a8456_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fbb7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_MaterialCard_vue_vue_type_style_index_0_id_921a8456_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_MaterialCard_vue_vue_type_style_index_0_id_921a8456_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "9bd1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d380":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ProductCard_vue_vue_type_style_index_0_id_96bacd72_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e4a7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ProductCard_vue_vue_type_style_index_0_id_96bacd72_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ProductCard_vue_vue_type_style_index_0_id_96bacd72_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e4a7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fbb7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.js.map
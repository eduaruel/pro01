/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/sweetalert2/dist/sweetalert2.all.js":
/*!**********************************************************!*\
  !*** ./node_modules/sweetalert2/dist/sweetalert2.all.js ***!
  \**********************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/jocarrasco/Work/Github/pro01/node_modules/sweetalert2/dist/sweetalert2.all.js'\");\n\n//# sourceURL=webpack://proyecto-final/./node_modules/sweetalert2/dist/sweetalert2.all.js?");

/***/ }),

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ \"./node_modules/sweetalert2/dist/sweetalert2.all.js\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\tconst skills = document.querySelector('.lista-conocimientos');\n\n\t//limpiar alertas\n\tlet alertas = document.querySelector('.alertas');\n\n\tif(alertas){\n\t\tlimpiarAlertas(alertas);\n\t}\n\n\tif (skills) {\n\t\tskills.addEventListener('click', agregarSkills);\n\n\t\t//al estar en editar se llama esta funcion\n\t\tskillsSeleccionado()\n\t}\n\n\tconst vacantesListado = document.querySelector('.panel-administracion')\n\n\tif(vacantesListado){\n\t\tvacantesListado.addEventListener('click',accionesListado)\n\t}\n\n\n});\nconst skills = new Set();\nconst agregarSkills = (e) => {\n\t//console.log(e.target);\n\tif (e.target.tagName === 'LI') {\n\t\t//skills.add(e.target.textContent);\n\t\tif (e.target.classList.contains('activo')) {\n\t\t\t// quitar el activo\n\t\t\tskills.delete(e.target.textContent);\n\t\t\te.target.classList.remove('activo');\n\t\t} else {\n\t\t\t// colocar nuevamente el activo\n\t\t\tskills.add(e.target.textContent);\n\t\t\te.target.classList.add('activo');\n\t\t}\n\t}\n\t// console.log(skills);\n\tconst skillsArray = [...skills];\n\tdocument.querySelector('#skills').value = skillsArray;\n};\n\nconst skillsSeleccionado = ()=>{\n\tconst seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));\n\n\tseleccionadas.forEach(seleccionadas =>{\n\t\tskills.add(seleccionadas.textContent)\n\t})\n\n\tconst skillsArray = [...skills];\n\tdocument.querySelector('#skills').value = skillsArray;\n\n}\n\nconst limpiarAlertas = ()=>{\n\tconst alert = document.querySelector('.alertas')\n\n\tconst intervalo = setInterval(()=>{\n\t\tif(alert.children.length > 0 ){\n\t\talert.removeChild(alert.children[0]);\n\t}else if(alert.children.length === 0){\n\t\talert.parentElement.removeChild(alert);\n\t\tclearInterval(intervalo)\n\t}\n\t},3000)\n}\n\nconst accionesListado = e => {\n \n    e.preventDefault();\n \n    if(e.target.dataset.eliminar){\n        // eliminar por axios\n        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({\n            title: '¿Confirmar Eliminación?',\n            text: \"Una vez eliminada, no se puede recuperar\",\n            icon: 'warning',//el nombre del parámetro cambio de ser type a icon\n             showCancelButton: true,\n            confirmButtonColor: '#3085d6',\n            cancelButtonColor: '#d33',\n            confirmButtonText: 'Si, Eliminar',\n            cancelButtonText : 'No, Cancelar'\n        }).then((result) => {\n            if (result.value) {\n                // enviar la petición con axios\n                const url = `${location.origin}/vacantes/eliminar/${e.target.dataset.eliminar}`;\n                \n                // Axios para eliminar el registro\n                axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].delete(url, { params: {url} })\n                    .then(function(respuesta) {\n                        \n                        if(respuesta.status === 200) {\n                            sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire(\n                                'Eliminado',\n                                respuesta.data,\n                                'success'\n\n                            );\n \n                            //Eliminar del DOM\n                            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);\n                        }\n                    })\n                    .catch(() => {\n                        sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().fire({\n                            icon:'error',\n                            title: 'Hubo un error',\n                            text: 'No Se pudo eliminar'\n                        })\n                    })\n \n            }\n \n        })\n \n    }  else if(e.target.tagName === 'A') {\n        window.location.href = e.target.href;\n    }\n}\n\n//# sourceURL=webpack://proyecto-final/./public/js/app.js?");

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/jocarrasco/Work/Github/pro01/node_modules/axios/index.js'\");\n\n//# sourceURL=webpack://proyecto-final/./node_modules/axios/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/app.js");
/******/ 	
/******/ })()
;
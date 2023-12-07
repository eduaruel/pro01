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

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', () => {\r\n\tconst skills = document.querySelector('.lista-conocimientos');\r\n\r\n\t//limpiar alertas\r\n\tlet alertas = document.querySelector('.alertas');\r\n\r\n\tif(alertas){\r\n\t\tlimpiarAlertas(alertas);\r\n\t}\r\n\r\n\tif (skills) {\r\n\t\tskills.addEventListener('click', agregarSkills);\r\n\r\n\t\t//al estar en editar se llama esta funcion\r\n\t\tskillsSeleccionado()\r\n\t}\r\n});\r\nconst skills = new Set();\r\nconst agregarSkills = (e) => {\r\n\t//console.log(e.target);\r\n\tif (e.target.tagName === 'LI') {\r\n\t\t//skills.add(e.target.textContent);\r\n\t\tif (e.target.classList.contains('activo')) {\r\n\t\t\t// quitar el activo\r\n\t\t\tskills.delete(e.target.textContent);\r\n\t\t\te.target.classList.remove('activo');\r\n\t\t} else {\r\n\t\t\t// colocar nuevamente el activo\r\n\t\t\tskills.add(e.target.textContent);\r\n\t\t\te.target.classList.add('activo');\r\n\t\t}\r\n\t}\r\n\t// console.log(skills);\r\n\tconst skillsArray = [...skills];\r\n\tdocument.querySelector('#skills').value = skillsArray;\r\n};\r\n\r\nconst skillsSeleccionado = ()=>{\r\n\tconst seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));\r\n\r\n\tseleccionadas.forEach(seleccionadas =>{\r\n\t\tskills.add(seleccionadas.textContent)\r\n\t})\r\n\r\n\tconst skillsArray = [...skills];\r\n\tdocument.querySelector('#skills').value = skillsArray;\r\n\r\n}\r\n\r\nconst limpiarAlertas = ()=>{\r\n\tconst alert = document.querySelector('.alertas')\r\n\r\n\tconst intervalo = setInterval(()=>{\r\n\t\tif(alert.children.length > 0 ){\r\n\t\talert.removeChild(alert.children[0]);\r\n\t}else if(alert.children.length === 0){\r\n\t\talert.parentElement.removeChild(alert);\r\n\t\tclearInterval(intervalo)\r\n\t}\r\n\t},3000)\r\n}\r\n\n\n//# sourceURL=webpack://proyecto-final/./public/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/app.js"]();
/******/ 	
/******/ })()
;
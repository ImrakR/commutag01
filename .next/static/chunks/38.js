(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[38],{

/***/ "./node_modules/@pooltogether/bnc-onboard/dist/esm/squarelink-150a9d83.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@pooltogether/bnc-onboard/dist/esm/squarelink-150a9d83.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/@pooltogether/bnc-onboard/node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _onboard_197ee608_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onboard-197ee608.js */ \"./node_modules/@pooltogether/bnc-onboard/dist/esm/onboard-197ee608.js\");\n/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bignumber.js */ \"./node_modules/bignumber.js/bignumber.js\");\n/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var bnc_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bnc-sdk */ \"./node_modules/bnc-sdk/dist/esm/index.js\");\n/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bowser */ \"./node_modules/bowser/es5.js\");\n/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_4__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n\nvar sqlkIcon = \"\\n  <svg width=\\\"40px\\\" height=\\\"40px\\\" viewBox=\\\"0 0 88 88\\\" version=\\\"1.1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\">\\n  <g id=\\\"Identity\\\" stroke=\\\"none\\\" stroke-width=\\\"1\\\" fill=\\\"none\\\" fill-rule=\\\"evenodd\\\">\\n      <g id=\\\"Artboard\\\" transform=\\\"translate(-11.000000, -220.000000)\\\">\\n          <g id=\\\"Group\\\" transform=\\\"translate(11.508925, 220.556971)\\\">\\n              <circle id=\\\"Oval\\\" fill=\\\"#313D53\\\" cx=\\\"43.4910749\\\" cy=\\\"43.4910749\\\" r=\\\"43.4910749\\\"></circle>\\n              <path d=\\\"M26.9807751,53.5120539 L26.9807751,56.7049531 C26.9807751,58.9140921 28.7716361,60.7049531 30.9807751,60.7049531 L56.0422363,60.7049531 C58.2513753,60.7049531 60.0422363,58.9140921 60.0422363,56.7049531 L60.0422363,30.2473297 C60.0422363,28.0381907 58.2513753,26.2473297 56.0422363,26.2473297 L26.9807751,26.2473297 L26.9807751,47.8897807 L26.9807751,53.5120539 Z M20.4910749,20.4430293 L56.4910749,20.4430293 C62.0139224,20.4430293 66.4910749,24.9201818 66.4910749,30.4430293 L66.4910749,56.5391205 C66.4910749,62.061968 62.0139224,66.5391205 56.4910749,66.5391205 L30.4910749,66.5391205 C24.9682274,66.5391205 20.4910749,62.061968 20.4910749,56.5391205 L20.4910749,20.4430293 Z M33.9720552,26.2473297 L40.419051,26.2473297 L40.419051,41.0316245 L40.419051,49.5120539 C40.419051,51.7211929 38.62819,53.5120539 36.419051,53.5120539 L26.9807751,53.5120539 L26.9807751,47.8897807 L33.9720552,47.8897807 L33.9720552,26.2473297 Z M33.9720552,26.2473297 L40.419051,26.2473297 L33.9720552,26.2473297 Z M53.0509562,60.7049531 L46.6039605,60.7049531 L46.6039605,45.9206584 L46.6039605,37.4402289 C46.6039605,35.2310899 48.3948215,33.4402289 50.6039605,33.4402289 L60.0422363,33.4402289 L60.0422363,39.0625021 L53.0509562,39.0625021 L53.0509562,60.7049531 Z M46.6039605,60.7049531 L53.0509562,60.7049531 L46.6039605,60.7049531 Z M60.0422363,39.0625021 L60.0422363,33.4402289 L60.0422363,39.0625021 Z\\\" id=\\\"Icon-Blue\\\" fill=\\\"#E8EEFF\\\"></path>\\n          </g>\\n      </g>\\n  </g>\\n  </svg>\\n\";\n\nfunction squarelink(options) {\n  var apiKey = options.apiKey,\n      networkId = options.networkId,\n      preferred = options.preferred,\n      label = options.label,\n      iconSrc = options.iconSrc,\n      svg = options.svg;\n  return {\n    name: label || 'Squarelink',\n    svg: svg || sqlkIcon,\n    iconSrc: iconSrc,\n    wallet: function () {\n      var _wallet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(helpers) {\n        var _yield$import, Squarelink, instance, provider, BigNumber;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.next = 2;\n                return __webpack_require__.e(/*! import() */ 47).then(__webpack_require__.t.bind(null, /*! squarelink */ \"./node_modules/squarelink/lib/squarelink.min.js\", 7));\n\n              case 2:\n                _yield$import = _context.sent;\n                Squarelink = _yield$import[\"default\"];\n                instance = new Squarelink(apiKey, Object(_onboard_197ee608_js__WEBPACK_IMPORTED_MODULE_1__[\"n\"])(networkId), {\n                  useSync: true\n                });\n                provider = instance.getProviderSync();\n                BigNumber = helpers.BigNumber;\n                return _context.abrupt(\"return\", {\n                  provider: provider,\n                  instance: instance,\n                  \"interface\": {\n                    name: 'Squarelink',\n                    connect: provider.enable,\n                    disconnect: function disconnect() {\n                      return provider.stop();\n                    },\n                    address: {\n                      get: function get() {\n                        return Promise.resolve(instance.accounts[0]);\n                      }\n                    },\n                    network: {\n                      get: function get() {\n                        return Promise.resolve(Object(_onboard_197ee608_js__WEBPACK_IMPORTED_MODULE_1__[\"a\"])(instance.network));\n                      }\n                    },\n                    balance: {\n                      get: function get() {\n                        return new Promise(function (resolve) {\n                          if (!instance.accounts.length) {\n                            resolve(null);\n                            return;\n                          }\n\n                          provider.sendAsync({\n                            jsonrpc: '2.0',\n                            method: 'eth_getBalance',\n                            params: [instance.accounts[0], 'latest'],\n                            id: 1\n                          }, function (e, res) {\n                            resolve(BigNumber(res.result).toString(10));\n                          });\n                        });\n                      }\n                    },\n                    dashboard: function dashboard() {\n                      return Object(_onboard_197ee608_js__WEBPACK_IMPORTED_MODULE_1__[\"o\"])('https://app.squarelink.com/');\n                    }\n                  }\n                });\n\n              case 8:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }));\n\n      function wallet(_x) {\n        return _wallet.apply(this, arguments);\n      }\n\n      return wallet;\n    }(),\n    type: 'sdk',\n    desktop: true,\n    mobile: true,\n    preferred: preferred\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (squarelink);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0Bwb29sdG9nZXRoZXIvYm5jLW9uYm9hcmQvZGlzdC9lc20vc3F1YXJlbGluay0xNTBhOWQ4My5qcz82MTZiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRFQUE0RSxNQUFNLDBCQUEwQix3QkFBd0IsRUFBRSxnQkFBZ0IsZUFBZSxRQUFRLEVBQUUsaUJBQWlCLGdCQUFnQixFQUFFLE9BQU8sNENBQTRDLEVBQUU7O0FBRXZRLGdDQUFnQyxxQkFBcUIsbUNBQW1DLGdEQUFnRCxnQ0FBZ0Msd0JBQXdCLHdFQUF3RSxFQUFFLHVCQUF1Qix1RUFBdUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEdBQUc7O0FBRTlWO0FBQ3FEO0FBQ3BFO0FBQ0w7QUFDRDtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0pBQW9COztBQUUzQztBQUNBO0FBQ0E7QUFDQSxrREFBa0QsOERBQVc7QUFDN0Q7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLCtDQUErQyw4REFBVztBQUMxRDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsMkJBQTJCO0FBQzNCLHlCQUF5QjtBQUN6QjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLDZCQUE2Qiw4REFBUTtBQUNyQztBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSx5RUFBVSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9AcG9vbHRvZ2V0aGVyL2JuYy1vbmJvYXJkL2Rpc3QvZXNtL3NxdWFyZWxpbmstMTUwYTlkODMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTsgfSB9XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBzZWxmID0gdGhpcywgYXJncyA9IGFyZ3VtZW50czsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpOyBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkgeyBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7IH0gZnVuY3Rpb24gX3Rocm93KGVycikgeyBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTsgfSBfbmV4dCh1bmRlZmluZWQpOyB9KTsgfTsgfVxuXG5pbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZSc7XG5pbXBvcnQgeyBuIGFzIG5ldHdvcmtOYW1lLCBhIGFzIG5ldHdvcmtUb0lkLCBvIGFzIG9wZW5MaW5rIH0gZnJvbSAnLi9vbmJvYXJkLTE5N2VlNjA4LmpzJztcbmltcG9ydCAnYmlnbnVtYmVyLmpzJztcbmltcG9ydCAnYm5jLXNkayc7XG5pbXBvcnQgJ2Jvd3Nlcic7XG52YXIgc3Fsa0ljb24gPSBcIlxcbiAgPHN2ZyB3aWR0aD1cXFwiNDBweFxcXCIgaGVpZ2h0PVxcXCI0MHB4XFxcIiB2aWV3Qm94PVxcXCIwIDAgODggODhcXFwiIHZlcnNpb249XFxcIjEuMVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB4bWxuczp4bGluaz1cXFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1xcXCI+XFxuICA8ZyBpZD1cXFwiSWRlbnRpdHlcXFwiIHN0cm9rZT1cXFwibm9uZVxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxXFxcIiBmaWxsPVxcXCJub25lXFxcIiBmaWxsLXJ1bGU9XFxcImV2ZW5vZGRcXFwiPlxcbiAgICAgIDxnIGlkPVxcXCJBcnRib2FyZFxcXCIgdHJhbnNmb3JtPVxcXCJ0cmFuc2xhdGUoLTExLjAwMDAwMCwgLTIyMC4wMDAwMDApXFxcIj5cXG4gICAgICAgICAgPGcgaWQ9XFxcIkdyb3VwXFxcIiB0cmFuc2Zvcm09XFxcInRyYW5zbGF0ZSgxMS41MDg5MjUsIDIyMC41NTY5NzEpXFxcIj5cXG4gICAgICAgICAgICAgIDxjaXJjbGUgaWQ9XFxcIk92YWxcXFwiIGZpbGw9XFxcIiMzMTNENTNcXFwiIGN4PVxcXCI0My40OTEwNzQ5XFxcIiBjeT1cXFwiNDMuNDkxMDc0OVxcXCIgcj1cXFwiNDMuNDkxMDc0OVxcXCI+PC9jaXJjbGU+XFxuICAgICAgICAgICAgICA8cGF0aCBkPVxcXCJNMjYuOTgwNzc1MSw1My41MTIwNTM5IEwyNi45ODA3NzUxLDU2LjcwNDk1MzEgQzI2Ljk4MDc3NTEsNTguOTE0MDkyMSAyOC43NzE2MzYxLDYwLjcwNDk1MzEgMzAuOTgwNzc1MSw2MC43MDQ5NTMxIEw1Ni4wNDIyMzYzLDYwLjcwNDk1MzEgQzU4LjI1MTM3NTMsNjAuNzA0OTUzMSA2MC4wNDIyMzYzLDU4LjkxNDA5MjEgNjAuMDQyMjM2Myw1Ni43MDQ5NTMxIEw2MC4wNDIyMzYzLDMwLjI0NzMyOTcgQzYwLjA0MjIzNjMsMjguMDM4MTkwNyA1OC4yNTEzNzUzLDI2LjI0NzMyOTcgNTYuMDQyMjM2MywyNi4yNDczMjk3IEwyNi45ODA3NzUxLDI2LjI0NzMyOTcgTDI2Ljk4MDc3NTEsNDcuODg5NzgwNyBMMjYuOTgwNzc1MSw1My41MTIwNTM5IFogTTIwLjQ5MTA3NDksMjAuNDQzMDI5MyBMNTYuNDkxMDc0OSwyMC40NDMwMjkzIEM2Mi4wMTM5MjI0LDIwLjQ0MzAyOTMgNjYuNDkxMDc0OSwyNC45MjAxODE4IDY2LjQ5MTA3NDksMzAuNDQzMDI5MyBMNjYuNDkxMDc0OSw1Ni41MzkxMjA1IEM2Ni40OTEwNzQ5LDYyLjA2MTk2OCA2Mi4wMTM5MjI0LDY2LjUzOTEyMDUgNTYuNDkxMDc0OSw2Ni41MzkxMjA1IEwzMC40OTEwNzQ5LDY2LjUzOTEyMDUgQzI0Ljk2ODIyNzQsNjYuNTM5MTIwNSAyMC40OTEwNzQ5LDYyLjA2MTk2OCAyMC40OTEwNzQ5LDU2LjUzOTEyMDUgTDIwLjQ5MTA3NDksMjAuNDQzMDI5MyBaIE0zMy45NzIwNTUyLDI2LjI0NzMyOTcgTDQwLjQxOTA1MSwyNi4yNDczMjk3IEw0MC40MTkwNTEsNDEuMDMxNjI0NSBMNDAuNDE5MDUxLDQ5LjUxMjA1MzkgQzQwLjQxOTA1MSw1MS43MjExOTI5IDM4LjYyODE5LDUzLjUxMjA1MzkgMzYuNDE5MDUxLDUzLjUxMjA1MzkgTDI2Ljk4MDc3NTEsNTMuNTEyMDUzOSBMMjYuOTgwNzc1MSw0Ny44ODk3ODA3IEwzMy45NzIwNTUyLDQ3Ljg4OTc4MDcgTDMzLjk3MjA1NTIsMjYuMjQ3MzI5NyBaIE0zMy45NzIwNTUyLDI2LjI0NzMyOTcgTDQwLjQxOTA1MSwyNi4yNDczMjk3IEwzMy45NzIwNTUyLDI2LjI0NzMyOTcgWiBNNTMuMDUwOTU2Miw2MC43MDQ5NTMxIEw0Ni42MDM5NjA1LDYwLjcwNDk1MzEgTDQ2LjYwMzk2MDUsNDUuOTIwNjU4NCBMNDYuNjAzOTYwNSwzNy40NDAyMjg5IEM0Ni42MDM5NjA1LDM1LjIzMTA4OTkgNDguMzk0ODIxNSwzMy40NDAyMjg5IDUwLjYwMzk2MDUsMzMuNDQwMjI4OSBMNjAuMDQyMjM2MywzMy40NDAyMjg5IEw2MC4wNDIyMzYzLDM5LjA2MjUwMjEgTDUzLjA1MDk1NjIsMzkuMDYyNTAyMSBMNTMuMDUwOTU2Miw2MC43MDQ5NTMxIFogTTQ2LjYwMzk2MDUsNjAuNzA0OTUzMSBMNTMuMDUwOTU2Miw2MC43MDQ5NTMxIEw0Ni42MDM5NjA1LDYwLjcwNDk1MzEgWiBNNjAuMDQyMjM2MywzOS4wNjI1MDIxIEw2MC4wNDIyMzYzLDMzLjQ0MDIyODkgTDYwLjA0MjIzNjMsMzkuMDYyNTAyMSBaXFxcIiBpZD1cXFwiSWNvbi1CbHVlXFxcIiBmaWxsPVxcXCIjRThFRUZGXFxcIj48L3BhdGg+XFxuICAgICAgICAgIDwvZz5cXG4gICAgICA8L2c+XFxuICA8L2c+XFxuICA8L3N2Zz5cXG5cIjtcblxuZnVuY3Rpb24gc3F1YXJlbGluayhvcHRpb25zKSB7XG4gIHZhciBhcGlLZXkgPSBvcHRpb25zLmFwaUtleSxcbiAgICAgIG5ldHdvcmtJZCA9IG9wdGlvbnMubmV0d29ya0lkLFxuICAgICAgcHJlZmVycmVkID0gb3B0aW9ucy5wcmVmZXJyZWQsXG4gICAgICBsYWJlbCA9IG9wdGlvbnMubGFiZWwsXG4gICAgICBpY29uU3JjID0gb3B0aW9ucy5pY29uU3JjLFxuICAgICAgc3ZnID0gb3B0aW9ucy5zdmc7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbGFiZWwgfHwgJ1NxdWFyZWxpbmsnLFxuICAgIHN2Zzogc3ZnIHx8IHNxbGtJY29uLFxuICAgIGljb25TcmM6IGljb25TcmMsXG4gICAgd2FsbGV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3dhbGxldCA9IF9hc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZShoZWxwZXJzKSB7XG4gICAgICAgIHZhciBfeWllbGQkaW1wb3J0LCBTcXVhcmVsaW5rLCBpbnN0YW5jZSwgcHJvdmlkZXIsIEJpZ051bWJlcjtcblxuICAgICAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGltcG9ydCgnc3F1YXJlbGluaycpO1xuXG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBfeWllbGQkaW1wb3J0ID0gX2NvbnRleHQuc2VudDtcbiAgICAgICAgICAgICAgICBTcXVhcmVsaW5rID0gX3lpZWxkJGltcG9ydFtcImRlZmF1bHRcIl07XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgU3F1YXJlbGluayhhcGlLZXksIG5ldHdvcmtOYW1lKG5ldHdvcmtJZCksIHtcbiAgICAgICAgICAgICAgICAgIHVzZVN5bmM6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwcm92aWRlciA9IGluc3RhbmNlLmdldFByb3ZpZGVyU3luYygpO1xuICAgICAgICAgICAgICAgIEJpZ051bWJlciA9IGhlbHBlcnMuQmlnTnVtYmVyO1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwge1xuICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgXCJpbnRlcmZhY2VcIjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU3F1YXJlbGluaycsXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Q6IHByb3ZpZGVyLmVuYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzY29ubmVjdDogZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluc3RhbmNlLmFjY291bnRzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV0d29ya1RvSWQoaW5zdGFuY2UubmV0d29yaykpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmFsYW5jZToge1xuICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5zdGFuY2UuYWNjb3VudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZW5kQXN5bmMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzb25ycGM6ICcyLjAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2V0aF9nZXRCYWxhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IFtpbnN0YW5jZS5hY2NvdW50c1swXSwgJ2xhdGVzdCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEJpZ051bWJlcihyZXMucmVzdWx0KS50b1N0cmluZygxMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkOiBmdW5jdGlvbiBkYXNoYm9hcmQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wZW5MaW5rKCdodHRwczovL2FwcC5zcXVhcmVsaW5rLmNvbS8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBfY2FsbGVlKTtcbiAgICAgIH0pKTtcblxuICAgICAgZnVuY3Rpb24gd2FsbGV0KF94KSB7XG4gICAgICAgIHJldHVybiBfd2FsbGV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB3YWxsZXQ7XG4gICAgfSgpLFxuICAgIHR5cGU6ICdzZGsnLFxuICAgIGRlc2t0b3A6IHRydWUsXG4gICAgbW9iaWxlOiB0cnVlLFxuICAgIHByZWZlcnJlZDogcHJlZmVycmVkXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNxdWFyZWxpbms7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/@pooltogether/bnc-onboard/dist/esm/squarelink-150a9d83.js\n");

/***/ })

}]);
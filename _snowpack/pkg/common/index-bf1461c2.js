import { c as createCommonjsModule, r as react } from './index-8af8b000.js';
import { i as interopRequireDefault, _ as _extends_1, j as jsxRuntime } from './colorManipulator-f90367fb.js';
import { p as propTypes } from './index-57b04ade.js';
import { d as defaultTheme_1, e as esm } from './useThemeProps-0225b7a4.js';

var GlobalStyles_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);



var _defaultTheme = interopRequireDefault(defaultTheme_1);



function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function GlobalStyles(props) {
  return /*#__PURE__*/(0, jsxRuntime.jsx)(esm.GlobalStyles, (0, _extends2.default)({}, props, {
    defaultTheme: _defaultTheme.default
  }));
}
var _default = GlobalStyles;
exports.default = _default;
});

var GlobalStyles = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _GlobalStyles.default;
  }
});

var _GlobalStyles = interopRequireDefault(GlobalStyles_1);
});

export { GlobalStyles as G };

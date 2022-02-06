import { c as createCommonjsModule, r as react, g as getDefaultExportFromCjs } from '../../common/index-8af8b000.js';
import { i as interopRequireDefault, _ as _extends_1, j as jsxRuntime } from '../../common/colorManipulator-f90367fb.js';
import { p as propTypes } from '../../common/index-57b04ade.js';
import { u as useThemeProps_1 } from '../../common/useThemeProps-0225b7a4.js';
import { G as GlobalStyles } from '../../common/index-bf1461c2.js';
import '../../common/extends-7477639a.js';
import '../../common/clsx.m-8e2cac0c.js';

var CssBaseline_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = exports.html = exports.default = exports.body = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _GlobalStyles = interopRequireDefault(GlobalStyles);



function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const html = (theme, enableColorScheme) => (0, _extends2.default)({
  WebkitFontSmoothing: 'antialiased',
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box',
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: '100%'
}, enableColorScheme && {
  colorScheme: theme.palette.mode
});

exports.html = html;

const body = theme => (0, _extends2.default)({
  color: theme.palette.text.primary
}, theme.typography.body1, {
  backgroundColor: theme.palette.background.default,
  '@media print': {
    // Save printer ink.
    backgroundColor: theme.palette.common.white
  }
});

exports.body = body;

const styles = (theme, enableColorScheme = false) => {
  var _theme$components, _theme$components$Mui;

  let defaultStyles = {
    html: html(theme, enableColorScheme),
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold
    },
    body: (0, _extends2.default)({
      margin: 0
    }, body(theme), {
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: theme.palette.background.default
      }
    })
  };
  const themeOverrides = (_theme$components = theme.components) == null ? void 0 : (_theme$components$Mui = _theme$components.MuiCssBaseline) == null ? void 0 : _theme$components$Mui.styleOverrides;

  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }

  return defaultStyles;
};
/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */


exports.styles = styles;

function CssBaseline(inProps) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiCssBaseline'
  });
  const {
    children,
    enableColorScheme = false
  } = props;
  return /*#__PURE__*/(0, jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, jsxRuntime.jsx)(_GlobalStyles.default, {
      styles: theme => styles(theme, enableColorScheme)
    }), children]
  });
}
var _default = CssBaseline;
exports.default = _default;
});

var CssBaseline = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _CssBaseline.default;
  }
});

var _CssBaseline = interopRequireDefault(CssBaseline_1);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(CssBaseline);

export default __pika_web_default_export_for_treeshaking__;

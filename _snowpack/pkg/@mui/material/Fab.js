import { c as createCommonjsModule, g as getDefaultExportFromCjs } from '../../common/_commonjsHelpers-913f9c4a.js';
import { i as interopRequireDefault, _ as _extends_1, j as jsxRuntime } from '../../common/colorManipulator-ba67e800.js';
import { o as objectWithoutPropertiesLoose, u as useThemeProps_1 } from '../../common/useThemeProps-f16eb380.js';
import { r as react } from '../../common/index-c9e50cb4.js';
import { p as propTypes } from '../../common/index-a55bd6b4.js';
import { c as clsx } from '../../common/clsx.m-8e2cac0c.js';
import { b as base } from '../../common/index-621ebc05.js';
import { B as ButtonBase } from '../../common/index-b9863ac4.js';
import { c as capitalize } from '../../common/capitalize-e76b901c.js';
import { s as styled_1 } from '../../common/styled-d6ae4b01.js';
import '../../common/extends-7477639a.js';
import '../../common/generateUtilityClasses-930c236a.js';
import '../../common/index-c86b1a01.js';
import '../../common/createPopper-a6a1f203.js';
import '../../common/useForkRef-cb308fbb.js';
import '../../common/useIsFocusVisible-5a6f5209.js';
import '../../common/index-85ef5144.js';
import '../../common/assertThisInitialized-a4a25931.js';

var fabClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getFabUtilityClass = getFabUtilityClass;



function getFabUtilityClass(slot) {
  return (0, base.generateUtilityClass)('MuiFab', slot);
}

const fabClasses = (0, base.generateUtilityClasses)('MuiFab', ['root', 'primary', 'secondary', 'extended', 'circular', 'focusVisible', 'disabled', 'colorInherit', 'sizeSmall', 'sizeMedium', 'sizeLarge']);
var _default = fabClasses;
exports.default = _default;
});

var Fab_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(clsx);



var _ButtonBase = interopRequireDefault(ButtonBase);

var _capitalize = interopRequireDefault(capitalize);

var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _fabClasses = _interopRequireWildcard(fabClasses_1);

var _styled = interopRequireDefault(styled_1);



const _excluded = ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    color,
    variant,
    classes,
    size
  } = ownerState;
  const slots = {
    root: ['root', variant, `size${(0, _capitalize.default)(size)}`, color === 'inherit' && 'colorInherit', color === 'primary' && 'primary', color === 'secondary' && 'secondary']
  };
  return (0, base.unstable_composeClasses)(slots, _fabClasses.getFabUtilityClass, classes);
};

const FabRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiFab',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`size${(0, _capitalize.default)(ownerState.size)}`], ownerState.color === 'inherit' && styles.colorInherit, ownerState.color === 'primary' && styles.primary, ownerState.color === 'secondary' && styles.secondary];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({}, theme.typography.button, {
  minHeight: 36,
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short
  }),
  borderRadius: '50%',
  padding: 0,
  minWidth: 0,
  width: 56,
  height: 56,
  boxShadow: theme.shadows[6],
  '&:active': {
    boxShadow: theme.shadows[12]
  },
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  '&:hover': {
    backgroundColor: theme.palette.grey.A100,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette.grey[300]
    },
    textDecoration: 'none'
  },
  [`&.${_fabClasses.default.focusVisible}`]: {
    boxShadow: theme.shadows[6]
  },
  [`&.${_fabClasses.default.disabled}`]: {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  }
}, ownerState.size === 'small' && {
  width: 40,
  height: 40
}, ownerState.size === 'medium' && {
  width: 48,
  height: 48
}, ownerState.variant === 'extended' && {
  borderRadius: 48 / 2,
  padding: '0 16px',
  width: 'auto',
  minHeight: 'auto',
  minWidth: 48,
  height: 48
}, ownerState.variant === 'extended' && ownerState.size === 'small' && {
  width: 'auto',
  padding: '0 8px',
  borderRadius: 34 / 2,
  minWidth: 34,
  height: 34
}, ownerState.variant === 'extended' && ownerState.size === 'medium' && {
  width: 'auto',
  padding: '0 16px',
  borderRadius: 40 / 2,
  minWidth: 40,
  height: 40
}, ownerState.color === 'inherit' && {
  color: 'inherit'
}), ({
  theme,
  ownerState
}) => (0, _extends2.default)({}, ownerState.color === 'primary' && {
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette.primary.main
    }
  }
}, ownerState.color === 'secondary' && {
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette.secondary.main
    }
  }
}));
const Fab = /*#__PURE__*/React.forwardRef(function Fab(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiFab'
  });
  const {
    children,
    className,
    color = 'default',
    component = 'button',
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = 'large',
    variant = 'circular'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, jsxRuntime.jsx)(FabRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: (0, _clsx.default)(classes.focusVisible, focusVisibleClassName),
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: children
  }));
});
var _default = Fab;
exports.default = _default;
});

var Fab = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  fabClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Fab.default;
  }
});
Object.defineProperty(exports, "fabClasses", {
  enumerable: true,
  get: function () {
    return _fabClasses.default;
  }
});

var _Fab = interopRequireDefault(Fab_1);

var _fabClasses = _interopRequireWildcard(fabClasses_1);

Object.keys(_fabClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _fabClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fabClasses[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(Fab);

export default __pika_web_default_export_for_treeshaking__;

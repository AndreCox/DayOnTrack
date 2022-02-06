import { c as createCommonjsModule, r as react, g as getDefaultExportFromCjs } from '../../common/index-8af8b000.js';
import { i as interopRequireDefault, _ as _extends_1, j as jsxRuntime } from '../../common/colorManipulator-f90367fb.js';
import { o as objectWithoutPropertiesLoose, u as useThemeProps_1, e as esm } from '../../common/useThemeProps-0225b7a4.js';
import { p as propTypes } from '../../common/index-57b04ade.js';
import { c as clsx } from '../../common/clsx.m-8e2cac0c.js';
import { b as base } from '../../common/index-d6156f4b.js';
import { c as capitalize } from '../../common/capitalize-84999aad.js';
import { s as styled_1 } from '../../common/styled-423613d7.js';
import { u as useControlled } from '../../common/useControlled-29d5acc5.js';
import { u as useFormControl_1 } from '../../common/useFormControl-1d44ba88.js';
import { B as ButtonBase } from '../../common/index-0c308281.js';
import '../../common/extends-7477639a.js';
import '../../common/generateUtilityClasses-930c236a.js';
import '../../common/index-36c3da37.js';
import '../../common/createPopper-a6a1f203.js';
import '../../common/useForkRef-3a1adf2c.js';
import '../../common/useIsFocusVisible-a17e8c98.js';
import '../../common/index-a06c47be.js';
import '../../common/assertThisInitialized-a4a25931.js';

var switchBaseClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getSwitchBaseUtilityClass = getSwitchBaseUtilityClass;



function getSwitchBaseUtilityClass(slot) {
  return (0, base.generateUtilityClass)('PrivateSwitchBase', slot);
}

const switchBaseClasses = (0, base.generateUtilityClasses)('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
var _default = switchBaseClasses;
exports.default = _default;
});

var SwitchBase_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(clsx);





var _capitalize = interopRequireDefault(capitalize);

var _styled = interopRequireDefault(styled_1);

var _useControlled = interopRequireDefault(useControlled);

var _useFormControl = interopRequireDefault(useFormControl_1);

var _ButtonBase = interopRequireDefault(ButtonBase);





const _excluded = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes,
    checked,
    disabled,
    edge
  } = ownerState;
  const slots = {
    root: ['root', checked && 'checked', disabled && 'disabled', edge && `edge${(0, _capitalize.default)(edge)}`],
    input: ['input']
  };
  return (0, base.unstable_composeClasses)(slots, switchBaseClasses_1.getSwitchBaseUtilityClass, classes);
};

const SwitchBaseRoot = (0, _styled.default)(_ButtonBase.default)(({
  ownerState
}) => (0, _extends2.default)({
  padding: 9,
  borderRadius: '50%'
}, ownerState.edge === 'start' && {
  marginLeft: ownerState.size === 'small' ? -3 : -12
}, ownerState.edge === 'end' && {
  marginRight: ownerState.size === 'small' ? -3 : -12
}));
const SwitchBaseInput = (0, _styled.default)('input')({
  cursor: 'inherit',
  position: 'absolute',
  opacity: 0,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
});
/**
 * @ignore - internal component.
 */

const SwitchBase = /*#__PURE__*/React.forwardRef(function SwitchBase(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required,
    tabIndex,
    type,
    value
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const [checked, setCheckedState] = (0, _useControlled.default)({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchBase',
    state: 'checked'
  });
  const muiFormControl = (0, _useFormControl.default)();

  const handleFocus = event => {
    if (onFocus) {
      onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  const handleBlur = event => {
    if (onBlur) {
      onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  const handleInputChange = event => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    const newChecked = event.target.checked;
    setCheckedState(newChecked);

    if (onChange) {
      // TODO v6: remove the second argument.
      onChange(event, newChecked);
    }
  };

  let disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const hasLabelFor = type === 'checkbox' || type === 'radio';
  const ownerState = (0, _extends2.default)({}, props, {
    checked,
    disabled,
    disableFocusRipple,
    edge
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, jsxRuntime.jsxs)(SwitchBaseRoot, (0, _extends2.default)({
    component: "span",
    className: (0, _clsx.default)(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled: disabled,
    tabIndex: null,
    role: undefined,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/(0, jsxRuntime.jsx)(SwitchBaseInput, (0, _extends2.default)({
      autoFocus: autoFocus,
      checked: checkedProp,
      defaultChecked: defaultChecked,
      className: classes.input,
      disabled: disabled,
      id: hasLabelFor && id,
      name: name,
      onChange: handleInputChange,
      readOnly: readOnly,
      ref: inputRef,
      required: required,
      ownerState: ownerState,
      tabIndex: tabIndex,
      type: type
    }, type === 'checkbox' && value === undefined ? {} : {
      value
    }, inputProps)), checked ? checkedIcon : icon]
  }));
}); // NB: If changed, please update Checkbox, Switch and Radio
var _default = SwitchBase;
exports.default = _default;
});

var switchClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getSwitchUtilityClass = getSwitchUtilityClass;



function getSwitchUtilityClass(slot) {
  return (0, base.generateUtilityClass)('MuiSwitch', slot);
}

const switchClasses = (0, base.generateUtilityClasses)('MuiSwitch', ['root', 'edgeStart', 'edgeEnd', 'switchBase', 'colorPrimary', 'colorSecondary', 'sizeSmall', 'sizeMedium', 'checked', 'disabled', 'input', 'thumb', 'track']);
var _default = switchClasses;
exports.default = _default;
});

var Switch_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(clsx);







var _capitalize = interopRequireDefault(capitalize);

var _SwitchBase = interopRequireDefault(SwitchBase_1);

var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _styled = interopRequireDefault(styled_1);

var _switchClasses = _interopRequireWildcard(switchClasses_1);



const _excluded = ["className", "color", "edge", "size", "sx"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes,
    edge,
    size,
    color,
    checked,
    disabled
  } = ownerState;
  const slots = {
    root: ['root', edge && `edge${(0, _capitalize.default)(edge)}`, `size${(0, _capitalize.default)(size)}`],
    switchBase: ['switchBase', `color${(0, _capitalize.default)(color)}`, checked && 'checked', disabled && 'disabled'],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input']
  };
  const composedClasses = (0, base.unstable_composeClasses)(slots, _switchClasses.getSwitchUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};

const SwitchRoot = (0, _styled.default)('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.edge && styles[`edge${(0, _capitalize.default)(ownerState.edge)}`], styles[`size${(0, _capitalize.default)(ownerState.size)}`]];
  }
})(({
  ownerState
}) => (0, _extends2.default)({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0,
  // Reset the stacking context.
  verticalAlign: 'middle',
  // For correct alignment with the text.
  '@media print': {
    colorAdjust: 'exact'
  }
}, ownerState.edge === 'start' && {
  marginLeft: -8
}, ownerState.edge === 'end' && {
  marginRight: -8
}, ownerState.size === 'small' && {
  width: 40,
  height: 24,
  padding: 7,
  [`& .${_switchClasses.default.thumb}`]: {
    width: 16,
    height: 16
  },
  [`& .${_switchClasses.default.switchBase}`]: {
    padding: 4,
    [`&.${_switchClasses.default.checked}`]: {
      transform: 'translateX(16px)'
    }
  }
}));
const SwitchSwitchBase = (0, _styled.default)(_SwitchBase.default, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.switchBase, {
      [`& .${_switchClasses.default.input}`]: styles.input
    }, ownerState.color !== 'default' && styles[`color${(0, _capitalize.default)(ownerState.color)}`]];
  }
})(({
  theme
}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  // Render above the focus ripple.
  color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300],
  transition: theme.transitions.create(['left', 'transform'], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${_switchClasses.default.checked}`]: {
    transform: 'translateX(20px)'
  },
  [`&.${_switchClasses.default.disabled}`]: {
    color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
  },
  [`&.${_switchClasses.default.checked} + .${_switchClasses.default.track}`]: {
    opacity: 0.5
  },
  [`&.${_switchClasses.default.disabled} + .${_switchClasses.default.track}`]: {
    opacity: theme.palette.mode === 'light' ? 0.12 : 0.2
  },
  [`& .${_switchClasses.default.input}`]: {
    left: '-100%',
    width: '300%'
  }
}), ({
  theme,
  ownerState
}) => (0, _extends2.default)({
  '&:hover': {
    backgroundColor: (0, esm.alpha)(theme.palette.action.active, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, ownerState.color !== 'default' && {
  [`&.${_switchClasses.default.checked}`]: {
    color: theme.palette[ownerState.color].main,
    '&:hover': {
      backgroundColor: (0, esm.alpha)(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    [`&.${_switchClasses.default.disabled}`]: {
      color: theme.palette.mode === 'light' ? (0, esm.lighten)(theme.palette[ownerState.color].main, 0.62) : (0, esm.darken)(theme.palette[ownerState.color].main, 0.55)
    }
  },
  [`&.${_switchClasses.default.checked} + .${_switchClasses.default.track}`]: {
    backgroundColor: theme.palette[ownerState.color].main
  }
}));
const SwitchTrack = (0, _styled.default)('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track
})(({
  theme
}) => ({
  height: '100%',
  width: '100%',
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
  opacity: theme.palette.mode === 'light' ? 0.38 : 0.3
}));
const SwitchThumb = (0, _styled.default)('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb
})(({
  theme
}) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: 'currentColor',
  width: 20,
  height: 20,
  borderRadius: '50%'
}));
const Switch = /*#__PURE__*/React.forwardRef(function Switch(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSwitch'
  });
  const {
    className,
    color = 'primary',
    edge = false,
    size = 'medium',
    sx
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    edge,
    size
  });
  const classes = useUtilityClasses(ownerState);
  const icon = /*#__PURE__*/(0, jsxRuntime.jsx)(SwitchThumb, {
    className: classes.thumb,
    ownerState: ownerState
  });
  return /*#__PURE__*/(0, jsxRuntime.jsxs)(SwitchRoot, {
    className: (0, _clsx.default)(classes.root, className),
    sx: sx,
    ownerState: ownerState,
    children: [/*#__PURE__*/(0, jsxRuntime.jsx)(SwitchSwitchBase, (0, _extends2.default)({
      type: "checkbox",
      icon: icon,
      checkedIcon: icon,
      ref: ref,
      ownerState: ownerState
    }, other, {
      classes: (0, _extends2.default)({}, classes, {
        root: classes.switchBase
      })
    })), /*#__PURE__*/(0, jsxRuntime.jsx)(SwitchTrack, {
      className: classes.track,
      ownerState: ownerState
    })]
  });
});
var _default = Switch;
exports.default = _default;
});

var Switch = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  switchClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Switch.default;
  }
});
Object.defineProperty(exports, "switchClasses", {
  enumerable: true,
  get: function () {
    return _switchClasses.default;
  }
});

var _Switch = interopRequireDefault(Switch_1);

var _switchClasses = _interopRequireWildcard(switchClasses_1);

Object.keys(_switchClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _switchClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _switchClasses[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(Switch);

export default __pika_web_default_export_for_treeshaking__;

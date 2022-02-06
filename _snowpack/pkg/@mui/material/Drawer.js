import { c as createCommonjsModule, r as react, g as getDefaultExportFromCjs } from '../../common/index-8af8b000.js';
import { i as interopRequireDefault, _ as _extends_1, j as jsxRuntime } from '../../common/colorManipulator-f90367fb.js';
import { o as objectWithoutPropertiesLoose, f as createTransitions_1, u as useThemeProps_1 } from '../../common/useThemeProps-0225b7a4.js';
import { p as propTypes } from '../../common/index-57b04ade.js';
import { c as clsx } from '../../common/clsx.m-8e2cac0c.js';
import { b as base } from '../../common/index-d6156f4b.js';
import { u as utils$1, M as Modal } from '../../common/index-d8bd9007.js';
import { e as esm } from '../../common/index-a06c47be.js';
import { d as debounce } from '../../common/ownerWindow-f923757b.js';
import { u as useForkRef } from '../../common/useForkRef-3a1adf2c.js';
import { u as useTheme_1 } from '../../common/useTheme-194bd28a.js';
import { u as utils } from '../../common/index-06ac84f9.js';
import { P as Paper } from '../../common/index-f6a2d0b7.js';
import { c as capitalize } from '../../common/capitalize-84999aad.js';
import { s as styled_1 } from '../../common/styled-423613d7.js';
import '../../common/extends-7477639a.js';
import '../../common/generateUtilityClasses-930c236a.js';
import '../../common/index-36c3da37.js';
import '../../common/createPopper-a6a1f203.js';
import '../../common/assertThisInitialized-a4a25931.js';
import '../../common/isMuiElement-9b900e48.js';
import '../../common/useEnhancedEffect-74b0108d.js';
import '../../common/useControlled-29d5acc5.js';
import '../../common/useIsFocusVisible-a17e8c98.js';

var Slide_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.setTranslateValue = setTranslateValue;

var _extends2 = interopRequireDefault(_extends_1);

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);





var _debounce = interopRequireDefault(debounce);

var _useForkRef = interopRequireDefault(useForkRef);

var _useTheme = interopRequireDefault(useTheme_1);









const _excluded = ["addEndListener", "appear", "children", "container", "direction", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Translate the node so it can't be seen on the screen.
// Later, we're going to translate the node back to its original location with `none`.
function getTranslateValue(direction, node, resolvedContainer) {
  const rect = node.getBoundingClientRect();
  const containerRect = resolvedContainer && resolvedContainer.getBoundingClientRect();
  const containerWindow = (0, utils.ownerWindow)(node);
  let transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = containerWindow.getComputedStyle(node);
    transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
  }

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    if (containerRect) {
      return `translateX(${containerRect.right + offsetX - rect.left}px)`;
    }

    return `translateX(${containerWindow.innerWidth + offsetX - rect.left}px)`;
  }

  if (direction === 'right') {
    if (containerRect) {
      return `translateX(-${rect.right - containerRect.left - offsetX}px)`;
    }

    return `translateX(-${rect.left + rect.width - offsetX}px)`;
  }

  if (direction === 'up') {
    if (containerRect) {
      return `translateY(${containerRect.bottom + offsetY - rect.top}px)`;
    }

    return `translateY(${containerWindow.innerHeight + offsetY - rect.top}px)`;
  } // direction === 'down'


  if (containerRect) {
    return `translateY(-${rect.top - containerRect.top + rect.height - offsetY}px)`;
  }

  return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

function resolveContainer(containerPropProp) {
  return typeof containerPropProp === 'function' ? containerPropProp() : containerPropProp;
}

function setTranslateValue(direction, node, containerProp) {
  const resolvedContainer = resolveContainer(containerProp);
  const transform = getTranslateValue(direction, node, resolvedContainer);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}

const defaultEasing = {
  enter: createTransitions_1.easing.easeOut,
  exit: createTransitions_1.easing.sharp
};
const defaultTimeout = {
  enter: createTransitions_1.duration.enteringScreen,
  exit: createTransitions_1.duration.leavingScreen
};
/**
 * The Slide transition is used by the [Drawer](/components/drawers/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

const Slide = /*#__PURE__*/React.forwardRef(function Slide(props, ref) {
  const {
    addEndListener,
    appear = true,
    children,
    container: containerProp,
    direction = 'down',
    easing: easingProp = defaultEasing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = esm.Transition
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const theme = (0, _useTheme.default)();
  const childrenRef = React.useRef(null);
  const handleRefIntermediary = (0, _useForkRef.default)(children.ref, childrenRef);
  const handleRef = (0, _useForkRef.default)(handleRefIntermediary, ref);

  const normalizedTransitionCallback = callback => isAppearing => {
    if (callback) {
      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (isAppearing === undefined) {
        callback(childrenRef.current);
      } else {
        callback(childrenRef.current, isAppearing);
      }
    }
  };

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    setTranslateValue(direction, node, containerProp);
    (0, utils$1.reflow)(node);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const transitionProps = (0, utils$1.getTransitionProps)({
      timeout,
      style,
      easing: easingProp
    }, {
      mode: 'enter'
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', (0, _extends2.default)({}, transitionProps));
    node.style.transition = theme.transitions.create('transform', (0, _extends2.default)({}, transitionProps));
    node.style.webkitTransform = 'none';
    node.style.transform = 'none';

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback(node => {
    const transitionProps = (0, utils$1.getTransitionProps)({
      timeout,
      style,
      easing: easingProp
    }, {
      mode: 'exit'
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', transitionProps);
    node.style.transition = theme.transitions.create('transform', transitionProps);
    setTranslateValue(direction, node, containerProp);

    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(node => {
    // No need for transitions when the component is hidden
    node.style.webkitTransition = '';
    node.style.transition = '';

    if (onExited) {
      onExited(node);
    }
  });

  const handleAddEndListener = next => {
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(childrenRef.current, next);
    }
  };

  const updatePosition = React.useCallback(() => {
    if (childrenRef.current) {
      setTranslateValue(direction, childrenRef.current, containerProp);
    }
  }, [direction, containerProp]);
  React.useEffect(() => {
    // Skip configuration where the position is screen size invariant.
    if (inProp || direction === 'down' || direction === 'right') {
      return undefined;
    }

    const handleResize = (0, _debounce.default)(() => {
      if (childrenRef.current) {
        setTranslateValue(direction, childrenRef.current, containerProp);
      }
    });
    const containerWindow = (0, utils.ownerWindow)(childrenRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [direction, inProp, containerProp]);
  React.useEffect(() => {
    if (!inProp) {
      // We need to update the position of the drawer when the direction change and
      // when it's hidden.
      updatePosition();
    }
  }, [inProp, updatePosition]);
  return /*#__PURE__*/(0, jsxRuntime.jsx)(TransitionComponent, (0, _extends2.default)({
    nodeRef: childrenRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    appear: appear,
    in: inProp,
    timeout: timeout
  }, other, {
    children: (state, childProps) => {
      return /*#__PURE__*/React.cloneElement(children, (0, _extends2.default)({
        ref: handleRef,
        style: (0, _extends2.default)({
          visibility: state === 'exited' && !inProp ? 'hidden' : undefined
        }, style, children.props.style)
      }, childProps));
    }
  }));
});
var _default = Slide;
exports.default = _default;
});

var Slide = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Slide.default;
  }
});

var _Slide = interopRequireDefault(Slide_1);
});

var drawerClasses_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getDrawerUtilityClass = getDrawerUtilityClass;



function getDrawerUtilityClass(slot) {
  return (0, base.generateUtilityClass)('MuiDrawer', slot);
}

const drawerClasses = (0, base.generateUtilityClasses)('MuiDrawer', ['root', 'docked', 'paper', 'paperAnchorLeft', 'paperAnchorRight', 'paperAnchorTop', 'paperAnchorBottom', 'paperAnchorDockedLeft', 'paperAnchorDockedRight', 'paperAnchorDockedTop', 'paperAnchorDockedBottom', 'modal']);
var _default = drawerClasses;
exports.default = _default;
});

var Drawer_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAnchor = getAnchor;
exports.isHorizontal = isHorizontal;

var _objectWithoutPropertiesLoose2 = interopRequireDefault(objectWithoutPropertiesLoose);

var _extends2 = interopRequireDefault(_extends_1);

var React = _interopRequireWildcard(react);

var _propTypes = interopRequireDefault(propTypes);

var _clsx = interopRequireDefault(clsx);





var _Modal = interopRequireDefault(Modal);

var _Slide = interopRequireDefault(Slide);

var _Paper = interopRequireDefault(Paper);

var _capitalize = interopRequireDefault(capitalize);



var _useTheme = interopRequireDefault(useTheme_1);

var _useThemeProps = interopRequireDefault(useThemeProps_1);

var _styled = _interopRequireWildcard(styled_1);





const _excluded = ["BackdropProps"],
      _excluded2 = ["anchor", "BackdropProps", "children", "className", "elevation", "hideBackdrop", "ModalProps", "onClose", "open", "PaperProps", "SlideProps", "TransitionComponent", "transitionDuration", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, (ownerState.variant === 'permanent' || ownerState.variant === 'persistent') && styles.docked, styles.modal];
};

const useUtilityClasses = ownerState => {
  const {
    classes,
    anchor,
    variant
  } = ownerState;
  const slots = {
    root: ['root'],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: ['paper', `paperAnchor${(0, _capitalize.default)(anchor)}`, variant !== 'temporary' && `paperAnchorDocked${(0, _capitalize.default)(anchor)}`]
  };
  return (0, base.unstable_composeClasses)(slots, drawerClasses_1.getDrawerUtilityClass, classes);
};

const DrawerRoot = (0, _styled.default)(_Modal.default, {
  name: 'MuiDrawer',
  slot: 'Root',
  overridesResolver
})(({
  theme
}) => ({
  zIndex: theme.zIndex.drawer
}));
const DrawerDockedRoot = (0, _styled.default)('div', {
  shouldForwardProp: _styled.rootShouldForwardProp,
  name: 'MuiDrawer',
  slot: 'Docked',
  skipVariantsResolver: false,
  overridesResolver
})({
  flex: '0 0 auto'
});
const DrawerPaper = (0, _styled.default)(_Paper.default, {
  name: 'MuiDrawer',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.paper, styles[`paperAnchor${(0, _capitalize.default)(ownerState.anchor)}`], ownerState.variant !== 'temporary' && styles[`paperAnchorDocked${(0, _capitalize.default)(ownerState.anchor)}`]];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: '1 0 auto',
  zIndex: theme.zIndex.drawer,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  // temporary style
  position: 'fixed',
  top: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  // At some point, it would be better to keep it for keyboard users.
  // :focus-ring CSS pseudo-class will help.
  outline: 0
}, ownerState.anchor === 'left' && {
  left: 0
}, ownerState.anchor === 'top' && {
  top: 0,
  left: 0,
  right: 0,
  height: 'auto',
  maxHeight: '100%'
}, ownerState.anchor === 'right' && {
  right: 0
}, ownerState.anchor === 'bottom' && {
  top: 'auto',
  left: 0,
  bottom: 0,
  right: 0,
  height: 'auto',
  maxHeight: '100%'
}, ownerState.anchor === 'left' && ownerState.variant !== 'temporary' && {
  borderRight: `1px solid ${theme.palette.divider}`
}, ownerState.anchor === 'top' && ownerState.variant !== 'temporary' && {
  borderBottom: `1px solid ${theme.palette.divider}`
}, ownerState.anchor === 'right' && ownerState.variant !== 'temporary' && {
  borderLeft: `1px solid ${theme.palette.divider}`
}, ownerState.anchor === 'bottom' && ownerState.variant !== 'temporary' && {
  borderTop: `1px solid ${theme.palette.divider}`
}));
const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};

function isHorizontal(anchor) {
  return ['left', 'right'].indexOf(anchor) !== -1;
}

function getAnchor(theme, anchor) {
  return theme.direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

const defaultTransitionDuration = {
  enter: createTransitions_1.duration.enteringScreen,
  exit: createTransitions_1.duration.leavingScreen
};
/**
 * The props of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */

const Drawer = /*#__PURE__*/React.forwardRef(function Drawer(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiDrawer'
  });
  const {
    anchor: anchorProp = 'left',
    BackdropProps,
    children,
    className,
    elevation = 16,
    hideBackdrop = false,
    ModalProps: {
      BackdropProps: BackdropPropsProp
    } = {},
    onClose,
    open = false,
    PaperProps = {},
    SlideProps,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = _Slide.default,
    transitionDuration = defaultTransitionDuration,
    variant = 'temporary'
  } = props,
        ModalProps = (0, _objectWithoutPropertiesLoose2.default)(props.ModalProps, _excluded),
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
  const theme = (0, _useTheme.default)(); // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.

  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);
  const anchorInvariant = getAnchor(theme, anchorProp);
  const anchor = anchorProp;
  const ownerState = (0, _extends2.default)({}, props, {
    anchor,
    elevation,
    open,
    variant
  }, other);
  const classes = useUtilityClasses(ownerState);
  const drawer = /*#__PURE__*/(0, jsxRuntime.jsx)(DrawerPaper, (0, _extends2.default)({
    elevation: variant === 'temporary' ? elevation : 0,
    square: true
  }, PaperProps, {
    className: (0, _clsx.default)(classes.paper, PaperProps.className),
    ownerState: ownerState,
    children: children
  }));

  if (variant === 'permanent') {
    return /*#__PURE__*/(0, jsxRuntime.jsx)(DrawerDockedRoot, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, classes.docked, className),
      ownerState: ownerState,
      ref: ref
    }, other, {
      children: drawer
    }));
  }

  const slidingDrawer = /*#__PURE__*/(0, jsxRuntime.jsx)(TransitionComponent, (0, _extends2.default)({
    in: open,
    direction: oppositeDirection[anchorInvariant],
    timeout: transitionDuration,
    appear: mounted.current
  }, SlideProps, {
    children: drawer
  }));

  if (variant === 'persistent') {
    return /*#__PURE__*/(0, jsxRuntime.jsx)(DrawerDockedRoot, (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, classes.docked, className),
      ownerState: ownerState,
      ref: ref
    }, other, {
      children: slidingDrawer
    }));
  } // variant === temporary


  return /*#__PURE__*/(0, jsxRuntime.jsx)(DrawerRoot, (0, _extends2.default)({
    BackdropProps: (0, _extends2.default)({}, BackdropProps, BackdropPropsProp, {
      transitionDuration
    }),
    className: (0, _clsx.default)(classes.root, classes.modal, className),
    open: open,
    ownerState: ownerState,
    onClose: onClose,
    hideBackdrop: hideBackdrop,
    ref: ref
  }, other, ModalProps, {
    children: slidingDrawer
  }));
});
var _default = Drawer;
exports.default = _default;
});

var Drawer = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  drawerClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _Drawer.default;
  }
});
Object.defineProperty(exports, "drawerClasses", {
  enumerable: true,
  get: function () {
    return _drawerClasses.default;
  }
});

var _Drawer = interopRequireDefault(Drawer_1);

var _drawerClasses = _interopRequireWildcard(drawerClasses_1);

Object.keys(_drawerClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _drawerClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _drawerClasses[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(Drawer);

export default __pika_web_default_export_for_treeshaking__;

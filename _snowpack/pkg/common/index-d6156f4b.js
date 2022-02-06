import { _ as _extends } from './extends-7477639a.js';
import { _ as _objectWithoutPropertiesLoose, c as clsx } from './clsx.m-8e2cac0c.js';
import { r as react } from './index-8af8b000.js';
import { g as generateUtilityClass, a as generateUtilityClasses, c as composeClasses, C as ClassNameGenerator } from './generateUtilityClasses-930c236a.js';
import { v as useId, x as useControlled, y as useEventCallback, q as setRef, j as jsxRuntime, e as capitalize, A as useIsFocusVisible, z as useForkRef, o as ownerDocument, f as formatMuiErrorMessage, t as useEnhancedEffect, p as ownerWindow, h as createChainedFunction, k as debounce } from './colorManipulator-f90367fb.js';
import { a as usePreviousProps, g as getScrollbarSize, v as visuallyHidden } from './useThemeProps-0225b7a4.js';
import { r as reactDom } from './index-36c3da37.js';
import { i as isHTMLElement, g as getNodeName, p as popperGenerator, e as eventListeners, a as popperOffsets, c as computeStyles, o as offset, f as flip, b as preventOverflow, d as arrow, h as hide } from './createPopper-a6a1f203.js';

/**
 * Determines if a given element is a DOM element name (i.e. not a React component).
 */
function isHostComponent(element) {
  return typeof element === 'string';
}

/**
 * Appends the ownerState object to the props, merging with the existing one if necessary.
 *
 * @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node, `ownerState` are not applied.
 * @param existingProps Props of the element.
 * @param ownerState
 */

function appendOwnerState(elementType, existingProps = {}, ownerState) {
  if (isHostComponent(elementType)) {
    return existingProps;
  }

  return _extends({}, existingProps, {
    ownerState: _extends({}, existingProps.ownerState, ownerState)
  });
}

function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}

/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 */
function extractEventHandlers(object, excludeKeys = []) {
  if (object === undefined) {
    return {};
  }

  const result = {};
  Object.keys(object).filter(prop => prop.match(/^on[A-Z]/) && typeof object[prop] === 'function' && !excludeKeys.includes(prop)).forEach(prop => {
    result[prop] = object[prop];
  });
  return result;
}

// Give up on IE11 support for this feature

function stripDiacritics(string) {
  return typeof string.normalize !== 'undefined' ? string.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : string;
}

function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = 'any',
    stringify,
    trim = false
  } = config;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim ? inputValue.trim() : inputValue;

    if (ignoreCase) {
      input = input.toLowerCase();
    }

    if (ignoreAccents) {
      input = stripDiacritics(input);
    }

    const filteredOptions = options.filter(option => {
      let candidate = (stringify || getOptionLabel)(option);

      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }

      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }

      return matchFrom === 'start' ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === 'number' ? filteredOptions.slice(0, limit) : filteredOptions;
  };
} // To replace with .findIndex() once we stop IE11 support.

function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

const defaultFilterOptions = createFilterOptions(); // Number of options to jump in list box when pageup and pagedown keys are used.

const pageSize = 5;
function useAutocomplete(props) {
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    disabled: disabledProp,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = 'useAutocomplete',
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionLabel: getOptionLabelProp = option => {
      var _option$label;

      return (_option$label = option.label) != null ? _option$label : option;
    },
    isOptionEqualToValue = (option, value) => option === value,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    readOnly = false,
    selectOnFocus = !props.freeSolo,
    value: valueProp
  } = props;
  const id = useId(idProp);
  let getOptionLabel = getOptionLabelProp;

  getOptionLabel = option => {
    const optionLabel = getOptionLabelProp(option);

    if (typeof optionLabel !== 'string') {

      return String(optionLabel);
    }

    return optionLabel;
  };

  const ignoreFocus = react.useRef(false);
  const firstFocus = react.useRef(true);
  const inputRef = react.useRef(null);
  const listboxRef = react.useRef(null);
  const [anchorEl, setAnchorEl] = react.useState(null);
  const [focusedTag, setFocusedTag] = react.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = react.useRef(defaultHighlighted);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: '',
    name: componentName,
    state: 'inputValue'
  });
  const [focused, setFocused] = react.useState(false);
  const resetInputValue = react.useCallback((event, newValue) => {
    // retain current `inputValue` if new option isn't selected and `clearOnBlur` is false
    // When `multiple` is enabled, `newValue` is an array of all selected items including the newly selected item
    const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;

    if (!isOptionSelected && !clearOnBlur) {
      return;
    }

    let newInputValue;

    if (multiple) {
      newInputValue = '';
    } else if (newValue == null) {
      newInputValue = '';
    } else {
      const optionLabel = getOptionLabel(newValue);
      newInputValue = typeof optionLabel === 'string' ? optionLabel : '';
    }

    if (inputValue === newInputValue) {
      return;
    }

    setInputValueState(newInputValue);

    if (onInputChange) {
      onInputChange(event, newInputValue, 'reset');
    }
  }, [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value]);
  const prevValue = react.useRef();
  react.useEffect(() => {
    const valueChange = value !== prevValue.current;
    prevValue.current = value;

    if (focused && !valueChange) {
      return;
    } // Only reset the input's value when freeSolo if the component's value changes.


    if (freeSolo && !valueChange) {
      return;
    }

    resetInputValue(null, value);
  }, [value, resetInputValue, focused, prevValue, freeSolo]);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: 'open'
  });
  const [inputPristine, setInputPristine] = react.useState(true);
  const inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  const popupOpen = open && !readOnly;
  const filteredOptions = popupOpen ? filterOptions(options.filter(option => {
    if (filterSelectedOptions && (multiple ? value : [value]).some(value2 => value2 !== null && isOptionEqualToValue(option, value2))) {
      return false;
    }

    return true;
  }), // we use the empty string to manipulate `filterOptions` to not filter any options
  // i.e. the filter predicate always returns true
  {
    inputValue: inputValueIsSelectedValue && inputPristine ? '' : inputValue,
    getOptionLabel
  }) : [];
  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;

  const focusTag = useEventCallback(tagToFocus => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  }); // Ensure the focusedTag is never inconsistent

  react.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);

  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index === -1) {
      return -1;
    }

    let nextFocus = index;

    while (true) {
      // Out of range
      if (direction === 'next' && nextFocus === filteredOptions.length || direction === 'previous' && nextFocus === -1) {
        return -1;
      }

      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`); // Same logic as MenuList.js

      const nextFocusDisabled = disabledItemsFocusable ? false : !option || option.disabled || option.getAttribute('aria-disabled') === 'true';

      if (option && !option.hasAttribute('tabindex') || nextFocusDisabled) {
        // Move to the next element.
        nextFocus += direction === 'next' ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }

  const setHighlightedIndex = useEventCallback(({
    event,
    index,
    reason = 'auto'
  }) => {
    highlightedIndexRef.current = index; // does the index exist?

    if (index === -1) {
      inputRef.current.removeAttribute('aria-activedescendant');
    } else {
      inputRef.current.setAttribute('aria-activedescendant', `${id}-option-${index}`);
    }

    if (onHighlightChange) {
      onHighlightChange(event, index === -1 ? null : filteredOptions[index], reason);
    }

    if (!listboxRef.current) {
      return;
    }

    const prev = listboxRef.current.querySelector('[role="option"].Mui-focused');

    if (prev) {
      prev.classList.remove('Mui-focused');
      prev.classList.remove('Mui-focusVisible');
    }

    const listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]'); // "No results"

    if (!listboxNode) {
      return;
    }

    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }

    const option = listboxRef.current.querySelector(`[data-option-index="${index}"]`);

    if (!option) {
      return;
    }

    option.classList.add('Mui-focused');

    if (reason === 'keyboard') {
      option.classList.add('Mui-focusVisible');
    } // Scroll active descendant into view.
    // Logic copied from https://www.w3.org/TR/wai-aria-practices/examples/listbox/js/listbox.js
    //
    // Consider this API instead once it has a better browser support:
    // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });


    if (listboxNode.scrollHeight > listboxNode.clientHeight && reason !== 'mouse') {
      const element = option;
      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;

      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });
  const changeHighlightedIndex = useEventCallback(({
    event,
    diff,
    direction = 'next',
    reason = 'auto'
  }) => {
    if (!popupOpen) {
      return;
    }

    const getNextIndex = () => {
      const maxIndex = filteredOptions.length - 1;

      if (diff === 'reset') {
        return defaultHighlighted;
      }

      if (diff === 'start') {
        return 0;
      }

      if (diff === 'end') {
        return maxIndex;
      }

      const newIndex = highlightedIndexRef.current + diff;

      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }

        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }

        return maxIndex;
      }

      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }

        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }

        return 0;
      }

      return newIndex;
    };

    const nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason,
      event
    }); // Sync the content of the input with the highlighted option.

    if (autoComplete && diff !== 'reset') {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        const option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option; // The portion of the selected suggestion that has not been typed by the user,
        // a completion string, appears inline after the input cursor in the textbox.

        const index = option.toLowerCase().indexOf(inputValue.toLowerCase());

        if (index === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  const syncHighlightedIndex = react.useCallback(() => {
    if (!popupOpen) {
      return;
    }

    const valueItem = multiple ? value[0] : value; // The popup is empty, reset

    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: 'reset'
      });
      return;
    }

    if (!listboxRef.current) {
      return;
    } // Synchronize the value with the highlighted index


    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current]; // Keep the current highlighted index if possible

      if (multiple && currentOption && findIndex(value, val => isOptionEqualToValue(currentOption, val)) !== -1) {
        return;
      }

      const itemIndex = findIndex(filteredOptions, optionItem => isOptionEqualToValue(optionItem, valueItem));

      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: 'reset'
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }

      return;
    } // Prevent the highlighted index to leak outside the boundaries.


    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    } // Restore the focus to the previous index.


    setHighlightedIndex({
      index: highlightedIndexRef.current
    }); // Ignore filteredOptions (and options, isOptionEqualToValue, getOptionLabel) not to break the scroll position
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [// Only sync the highlighted index when the option switch between empty and not
  filteredOptions.length, // Don't sync the highlighted index with the value when multiple
  // eslint-disable-next-line react-hooks/exhaustive-deps
  multiple ? false : value, filterSelectedOptions, changeHighlightedIndex, setHighlightedIndex, popupOpen, inputValue, multiple]);
  const handleListboxRef = useEventCallback(node => {
    setRef(listboxRef, node);

    if (!node) {
      return;
    }

    syncHighlightedIndex();
  });

  react.useEffect(() => {
    syncHighlightedIndex();
  }, [syncHighlightedIndex]);

  const handleOpen = event => {
    if (open) {
      return;
    }

    setOpenState(true);
    setInputPristine(true);

    if (onOpen) {
      onOpen(event);
    }
  };

  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }

    setOpenState(false);

    if (onClose) {
      onClose(event, reason);
    }
  };

  const handleValue = (event, newValue, reason, details) => {
    if (Array.isArray(value)) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }

    if (onChange) {
      onChange(event, newValue, reason, details);
    }

    setValueState(newValue);
  };

  const isTouch = react.useRef(false);

  const selectNewValue = (event, option, reasonProp = 'selectOption', origin = 'options') => {
    let reason = reasonProp;
    let newValue = option;

    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];

      const itemIndex = findIndex(newValue, valueItem => isOptionEqualToValue(option, valueItem));

      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== 'freeSolo') {
        newValue.splice(itemIndex, 1);
        reason = 'removeOption';
      }
    }

    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option
    });

    if (!disableCloseOnSelect && !event.ctrlKey && !event.metaKey) {
      handleClose(event, reason);
    }

    if (blurOnSelect === true || blurOnSelect === 'touch' && isTouch.current || blurOnSelect === 'mouse' && !isTouch.current) {
      inputRef.current.blur();
    }
  };

  function validTagIndex(index, direction) {
    if (index === -1) {
      return -1;
    }

    let nextFocus = index;

    while (true) {
      // Out of range
      if (direction === 'next' && nextFocus === value.length || direction === 'previous' && nextFocus === -1) {
        return -1;
      }

      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`); // Same logic as MenuList.js

      if (!option || !option.hasAttribute('tabindex') || option.disabled || option.getAttribute('aria-disabled') === 'true') {
        nextFocus += direction === 'next' ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }

  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }

    handleClose(event, 'toggleInput');
    let nextTag = focusedTag;

    if (focusedTag === -1) {
      if (inputValue === '' && direction === 'previous') {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === 'next' ? 1 : -1;

      if (nextTag < 0) {
        nextTag = 0;
      }

      if (nextTag === value.length) {
        nextTag = -1;
      }
    }

    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };

  const handleClear = event => {
    ignoreFocus.current = true;
    setInputValueState('');

    if (onInputChange) {
      onInputChange(event, '', 'clear');
    }

    handleValue(event, multiple ? [] : null, 'clear');
  };

  const handleKeyDown = other => event => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }

    if (event.defaultMuiPrevented) {
      return;
    }

    if (focusedTag !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    } // Wait until IME is settled.


    if (event.which !== 229) {
      switch (event.key) {
        case 'Home':
          if (popupOpen && handleHomeEndKeys) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex({
              diff: 'start',
              direction: 'next',
              reason: 'keyboard',
              event
            });
          }

          break;

        case 'End':
          if (popupOpen && handleHomeEndKeys) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex({
              diff: 'end',
              direction: 'previous',
              reason: 'keyboard',
              event
            });
          }

          break;

        case 'PageUp':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: 'previous',
            reason: 'keyboard',
            event
          });
          handleOpen(event);
          break;

        case 'PageDown':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex({
            diff: pageSize,
            direction: 'next',
            reason: 'keyboard',
            event
          });
          handleOpen(event);
          break;

        case 'ArrowDown':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex({
            diff: 1,
            direction: 'next',
            reason: 'keyboard',
            event
          });
          handleOpen(event);
          break;

        case 'ArrowUp':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex({
            diff: -1,
            direction: 'previous',
            reason: 'keyboard',
            event
          });
          handleOpen(event);
          break;

        case 'ArrowLeft':
          handleFocusTag(event, 'previous');
          break;

        case 'ArrowRight':
          handleFocusTag(event, 'next');
          break;

        case 'Enter':
          if (highlightedIndexRef.current !== -1 && popupOpen) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false; // Avoid early form validation, let the end-users continue filling the form.

            event.preventDefault();

            if (disabled) {
              return;
            }

            selectNewValue(event, option, 'selectOption'); // Move the selection to the end.

            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== '' && inputValueIsSelectedValue === false) {
            if (multiple) {
              // Allow people to add new values before they submit the form.
              event.preventDefault();
            }

            selectNewValue(event, inputValue, 'createOption', 'freeSolo');
          }

          break;

        case 'Escape':
          if (popupOpen) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault(); // Avoid the Modal to handle the event.

            event.stopPropagation();
            handleClose(event, 'escape');
          } else if (clearOnEscape && (inputValue !== '' || multiple && value.length > 0)) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault(); // Avoid the Modal to handle the event.

            event.stopPropagation();
            handleClear(event);
          }

          break;

        case 'Backspace':
          if (multiple && !readOnly && inputValue === '' && value.length > 0) {
            const index = focusedTag === -1 ? value.length - 1 : focusedTag;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, 'removeOption', {
              option: value[index]
            });
          }

          break;
      }
    }
  };

  const handleFocus = event => {
    setFocused(true);

    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };

  const handleBlur = event => {
    // Ignore the event when using the scrollbar with IE11
    if (listboxRef.current !== null && listboxRef.current.parentElement.contains(document.activeElement)) {
      inputRef.current.focus();
      return;
    }

    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;

    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], 'blur');
    } else if (autoSelect && freeSolo && inputValue !== '') {
      selectNewValue(event, inputValue, 'blur', 'freeSolo');
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }

    handleClose(event, 'blur');
  };

  const handleInputChange = event => {
    const newValue = event.target.value;

    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);

      if (onInputChange) {
        onInputChange(event, newValue, 'input');
      }
    }

    if (newValue === '') {
      if (!disableClearable && !multiple) {
        handleValue(event, null, 'clear');
      }
    } else {
      handleOpen(event);
    }
  };

  const handleOptionMouseOver = event => {
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute('data-option-index')),
      reason: 'mouse'
    });
  };

  const handleOptionTouchStart = () => {
    isTouch.current = true;
  };

  const handleOptionClick = event => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    selectNewValue(event, filteredOptions[index], 'selectOption');
    isTouch.current = false;
  };

  const handleTagDelete = index => event => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, 'removeOption', {
      option: value[index]
    });
  };

  const handlePopupIndicator = event => {
    if (open) {
      handleClose(event, 'toggleInput');
    } else {
      handleOpen(event);
    }
  }; // Prevent input blur when interacting with the combobox


  const handleMouseDown = event => {
    if (event.target.getAttribute('id') !== id) {
      event.preventDefault();
    }
  }; // Focus the input when interacting with the combobox


  const handleClick = () => {
    inputRef.current.focus();

    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }

    firstFocus.current = false;
  };

  const handleInputMouseDown = event => {
    if (inputValue === '' || !open) {
      handlePopupIndicator(event);
    }
  };

  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  let groupedOptions = filteredOptions;

  if (groupBy) {
    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const group = groupBy(option);

      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {

        acc.push({
          key: index,
          index,
          group,
          options: [option]
        });
      }

      return acc;
    }, []);
  }

  if (disabledProp && focused) {
    handleBlur();
  }

  return {
    getRootProps: (other = {}) => _extends({
      'aria-owns': listboxAvailable ? `${id}-listbox` : null,
      role: 'combobox',
      'aria-expanded': listboxAvailable
    }, other, {
      onKeyDown: handleKeyDown(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      // if open then this is handled imperativeley so don't let react override
      // only have an opinion about this when closed
      'aria-activedescendant': popupOpen ? '' : null,
      'aria-autocomplete': autoComplete ? 'both' : 'list',
      'aria-controls': listboxAvailable ? `${id}-listbox` : undefined,
      // Disable browser's suggestion that might overlap with the popup.
      // Handle autocomplete but not autofill.
      autoComplete: 'off',
      ref: inputRef,
      autoCapitalize: 'none',
      spellCheck: 'false'
    }),
    getClearProps: () => ({
      tabIndex: -1,
      onClick: handleClear
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      onClick: handlePopupIndicator
    }),
    getTagProps: ({
      index
    }) => _extends({
      key: index,
      'data-tag-index': index,
      tabIndex: -1
    }, !readOnly && {
      onDelete: handleTagDelete(index)
    }),
    getListboxProps: () => ({
      role: 'listbox',
      id: `${id}-listbox`,
      'aria-labelledby': `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: event => {
        // Prevent blur
        event.preventDefault();
      }
    }),
    getOptionProps: ({
      index,
      option
    }) => {
      const selected = (multiple ? value : [value]).some(value2 => value2 != null && isOptionEqualToValue(option, value2));
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: getOptionLabel(option),
        tabIndex: -1,
        role: 'option',
        id: `${id}-option-${index}`,
        onMouseOver: handleOptionMouseOver,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        'data-option-index': index,
        'aria-disabled': disabled,
        'aria-selected': selected
      };
    },
    id,
    inputValue,
    value,
    dirty,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions
  };
}

function getBackdropUtilityClass(slot) {
  return generateUtilityClass('MuiBackdrop', slot);
}
const backdropUnstyledClasses = generateUtilityClasses('MuiBackdrop', ['root', 'invisible']);

const _excluded = ["classes", "className", "invisible", "component", "components", "componentsProps", "theme"];

const useUtilityClasses = ownerState => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ['root', invisible && 'invisible']
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};

const BackdropUnstyled = /*#__PURE__*/react.forwardRef(function BackdropUnstyled(props, ref) {
  const {
    classes: classesProp,
    className,
    invisible = false,
    component = 'div',
    components = {},
    componentsProps = {},

    /* eslint-disable react/prop-types */
    theme
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const ownerState = _extends({}, props, {
    classes: classesProp,
    invisible
  });

  const classes = useUtilityClasses(ownerState);
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return /*#__PURE__*/jsxRuntime.jsx(Root, _extends({
    "aria-hidden": true
  }, rootProps, !isHostComponent(Root) && {
    as: component,
    ownerState: _extends({}, ownerState, rootProps.ownerState),
    theme
  }, {
    ref: ref
  }, other, {
    className: clsx(classes.root, rootProps.className, className)
  }));
});

function useBadge(props) {
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right'
    },
    badgeContent: badgeContentProp,
    invisible: invisibleProp,
    max: maxProp = 99,
    showZero = false,
    variant: variantProp = 'standard'
  } = props;
  const prevProps = usePreviousProps({
    anchorOrigin: anchorOriginProp,
    badgeContent: badgeContentProp,
    max: maxProp,
    variant: variantProp
  });
  let invisible = invisibleProp;

  if (invisibleProp == null && (badgeContentProp === 0 && !showZero || badgeContentProp == null && variantProp !== 'dot')) {
    invisible = true;
  }

  const {
    anchorOrigin = anchorOriginProp,
    badgeContent,
    max = maxProp,
    variant = variantProp
  } = invisible ? prevProps : props;
  let displayValue = '';

  if (variant !== 'dot') {
    displayValue = badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;
  }

  return {
    anchorOrigin,
    badgeContent,
    invisible,
    max,
    variant,
    displayValue
  };
}

function getBadgeUtilityClass(slot) {
  return generateUtilityClass('MuiBadge', slot);
}
const badgeUnstyledClasses = generateUtilityClasses('MuiBadge', ['root', 'badge', 'dot', 'standard', 'anchorOriginTopLeft', 'anchorOriginTopRight', 'anchorOriginBottomLeft', 'anchorOriginBottomRight', 'invisible']);

const _excluded$1 = ["anchorOrigin", "classes", "badgeContent", "component", "children", "className", "components", "componentsProps", "invisible", "max", "showZero", "variant"];

const useUtilityClasses$1 = ownerState => {
  const {
    variant,
    anchorOrigin,
    invisible,
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    badge: ['badge', variant, `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`, invisible && 'invisible']
  };
  return composeClasses(slots, getBadgeUtilityClass, classes);
};

const BadgeUnstyled = /*#__PURE__*/react.forwardRef(function BadgeUnstyled(props, ref) {
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right'
    },
    classes: classesProp,
    component,
    children,
    className,
    components = {},
    componentsProps = {},
    max: maxProp = 99,
    showZero = false,
    variant: variantProp = 'standard'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$1);

  const {
    anchorOrigin,
    badgeContent,
    max,
    variant,
    displayValue,
    invisible
  } = useBadge(_extends({}, props, {
    anchorOrigin: anchorOriginProp,
    max: maxProp,
    variant: variantProp
  }));

  const ownerState = _extends({}, props, {
    anchorOrigin,
    badgeContent,
    classes: classesProp,
    invisible,
    max,
    variant,
    showZero
  });

  const classes = useUtilityClasses$1(ownerState);
  const Root = component || components.Root || 'span';
  const rootProps = appendOwnerState(Root, _extends({}, other, componentsProps.root), ownerState);
  const Badge = components.Badge || 'span';
  const badgeProps = appendOwnerState(Badge, componentsProps.badge, ownerState);
  return /*#__PURE__*/jsxRuntime.jsxs(Root, _extends({}, rootProps, {
    ref: ref
  }, other, {
    className: clsx(classes.root, rootProps.className, className),
    children: [children, /*#__PURE__*/jsxRuntime.jsx(Badge, _extends({}, badgeProps, {
      className: clsx(classes.badge, badgeProps.className),
      children: displayValue
    }))]
  }));
});

function getButtonUnstyledUtilityClass(slot) {
  return generateUtilityClass('ButtonUnstyled', slot);
}
const buttonUnstyledClasses = generateUtilityClasses('ButtonUnstyled', ['root', 'active', 'disabled', 'focusVisible']);

function useButton(props) {
  var _ref;

  const {
    component,
    components = {},
    disabled = false,
    href,
    ref,
    tabIndex = 0,
    to,
    type
  } = props;
  const buttonRef = react.useRef();
  const [active, setActive] = react.useState(false);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = react.useState(false);

  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  react.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);

  const createHandleMouseLeave = otherHandlers => event => {
    var _otherHandlers$onMous;

    if (focusVisible) {
      event.preventDefault();
    }

    (_otherHandlers$onMous = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
  };

  const createHandleBlur = otherHandlers => event => {
    var _otherHandlers$onBlur;

    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };

  const createHandleFocus = otherHandlers => event => {
    var _otherHandlers$onFocu2;

    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }

    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      var _otherHandlers$onFocu;

      setFocusVisible(true);
      (_otherHandlers$onFocu = otherHandlers.onFocusVisible) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    }

    (_otherHandlers$onFocu2 = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu2.call(otherHandlers, event);
  };

  const elementType = (_ref = component != null ? component : components.Root) != null ? _ref : 'button';

  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return elementType !== 'button' && !((button == null ? void 0 : button.tagName) === 'A' && button != null && button.href);
  };

  const createHandleMouseDown = otherHandlers => event => {
    var _otherHandlers$onMous2;

    if (event.target === event.currentTarget && !disabled) {
      setActive(true);
    }

    (_otherHandlers$onMous2 = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
  };

  const createHandleMouseUp = otherHandlers => event => {
    var _otherHandlers$onMous3;

    if (event.target === event.currentTarget) {
      setActive(false);
    }

    (_otherHandlers$onMous3 = otherHandlers.onMouseUp) == null ? void 0 : _otherHandlers$onMous3.call(otherHandlers, event);
  };

  const createHandleKeyDown = otherHandlers => event => {
    var _otherHandlers$onKeyD;

    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault();
    }

    if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
      setActive(true);
    } // Keyboard accessibility for non interactive elements


    if (event.target === event.currentTarget && isNonNativeButton() && event.key === 'Enter' && !disabled) {
      var _otherHandlers$onClic;

      (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
      event.preventDefault();
    }
  };

  const createHandleKeyUp = otherHandlers => event => {
    var _otherHandlers$onKeyU;

    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (event.target === event.currentTarget) {
      setActive(false);
    }

    (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event); // Keyboard accessibility for non interactive elements

    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ' && !event.defaultPrevented) {
      var _otherHandlers$onClic2;

      (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);
    }
  };

  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);
  const [hostElementName, setHostElementName] = react.useState('');

  const updateRef = instance => {
    var _instance$tagName;

    setHostElementName((_instance$tagName = instance == null ? void 0 : instance.tagName) != null ? _instance$tagName : '');
    setRef(handleRef, instance);
  };

  const buttonProps = {};

  if (hostElementName === 'BUTTON') {
    buttonProps.type = type != null ? type : 'button';
    buttonProps.disabled = disabled;
  } else if (hostElementName !== '') {
    if (!href && !to) {
      buttonProps.role = 'button';
    }

    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }

  const getRootProps = otherHandlers => {
    const propsEventHandlers = extractEventHandlers(props);

    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);

    const ownEventHandlers = {
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      onMouseUp: createHandleMouseUp(externalEventHandlers)
    };

    const mergedEventHandlers = _extends({}, externalEventHandlers, ownEventHandlers); // onFocusVisible can be present on the props, but since it's not a valid React event handler,
    // it must not be forwarded to the inner component.


    delete mergedEventHandlers.onFocusVisible;
    return _extends({
      tabIndex: disabled ? -1 : tabIndex,
      type
    }, buttonProps, mergedEventHandlers, {
      ref: updateRef
    });
  };

  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    disabled,
    active
  };
}

const _excluded$2 = ["className", "component", "components", "componentsProps", "children", "disabled", "action", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseLeave"];

const useUtilityClasses$2 = ownerState => {
  const {
    active,
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active']
  };
  return composeClasses(slots, getButtonUnstyledUtilityClass, {});
};
/**
 * The foundation for building custom-styled buttons.
 *
 * Demos:
 *
 * - [Buttons](https://mui.com/components/buttons/)
 *
 * API:
 *
 * - [ButtonUnstyled API](https://mui.com/api/button-unstyled/)
 */


const ButtonUnstyled = /*#__PURE__*/react.forwardRef(function ButtonUnstyled(props, ref) {
  var _ref;

  const {
    className,
    component,
    components = {},
    componentsProps = {},
    children,
    action
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$2);

  const buttonRef = react.useRef();
  const handleRef = useForkRef(buttonRef, ref);
  const {
    active,
    focusVisible,
    setFocusVisible,
    getRootProps
  } = useButton(_extends({}, props, {
    ref: handleRef
  }));
  react.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), [setFocusVisible]);

  const ownerState = _extends({}, props, {
    active,
    focusVisible
  });

  const ButtonRoot = (_ref = component != null ? component : components.Root) != null ? _ref : 'button';
  const buttonRootProps = appendOwnerState(ButtonRoot, _extends({}, other, componentsProps.root), ownerState);
  const classes = useUtilityClasses$2(ownerState);
  return /*#__PURE__*/jsxRuntime.jsx(ButtonRoot, _extends({}, getRootProps(), buttonRootProps, {
    className: clsx(classes.root, className, buttonRootProps.className),
    children: children
  }));
});

function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}

function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 *
 * Demos:
 *
 * - [Click Away Listener](https://mui.com/components/click-away-listener/)
 * - [Menus](https://mui.com/components/menus/)
 *
 * API:
 *
 * - [ClickAwayListener API](https://mui.com/api/click-away-listener/)
 */
function ClickAwayListener(props) {
  const {
    children,
    disableReactTree = false,
    mouseEvent = 'onClick',
    onClickAway,
    touchEvent = 'onTouchEnd'
  } = props;
  const movedRef = react.useRef(false);
  const nodeRef = react.useRef(null);
  const activatedRef = react.useRef(false);
  const syntheticEventRef = react.useRef(false);
  react.useEffect(() => {
    // Ensure that this component is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);
  const handleRef = useForkRef( // @ts-expect-error TODO upstream fix
  children.ref, nodeRef); // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviors like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.

  const handleClickAway = useEventCallback(event => {
    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current); // 1. IE11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.

    if (!activatedRef.current || !nodeRef.current || 'clientX' in event && clickedRootScrollbar(event, doc)) {
      return;
    } // Do not act if user performed touchmove


    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    let insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains( // @ts-expect-error returns `false` as intended when not dispatched from a Node
      event.target) || nodeRef.current.contains( // @ts-expect-error returns `false` as intended when not dispatched from a Node
      event.target);
    }

    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  }); // Keep track of mouse/touch events that bubbled up through the portal.

  const createHandleSynthetic = handlerName => event => {
    syntheticEventRef.current = true;
    const childrenPropsHandler = children.props[handlerName];

    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };

  const childrenProps = {
    ref: handleRef
  };

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }

  react.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);

      const handleTouchMove = () => {
        movedRef.current = true;
      };

      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, touchEvent]);

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }

  react.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);
  return /*#__PURE__*/jsxRuntime.jsx(react.Fragment, {
    children: /*#__PURE__*/react.cloneElement(children, childrenProps)
  });
}

/**
 * @ignore - internal component.
 */
const FormControlUnstyledContext = /*#__PURE__*/react.createContext(undefined);

function getFormControlUnstyledUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControl', slot);
}
const formControlUnstyledClasses = generateUtilityClasses('MuiFormControl', ['root', 'disabled']);

const _excluded$3 = ["defaultValue", "children", "className", "component", "components", "componentsProps", "disabled", "error", "focused", "onChange", "required", "value"];

function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== '';
}

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 * *   FormLabel
 * *   FormHelperText
 * *   Input
 * *   InputLabel
 *
 * You can find one composition example below and more going to [the demos](https://mui.com/components/text-fields/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `Input` can be used within a FormControl because it create visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 *
 * Demos:
 *
 * - [Text Fields](https://mui.com/components/text-fields/)
 *
 * API:
 *
 * - [FormControlUnstyled API](https://mui.com/api/form-control-unstyled/)
 */
const FormControlUnstyled = /*#__PURE__*/react.forwardRef(function FormControlUnstyled(props, ref) {
  var _ref;

  const {
    defaultValue,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled = false,
    error = false,
    focused: visuallyFocused,
    onChange,
    required = false,
    value: incomingValue
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$3);

  const [value, setValue] = useControlled({
    controlled: incomingValue,
    default: defaultValue,
    name: 'FormControl',
    state: 'value'
  });
  const filled = hasValue(value);
  const [focusedState, setFocused] = react.useState(false);

  if (disabled && focusedState) {
    setFocused(false);
  }

  const focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;

  const ownerState = _extends({}, props, {
    disabled,
    error,
    filled,
    focused,
    required
  });

  let registerEffect = () => {};

  const handleChange = event => {
    setValue(event.target.value);
    onChange == null ? void 0 : onChange(event);
  };

  const childContext = {
    disabled,
    error,
    filled,
    focused,
    onBlur: () => {
      setFocused(false);
    },
    onChange: handleChange,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    value: value != null ? value : ''
  };
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : 'div';
  const rootProps = appendOwnerState(Root, _extends({}, other, componentsProps.root), ownerState);
  return /*#__PURE__*/jsxRuntime.jsx(FormControlUnstyledContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/jsxRuntime.jsx(Root, _extends({
      ref: ref
    }, rootProps, {
      className: clsx(formControlUnstyledClasses.root, className, rootProps == null ? void 0 : rootProps.className, disabled && formControlUnstyledClasses.disabled),
      children: children
    }))
  });
});

function useFormControlUnstyled() {
  return react.useContext(FormControlUnstyledContext);
}

function getInputUnstyledUtilityClass(slot) {
  return generateUtilityClass('MuiInput', slot);
}
const inputBaseClasses = generateUtilityClasses('MuiInput', ['root', 'formControl', 'focused', 'disabled', 'error', 'multiline', 'input', 'inputMultiline', 'inputTypeSearch', 'adornedStart', 'adornedEnd']);

function useInput(props, inputRef) {
  const {
    defaultValue,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    required: requiredProp = false,
    value: valueProp
  } = props;
  const formControlContext = useFormControlUnstyled();
  let value;
  let required;
  let disabled;
  let error;

  if (formControlContext) {
    var _formControlContext$d, _formControlContext$r, _formControlContext$e;

    value = formControlContext.value;
    disabled = (_formControlContext$d = formControlContext.disabled) != null ? _formControlContext$d : false;
    required = (_formControlContext$r = formControlContext.required) != null ? _formControlContext$r : false;
    error = (_formControlContext$e = formControlContext.error) != null ? _formControlContext$e : false;
  } else {
    value = valueProp;
    disabled = disabledProp;
    required = requiredProp;
    error = errorProp;
  }

  const {
    current: isControlled
  } = react.useRef(value != null);
  const handleInputRefWarning = react.useCallback(instance => {
  }, []);
  const internalInputRef = react.useRef(null);
  const handleIncomingRef = useForkRef(inputRef, handleInputRefWarning);
  const handleInputRef = useForkRef(internalInputRef, handleIncomingRef);
  const [focused, setFocused] = react.useState(false); // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.

  react.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false); // @ts-ignore

      onBlur == null ? void 0 : onBlur();
    }
  }, [formControlContext, disabled, focused, onBlur]);

  const handleFocus = otherHandlers => event => {
    var _otherHandlers$onFocu;

    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the component is disabled.
    if (formControlContext != null && formControlContext.disabled) {
      event.stopPropagation();
      return;
    }

    (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);

    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;

      formControlContext == null ? void 0 : (_formControlContext$o = formControlContext.onFocus) == null ? void 0 : _formControlContext$o.call(formControlContext);
    } else {
      setFocused(true);
    }
  };

  const handleBlur = otherHandlers => event => {
    var _otherHandlers$onBlur;

    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);

    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };

  const handleChange = otherHandlers => (event, ...args) => {
    var _formControlContext$o2, _otherHandlers$onChan;

    if (!isControlled) {
      const element = event.target || internalInputRef.current;

      if (element == null) {
        throw new Error( formatMuiErrorMessage(17));
      }
    }

    formControlContext == null ? void 0 : (_formControlContext$o2 = formControlContext.onChange) == null ? void 0 : _formControlContext$o2.call(formControlContext, event); // @ts-ignore

    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event, ...args);
  };

  const handleClick = otherHandlers => event => {
    var _otherHandlers$onClic;

    if (internalInputRef.current && event.currentTarget === event.target) {
      internalInputRef.current.focus();
    }

    (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
  };

  const getRootProps = externalProps => {
    // onBlur, onChange and onFocus are forwarded to the input slot.
    const propsEventHandlers = extractEventHandlers(props, ['onBlur', 'onChange', 'onFocus']);

    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));

    return _extends({}, externalProps, externalEventHandlers, {
      onClick: handleClick(externalEventHandlers)
    });
  };

  const getInputProps = externalProps => {
    const propsEventHandlers = {
      onBlur,
      onChange,
      onFocus
    };

    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));

    const mergedEventHandlers = _extends({}, externalProps, externalEventHandlers, {
      onBlur: handleBlur(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers)
    });

    return _extends({}, mergedEventHandlers, {
      'aria-invalid': error || undefined,
      defaultValue: defaultValue,
      ref: handleInputRef,
      value: value,
      required,
      disabled
    });
  };

  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    required,
    value
  };
}

const _excluded$4 = ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "component", "components", "componentsProps", "defaultValue", "disabled", "endAdornment", "error", "id", "maxRows", "minRows", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "rows", "type", "startAdornment", "value"];
const InputUnstyled = /*#__PURE__*/react.forwardRef(function InputUnstyled(props, ref) {
  var _componentsProps$inpu, _ref, _componentsProps$root, _components$Input, _componentsProps$inpu2;

  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endAdornment,
    error,
    id,
    maxRows,
    minRows,
    multiline = false,
    name,
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    rows,
    type = 'text',
    startAdornment,
    value
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$4);

  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState
  } = useInput({
    disabled,
    defaultValue,
    error,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required,
    value
  }, (_componentsProps$inpu = componentsProps.input) == null ? void 0 : _componentsProps$inpu.ref);

  const ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    multiline,
    type
  });

  const rootStateClasses = clsx(disabledState && inputBaseClasses.disabled, errorState && inputBaseClasses.error, focused && inputBaseClasses.focused, Boolean(formControlContext) && inputBaseClasses.formControl, multiline && inputBaseClasses.multiline, Boolean(startAdornment) && inputBaseClasses.adornedStart, Boolean(endAdornment) && inputBaseClasses.adornedEnd);
  const inputStateClasses = clsx(disabledState && inputBaseClasses.disabled, multiline && inputBaseClasses.multiline);
  const propsToForward = {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type
  };
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : 'div';
  const rootProps = appendOwnerState(Root, _extends({}, getRootProps(_extends({}, other, componentsProps.root)), {
    className: clsx(inputBaseClasses.root, rootStateClasses, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  }), ownerState);
  let Input = (_components$Input = components.Input) != null ? _components$Input : 'input';
  let inputProps = appendOwnerState(Input, _extends({}, getInputProps(_extends({}, componentsProps.input, propsToForward)), {
    className: clsx(inputBaseClasses.input, inputStateClasses, (_componentsProps$inpu2 = componentsProps.input) == null ? void 0 : _componentsProps$inpu2.className)
  }), ownerState);

  if (multiline) {
    var _components$Textarea, _components$Textarea2;

    const hasHostTexarea = isHostComponent((_components$Textarea = components.Textarea) != null ? _components$Textarea : 'textarea');

    if (rows) {

      inputProps = _extends({
        type: undefined,
        minRows: hasHostTexarea ? undefined : rows,
        maxRows: hasHostTexarea ? undefined : rows
      }, inputProps);
    } else {
      inputProps = _extends({
        type: undefined,
        maxRows: hasHostTexarea ? undefined : maxRows,
        minRows: hasHostTexarea ? undefined : minRows
      }, inputProps);
    }

    Input = (_components$Textarea2 = components.Textarea) != null ? _components$Textarea2 : 'textarea';
  }

  return /*#__PURE__*/jsxRuntime.jsxs(Root, _extends({}, rootProps, {
    ref: ref,
    children: [startAdornment, /*#__PURE__*/jsxRuntime.jsx(Input, _extends({}, inputProps)), endAdornment]
  }));
});

let ActionTypes;

(function (ActionTypes) {
  ActionTypes["blur"] = "blur";
  ActionTypes["focus"] = "focus";
  ActionTypes["keyDown"] = "keyDown";
  ActionTypes["optionClick"] = "optionClick";
  ActionTypes["setControlledValue"] = "setControlledValue";
  ActionTypes["optionsChange"] = "optionsChange";
})(ActionTypes || (ActionTypes = {}));

const pageSize$1 = 5;

function findValidOptionToHighlight(index, lookupDirection, options, focusDisabled, isOptionDisabled, wrapAround) {
  if (options.length === 0 || options.every((o, i) => isOptionDisabled(o, i))) {
    return -1;
  }

  let nextFocus = index;

  for (;;) {
    // No valid options found
    if (!wrapAround && lookupDirection === 'next' && nextFocus === options.length || !wrapAround && lookupDirection === 'previous' && nextFocus === -1) {
      return -1;
    }

    const nextFocusDisabled = focusDisabled ? false : isOptionDisabled(options[nextFocus], nextFocus);

    if (nextFocusDisabled) {
      nextFocus += lookupDirection === 'next' ? 1 : -1;

      if (wrapAround) {
        nextFocus = (nextFocus + options.length) % options.length;
      }
    } else {
      return nextFocus;
    }
  }
}

function getNewHighlightedIndex(options, previouslyHighlightedIndex, diff, lookupDirection, highlightDisabled, isOptionDisabled, wrapAround) {
  const maxIndex = options.length - 1;
  const defaultHighlightedIndex = -1;
  let nextIndexCandidate;

  if (diff === 'reset') {
    return defaultHighlightedIndex;
  }

  if (diff === 'start') {
    nextIndexCandidate = 0;
  } else if (diff === 'end') {
    nextIndexCandidate = maxIndex;
  } else {
    const newIndex = previouslyHighlightedIndex + diff;

    if (newIndex < 0) {
      if (!wrapAround && previouslyHighlightedIndex !== -1 || Math.abs(diff) > 1) {
        nextIndexCandidate = 0;
      } else {
        nextIndexCandidate = maxIndex;
      }
    } else if (newIndex > maxIndex) {
      if (!wrapAround || Math.abs(diff) > 1) {
        nextIndexCandidate = maxIndex;
      } else {
        nextIndexCandidate = 0;
      }
    } else {
      nextIndexCandidate = newIndex;
    }
  }

  const nextIndex = findValidOptionToHighlight(nextIndexCandidate, lookupDirection, options, highlightDisabled, isOptionDisabled, wrapAround);
  return nextIndex;
}

function handleOptionSelection(option, state, props) {
  const {
    multiple,
    optionComparer = (o, v) => o === v,
    isOptionDisabled = () => false
  } = props;
  const {
    selectedValue
  } = state;
  const optionIndex = props.options.indexOf(option);

  if (isOptionDisabled(option, optionIndex)) {
    return state;
  }

  if (multiple) {
    var _ref, _ref2;

    const selectedValues = (_ref = selectedValue) != null ? _ref : []; // if the option is already selected, remove it from the selection, otherwise add it

    const newSelectedValues = selectedValues.some(sv => optionComparer(sv, option)) ? selectedValue.filter(v => !optionComparer(v, option)) : [...((_ref2 = selectedValue) != null ? _ref2 : []), option];
    return {
      selectedValue: newSelectedValues,
      highlightedIndex: optionIndex
    };
  }

  if (selectedValue != null && optionComparer(option, selectedValue)) {
    return state;
  }

  return {
    selectedValue: option,
    highlightedIndex: optionIndex
  };
}

function handleKeyDown(event, state, props) {
  const {
    options,
    isOptionDisabled,
    disableListWrap,
    disabledItemsFocusable
  } = props;

  const moveHighlight = (diff, direction, wrapAround) => {
    return getNewHighlightedIndex(options, state.highlightedIndex, diff, direction, disabledItemsFocusable != null ? disabledItemsFocusable : false, isOptionDisabled != null ? isOptionDisabled : () => false, wrapAround);
  };

  switch (event.key) {
    case 'Home':
      return _extends({}, state, {
        highlightedIndex: moveHighlight('start', 'next', false)
      });

    case 'End':
      return _extends({}, state, {
        highlightedIndex: moveHighlight('end', 'previous', false)
      });

    case 'PageUp':
      return _extends({}, state, {
        highlightedIndex: moveHighlight(-pageSize$1, 'previous', false)
      });

    case 'PageDown':
      return _extends({}, state, {
        highlightedIndex: moveHighlight(pageSize$1, 'next', false)
      });

    case 'ArrowUp':
      // TODO: extend current selection with Shift modifier
      return _extends({}, state, {
        highlightedIndex: moveHighlight(-1, 'previous', !(disableListWrap != null ? disableListWrap : false))
      });

    case 'ArrowDown':
      // TODO: extend current selection with Shift modifier
      return _extends({}, state, {
        highlightedIndex: moveHighlight(1, 'next', !(disableListWrap != null ? disableListWrap : false))
      });

    case 'Enter':
    case ' ':
      if (state.highlightedIndex === -1 || options[state.highlightedIndex] === undefined) {
        return state;
      }

      return handleOptionSelection(options[state.highlightedIndex], state, props);
  }

  return state;
}

function handleBlur(state) {
  return _extends({}, state, {
    highlightedIndex: -1
  });
}

function handleOptionsChange(options, previousOptions, state, props) {
  var _options$find;

  const {
    multiple,
    optionComparer
  } = props;
  const highlightedOption = previousOptions[state.highlightedIndex];
  const hightlightedOptionNewIndex = options.findIndex(option => optionComparer(option, highlightedOption));

  if (multiple) {
    var _ref3;

    // exclude selected values that are no longer in the options
    const selectedValues = (_ref3 = state.selectedValue) != null ? _ref3 : [];
    const newSelectedValues = selectedValues.filter(selectedValue => options.some(option => optionComparer(option, selectedValue)));
    return {
      highlightedIndex: hightlightedOptionNewIndex,
      selectedValue: newSelectedValues
    };
  }

  const newSelectedValue = (_options$find = options.find(option => optionComparer(option, state.selectedValue))) != null ? _options$find : null;
  return {
    highlightedIndex: hightlightedOptionNewIndex,
    selectedValue: newSelectedValue
  };
}

function defaultListboxReducer(state, action) {
  const {
    type
  } = action;

  switch (type) {
    case ActionTypes.keyDown:
      return handleKeyDown(action.event, state, action.props);

    case ActionTypes.optionClick:
      return handleOptionSelection(action.option, state, action.props);

    case ActionTypes.blur:
      return handleBlur(state);

    case ActionTypes.setControlledValue:
      return _extends({}, state, {
        selectedValue: action.value
      });

    case ActionTypes.optionsChange:
      return handleOptionsChange(action.options, action.previousOptions, state, action.props);

    default:
      return state;
  }
}

/**
 * Triggers change event handlers when reducer returns changed state.
 */

function useReducerReturnValueHandler(state, value, options, optionComparer, setValueState, onValueChange, onHighlightChange) {
  const valueRef = react.useRef(value);
  valueRef.current = value;
  const onValueChangeRef = react.useRef(onValueChange);
  onValueChangeRef.current = onValueChange;
  const onHighlightChangeRef = react.useRef(onHighlightChange);
  onHighlightChangeRef.current = onHighlightChange;
  react.useEffect(() => {
    if (Array.isArray(state.selectedValue)) {
      if (areArraysEqual(state.selectedValue, valueRef.current)) {
        return;
      }
    } else if (state.selectedValue == null && valueRef.current == null || state.selectedValue != null && valueRef.current != null && optionComparer.current(state.selectedValue, valueRef.current)) {
      return;
    }

    setValueState(state.selectedValue);

    if (state.selectedValue != null) {
      var _onValueChangeRef$cur;

      // @ts-ignore We know that selectedValue has the correct type depending on `selectMultiple` prop.
      (_onValueChangeRef$cur = onValueChangeRef.current) == null ? void 0 : _onValueChangeRef$cur.call(onValueChangeRef, state.selectedValue);
    }
  }, [state.selectedValue, setValueState, optionComparer]);
  react.useEffect(() => {
    // Fire the highlightChange event when reducer returns changed `highlightedIndex`.
    if (state.highlightedIndex === -1) {
      var _onHighlightChangeRef;

      (_onHighlightChangeRef = onHighlightChangeRef.current) == null ? void 0 : _onHighlightChangeRef.call(onHighlightChangeRef, null);
    } else {
      var _onHighlightChangeRef2;

      (_onHighlightChangeRef2 = onHighlightChangeRef.current) == null ? void 0 : _onHighlightChangeRef2.call(onHighlightChangeRef, options[state.highlightedIndex]);
    }
  }, [state.highlightedIndex, options]);
}

function useControllableReducer(internalReducer, externalReducer, props) {
  const {
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
    onHighlightChange,
    options,
    optionComparer
  } = props;
  const propsRef = react.useRef(props);
  propsRef.current = props;
  const [value, setValueState] = useControlled({
    controlled: controlledValue,
    default: defaultValue,
    name: 'useListbox'
  });
  const previousValueRef = react.useRef(null);
  const [state, dispatch] = react.useReducer(externalReducer != null ? externalReducer : internalReducer, {
    highlightedIndex: -1,
    selectedValue: value
  });
  const optionComparerRef = react.useRef(optionComparer);
  optionComparerRef.current = optionComparer;
  react.useEffect(() => {
    // Detect external changes to the controlled `value` prop and update the state.
    if (controlledValue === undefined) {
      return;
    }

    if (Array.isArray(controlledValue) && Array.isArray(previousValueRef.current) && areArraysEqual(previousValueRef.current, controlledValue, optionComparerRef.current)) {
      // `value` is an array and it did not change.
      return;
    }

    if (!Array.isArray(controlledValue) && controlledValue != null && previousValueRef.current != null && optionComparerRef.current(controlledValue, previousValueRef.current)) {
      // `value` is a single option and it did not change.
      return;
    }

    previousValueRef.current = controlledValue;
    dispatch({
      type: ActionTypes.setControlledValue,
      value: controlledValue,
      props: propsRef.current
    });
  }, [controlledValue]);
  useReducerReturnValueHandler(state, value, options, optionComparerRef, setValueState, onValueChange, onHighlightChange);
  return [state, dispatch];
}

const defaultOptionComparer = (optionA, optionB) => optionA === optionB;

function useListbox(props) {
  var _props$optionIdGenera, _options$highlightedI;

  const {
    disableListWrap = false,
    disabledItemsFocusable = false,
    id,
    options,
    multiple = false,
    isOptionDisabled = () => false,
    optionComparer = defaultOptionComparer,
    stateReducer: externalReducer,
    listboxRef: externalListboxRef
  } = props;

  function defaultIdGenerator(_, index) {
    return `${id}-option-${index}`;
  }

  const optionIdGenerator = (_props$optionIdGenera = props.optionIdGenerator) != null ? _props$optionIdGenera : defaultIdGenerator;

  const propsWithDefaults = _extends({}, props, {
    disableListWrap,
    disabledItemsFocusable,
    isOptionDisabled,
    multiple,
    optionComparer
  });

  const listboxRef = react.useRef(null);
  const handleRef = useForkRef(externalListboxRef, listboxRef);
  const [{
    highlightedIndex,
    selectedValue
  }, dispatch] = useControllableReducer(defaultListboxReducer, externalReducer, propsWithDefaults);
  const previousOptions = react.useRef([]);
  react.useEffect(() => {
    if (areArraysEqual(previousOptions.current, options, optionComparer)) {
      return;
    }

    dispatch({
      type: ActionTypes.optionsChange,
      options,
      previousOptions: previousOptions.current,
      props: propsWithDefaults
    });
    previousOptions.current = options; // No need to re-run this effect if props change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, optionComparer, dispatch]);

  const createHandleOptionClick = (option, other) => event => {
    var _other$onClick;

    (_other$onClick = other.onClick) == null ? void 0 : _other$onClick.call(other, event);

    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    dispatch({
      type: ActionTypes.optionClick,
      option,
      event,
      props: propsWithDefaults
    });
  };

  const createHandleKeyDown = other => event => {
    var _other$onKeyDown;

    (_other$onKeyDown = other.onKeyDown) == null ? void 0 : _other$onKeyDown.call(other, event);

    if (event.defaultPrevented) {
      return;
    }

    const keysToPreventDefault = [' ', 'Enter', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];

    if (keysToPreventDefault.includes(event.key)) {
      event.preventDefault();
    }

    dispatch({
      type: ActionTypes.keyDown,
      event,
      props: propsWithDefaults
    });
  };

  const createHandleBlur = other => event => {
    var _other$onBlur, _listboxRef$current;

    (_other$onBlur = other.onBlur) == null ? void 0 : _other$onBlur.call(other, event);

    if (event.defaultPrevented) {
      return;
    }

    if ((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(document.activeElement)) {
      // focus is within the listbox
      return;
    }

    dispatch({
      type: ActionTypes.blur,
      event,
      props: propsWithDefaults
    });
  };

  const getRootProps = (other = {}) => {
    return _extends({}, other, {
      'aria-activedescendant': highlightedIndex >= 0 ? optionIdGenerator(options[highlightedIndex], highlightedIndex) : undefined,
      id,
      onBlur: createHandleBlur(other),
      onKeyDown: createHandleKeyDown(other),
      role: 'listbox',
      tabIndex: 0,
      ref: handleRef
    });
  };

  const getOptionState = option => {
    let selected;
    const index = options.findIndex(opt => optionComparer(opt, option));

    if (multiple) {
      var _ref;

      selected = ((_ref = selectedValue) != null ? _ref : []).some(value => value != null && optionComparer(option, value));
    } else {
      selected = optionComparer(option, selectedValue);
    }

    const disabled = isOptionDisabled(option, index);
    return {
      index,
      option,
      selected,
      disabled,
      highlighted: highlightedIndex === index
    };
  };

  const getOptionProps = (option, other = {}) => {
    const {
      selected,
      disabled
    } = getOptionState(option);
    const index = options.findIndex(opt => optionComparer(opt, option));
    return {
      'aria-disabled': disabled || undefined,
      'aria-selected': selected,
      id: optionIdGenerator(option, index),
      onClick: createHandleOptionClick(option, other),
      role: 'option'
    };
  };

  return {
    getRootProps,
    getOptionProps,
    getOptionState,
    selectedOption: selectedValue,
    highlightedOption: (_options$highlightedI = options[highlightedIndex]) != null ? _options$highlightedI : null
  };
}

function getContainer(container) {
  return typeof container === 'function' ? container() : container;
}
/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */


const Portal = /*#__PURE__*/react.forwardRef(function Portal(props, ref) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = react.useState(null);
  const handleRef = useForkRef( /*#__PURE__*/react.isValidElement(children) ? children.ref : null, ref);
  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }

    return undefined;
  }, [ref, mountNode, disablePortal]);

  if (disablePortal) {
    if ( /*#__PURE__*/react.isValidElement(children)) {
      return /*#__PURE__*/react.cloneElement(children, {
        ref: handleRef
      });
    }

    return children;
  }

  return mountNode ? /*#__PURE__*/reactDom.createPortal(children, mountNode) : mountNode;
});

// Is a vertical scrollbar displayed?
function isOverflowing(container) {
  const doc = ownerDocument(container);

  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

function ariaHidden(element, show) {
  if (show) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}

function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude = [], show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  const blacklistTagNames = ['TEMPLATE', 'SCRIPT', 'STYLE'];
  [].forEach.call(container.children, element => {
    if (blacklist.indexOf(element) === -1 && blacklistTagNames.indexOf(element.tagName) === -1) {
      ariaHidden(element, show);
    }
  });
}

function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }

    return false;
  });
  return idx;
}

function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;

  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: 'padding-right',
        el: container
      }); // Use computed style, here to get the real padding to add our scrollbar width.

      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`; // .mui-fixed is a global helper.

      const fixedElements = ownerDocument(container).querySelectorAll('.mui-fixed');
      [].forEach.call(fixedElements, element => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: 'padding-right',
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    } // Improve Gatsby support
    // https://css-tricks.com/snippets/css/force-vertical-scrollbar/


    const parent = container.parentElement;
    const containerWindow = ownerWindow(container);
    const scrollContainer = (parent == null ? void 0 : parent.nodeName) === 'HTML' && containerWindow.getComputedStyle(parent).overflowY === 'scroll' ? parent : container; // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.

    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: 'overflow',
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: 'overflow-x',
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: 'overflow-y',
      el: scrollContainer
    });
    scrollContainer.style.overflow = 'hidden';
  }

  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };

  return restore;
}

function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, element => {
    if (element.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}

/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
class ModalManager {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }

  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);

    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = this.modals.length;
    this.modals.push(modal); // If the modal we are adding is already in the DOM.

    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }

    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, item => item.container === container);

    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }

  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];

    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }

  remove(modal) {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = findIndexOf(this.containers, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1); // If that was the last modal in a container, clean up the container.

    if (containerInfo.modals.length === 0) {
      // The modal might be closed before it had the chance to be mounted in the DOM.
      if (containerInfo.restore) {
        containerInfo.restore();
      }

      if (modal.modalRef) {
        // In case the modal wasn't in the DOM yet.
        ariaHidden(modal.modalRef, true);
      }

      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      // Otherwise make sure the next top modal is visible to a screen reader.
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1]; // as soon as a modal is adding its modalRef is undefined. it can't set
      // aria-hidden because the dom element doesn't exist either
      // when modal was unmounted before modalRef gets null

      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }

    return modalIndex;
  }

  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }

}

/* eslint-disable @typescript-eslint/naming-convention, consistent-return, jsx-a11y/no-noninteractive-tabindex */
const candidatesSelector = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'].join(',');

function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);

  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  } // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // https://bugs.chromium.org/p/chromium/issues/detail?id=661108&q=contenteditable%20tabindex&can=2
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.


  if (node.contentEditable === 'true' || (node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
    return 0;
  }

  return node.tabIndex;
}

function isNonTabbableRadio(node) {
  if (node.tagName !== 'INPUT' || node.type !== 'radio') {
    return false;
  }

  if (!node.name) {
    return false;
  }

  const getRadio = selector => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);

  let roving = getRadio(`[name="${node.name}"]:checked`);

  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }

  return roving !== node;
}

function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === 'INPUT' && node.type === 'hidden' || isNonTabbableRadio(node)) {
    return false;
  }

  return true;
}

function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);

    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }

    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map(a => a.node).concat(regularTabNodes);
}

function defaultIsEnabled() {
  return true;
}
/**
 * Utility component that locks focus inside the component.
 */


function Unstable_TrapFocus(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = react.useRef();
  const sentinelStart = react.useRef(null);
  const sentinelEnd = react.useRef(null);
  const nodeToRestore = react.useRef(null);
  const reactFocusEventTarget = react.useRef(null); // This variable is useful when disableAutoFocus is true.
  // It waits for the active element to move into the component to activate.

  const activated = react.useRef(false);
  const rootRef = react.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = react.useRef(null);
  react.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  react.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute('tabIndex')) {

        rootRef.current.setAttribute('tabIndex', -1);
      }

      if (activated.current) {
        rootRef.current.focus();
      }
    }

    return () => {
      // restoreLastFocus()
      if (!disableRestoreFocus) {
        // In IE11 it is possible for document.activeElement to be null resulting
        // in nodeToRestore.current being null.
        // Not all elements in IE11 have a focus method.
        // Once IE11 support is dropped the focus() call can be unconditional.
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }

        nodeToRestore.current = null;
      }
    }; // Missing `disableRestoreFocus` which is fine.
    // We don't support changing that prop on an open TrapFocus
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  react.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    const contain = nativeEvent => {
      const {
        current: rootElement
      } = rootRef; // Cleanup functions are executed lazily in React 17.
      // Contain can be called between the component being unmounted and its cleanup function being run.

      if (rootElement === null) {
        return;
      }

      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (!rootElement.contains(doc.activeElement)) {
        // if the focus event is not coming from inside the children's react tree, reset the refs
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }

        if (!activated.current) {
          return;
        }

        let tabbable = [];

        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }

        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;

          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === 'Tab');
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];

          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        } else {
          rootElement.focus();
        }
      }
    };

    const loopFocus = nativeEvent => {
      lastKeydown.current = nativeEvent;

      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== 'Tab') {
        return;
      } // Make sure the next tab starts from the right place.
      // doc.activeElement referes to the origin.


      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        sentinelEnd.current.focus();
      }
    };

    doc.addEventListener('focusin', contain);
    doc.addEventListener('keydown', loopFocus, true); // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area.
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    // Instead, we can look if the active element was restored on the BODY element.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.

    const interval = setInterval(() => {
      if (doc.activeElement.tagName === 'BODY') {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener('focusin', contain);
      doc.removeEventListener('keydown', loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);

  const onFocus = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }

    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;

    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };

  const handleFocusSentinel = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }

    activated.current = true;
  };

  return /*#__PURE__*/jsxRuntime.jsxs(react.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-test": "sentinelStart"
    }), /*#__PURE__*/react.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /*#__PURE__*/jsxRuntime.jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-test": "sentinelEnd"
    })]
  });
}

function getModalUtilityClass(slot) {
  return generateUtilityClass('MuiModal', slot);
}
const modalUnstyledClasses = generateUtilityClasses('MuiModal', ['root', 'hidden']);

const _excluded$5 = ["BackdropComponent", "BackdropProps", "children", "classes", "className", "closeAfterTransition", "component", "components", "componentsProps", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "theme", "onTransitionEnter", "onTransitionExited"];

const useUtilityClasses$3 = ownerState => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ['root', !open && exited && 'hidden']
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};

function getContainer$1(container) {
  return typeof container === 'function' ? container() : container;
}

function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
} // A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.


const defaultManager = new ModalManager();
/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/api/dialog/)
 * - [Drawer](/api/drawer/)
 * - [Menu](/api/menu/)
 * - [Popover](/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */

const ModalUnstyled = /*#__PURE__*/react.forwardRef(function ModalUnstyled(props, ref) {
  const {
    BackdropComponent,
    BackdropProps,
    children,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    component = 'div',
    components = {},
    componentsProps = {},
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    // private
    // eslint-disable-next-line react/prop-types
    manager = defaultManager,
    onBackdropClick,
    onClose,
    onKeyDown,
    open,

    /* eslint-disable react/prop-types */
    theme,
    onTransitionEnter,
    onTransitionExited
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$5);

  const [exited, setExited] = react.useState(true);
  const modal = react.useRef({});
  const mountNodeRef = react.useRef(null);
  const modalRef = react.useRef(null);
  const handleRef = useForkRef(modalRef, ref);
  const hasTransition = getHasTransition(props);

  const getDoc = () => ownerDocument(mountNodeRef.current);

  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };

  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    }); // Fix a bug on Chrome where the scroll isn't initially 0.

    modalRef.current.scrollTop = 0;
  };

  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer$1(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer); // The element was already mounted.

    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = react.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = useEventCallback(node => {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    if (open && isTopModal()) {
      handleMounted();
    } else {
      ariaHidden(modalRef.current, true);
    }
  });
  const handleClose = react.useCallback(() => {
    manager.remove(getModal());
  }, [manager]);
  react.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  react.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);

  const ownerState = _extends({}, props, {
    classes: classesProp,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    exited,
    hideBackdrop,
    keepMounted
  });

  const classes = useUtilityClasses$3(ownerState);

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  const handleEnter = () => {
    setExited(false);

    if (onTransitionEnter) {
      onTransitionEnter();
    }
  };

  const handleExited = () => {
    setExited(true);

    if (onTransitionExited) {
      onTransitionExited();
    }

    if (closeAfterTransition) {
      handleClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const handleKeyDown = event => {
    if (onKeyDown) {
      onKeyDown(event);
    } // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviors like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.


    if (event.key !== 'Escape' || !isTopModal()) {
      return;
    }

    if (!disableEscapeKeyDown) {
      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation();

      if (onClose) {
        onClose(event, 'escapeKeyDown');
      }
    }
  };

  const childProps = {};

  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = '-1';
  } // It's a Transition like component


  if (hasTransition) {
    childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
    childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
  }

  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return /*#__PURE__*/jsxRuntime.jsx(Portal, {
    ref: handlePortalRef,
    container: container,
    disablePortal: disablePortal,
    children: /*#__PURE__*/jsxRuntime.jsxs(Root, _extends({
      role: "presentation"
    }, rootProps, !isHostComponent(Root) && {
      as: component,
      ownerState: _extends({}, ownerState, rootProps.ownerState),
      theme
    }, other, {
      ref: handleRef,
      onKeyDown: handleKeyDown,
      className: clsx(classes.root, rootProps.className, className),
      children: [!hideBackdrop && BackdropComponent ? /*#__PURE__*/jsxRuntime.jsx(BackdropComponent, _extends({
        open: open,
        onClick: handleBackdropClick
      }, BackdropProps)) : null, /*#__PURE__*/jsxRuntime.jsx(Unstable_TrapFocus, {
        disableEnforceFocus: disableEnforceFocus,
        disableAutoFocus: disableAutoFocus,
        disableRestoreFocus: disableRestoreFocus,
        isEnabled: isTopModal,
        open: open,
        children: /*#__PURE__*/react.cloneElement(children, childProps)
      })]
    }))
  });
});

function isOptionGroup(child) {
  return !!child.options;
}

function getOptionsFromChildren(children) {
  if (children == null) {
    return [];
  }

  const selectChildren = [];
  react.Children.forEach(children, node => {
    var _props, _props2, _element$props$disabl2;

    const nodeChildren = node == null ? void 0 : (_props = node.props) == null ? void 0 : _props.children;

    if ((node == null ? void 0 : (_props2 = node.props) == null ? void 0 : _props2.value) === undefined) {
      if (nodeChildren != null) {
        var _element$props$disabl;

        const element = node;
        const group = {
          options: getOptionsFromChildren(nodeChildren),
          label: element.props.label,
          disabled: (_element$props$disabl = element.props.disabled) != null ? _element$props$disabl : false
        };
        selectChildren.push(group);
      }

      return;
    }

    const element = node;
    const option = {
      value: element.props.value,
      label: element.props.children,
      disabled: (_element$props$disabl2 = element.props.disabled) != null ? _element$props$disabl2 : false
    };
    selectChildren.push(option);
  });
  return selectChildren != null ? selectChildren : [];
}
function flattenOptionGroups(groupedOptions, isGroupDisabled = false) {
  let flatOptions = [];
  groupedOptions.forEach(optionOrGroup => {
    if (isOptionGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(flattenOptionGroups(optionOrGroup.options, optionOrGroup.disabled));
    } else {
      flatOptions.push(_extends({}, optionOrGroup, {
        disabled: isGroupDisabled || optionOrGroup.disabled
      }));
    }
  });
  return flatOptions;
}

function useSelect(props) {
  const {
    buttonComponent,
    buttonRef: buttonRefProp,
    defaultValue,
    disabled = false,
    listboxId,
    listboxRef: listboxRefProp,
    multiple = false,
    onChange,
    onOpenChange,
    open,
    options,
    value: valueProp
  } = props;
  const buttonRef = react.useRef(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);
  const listboxRef = react.useRef(null);
  const intermediaryListboxRef = useForkRef(listboxRefProp, listboxRef);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'SelectUnstyled',
    state: 'value'
  }); // prevents closing the listbox on keyUp right after opening it

  const ignoreEnterKeyUp = react.useRef(false); // prevents reopening the listbox when button is clicked
  // (listbox closes on lost focus, then immediately reopens on click)

  const ignoreClick = react.useRef(false); // Ensure the listbox is focused after opening

  const [listboxFocusRequested, requestListboxFocus] = react.useState(false);
  const focusListboxIfRequested = react.useCallback(() => {
    if (listboxFocusRequested && listboxRef.current != null) {
      listboxRef.current.focus();
      requestListboxFocus(false);
    }
  }, [listboxFocusRequested]);

  const updateListboxRef = listboxElement => {
    listboxRef.current = listboxElement;
    focusListboxIfRequested();
  };

  const handleListboxRef = useForkRef(intermediaryListboxRef, updateListboxRef);
  react.useEffect(() => {
    focusListboxIfRequested();
  }, [focusListboxIfRequested]);
  react.useEffect(() => {
    requestListboxFocus(open != null ? open : false);
  }, [open]);

  const createHandleMouseDown = otherHandlers => event => {
    var _otherHandlers$onMous;

    otherHandlers == null ? void 0 : (_otherHandlers$onMous = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);

    if (!event.defaultPrevented && open) {
      ignoreClick.current = true;
    }
  };

  const createHandleButtonClick = otherHandlers => event => {
    var _otherHandlers$onClic;

    otherHandlers == null ? void 0 : (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);

    if (!event.defaultPrevented && !ignoreClick.current) {
      onOpenChange == null ? void 0 : onOpenChange(!open);
    }

    ignoreClick.current = false;
  };

  const createHandleButtonKeyDown = otherHandlers => event => {
    var _otherHandlers$onKeyD;

    otherHandlers == null ? void 0 : (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Enter') {
      ignoreEnterKeyUp.current = true;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      onOpenChange == null ? void 0 : onOpenChange(true);
    }
  };

  const createHandleListboxKeyUp = otherHandlers => event => {
    var _otherHandlers$onKeyU;

    otherHandlers == null ? void 0 : (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event);

    if (event.defaultPrevented) {
      return;
    }

    const closingKeys = multiple ? ['Escape'] : ['Escape', 'Enter', ' '];

    if (open && !ignoreEnterKeyUp.current && closingKeys.includes(event.key)) {
      var _buttonRef$current;

      buttonRef == null ? void 0 : (_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.focus();
    }

    ignoreEnterKeyUp.current = false;
  };

  const createHandleListboxItemClick = otherHandlers => event => {
    var _otherHandlers$onClic2;

    otherHandlers == null ? void 0 : (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);

    if (event.defaultPrevented) {
      return;
    }

    if (!multiple) {
      onOpenChange == null ? void 0 : onOpenChange(false);
    }
  };

  const createHandleListboxBlur = otherHandlers => event => {
    var _otherHandlers$blur;

    otherHandlers == null ? void 0 : (_otherHandlers$blur = otherHandlers.blur) == null ? void 0 : _otherHandlers$blur.call(otherHandlers, event);

    if (!event.defaultPrevented) {
      onOpenChange == null ? void 0 : onOpenChange(false);
    }
  };

  const listboxReducer = (state, action) => {
    const newState = defaultListboxReducer(state, action); // change selection when listbox is closed

    if (action.type === ActionTypes.keyDown && !open && (action.event.key === 'ArrowUp' || action.event.key === 'ArrowDown')) {
      const optionToSelect = action.props.options[newState.highlightedIndex];
      return _extends({}, newState, {
        selectedValue: optionToSelect
      });
    }

    if (action.type === ActionTypes.blur || action.type === ActionTypes.setControlledValue || action.type === ActionTypes.optionsChange) {
      const selectedOptionIndex = action.props.options.findIndex(o => action.props.optionComparer(o, newState.selectedValue));
      return _extends({}, newState, {
        highlightedIndex: selectedOptionIndex
      });
    }

    return newState;
  };

  const {
    getRootProps: getButtonProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible
  } = useButton({
    component: buttonComponent,
    disabled,
    ref: handleButtonRef
  });
  const selectedOption = react.useMemo(() => {
    var _props$options$find;

    return props.multiple ? props.options.filter(o => value.includes(o.value)) : (_props$options$find = props.options.find(o => o.value === value)) != null ? _props$options$find : null;
  }, [props.multiple, props.options, value]);
  let useListboxParameters;

  if (props.multiple) {
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: o => {
        var _o$disabled;

        return (_o$disabled = o == null ? void 0 : o.disabled) != null ? _o$disabled : false;
      },
      optionComparer: (o, v) => (o == null ? void 0 : o.value) === (v == null ? void 0 : v.value),
      listboxRef: handleListboxRef,
      multiple: true,
      onChange: newOptions => {
        setValue(newOptions.map(o => o.value));
        onChange == null ? void 0 : onChange(newOptions.map(o => o.value));
      },
      options,
      value: selectedOption
    };
  } else {
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled: o => {
        var _o$disabled2;

        return (_o$disabled2 = o == null ? void 0 : o.disabled) != null ? _o$disabled2 : false;
      },
      optionComparer: (o, v) => (o == null ? void 0 : o.value) === (v == null ? void 0 : v.value),
      listboxRef: handleListboxRef,
      multiple: false,
      onChange: option => {
        var _option$value, _option$value2;

        setValue((_option$value = option == null ? void 0 : option.value) != null ? _option$value : null);
        onChange == null ? void 0 : onChange((_option$value2 = option == null ? void 0 : option.value) != null ? _option$value2 : null);
      },
      options,
      stateReducer: listboxReducer,
      value: selectedOption
    };
  }

  const {
    getRootProps: getListboxProps,
    getOptionProps,
    getOptionState,
    highlightedOption
  } = useListbox(useListboxParameters);
  react.useDebugValue({
    value,
    open,
    highlightedOption
  });
  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps: otherHandlers => {
      return _extends({}, getButtonProps(_extends({}, otherHandlers, {
        onClick: createHandleButtonClick(otherHandlers),
        onMouseDown: createHandleMouseDown(otherHandlers),
        onKeyDown: createHandleButtonKeyDown(otherHandlers)
      })), {
        'aria-expanded': open,
        'aria-haspopup': 'listbox'
      });
    },
    getListboxProps: otherHandlers => getListboxProps(_extends({}, otherHandlers, {
      onBlur: createHandleListboxBlur(otherHandlers),
      onKeyUp: createHandleListboxKeyUp(otherHandlers)
    })),
    getOptionProps: (option, otherHandlers) => {
      return getOptionProps(option, _extends({}, otherHandlers, {
        onClick: createHandleListboxItemClick(otherHandlers)
      }));
    },
    getOptionState,
    open,
    value
  };
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
};

var defaultModifiers = [eventListeners, popperOffsets, computeStyles, applyStyles$1, offset, flip, preventOverflow, arrow, hide];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

const _excluded$6 = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "ownerState", "placement", "popperOptions", "popperRef", "TransitionProps"],
      _excluded2 = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"];

function flipPlacement(placement, direction) {
  if (direction === 'ltr') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';

    case 'bottom-start':
      return 'bottom-end';

    case 'top-end':
      return 'top-start';

    case 'top-start':
      return 'top-end';

    default:
      return placement;
  }
}

function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const defaultPopperOptions = {};
/* eslint-disable react/prop-types */

const PopperTooltip = /*#__PURE__*/react.forwardRef(function PopperTooltip(props, ref) {
  const {
    anchorEl,
    children,
    direction,
    disablePortal,
    modifiers,
    open,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    TransitionProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$6);

  const tooltipRef = react.useRef(null);
  const ownRef = useForkRef(tooltipRef, ref);
  const popperRef = react.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = react.useRef(handlePopperRef);
  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  react.useImperativeHandle(popperRefProp, () => popperRef.current, []);
  const rtlPlacement = flipPlacement(initialPlacement, direction);
  /**
   * placement initialized from prop but can change during lifetime if modifiers.flip.
   * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
   */

  const [placement, setPlacement] = react.useState(rtlPlacement);
  react.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });
  useEnhancedEffect(() => {
    if (!anchorEl || !open) {
      return undefined;
    }

    const handlePopperUpdate = data => {
      setPlacement(data.placement);
    };

    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    let popperModifiers = [{
      name: 'preventOverflow',
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: 'flip',
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: 'onUpdate',
      enabled: true,
      phase: 'afterWrite',
      fn: ({
        state
      }) => {
        handlePopperUpdate(state);
      }
    }];

    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }

    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }

    const popper = createPopper(resolveAnchorEl(anchorEl), tooltipRef.current, _extends({
      placement: rtlPlacement
    }, popperOptions, {
      modifiers: popperModifiers
    }));
    handlePopperRefRef.current(popper);
    return () => {
      popper.destroy();
      handlePopperRefRef.current(null);
    };
  }, [anchorEl, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
  const childProps = {
    placement
  };

  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }

  return /*#__PURE__*/jsxRuntime.jsx("div", _extends({
    ref: ownRef,
    role: "tooltip"
  }, other, {
    children: typeof children === 'function' ? children(childProps) : children
  }));
});
/* eslint-enable react/prop-types */

/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v2/) for positioning.
 */

const PopperUnstyled = /*#__PURE__*/react.forwardRef(function PopperUnstyled(props, ref) {
  const {
    anchorEl,
    children,
    container: containerProp,
    direction = 'ltr',
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement = 'bottom',
    popperOptions = defaultPopperOptions,
    popperRef,
    style,
    transition = false
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded2);

  const [exited, setExited] = react.useState(true);

  const handleEnter = () => {
    setExited(false);
  };

  const handleExited = () => {
    setExited(true);
  };

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  } // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container


  const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : undefined);
  return /*#__PURE__*/jsxRuntime.jsx(Portal, {
    disablePortal: disablePortal,
    container: container,
    children: /*#__PURE__*/jsxRuntime.jsx(PopperTooltip, _extends({
      anchorEl: anchorEl,
      direction: direction,
      disablePortal: disablePortal,
      modifiers: modifiers,
      ref: ref,
      open: transition ? !exited : open,
      placement: placement,
      popperOptions: popperOptions,
      popperRef: popperRef
    }, other, {
      style: _extends({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: 'fixed',
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: !open && keepMounted && (!transition || exited) ? 'none' : null
      }, style),
      TransitionProps: transition ? {
        in: open,
        onEnter: handleEnter,
        onExited: handleExited
      } : null,
      children: children
    }))
  });
});

const SelectUnstyledContext = /*#__PURE__*/react.createContext(undefined);

function getSelectUnstyledUtilityClass(slot) {
  return generateUtilityClass('MuiSelectUnstyled', slot);
}
const selectUnstyledClasses = generateUtilityClasses('MuiSelectUnstyled', ['root', 'button', 'listbox', 'popper', 'active', 'expanded', 'disabled', 'focusVisible']);

const _excluded$7 = ["autoFocus", "children", "className", "component", "components", "componentsProps", "defaultListboxOpen", "defaultValue", "disabled", "listboxOpen", "onChange", "onListboxOpenChange", "value"];

function defaultRenderMultipleValues(selectedOptions) {
  return /*#__PURE__*/jsxRuntime.jsx(react.Fragment, {
    children: selectedOptions.map(o => o.label).join(', ')
  });
}

function useUtilityClasses$4(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active', open && 'expanded'],
    listbox: ['listbox', disabled && 'disabled'],
    popper: ['popper']
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
/**
 * The foundation for building custom-styled multi-selection select components.
 */


const MultiSelectUnstyled = /*#__PURE__*/react.forwardRef(function MultiSelectUnstyled(props, ref) {
  var _props$renderValue, _ref, _components$Listbox, _components$Popper, _componentsProps$list, _componentsProps$list2, _componentsProps$root, _componentsProps$list3, _componentsProps$popp;

  const {
    autoFocus,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultListboxOpen = false,
    defaultValue = [],
    disabled: disabledProp,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    value: valueProp
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$7);

  const renderValue = (_props$renderValue = props.renderValue) != null ? _props$renderValue : defaultRenderMultipleValues;
  const [groupedOptions, setGroupedOptions] = react.useState([]);
  const options = react.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'MultiSelectUnstyled',
    state: 'listboxOpen'
  });
  react.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);
  const [buttonDefined, setButtonDefined] = react.useState(false);
  const buttonRef = react.useRef(null);
  const Button = (_ref = component != null ? component : components.Root) != null ? _ref : 'button';
  const ListboxRoot = (_components$Listbox = components.Listbox) != null ? _components$Listbox : 'ul';
  const Popper = (_components$Popper = components.Popper) != null ? _components$Popper : PopperUnstyled;

  const handleButtonRefChange = element => {
    buttonRef.current = element;

    if (element != null) {
      setButtonDefined(true);
    }
  };

  const handleButtonRef = useForkRef(ref, handleButtonRefChange);
  react.useEffect(() => {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = isOpen => {
    setListboxOpen(isOpen);
    onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
  };

  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value
  } = useSelect({
    buttonComponent: Button,
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId: (_componentsProps$list = componentsProps.listbox) == null ? void 0 : _componentsProps$list.id,
    listboxRef: (_componentsProps$list2 = componentsProps.listbox) == null ? void 0 : _componentsProps$list2.ref,
    multiple: true,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp
  });

  const ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value
  });

  const classes = useUtilityClasses$4(ownerState);
  const selectedOptions = react.useMemo(() => {
    if (value == null) {
      return [];
    }

    return options.filter(o => value.includes(o.value));
  }, [options, value]);
  const buttonProps = appendOwnerState(Button, _extends({}, other, componentsProps.root, getButtonProps(), {
    className: clsx(className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, classes.root)
  }), ownerState);
  const listboxProps = appendOwnerState(ListboxRoot, _extends({}, componentsProps.listbox, getListboxProps(), {
    className: clsx((_componentsProps$list3 = componentsProps.listbox) == null ? void 0 : _componentsProps$list3.className, classes.listbox)
  }), ownerState);
  const popperProps = appendOwnerState(Popper, _extends({
    open: listboxOpen,
    anchorEl: buttonRef.current,
    placement: 'bottom-start',
    disablePortal: true,
    role: undefined
  }, componentsProps.popper, {
    className: clsx((_componentsProps$popp = componentsProps.popper) == null ? void 0 : _componentsProps$popp.className, classes.popper)
  }), ownerState);
  const context = {
    getOptionProps,
    getOptionState
  };
  return /*#__PURE__*/jsxRuntime.jsxs(react.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(Button, _extends({}, buttonProps, {
      children: renderValue(selectedOptions)
    })), buttonDefined && /*#__PURE__*/jsxRuntime.jsx(Popper, _extends({}, popperProps, {
      children: /*#__PURE__*/jsxRuntime.jsx(ListboxRoot, _extends({}, listboxProps, {
        children: /*#__PURE__*/jsxRuntime.jsx(SelectUnstyledContext.Provider, {
          value: context,
          children: children
        })
      }))
    }))]
  });
});

function NoSsr(props) {
  const {
    children,
    defer = false,
    fallback = null
  } = props;
  const [mountedState, setMountedState] = react.useState(false);
  useEnhancedEffect(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  react.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]); // We need the Fragment here to force react-docgen to recognise NoSsr as a component.

  return /*#__PURE__*/jsxRuntime.jsx(react.Fragment, {
    children: mountedState ? children : fallback
  });
}

function getOptionGroupUnstyledUtilityClass(slot) {
  return generateUtilityClass('MuiOptionGroupUnstyled', slot);
}
const optionGroupUnstyledClasses = generateUtilityClasses('MuiOptionGroupUnstyled', ['root', 'label', 'list']);

const _excluded$8 = ["className", "component", "components", "disabled", "componentsProps"];

function useUtilityClasses$5(disabled) {
  const slots = {
    root: ['root', disabled && 'disabled'],
    label: ['label'],
    list: ['list']
  };
  return composeClasses(slots, getOptionGroupUnstyledUtilityClass, {});
}
/**
 * An unstyled option group to be used within a SelectUnstyled.
 *
 * Demos:
 *
 * - [Selects](https://mui.com/components/selects/)
 *
 * API:
 *
 * - [OptionGroupUnstyled API](https://mui.com/api/option-group-unstyled/)
 */


const OptionGroupUnstyled = /*#__PURE__*/react.forwardRef(function OptionGroupUnstyled(props, ref) {
  var _componentsProps$root, _componentsProps$labe, _componentsProps$list;

  const {
    className,
    component,
    components = {},
    disabled = false,
    componentsProps = {}
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$8);

  const Root = component || (components == null ? void 0 : components.Root) || 'li';
  const Label = (components == null ? void 0 : components.Label) || 'span';
  const List = (components == null ? void 0 : components.List) || 'ul';
  const classes = useUtilityClasses$5(disabled);

  const rootProps = _extends({}, other, {
    ref
  }, componentsProps.root, {
    className: clsx(classes.root, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  });

  const labelProps = _extends({}, componentsProps.label, {
    className: clsx(classes.label, (_componentsProps$labe = componentsProps.label) == null ? void 0 : _componentsProps$labe.className)
  });

  const listProps = _extends({}, componentsProps.list, {
    className: clsx(classes.list, (_componentsProps$list = componentsProps.list) == null ? void 0 : _componentsProps$list.className)
  });

  return /*#__PURE__*/jsxRuntime.jsxs(Root, _extends({}, rootProps, {
    children: [/*#__PURE__*/jsxRuntime.jsx(Label, _extends({}, labelProps, {
      children: props.label
    })), /*#__PURE__*/jsxRuntime.jsx(List, _extends({}, listProps, {
      children: props.children
    }))]
  }));
});

function getOptionUnstyledUtilityClass(slot) {
  return generateUtilityClass('MuiOptionUnstyled', slot);
}
const optionUnstyledClasses = generateUtilityClasses('MuiOptionUnstyled', ['root', 'disabled', 'selected', 'highlighted']);

const _excluded$9 = ["children", "className", "component", "components", "componentsProps", "disabled", "value"];

function useUtilityClasses$6(ownerState) {
  const {
    disabled,
    highlighted,
    selected
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', highlighted && 'highlighted', selected && 'selected']
  };
  return composeClasses(slots, getOptionUnstyledUtilityClass, {});
}
/**
 * An unstyled option to be used within a SelectUnstyled.
 */


const OptionUnstyled = /*#__PURE__*/react.forwardRef(function OptionUnstyled(props, ref) {
  var _componentsProps$root;

  const {
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled,
    value
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$9);

  const selectContext = react.useContext(SelectUnstyledContext);

  if (!selectContext) {
    throw new Error('OptionUnstyled must be used within a SelectUnstyled');
  }

  const Root = component || components.Root || 'li';
  const selectOption = {
    value,
    label: children,
    disabled
  };
  const optionState = selectContext.getOptionState(selectOption);
  const optionProps = selectContext.getOptionProps(selectOption);

  const ownerState = _extends({}, props, optionState);

  const optionRef = react.useRef(null);
  const handleRef = useForkRef(ref, optionRef);
  react.useEffect(() => {
    if (optionState.highlighted) {
      var _optionRef$current, _optionRef$current$sc;

      (_optionRef$current = optionRef.current) == null ? void 0 : (_optionRef$current$sc = _optionRef$current.scrollIntoView) == null ? void 0 : _optionRef$current$sc.call(_optionRef$current, {
        block: 'nearest'
      });
    }
  }, [optionState.highlighted]);
  const classes = useUtilityClasses$6(ownerState);
  const rootProps = appendOwnerState(Root, _extends({}, other, {
    ref: handleRef
  }, optionProps, componentsProps.root, {
    className: clsx(classes.root, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  }), ownerState);
  return /*#__PURE__*/jsxRuntime.jsx(Root, _extends({}, rootProps, {
    children: children
  }));
});
/**
 * An unstyled option to be used within a SelectUnstyled.
 *
 * Demos:
 *
 * - [Selects](https://mui.com/components/selects/)
 *
 * API:
 *
 * - [OptionUnstyled API](https://mui.com/api/option-unstyled/)
 */

var OptionUnstyled$1 = /*#__PURE__*/react.memo(OptionUnstyled);

const _excluded$a = ["autoFocus", "children", "className", "component", "components", "componentsProps", "defaultValue", "defaultListboxOpen", "disabled", "listboxOpen", "onChange", "onListboxOpenChange", "renderValue", "value"];

function defaultRenderSingleValue(selectedOption) {
  var _selectedOption$label;

  return (_selectedOption$label = selectedOption == null ? void 0 : selectedOption.label) != null ? _selectedOption$label : '';
}

function useUtilityClasses$7(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active', open && 'expanded'],
    listbox: ['listbox', disabled && 'disabled'],
    popper: ['popper']
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
/**
 * The foundation for building custom-styled select components.
 */


const SelectUnstyled = /*#__PURE__*/react.forwardRef(function SelectUnstyled(props, ref) {
  var _ref, _components$Listbox, _components$Popper, _componentsProps$list, _componentsProps$list2, _componentsProps$root, _componentsProps$list3, _componentsProps$popp;

  const {
    autoFocus,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    renderValue: renderValueProp,
    value: valueProp
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$a);

  const renderValue = renderValueProp != null ? renderValueProp : defaultRenderSingleValue;
  const [groupedOptions, setGroupedOptions] = react.useState([]);
  const options = react.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'SelectUnstyled',
    state: 'listboxOpen'
  });
  react.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);
  const [buttonDefined, setButtonDefined] = react.useState(false);
  const buttonRef = react.useRef(null);
  const Button = (_ref = component != null ? component : components.Root) != null ? _ref : 'button';
  const ListboxRoot = (_components$Listbox = components.Listbox) != null ? _components$Listbox : 'ul';
  const Popper = (_components$Popper = components.Popper) != null ? _components$Popper : PopperUnstyled;

  const handleButtonRefChange = element => {
    buttonRef.current = element;

    if (element != null) {
      setButtonDefined(true);
    }
  };

  const handleButtonRef = useForkRef(ref, handleButtonRefChange);
  react.useEffect(() => {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = isOpen => {
    setListboxOpen(isOpen);
    onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
  };

  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value
  } = useSelect({
    buttonComponent: Button,
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId: (_componentsProps$list = componentsProps.listbox) == null ? void 0 : _componentsProps$list.id,
    listboxRef: (_componentsProps$list2 = componentsProps.listbox) == null ? void 0 : _componentsProps$list2.ref,
    multiple: false,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp
  });

  const ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value
  });

  const classes = useUtilityClasses$7(ownerState);
  const selectedOptions = react.useMemo(() => {
    return options.find(o => value === o.value);
  }, [options, value]);
  const buttonProps = appendOwnerState(Button, _extends({}, other, componentsProps.root, getButtonProps(), {
    className: clsx(className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, classes.root)
  }), ownerState);
  const listboxProps = appendOwnerState(ListboxRoot, _extends({}, componentsProps.listbox, getListboxProps(), {
    className: clsx((_componentsProps$list3 = componentsProps.listbox) == null ? void 0 : _componentsProps$list3.className, classes.listbox)
  }), ownerState);
  const popperProps = appendOwnerState(Popper, _extends({
    open: listboxOpen,
    anchorEl: buttonRef.current,
    placement: 'bottom-start',
    disablePortal: true,
    role: undefined
  }, componentsProps.popper, {
    className: clsx((_componentsProps$popp = componentsProps.popper) == null ? void 0 : _componentsProps$popp.className, classes.popper)
  }), ownerState);
  const context = {
    getOptionProps,
    getOptionState
  };
  return /*#__PURE__*/jsxRuntime.jsxs(react.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(Button, _extends({}, buttonProps, {
      children: renderValue(selectedOptions)
    })), buttonDefined && /*#__PURE__*/jsxRuntime.jsx(Popper, _extends({}, popperProps, {
      children: /*#__PURE__*/jsxRuntime.jsx(ListboxRoot, _extends({}, listboxProps, {
        children: /*#__PURE__*/jsxRuntime.jsx(SelectUnstyledContext.Provider, {
          value: context,
          children: children
        })
      }))
    }))]
  });
});

function getSliderUtilityClass(slot) {
  return generateUtilityClass('MuiSlider', slot);
}
const sliderUnstyledClasses = generateUtilityClasses('MuiSlider', ['root', 'active', 'focusVisible', 'disabled', 'dragging', 'marked', 'vertical', 'trackInverted', 'trackFalse', 'rail', 'track', 'mark', 'markActive', 'markLabel', 'markLabelActive', 'thumb', 'valueLabel', 'valueLabelOpen', 'valueLabelCircle', 'valueLabelLabel']);

const useValueLabelClasses = props => {
  const {
    open
  } = props;
  const utilityClasses = {
    offset: clsx(open && sliderUnstyledClasses.valueLabelOpen),
    circle: sliderUnstyledClasses.valueLabelCircle,
    label: sliderUnstyledClasses.valueLabelLabel
  };
  return utilityClasses;
};
/**
 * @ignore - internal component.
 */


function SliderValueLabelUnstyled(props) {
  const {
    children,
    className,
    value,
    theme
  } = props;
  const classes = useValueLabelClasses(props);
  return /*#__PURE__*/react.cloneElement(children, {
    className: clsx(children.props.className)
  }, /*#__PURE__*/jsxRuntime.jsxs(react.Fragment, {
    children: [children.props.children, /*#__PURE__*/jsxRuntime.jsx("span", {
      className: clsx(classes.offset, className),
      theme: theme,
      "aria-hidden": true,
      children: /*#__PURE__*/jsxRuntime.jsx("span", {
        className: classes.circle,
        children: /*#__PURE__*/jsxRuntime.jsx("span", {
          className: classes.label,
          children: value
        })
      })
    })]
  }));
}

const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;

function asc(a, b) {
  return a - b;
}

function clamp(value, min, max) {
  if (value == null) {
    return min;
  }

  return Math.min(Math.max(min, value), max);
}

function findClosest(values, currentValue) {
  var _values$reduce;

  const {
    index: closestIndex
  } = (_values$reduce = values.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);

    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index
      };
    }

    return acc;
  }, null)) != null ? _values$reduce : {};
  return closestIndex;
}

function trackFinger(event, touchId) {
  // The event is TouchEvent
  if (touchId.current !== undefined && event.changedTouches) {
    const touchEvent = event;

    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];

      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }

    return false;
  } // The event is MouseEvent


  return {
    x: event.clientX,
    y: event.clientY
  };
}

function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}

function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}

function getDecimalPrecision(num) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value, step, min) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

function setValueIndex({
  values,
  newValue,
  index
}) {
  const output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}

function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  var _sliderRef$current, _doc$activeElement;

  const doc = ownerDocument(sliderRef.current);

  if (!((_sliderRef$current = sliderRef.current) != null && _sliderRef$current.contains(doc.activeElement)) || Number(doc == null ? void 0 : (_doc$activeElement = doc.activeElement) == null ? void 0 : _doc$activeElement.getAttribute('data-index')) !== activeIndex) {
    var _sliderRef$current2;

    (_sliderRef$current2 = sliderRef.current) == null ? void 0 : _sliderRef$current2.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

const axisProps = {
  horizontal: {
    offset: percent => ({
      left: `${percent}%`
    }),
    leap: percent => ({
      width: `${percent}%`
    })
  },
  'horizontal-reverse': {
    offset: percent => ({
      right: `${percent}%`
    }),
    leap: percent => ({
      width: `${percent}%`
    })
  },
  vertical: {
    offset: percent => ({
      bottom: `${percent}%`
    }),
    leap: percent => ({
      height: `${percent}%`
    })
  }
};
const Identity = x => x; // TODO: remove support for Safari < 13.
// https://caniuse.com/#search=touch-action
//
// Safari, on iOS, supports touch action since v13.
// Over 80% of the iOS phones are compatible
// in August 2020.
// Utilizing the CSS.supports method to check if touch-action is supported.
// Since CSS.supports is supported on all but Edge@12 and IE and touch-action
// is supported on both Edge@12 and IE if CSS.supports is not available that means that
// touch-action will be supported

let cachedSupportsTouchActionNone;

function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }

  return cachedSupportsTouchActionNone;
}

function useSlider(props) {
  const {
    ref,
    'aria-labelledby': ariaLabelledby,
    defaultValue,
    disableSwap = false,
    disabled = false,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = 'horizontal',
    scale = Identity,
    step = 1,
    tabIndex,
    value: valueProp,
    isRtl = false
  } = props;
  const touchId = react.useRef(); // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transferred when inversing a range slider.

  const [active, setActive] = react.useState(-1);
  const [open, setOpen] = react.useState(-1);
  const [dragging, setDragging] = react.useState(false);
  const moveCount = react.useRef(0);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min,
    name: 'Slider'
  });

  const handleChange = onChange && ((event, value, thumbIndex) => {
    // Redefine target to allow name and value to be read.
    // This allows seamless integration with the most popular form libraries.
    // https://github.com/mui-org/material-ui/issues/13485#issuecomment-676048492
    // Clone the event to not override `target` of the original event.
    const nativeEvent = event.nativeEvent || event; // @ts-ignore The nativeEvent is function, not object

    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, 'target', {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  });

  const range = Array.isArray(valueDerived);
  let values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map(value => clamp(value, min, max));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
    value: min + step * index
  })) : marksProp || [];
  const marksValues = marks.map(mark => mark.value);
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = react.useState(-1);
  const sliderRef = react.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);

  const createHandleHiddenInputFocus = otherHandlers => event => {
    var _otherHandlers$onFocu;

    const index = Number(event.currentTarget.getAttribute('data-index'));
    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(index);
    }

    setOpen(index);
    otherHandlers == null ? void 0 : (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
  };

  const createHandleHidenInputBlur = otherHandlers => event => {
    var _otherHandlers$onBlur;

    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(-1);
    }

    setOpen(-1);
    otherHandlers == null ? void 0 : (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };

  useEnhancedEffect(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      var _document$activeEleme;

      // This is necessary because Firefox and Safari will keep focus
      // on a disabled element:
      // https://codesandbox.io/s/mui-pr-22247-forked-h151h?file=/src/App.js
      // @ts-ignore
      (_document$activeEleme = document.activeElement) == null ? void 0 : _document$activeEleme.blur();
    }
  }, [disabled]);

  if (disabled && active !== -1) {
    setActive(-1);
  }

  if (disabled && focusVisible !== -1) {
    setFocusVisible(-1);
  }

  const createHandleHiddenInputChange = otherHandlers => event => {
    var _otherHandlers$onChan;

    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute('data-index'));
    const value = values[index];
    const marksIndex = marksValues.indexOf(value); // @ts-ignore

    let newValue = event.target.valueAsNumber;

    if (marks && step == null) {
      newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
    }

    newValue = clamp(newValue, min, max);

    if (marks && step == null) {
      const currentMarkIndex = marksValues.indexOf(values[index]);
      newValue = newValue < values[index] ? marksValues[currentMarkIndex - 1] : marksValues[currentMarkIndex + 1];
    }

    if (range) {
      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity);
      }

      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index
      });
      let activeIndex = index; // Potentially swap the index if needed.

      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }

      focusThumb({
        sliderRef,
        activeIndex
      });
    }

    setValueState(newValue);
    setFocusVisible(index);

    if (handleChange) {
      handleChange(event, newValue, index);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };

  const previousIndex = react.useRef();
  let axis = orientation;

  if (isRtl && orientation === 'horizontal') {
    axis += '-reverse';
  }

  const getFingerNewValue = ({
    finger,
    move = false,
    values: values2
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width,
      height,
      bottom,
      left
    } = slider.getBoundingClientRect();
    let percent;

    if (axis.indexOf('vertical') === 0) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }

    if (axis.indexOf('-reverse') !== -1) {
      percent = 1 - percent;
    }

    let newValue;
    newValue = percentToValue(percent, min, max);

    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }

    newValue = clamp(newValue, min, max);
    let activeIndex = 0;

    if (range) {
      if (!move) {
        activeIndex = findClosest(values2, newValue);
      } else {
        activeIndex = previousIndex.current;
      } // Bound the new value to the thumb's neighbours.


      if (disableSwap) {
        newValue = clamp(newValue, values2[activeIndex - 1] || -Infinity, values2[activeIndex + 1] || Infinity);
      }

      const previousValue = newValue;
      newValue = setValueIndex({
        values: values2,
        newValue,
        index: activeIndex
      }); // Potentially swap the index if needed.

      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }

    return {
      newValue,
      activeIndex
    };
  };

  const handleTouchMove = useEventCallback(nativeEvent => {
    const finger = trackFinger(nativeEvent, touchId);

    if (!finger) {
      return;
    }

    moveCount.current += 1; // Cancel move in case some other element consumed a mouseup event and it was not fired.
    // @ts-ignore buttons doesn't not exists on touch event

    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleTouchEnd(nativeEvent);
      return;
    }

    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      move: true,
      values
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);

    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }

    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  const handleTouchEnd = useEventCallback(nativeEvent => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);

    if (!finger) {
      return;
    }

    const {
      newValue
    } = getFingerNewValue({
      finger,
      values
    });
    setActive(-1);

    if (nativeEvent.type === 'touchend') {
      setOpen(-1);
    }

    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }

    touchId.current = undefined; // eslint-disable-next-line @typescript-eslint/no-use-before-define

    stopListening();
  });
  const handleTouchStart = useEventCallback(nativeEvent => {
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }

    const touch = nativeEvent.changedTouches[0];

    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }

    const finger = trackFinger(nativeEvent, touchId);

    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger,
        values
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);

      if (handleChange) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }

    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('touchmove', handleTouchMove);
    doc.addEventListener('touchend', handleTouchEnd);
  });
  const stopListening = react.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener('mousemove', handleTouchMove);
    doc.removeEventListener('mouseup', handleTouchEnd);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  react.useEffect(() => {
    const {
      current: slider
    } = sliderRef;
    slider.addEventListener('touchstart', handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      // @ts-ignore
      slider.removeEventListener('touchstart', handleTouchStart, {
        passive: doesSupportTouchActionNone()
      });
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  react.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);

  const createHandleMouseDown = otherHandlers => event => {
    var _otherHandlers$onMous;

    (_otherHandlers$onMous = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);

    if (event.defaultPrevented) {
      return;
    } // Only handle left clicks


    if (event.button !== 0) {
      return;
    } // Avoid text selection


    event.preventDefault();
    const finger = trackFinger(event, touchId);

    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger,
        values
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);

      if (handleChange) {
        handleChange(event, newValue, activeIndex);
      }
    }

    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('mousemove', handleTouchMove);
    doc.addEventListener('mouseup', handleTouchEnd);
  };

  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;

  const getRootProps = otherHandlers => {
    const ownEventHandlers = {
      onMouseDown: createHandleMouseDown(otherHandlers || {})
    };

    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);

    return _extends({
      ref: handleRef
    }, mergedEventHandlers);
  };

  const createHandleMouseOver = otherHandlers => event => {
    var _otherHandlers$onMous2;

    (_otherHandlers$onMous2 = otherHandlers.onMouseOver) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute('data-index'));
    setOpen(index);
  };

  const createHandleMouseLeave = otherHandlers => event => {
    var _otherHandlers$onMous3;

    (_otherHandlers$onMous3 = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous3.call(otherHandlers, event);
    setOpen(-1);
  };

  const getThumbProps = otherHandlers => {
    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(otherHandlers || {}),
      onMouseLeave: createHandleMouseLeave(otherHandlers || {})
    };

    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);

    return _extends({}, mergedEventHandlers);
  };

  const getHiddenInputProps = otherHandlers => {
    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(otherHandlers || {}),
      onFocus: createHandleHiddenInputFocus(otherHandlers || {}),
      onBlur: createHandleHidenInputBlur(otherHandlers || {})
    };

    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);

    return _extends({
      tabIndex,
      'aria-labelledby': ariaLabelledby,
      'aria-orientation': orientation,
      'aria-valuemax': scale(max),
      'aria-valuemin': scale(min),
      name,
      type: 'range',
      min: props.min,
      max: props.max,
      step: props.step,
      disabled
    }, mergedEventHandlers, {
      style: _extends({}, visuallyHidden, {
        direction: isRtl ? 'rtl' : 'ltr',
        // So that VoiceOver's focus indicator matches the thumb's dimensions
        width: '100%',
        height: '100%'
      })
    });
  };

  return {
    axis,
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    dragging,
    marks,
    values,
    active,
    focusVisible,
    open,
    range,
    trackOffset,
    trackLeap
  };
}

const _excluded$b = ["aria-label", "aria-valuetext", "className", "component", "classes", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "onMouseDown", "orientation", "scale", "step", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat", "isRtl", "components", "componentsProps"];

const Identity$1 = x => x;

const useUtilityClasses$8 = ownerState => {
  const {
    disabled,
    dragging,
    marked,
    orientation,
    track,
    classes
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', dragging && 'dragging', marked && 'marked', orientation === 'vertical' && 'vertical', track === 'inverted' && 'trackInverted', track === false && 'trackFalse'],
    rail: ['rail'],
    track: ['track'],
    mark: ['mark'],
    markActive: ['markActive'],
    markLabel: ['markLabel'],
    markLabelActive: ['markLabelActive'],
    valueLabel: ['valueLabel'],
    thumb: ['thumb', disabled && 'disabled'],
    active: ['active'],
    disabled: ['disabled'],
    focusVisible: ['focusVisible']
  };
  return composeClasses(slots, getSliderUtilityClass, classes);
};

const Forward = ({
  children
}) => children;

const SliderUnstyled = /*#__PURE__*/react.forwardRef(function SliderUnstyled(props, ref) {
  var _ref, _components$Rail, _components$Track, _components$Thumb, _components$ValueLabe, _components$Mark, _components$MarkLabel;

  const {
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValuetext,
    className,
    component,
    classes: classesProp,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    onMouseDown,
    orientation = 'horizontal',
    scale = Identity$1,
    step = 1,
    track = 'normal',
    valueLabelDisplay = 'off',
    valueLabelFormat = Identity$1,
    isRtl = false,
    components = {},
    componentsProps = {}
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$b); // all props with defaults
  // consider extracting to hook an reusing the lint rule for the varints


  const ownerState = _extends({}, props, {
    mark: marksProp,
    classes: classesProp,
    disabled,
    isRtl,
    max,
    min,
    orientation,
    scale,
    step,
    track,
    valueLabelDisplay,
    valueLabelFormat
  });

  const {
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    open,
    active,
    axis,
    range,
    focusVisible,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap
  } = useSlider(_extends({}, ownerState, {
    ref
  }));
  ownerState.marked = marks.length > 0 && marks.some(mark => mark.label);
  ownerState.dragging = dragging;
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : 'span';
  const rootProps = appendOwnerState(Root, _extends({}, other, componentsProps.root), ownerState);
  const Rail = (_components$Rail = components.Rail) != null ? _components$Rail : 'span';
  const railProps = appendOwnerState(Rail, componentsProps.rail, ownerState);
  const Track = (_components$Track = components.Track) != null ? _components$Track : 'span';
  const trackProps = appendOwnerState(Track, componentsProps.track, ownerState);

  const trackStyle = _extends({}, axisProps[axis].offset(trackOffset), axisProps[axis].leap(trackLeap));

  const Thumb = (_components$Thumb = components.Thumb) != null ? _components$Thumb : 'span';
  const thumbProps = appendOwnerState(Thumb, componentsProps.thumb, ownerState);
  const ValueLabel = (_components$ValueLabe = components.ValueLabel) != null ? _components$ValueLabe : SliderValueLabelUnstyled;
  const valueLabelProps = appendOwnerState(ValueLabel, componentsProps.valueLabel, ownerState);
  const Mark = (_components$Mark = components.Mark) != null ? _components$Mark : 'span';
  const markProps = appendOwnerState(Mark, componentsProps.mark, ownerState);
  const MarkLabel = (_components$MarkLabel = components.MarkLabel) != null ? _components$MarkLabel : 'span';
  const markLabelProps = appendOwnerState(MarkLabel, componentsProps.markLabel, ownerState);
  const Input = components.Input || 'input';
  const inputProps = appendOwnerState(Input, componentsProps.input, ownerState);
  const hiddenInputProps = getHiddenInputProps();
  const classes = useUtilityClasses$8(ownerState);
  return /*#__PURE__*/jsxRuntime.jsxs(Root, _extends({}, rootProps, getRootProps({
    onMouseDown
  }), {
    className: clsx(classes.root, rootProps.className, className),
    children: [/*#__PURE__*/jsxRuntime.jsx(Rail, _extends({}, railProps, {
      className: clsx(classes.rail, railProps.className)
    })), /*#__PURE__*/jsxRuntime.jsx(Track, _extends({}, trackProps, {
      className: clsx(classes.track, trackProps.className),
      style: _extends({}, trackStyle, trackProps.style)
    })), marks.map((mark, index) => {
      const percent = valueToPercent(mark.value, min, max);
      const style = axisProps[axis].offset(percent);
      let markActive;

      if (track === false) {
        markActive = values.indexOf(mark.value) !== -1;
      } else {
        markActive = track === 'normal' && (range ? mark.value >= values[0] && mark.value <= values[values.length - 1] : mark.value <= values[0]) || track === 'inverted' && (range ? mark.value <= values[0] || mark.value >= values[values.length - 1] : mark.value >= values[0]);
      }

      return /*#__PURE__*/jsxRuntime.jsxs(react.Fragment, {
        children: [/*#__PURE__*/jsxRuntime.jsx(Mark, _extends({
          "data-index": index
        }, markProps, !isHostComponent(Mark) && {
          markActive
        }, {
          style: _extends({}, style, markProps.style),
          className: clsx(classes.mark, markProps.className, markActive && classes.markActive)
        })), mark.label != null ? /*#__PURE__*/jsxRuntime.jsx(MarkLabel, _extends({
          "aria-hidden": true,
          "data-index": index
        }, markLabelProps, !isHostComponent(MarkLabel) && {
          markLabelActive: markActive
        }, {
          style: _extends({}, style, markLabelProps.style),
          className: clsx(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
          children: mark.label
        })) : null]
      }, mark.value);
    }), values.map((value, index) => {
      const percent = valueToPercent(value, min, max);
      const style = axisProps[axis].offset(percent);
      const ValueLabelComponent = valueLabelDisplay === 'off' ? Forward : ValueLabel;
      return /*#__PURE__*/jsxRuntime.jsx(react.Fragment, {
        children: /*#__PURE__*/jsxRuntime.jsx(ValueLabelComponent, _extends({}, !isHostComponent(ValueLabelComponent) && {
          valueLabelFormat,
          valueLabelDisplay,
          value: typeof valueLabelFormat === 'function' ? valueLabelFormat(scale(value), index) : valueLabelFormat,
          index,
          open: open === index || active === index || valueLabelDisplay === 'on',
          disabled
        }, valueLabelProps, {
          className: clsx(classes.valueLabel, valueLabelProps.className),
          children: /*#__PURE__*/jsxRuntime.jsx(Thumb, _extends({
            "data-index": index
          }, thumbProps, getThumbProps(), {
            className: clsx(classes.thumb, thumbProps.className, active === index && classes.active, focusVisible === index && classes.focusVisible)
          }, !isHostComponent(Thumb) && {
            ownerState: _extends({}, ownerState, thumbProps.ownerState)
          }, {
            style: _extends({}, style, {
              pointerEvents: disableSwap && active !== index ? 'none' : undefined
            }, thumbProps.style),
            children: /*#__PURE__*/jsxRuntime.jsx(Input, _extends({}, hiddenInputProps, {
              "data-index": index,
              "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
              "aria-valuenow": scale(value),
              "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
              value: values[index]
            }, !isHostComponent(Input) && {
              ownerState: _extends({}, ownerState, inputProps.ownerState)
            }, inputProps, {
              style: _extends({}, hiddenInputProps.style, inputProps.style)
            }))
          }))
        }))
      }, index);
    })]
  }));
});

/**
 * The basic building block for creating custom switches.
 *
 * Demos:
 *
 * - [Switches](https://mui.com/components/switches/)
 */
function useSwitch(props) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'Switch',
    state: 'checked'
  });

  const handleInputChange = (event, otherHandler) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    setCheckedState(event.target.checked);
    onChange == null ? void 0 : onChange(event);
    otherHandler == null ? void 0 : otherHandler(event);
  };

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = react.useState(false);

  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  react.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const inputRef = react.useRef(null);

  const handleFocus = (event, otherHandler) => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }

    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible == null ? void 0 : onFocusVisible(event);
    }

    onFocus == null ? void 0 : onFocus(event);
    otherHandler == null ? void 0 : otherHandler(event);
  };

  const handleBlur = (event, otherHandler) => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    onBlur == null ? void 0 : onBlur(event);
    otherHandler == null ? void 0 : otherHandler(event);
  };

  const handleRefChange = useForkRef(focusVisibleRef, inputRef);

  const getInputProps = (otherProps = {}) => _extends({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    required,
    type: 'checkbox'
  }, otherProps, {
    onChange: event => handleInputChange(event, otherProps.onChange),
    onFocus: event => handleFocus(event, otherProps.onFocus),
    onBlur: event => handleBlur(event, otherProps.onBlur),
    ref: handleRefChange
  });

  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    readOnly: Boolean(readOnly)
  };
}

function getSwitchUnstyledUtilityClass(slot) {
  return generateUtilityClass('MuiSwitch', slot);
}
const switchUnstyledClasses = generateUtilityClasses('MuiSwitch', ['root', 'input', 'track', 'thumb', 'checked', 'disabled', 'focusVisible', 'readOnly']);

const _excluded$c = ["checked", "className", "component", "components", "componentsProps", "defaultChecked", "disabled", "onBlur", "onChange", "onFocus", "onFocusVisible", "readOnly", "required"];

/**
 * The foundation for building custom-styled switches.
 *
 * Demos:
 *
 * - [Switches](https://mui.com/components/switches/)
 *
 * API:
 *
 * - [SwitchUnstyled API](https://mui.com/api/switch-unstyled/)
 */
const SwitchUnstyled = /*#__PURE__*/react.forwardRef(function SwitchUnstyled(props, ref) {
  var _ref, _components$Thumb, _componentsProps$thum, _components$Input, _componentsProps$inpu, _components$Track, _componentsProps$trac;

  const {
    checked: checkedProp,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp
  } = props,
        otherProps = _objectWithoutPropertiesLoose(props, _excluded$c);

  const useSwitchProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp
  };
  const {
    getInputProps,
    checked,
    disabled,
    focusVisible,
    readOnly
  } = useSwitch(useSwitchProps);

  const ownerState = _extends({}, props, {
    checked,
    disabled,
    focusVisible,
    readOnly
  });

  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : 'span';
  const rootProps = appendOwnerState(Root, _extends({}, otherProps, componentsProps.root), ownerState);
  const Thumb = (_components$Thumb = components.Thumb) != null ? _components$Thumb : 'span';
  const thumbProps = appendOwnerState(Thumb, (_componentsProps$thum = componentsProps.thumb) != null ? _componentsProps$thum : {}, ownerState);
  const Input = (_components$Input = components.Input) != null ? _components$Input : 'input';
  const inputProps = appendOwnerState(Input, (_componentsProps$inpu = componentsProps.input) != null ? _componentsProps$inpu : {}, ownerState);
  const Track = components.Track === null ? () => null : (_components$Track = components.Track) != null ? _components$Track : 'span';
  const trackProps = appendOwnerState(Track, (_componentsProps$trac = componentsProps.track) != null ? _componentsProps$trac : {}, ownerState);
  const stateClasses = clsx(checked && switchUnstyledClasses.checked, disabled && switchUnstyledClasses.disabled, focusVisible && switchUnstyledClasses.focusVisible, readOnly && switchUnstyledClasses.readOnly);
  return /*#__PURE__*/jsxRuntime.jsxs(Root, _extends({
    ref: ref
  }, rootProps, {
    className: clsx(switchUnstyledClasses.root, stateClasses, className, rootProps == null ? void 0 : rootProps.className),
    children: [/*#__PURE__*/jsxRuntime.jsx(Track, _extends({}, trackProps, {
      className: clsx(switchUnstyledClasses.track, trackProps == null ? void 0 : trackProps.className)
    })), /*#__PURE__*/jsxRuntime.jsx(Thumb, _extends({}, thumbProps, {
      className: clsx(switchUnstyledClasses.thumb, thumbProps == null ? void 0 : thumbProps.className)
    })), /*#__PURE__*/jsxRuntime.jsx(Input, _extends({}, getInputProps(inputProps), {
      className: clsx(switchUnstyledClasses.input, inputProps == null ? void 0 : inputProps.className)
    }))]
  }));
});

function getTabPanelUnstyledUtilityClass(slot) {
  return generateUtilityClass('TabPanelUnstyled', slot);
}
const tabPanelUnstyledClasses = generateUtilityClasses('TabPanelUnstyled', ['root', 'hidden']);

function getTabsUnstyledUtilityClass(slot) {
  return generateUtilityClass('TabsUnstyled', slot);
}
const tabsUnstyledClasses = generateUtilityClasses('TabsUnstyled', ['root', 'horizontal', 'vertical']);

const useTabs = props => {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation,
    direction,
    selectionFollowsFocus
  } = props;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Tabs',
    state: 'value'
  });
  const idPrefix = useId();
  const onSelected = react.useCallback((e, newValue) => {
    setValue(newValue);

    if (onChange) {
      onChange(e, newValue);
    }
  }, [onChange, setValue]);

  const getRootProps = () => {
    return {};
  };

  const tabsContextValue = react.useMemo(() => {
    return {
      idPrefix,
      value,
      onSelected,
      orientation,
      direction,
      selectionFollowsFocus
    };
  }, [idPrefix, value, onSelected, orientation, direction, selectionFollowsFocus]);
  return {
    getRootProps,
    tabsContextValue
  };
};

/**
 * @ignore - internal component.
 */
const Context = /*#__PURE__*/react.createContext(null);
/**
 * @returns {unknown}
 */


function useTabContext() {
  return react.useContext(Context);
}
function getPanelId(context, value) {
  const {
    idPrefix
  } = context;

  if (idPrefix === null) {
    return null;
  }

  return `${context.idPrefix}-P-${value}`;
}
function getTabId(context, value) {
  const {
    idPrefix
  } = context;

  if (idPrefix === null) {
    return null;
  }

  return `${context.idPrefix}-T-${value}`;
}

const _excluded$d = ["children", "className", "value", "defaultValue", "orientation", "direction", "component", "components", "componentsProps", "onChange", "selectionFollowsFocus"];

const useUtilityClasses$9 = ownerState => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ['root', orientation]
  };
  return composeClasses(slots, getTabsUnstyledUtilityClass, {});
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabsUnstyled API](https://mui.com/api/tabs-unstyled/)
 */


const TabsUnstyled = /*#__PURE__*/react.forwardRef((props, ref) => {
  var _ref, _componentsProps$root;

  const {
    children,
    className,
    orientation = 'horizontal',
    direction = 'ltr',
    component,
    components = {},
    componentsProps = {}
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$d);

  const {
    tabsContextValue,
    getRootProps
  } = useTabs(props);

  const ownerState = _extends({}, props, {
    orientation,
    direction
  });

  const classes = useUtilityClasses$9(ownerState);
  const TabsRoot = (_ref = component != null ? component : components.Root) != null ? _ref : 'div';
  const tabsRootProps = appendOwnerState(TabsRoot, _extends({}, other, componentsProps.root), ownerState);
  return /*#__PURE__*/jsxRuntime.jsx(TabsRoot, _extends({}, getRootProps(), tabsRootProps, {
    ref: ref,
    className: clsx(classes.root, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, className),
    children: /*#__PURE__*/jsxRuntime.jsx(Context.Provider, {
      value: tabsContextValue,
      children: children
    })
  }));
});

const useTabPanel = props => {
  const {
    value
  } = props;
  const context = useTabContext();

  if (context === null) {
    throw new Error('No TabContext provided');
  }

  const hidden = value !== context.value;
  const id = getPanelId(context, value);
  const tabId = getTabId(context, value);

  const getRootProps = () => {
    return {
      'aria-labelledby': tabId,
      hidden,
      id
    };
  };

  return {
    hidden,
    getRootProps
  };
};

const _excluded$e = ["children", "className", "value", "components", "componentsProps", "component"];

const useUtilityClasses$a = ownerState => {
  const {
    hidden
  } = ownerState;
  const slots = {
    root: ['root', hidden && 'hidden']
  };
  return composeClasses(slots, getTabPanelUnstyledUtilityClass, {});
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabPanelUnstyled API](https://mui.com/api/tab-panel-unstyled/)
 */


const TabPanelUnstyled = /*#__PURE__*/react.forwardRef(function TabPanelUnstyled(props, ref) {
  var _ref, _componentsProps$root;

  const {
    children,
    className,
    components = {},
    componentsProps = {},
    component
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$e);

  const {
    hidden,
    getRootProps
  } = useTabPanel(props);

  const ownerState = _extends({}, props, {
    hidden
  });

  const classes = useUtilityClasses$a(ownerState);
  const TabPanelRoot = (_ref = component != null ? component : components.Root) != null ? _ref : 'div';
  const tabPanelRootProps = appendOwnerState(TabPanelRoot, _extends({}, other, componentsProps.root), ownerState);
  return /*#__PURE__*/jsxRuntime.jsx(TabPanelRoot, _extends({}, getRootProps(), {
    ref: ref,
    role: "tabpanel"
  }, tabPanelRootProps, {
    className: clsx(classes.root, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, className),
    children: !hidden && children
  }));
});

function getTabsListUnstyledUtilityClass(slot) {
  return generateUtilityClass('TabsListUnstyled', slot);
}
const tabsListUnstyledClasses = generateUtilityClasses('TabsListUnstyled', ['root', 'horizontal', 'vertical']);

const nextItem = (list, item) => {
  if (!list) {
    return null;
  }

  if (list === item) {
    return list.firstChild;
  }

  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }

  return list.firstChild;
};

const previousItem = (list, item) => {
  if (!list) {
    return null;
  }

  if (list === item) {
    return list.lastChild;
  }

  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }

  return list.lastChild;
};

const moveFocus = (list, currentFocus, traversalFunction) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus);

  while (list && nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }

      wrappedOnce = true;
    } // Same logic as useAutocomplete.js


    const nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute('aria-disabled') === 'true';

    if (!nextFocus.hasAttribute('tabindex') || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      nextFocus.focus();
      return;
    }
  }
};

const useTabsList = props => {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    ref
  } = props;
  const tabsListRef = /*#__PURE__*/react.createRef();
  const handleRef = useForkRef(tabsListRef, ref);
  const context = useTabContext();

  if (context === null) {
    throw new Error('No TabContext provided');
  }

  const {
    value,
    orientation = 'horizontal',
    direction = 'ltr'
  } = context;
  const isRtl = direction === 'rtl';

  const handleKeyDown = event => {
    const list = tabsListRef.current;
    const currentFocus = ownerDocument(list).activeElement; // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation

    const role = currentFocus == null ? void 0 : currentFocus.getAttribute('role');

    if (role !== 'tab') {
      return;
    }

    let previousItemKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    let nextItemKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

    if (orientation === 'horizontal' && isRtl) {
      // swap previousItemKey with nextItemKey
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }

    switch (event.key) {
      case previousItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, previousItem);
        break;

      case nextItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, nextItem);
        break;

      case 'Home':
        event.preventDefault();
        moveFocus(list, null, nextItem);
        break;

      case 'End':
        event.preventDefault();
        moveFocus(list, null, previousItem);
        break;
    }
  };

  const createHandleKeyDown = otherHandlers => event => {
    var _otherHandlers$onKeyD;

    handleKeyDown(event);
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
  };

  const getRootProps = otherHandlers => {
    const propsEventHandlers = extractEventHandlers(props);

    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);

    const ownEventHandlers = {
      onKeyDown: createHandleKeyDown(externalEventHandlers)
    };

    const mergedEventHandlers = _extends({}, externalEventHandlers, ownEventHandlers);

    return _extends({
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-orientation': orientation === 'vertical' ? 'vertical' : null,
      role: 'tablist',
      ref: handleRef
    }, mergedEventHandlers);
  };

  const processChildren = react.useCallback(() => {
    const valueToIndex = new Map();
    let childIndex = 0;
    const processedChildren = react.Children.map(children, child => {
      if (! /*#__PURE__*/react.isValidElement(child)) {
        return null;
      }

      const childValue = child.props.value === undefined ? childIndex : child.props.value;
      valueToIndex.set(childValue, childIndex);
      childIndex += 1;
      return /*#__PURE__*/react.cloneElement(child, _extends({
        value: childValue
      }, childIndex === 1 && value === false && !child.props.tabIndex || value === childValue ? {
        tabIndex: 0
      } : {
        tabIndex: -1
      }));
    });
    return processedChildren;
  }, [children, value]);
  return {
    isRtl,
    orientation,
    value,
    processChildren,
    getRootProps
  };
};

const _excluded$f = ["className", "children", "component", "components", "componentsProps"];

const useUtilityClasses$b = ownerState => {
  const {
    orientation
  } = ownerState;
  const slots = {
    root: ['root', orientation]
  };
  return composeClasses(slots, getTabsListUnstyledUtilityClass, {});
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabsListUnstyled API](https://mui.com/api/tabs-list-unstyled/)
 */


const TabsListUnstyled = /*#__PURE__*/react.forwardRef((props, ref) => {
  var _ref, _componentsProps$root;

  const {
    className,
    component,
    components = {},
    componentsProps = {}
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$f);

  const {
    isRtl,
    orientation,
    getRootProps,
    processChildren
  } = useTabsList(_extends({}, props, {
    ref
  }));

  const ownerState = _extends({}, props, {
    isRtl,
    orientation
  });

  const classes = useUtilityClasses$b(ownerState);
  const TabsListRoot = (_ref = component != null ? component : components.Root) != null ? _ref : 'div';
  const tabsListRootProps = appendOwnerState(TabsListRoot, _extends({}, other, componentsProps.root), ownerState);
  const processedChildren = processChildren();
  return /*#__PURE__*/jsxRuntime.jsx(TabsListRoot, _extends({}, getRootProps(), tabsListRootProps, {
    className: clsx(className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, classes.root),
    children: processedChildren
  }));
});

function getTabUnstyledUtilityClass(slot) {
  return generateUtilityClass('TabUnstyled', slot);
}
const tabUnstyledClasses = generateUtilityClasses('TabUnstyled', ['root', 'selected', 'disabled']);

const _excluded$g = ["getRootProps"];

const useTab = props => {
  const {
    value: valueProp,
    onChange,
    onClick,
    onFocus
  } = props;

  const _useButton = useButton(props),
        {
    getRootProps: getRootPropsButton
  } = _useButton,
        otherButtonProps = _objectWithoutPropertiesLoose(_useButton, _excluded$g);

  const context = useTabContext();

  if (context === null) {
    throw new Error('No TabContext provided');
  }

  const value = valueProp != null ? valueProp : 0;
  const selected = context.value === value;
  const selectionFollowsFocus = context.selectionFollowsFocus;
  const a11yAttributes = {
    role: 'tab',
    'aria-controls': getPanelId(context, value),
    id: getTabId(context, value),
    'aria-selected': selected,
    disabled: otherButtonProps.disabled
  };

  const handleFocus = event => {
    if (selectionFollowsFocus && !selected) {
      if (onChange) {
        onChange(event, value);
      }

      context.onSelected(event, value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleClick = event => {
    if (!selected) {
      if (onChange) {
        onChange(event, value);
      }

      context.onSelected(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const getRootProps = otherHandlers => {
    const buttonResolvedProps = getRootPropsButton(_extends({
      onClick: handleClick,
      onFocus: handleFocus
    }, otherHandlers));
    return _extends({}, buttonResolvedProps, a11yAttributes);
  };

  return _extends({
    getRootProps
  }, otherButtonProps, {
    selected
  });
};

const _excluded$h = ["action", "children", "value", "className", "disabled", "onChange", "onClick", "onFocus", "component", "components", "componentsProps"];

const useUtilityClasses$c = ownerState => {
  const {
    selected,
    disabled
  } = ownerState;
  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled']
  };
  return composeClasses(slots, getTabUnstyledUtilityClass, {});
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabUnstyled API](https://mui.com/api/tab-unstyled/)
 */


const TabUnstyled = /*#__PURE__*/react.forwardRef(function TabUnstyled(props, ref) {
  var _ref, _componentsProps$root;

  const {
    action,
    children,
    className,
    disabled = false,
    component,
    components = {},
    componentsProps = {}
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$h);

  const tabRef = react.useRef();
  const handleRef = useForkRef(tabRef, ref);
  const {
    active,
    focusVisible,
    setFocusVisible,
    selected,
    getRootProps
  } = useTab(_extends({}, props, {
    ref: handleRef
  }));
  react.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      tabRef.current.focus();
    }
  }), [setFocusVisible]);

  const ownerState = _extends({}, props, {
    active,
    focusVisible,
    disabled,
    selected
  });

  const classes = useUtilityClasses$c(ownerState);
  const TabRoot = (_ref = component != null ? component : components.Root) != null ? _ref : 'button';
  const tabRootProps = appendOwnerState(TabRoot, _extends({}, other, componentsProps.root), ownerState);
  return /*#__PURE__*/jsxRuntime.jsx(TabRoot, _extends({}, getRootProps(), tabRootProps, {
    className: clsx(classes.root, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, className),
    ref: ref,
    children: children
  }));
});

const _excluded$i = ["onChange", "maxRows", "minRows", "style", "value"];

function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}

const styles = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: 'translateZ(0)'
  }
};
const TextareaAutosize = /*#__PURE__*/react.forwardRef(function TextareaAutosize(props, ref) {
  const {
    onChange,
    maxRows,
    minRows = 1,
    style,
    value
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$i);

  const {
    current: isControlled
  } = react.useRef(value != null);
  const inputRef = react.useRef(null);
  const handleRef = useForkRef(ref, inputRef);
  const shadowRef = react.useRef(null);
  const renders = react.useRef(0);
  const [state, setState] = react.useState({});
  const syncHeight = react.useCallback(() => {
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    const computedStyle = containerWindow.getComputedStyle(input); // If input's width is shrunk and it's not visible, don't sync height.

    if (computedStyle.width === '0px') {
      return;
    }

    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || 'x';

    if (inputShallow.value.slice(-1) === '\n') {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      inputShallow.value += ' ';
    }

    const boxSizing = computedStyle['box-sizing'];
    const padding = getStyleValue(computedStyle, 'padding-bottom') + getStyleValue(computedStyle, 'padding-top');
    const border = getStyleValue(computedStyle, 'border-bottom-width') + getStyleValue(computedStyle, 'border-top-width'); // The height of the inner content

    const innerHeight = inputShallow.scrollHeight; // Measure height of a textarea with a single row

    inputShallow.value = 'x';
    const singleRowHeight = inputShallow.scrollHeight; // The height of the outer content

    let outerHeight = innerHeight;

    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }

    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }

    outerHeight = Math.max(outerHeight, singleRowHeight); // Take the box sizing into account for applying this value as a style.

    const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    const overflow = Math.abs(outerHeight - innerHeight) <= 1;
    setState(prevState => {
      // Need a large enough difference to update the height.
      // This prevents infinite rendering loop.
      if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow)) {
        renders.current += 1;
        return {
          overflow,
          outerHeightStyle
        };
      }

      return prevState;
    });
  }, [maxRows, minRows, props.placeholder]);
  react.useEffect(() => {
    const handleResize = debounce(() => {
      renders.current = 0;
      syncHeight();
    });
    const containerWindow = ownerWindow(inputRef.current);
    containerWindow.addEventListener('resize', handleResize);
    let resizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(inputRef.current);
    }

    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);

      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [syncHeight]);
  useEnhancedEffect(() => {
    syncHeight();
  });
  react.useEffect(() => {
    renders.current = 0;
  }, [value]);

  const handleChange = event => {
    renders.current = 0;

    if (!isControlled) {
      syncHeight();
    }

    if (onChange) {
      onChange(event);
    }
  };

  return /*#__PURE__*/jsxRuntime.jsxs(react.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx("textarea", _extends({
      value: value,
      onChange: handleChange,
      ref: handleRef // Apply the rows prop to get a "correct" first SSR paint
      ,
      rows: minRows,
      style: _extends({
        height: state.outerHeightStyle,
        // Need a large enough difference to allow scrolling.
        // This prevents infinite rendering loop.
        overflow: state.overflow ? 'hidden' : null
      }, style)
    }, other)), /*#__PURE__*/jsxRuntime.jsx("textarea", {
      "aria-hidden": true,
      className: props.className,
      readOnly: true,
      ref: shadowRef,
      tabIndex: -1,
      style: _extends({}, styles.shadow, style, {
        padding: 0
      })
    })]
  });
});

/** @license MUI v5.0.0-alpha.67
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var base = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BackdropUnstyled: BackdropUnstyled,
  BadgeUnstyled: BadgeUnstyled,
  ButtonUnstyled: ButtonUnstyled,
  ClickAwayListener: ClickAwayListener,
  unstable_composeClasses: composeClasses,
  generateUtilityClass: generateUtilityClass,
  generateUtilityClasses: generateUtilityClasses,
  FormControlUnstyled: FormControlUnstyled,
  InputUnstyled: InputUnstyled,
  ModalUnstyled: ModalUnstyled,
  MultiSelectUnstyled: MultiSelectUnstyled,
  NoSsr: NoSsr,
  OptionGroupUnstyled: OptionGroupUnstyled,
  OptionUnstyled: OptionUnstyled$1,
  PopperUnstyled: PopperUnstyled,
  Portal: Portal,
  SelectUnstyled: SelectUnstyled,
  SliderUnstyled: SliderUnstyled,
  SwitchUnstyled: SwitchUnstyled,
  TabPanelUnstyled: TabPanelUnstyled,
  TabsListUnstyled: TabsListUnstyled,
  TabsUnstyled: TabsUnstyled,
  TabUnstyled: TabUnstyled,
  TextareaAutosize: TextareaAutosize,
  Unstable_TrapFocus: Unstable_TrapFocus,
  appendOwnerState: appendOwnerState,
  areArraysEqual: areArraysEqual,
  extractEventHandlers: extractEventHandlers,
  isHostComponent: isHostComponent,
  useAutocomplete: useAutocomplete,
  createFilterOptions: createFilterOptions,
  backdropUnstyledClasses: backdropUnstyledClasses,
  getBackdropUtilityClass: getBackdropUtilityClass,
  useBadge: useBadge,
  badgeUnstyledClasses: badgeUnstyledClasses,
  getBadgeUtilityClass: getBadgeUtilityClass,
  buttonUnstyledClasses: buttonUnstyledClasses,
  getButtonUnstyledUtilityClass: getButtonUnstyledUtilityClass,
  useButton: useButton,
  unstable_ClassNameGenerator: ClassNameGenerator,
  FormControlUnstyledContext: FormControlUnstyledContext,
  formControlUnstyledClasses: formControlUnstyledClasses,
  useFormControlUnstyled: useFormControlUnstyled,
  getFormControlUnstyledUtilityClasses: getFormControlUnstyledUtilityClasses,
  useInput: useInput,
  inputUnstyledClasses: inputBaseClasses,
  getInputUnstyledUtilityClass: getInputUnstyledUtilityClass,
  useListbox: useListbox,
  defaultListboxReducer: defaultListboxReducer,
  get ActionTypes () { return ActionTypes; },
  ModalManager: ModalManager,
  modalUnstyledClasses: modalUnstyledClasses,
  getModalUtilityClass: getModalUtilityClass,
  optionGroupUnstyledClasses: optionGroupUnstyledClasses,
  getOptionGroupUnstyledUtilityClass: getOptionGroupUnstyledUtilityClass,
  optionUnstyledClasses: optionUnstyledClasses,
  getOptionUnstyledUtilityClass: getOptionUnstyledUtilityClass,
  selectUnstyledClasses: selectUnstyledClasses,
  useSelect: useSelect,
  SelectUnstyledContext: SelectUnstyledContext,
  getSelectUnstyledUtilityClass: getSelectUnstyledUtilityClass,
  isOptionGroup: isOptionGroup,
  SliderValueLabelUnstyled: SliderValueLabelUnstyled,
  sliderUnstyledClasses: sliderUnstyledClasses,
  useSlider: useSlider,
  getSliderUtilityClass: getSliderUtilityClass,
  useSwitch: useSwitch,
  switchUnstyledClasses: switchUnstyledClasses,
  getSwitchUnstyledUtilityClass: getSwitchUnstyledUtilityClass,
  tabPanelUnstyledClasses: tabPanelUnstyledClasses,
  useTabPanel: useTabPanel,
  getTabPanelUnstyledUtilityClass: getTabPanelUnstyledUtilityClass,
  tabsListUnstyledClasses: tabsListUnstyledClasses,
  useTabsList: useTabsList,
  getTabsListUnstyledUtilityClass: getTabsListUnstyledUtilityClass,
  TabsContext: Context,
  tabsUnstyledClasses: tabsUnstyledClasses,
  useTabs: useTabs,
  useTabContext: useTabContext,
  getPanelId: getPanelId,
  getTabId: getTabId,
  getTabsUnstyledUtilityClass: getTabsUnstyledUtilityClass,
  tabUnstyledClasses: tabUnstyledClasses,
  useTab: useTab,
  getTabUnstyledUtilityClass: getTabUnstyledUtilityClass
});

export { BackdropUnstyled as B, ModalUnstyled as M, backdropUnstyledClasses as a, base as b, ModalManager as c, getModalUtilityClass as d, getBackdropUtilityClass as g, modalUnstyledClasses as m };

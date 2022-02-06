import React from "../../_snowpack/pkg/react.js";
import List from "../../_snowpack/pkg/@mui/material/List.js";
import ListItem from "../../_snowpack/pkg/@mui/material/ListItem.js";
import ListItemIcon from "../../_snowpack/pkg/@mui/material/ListItemIcon.js";
import NotificationIcon from "../../_snowpack/pkg/@mui/icons-material/Notifications.js";
import EmojiEventsIcon from "../../_snowpack/pkg/@mui/icons-material/EmojiEvents.js";
import CoffeeIcon from "../../_snowpack/pkg/@mui/icons-material/Coffee.js";
import AccessTimeIcon from "../../_snowpack/pkg/@mui/icons-material/AccessTime.js";
import ArrowBackIcon from "../../_snowpack/pkg/@mui/icons-material/ArrowBack.js";
import ListItemText from "../../_snowpack/pkg/@mui/material/ListItemText.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {useCookies} from "../../_snowpack/pkg/react-cookie.js";
import Divider from "../../_snowpack/pkg/@mui/material/Divider.js";
const WorkBreaksView = () => {
  const [cookies, setCookie] = useCookies(["workBreakTime"]);
  if (cookies.sessTime === void 0) {
    setCookie("sessTime", "6", {path: "/"});
  }
  const [value, setValue] = React.useState(cookies === void 0 ? "3" : cookies.workBreakTime);
  const [sessValue, setSessValue] = React.useState(cookies === void 0 ? "6" : cookies.sessTime);
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-screen"
  }, /* @__PURE__ */ React.createElement(List, null, /* @__PURE__ */ React.createElement(ListItem, {
    key: "Settings"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(CoffeeIcon, {
    className: "mr-4"
  })), /* @__PURE__ */ React.createElement("p", {
    className: "text-xl -ml-4",
    style: {color: "rgba(0, 0, 0, 0.54)"}
  }, "Break Settings")), /* @__PURE__ */ React.createElement(Divider, {
    className: "mb-4"
  }), /* @__PURE__ */ React.createElement(Link, {
    to: "/settings"
  }, /* @__PURE__ */ React.createElement(ListItem, {
    button: true
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(ArrowBackIcon, {
    className: "mr-4"
  }), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Back"
  })))), /* @__PURE__ */ React.createElement(ListItem, {
    button: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, {
    className: ""
  }, /* @__PURE__ */ React.createElement(AccessTimeIcon, {
    className: ""
  })), /* @__PURE__ */ React.createElement(ListItemText, {
    className: "whitespace-nowrap text-[#000000] text-opacity-50 mr-4",
    primary: "Set Break Time"
  }), /* @__PURE__ */ React.createElement(ListItemText, {
    className: "whitespace-nowrap text-[#000000] text-opacity-50 mr-4",
    primary: `${value * 5} minutes`
  }), /* @__PURE__ */ React.createElement("input", {
    label: "Break Time",
    type: "range",
    min: "1",
    max: "12",
    value,
    onChange: (e) => {
      setValue(e.target.value);
      setCookie("workBreakTime", e.target.value);
    },
    className: "mx-auto",
    id: "myRange"
  }))), /* @__PURE__ */ React.createElement(ListItem, {
    button: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, {
    className: ""
  }, /* @__PURE__ */ React.createElement(AccessTimeIcon, {
    className: ""
  })), /* @__PURE__ */ React.createElement(ListItemText, {
    className: "whitespace-nowrap text-[#000000] text-opacity-50 mr-4",
    primary: "Set Session Time"
  }), /* @__PURE__ */ React.createElement(ListItemText, {
    className: "whitespace-nowrap text-[#000000] text-opacity-50 mr-4",
    primary: `${sessValue * 5} minutes`
  }), /* @__PURE__ */ React.createElement("input", {
    label: "Session Time",
    type: "range",
    min: "1",
    max: "12",
    value: sessValue,
    onChange: (e) => {
      setSessValue(e.target.value);
      setCookie("sessTime", e.target.value);
    },
    className: "mx-auto",
    id: "myRange"
  })))));
};
export default WorkBreaksView;

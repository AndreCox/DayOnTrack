import React from "../../_snowpack/pkg/react.js";
import List from "../../_snowpack/pkg/@mui/material/List.js";
import ListItem from "../../_snowpack/pkg/@mui/material/ListItem.js";
import ListItemIcon from "../../_snowpack/pkg/@mui/material/ListItemIcon.js";
import EmojiEventsIcon from "../../_snowpack/pkg/@mui/icons-material/EmojiEvents.js";
import CoffeeIcon from "../../_snowpack/pkg/@mui/icons-material/Coffee.js";
import AccessTime from "../../_snowpack/pkg/@mui/icons-material/AccessTime.js";
import NotificationIcon from "../../_snowpack/pkg/@mui/icons-material/Notifications.js";
import ArrowBackIcon from "../../_snowpack/pkg/@mui/icons-material/ArrowBack.js";
import ListItemText from "../../_snowpack/pkg/@mui/material/ListItemText.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {useCookies} from "../../_snowpack/pkg/react-cookie.js";
import Divider from "../../_snowpack/pkg/@mui/material/Divider.js";
const ActiveHoursView = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["activeHours"]);
  console.log(cookies.activeHours);
  if (cookies.activeHours === void 0) {
    setCookie("activeHours", ["08:00", "20:00"], {path: "/"});
  }
  const [start, setStart] = React.useState(cookies.activeHours[0]);
  const [end, setEnd] = React.useState(cookies.activeHours[1]);
  console.log(cookies.activeHours);
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-screen"
  }, /* @__PURE__ */ React.createElement(List, null, /* @__PURE__ */ React.createElement(ListItem, {
    key: "Settings"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(AccessTime, {
    className: "mr-4"
  })), /* @__PURE__ */ React.createElement("p", {
    className: "text-xl -ml-4",
    style: {color: "rgba(0, 0, 0, 0.54)"}
  }, "Active Hours")), /* @__PURE__ */ React.createElement(Divider, {
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
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(AccessTime, {
    className: "mr-4"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row space-x-4"
  }, /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Start Time"
  }), /* @__PURE__ */ React.createElement("input", {
    value: start,
    type: "time",
    step: 900,
    onChange: (e) => {
      setCookie("activeHours", [e.target.value, end]);
      setStart(e.target.value);
    }
  })))), /* @__PURE__ */ React.createElement(ListItem, {
    button: true
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(AccessTime, {
    className: "mr-4"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row space-x-4"
  }, /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "End Time"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "time",
    value: end,
    onChange: (e) => {
      setCookie("activeHours", [start, e.target.value]);
      setEnd(e.target.value);
    }
  }))))));
};
export default ActiveHoursView;

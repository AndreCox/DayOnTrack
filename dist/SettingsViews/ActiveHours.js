import React from "../../_snowpack/pkg/react.js";
import List from "../../_snowpack/pkg/@mui/material/List.js";
import ListItem from "../../_snowpack/pkg/@mui/material/ListItem.js";
import ListItemIcon from "../../_snowpack/pkg/@mui/material/ListItemIcon.js";
import EmojiEventsIcon from "../../_snowpack/pkg/@mui/icons-material/EmojiEvents.js";
import CoffeeIcon from "../../_snowpack/pkg/@mui/icons-material/Coffee.js";
import NotificationIcon from "../../_snowpack/pkg/@mui/icons-material/Notifications.js";
import ArrowBackIcon from "../../_snowpack/pkg/@mui/icons-material/ArrowBack.js";
import ListItemText from "../../_snowpack/pkg/@mui/material/ListItemText.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
const ActiveHoursView = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-screen"
  }, /* @__PURE__ */ React.createElement(List, null, /* @__PURE__ */ React.createElement(Link, {
    to: "/settings"
  }, /* @__PURE__ */ React.createElement(ListItem, {
    button: true
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(ArrowBackIcon, {
    className: "mr-4"
  }), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Back"
  })))), /* @__PURE__ */ React.createElement(ListItem, {
    button: true
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(NotificationIcon, {
    className: "mr-4"
  }), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Active Hours"
  })))));
};
export default ActiveHoursView;

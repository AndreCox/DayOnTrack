import React from "../../_snowpack/pkg/react.js";
import List from "../../_snowpack/pkg/@mui/material/List.js";
import ListItem from "../../_snowpack/pkg/@mui/material/ListItem.js";
import ListItemIcon from "../../_snowpack/pkg/@mui/material/ListItemIcon.js";
import FastfoodIcon from "../../_snowpack/pkg/@mui/icons-material/Fastfood.js";
import EmojiEventsIcon from "../../_snowpack/pkg/@mui/icons-material/EmojiEvents.js";
import CoffeeIcon from "../../_snowpack/pkg/@mui/icons-material/Coffee.js";
import AccessTimeIcon from "../../_snowpack/pkg/@mui/icons-material/AccessTime.js";
import ArrowBackIcon from "../../_snowpack/pkg/@mui/icons-material/ArrowBack.js";
import ListItemText from "../../_snowpack/pkg/@mui/material/ListItemText.js";
import Divider from "../../_snowpack/pkg/@mui/material/Divider.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
const MealBreaksView = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-screen"
  }, /* @__PURE__ */ React.createElement(List, null, /* @__PURE__ */ React.createElement(ListItem, {
    key: "Settings"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(FastfoodIcon, {
    className: "mr-4"
  })), /* @__PURE__ */ React.createElement("p", {
    className: "text-xl -ml-4",
    style: {color: "rgba(0, 0, 0, 0.54)"}
  }, "Meal Breaks")), /* @__PURE__ */ React.createElement(Divider, {
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
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(FastfoodIcon, {
    className: "mr-4"
  }), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Meal Breaks"
  })))));
};
export default MealBreaksView;

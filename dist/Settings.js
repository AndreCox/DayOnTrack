import React from "../_snowpack/pkg/react.js";
import List from "../_snowpack/pkg/@mui/material/List.js";
import ListItem from "../_snowpack/pkg/@mui/material/ListItem.js";
import ListItemIcon from "../_snowpack/pkg/@mui/material/ListItemIcon.js";
import NotificationIcon from "../_snowpack/pkg/@mui/icons-material/Notifications.js";
import EmojiEventsIcon from "../_snowpack/pkg/@mui/icons-material/EmojiEvents.js";
import FastfoodIcon from "../_snowpack/pkg/@mui/icons-material/Fastfood.js";
import CoffeeIcon from "../_snowpack/pkg/@mui/icons-material/Coffee.js";
import AccessTimeIcon from "../_snowpack/pkg/@mui/icons-material/AccessTime.js";
import ListItemText from "../_snowpack/pkg/@mui/material/ListItemText.js";
import Settings from "../_snowpack/pkg/@mui/icons-material/Settings.js";
import Divider from "../_snowpack/pkg/@mui/material/Divider.js";
import {Link} from "../_snowpack/pkg/react-router-dom.js";
const SettingsView = () => {
  function SettingButton(props) {
    return /* @__PURE__ */ React.createElement(Link, {
      to: props.link
    }, /* @__PURE__ */ React.createElement(ListItem, {
      button: true
    }, /* @__PURE__ */ React.createElement(ListItemIcon, null, props.icon, /* @__PURE__ */ React.createElement(ListItemText, {
      primary: props.name
    }))));
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-screen"
  }, /* @__PURE__ */ React.createElement(List, null, /* @__PURE__ */ React.createElement(ListItem, {
    key: "Settings"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(Settings, null)), /* @__PURE__ */ React.createElement("p", {
    className: "text-xl -ml-4",
    style: {color: "rgba(0, 0, 0, 0.54)"}
  }, "Settings")), /* @__PURE__ */ React.createElement(Divider, {
    className: "mb-4"
  }), SettingButton({
    name: "Notifications",
    icon: /* @__PURE__ */ React.createElement(NotificationIcon, {
      className: "mr-4"
    }),
    link: "/settings/notifications"
  }), SettingButton({
    name: "Break Settings",
    icon: /* @__PURE__ */ React.createElement(CoffeeIcon, {
      className: "mr-4"
    }),
    link: "/settings/workbreaks"
  }), SettingButton({
    name: "Active hours",
    icon: /* @__PURE__ */ React.createElement(AccessTimeIcon, {
      className: "mr-4"
    }),
    link: "/settings/activehours"
  })));
};
export default SettingsView;

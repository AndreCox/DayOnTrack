import React from "../../_snowpack/pkg/react.js";
import {useState} from "../../_snowpack/pkg/react.js";
import List from "../../_snowpack/pkg/@mui/material/List.js";
import ListItem from "../../_snowpack/pkg/@mui/material/ListItem.js";
import ListItemIcon from "../../_snowpack/pkg/@mui/material/ListItemIcon.js";
import EmojiEventsIcon from "../../_snowpack/pkg/@mui/icons-material/EmojiEvents.js";
import CoffeeIcon from "../../_snowpack/pkg/@mui/icons-material/Coffee.js";
import NotificationIcon from "../../_snowpack/pkg/@mui/icons-material/Notifications.js";
import ArrowBackIcon from "../../_snowpack/pkg/@mui/icons-material/ArrowBack.js";
import ListItemText from "../../_snowpack/pkg/@mui/material/ListItemText.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import Settings from "../../_snowpack/pkg/@mui/icons-material/Settings.js";
import Divider from "../../_snowpack/pkg/@mui/material/Divider.js";
import Switch from "../../_snowpack/pkg/@mui/material/Switch.js";
import {useCookies} from "../../_snowpack/pkg/react-cookie.js";
const NotificationsView = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["notifications"]);
  if (cookies.notifications === void 0) {
    console.log("undefined");
    setCookie("notifications", true, {path: "/"});
  }
  const [notifications, setNotifications] = useState(cookies.notifications == "true" ? true : false);
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-screen"
  }, /* @__PURE__ */ React.createElement(List, null, /* @__PURE__ */ React.createElement(ListItem, {
    key: "Settings"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(NotificationIcon, {
    className: "mr-4"
  })), /* @__PURE__ */ React.createElement("p", {
    className: "text-xl -ml-4",
    style: {color: "rgba(0, 0, 0, 0.54)"}
  }, "Notifications")), /* @__PURE__ */ React.createElement(Divider, {
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
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(NotificationIcon, {
    className: "mr-4"
  }), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Notifications"
  })), /* @__PURE__ */ React.createElement(Switch, {
    className: "align-middle",
    checked: notifications,
    onChange: (e) => {
      setCookie("notifications", e.target.checked);
      setNotifications(e.target.checked);
    }
  }))));
};
export default NotificationsView;

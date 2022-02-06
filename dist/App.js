import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import {HashRouter, Routes, Route, Link} from "../_snowpack/pkg/react-router-dom.js";
import {styled, useTheme} from "../_snowpack/pkg/@mui/material/styles.js";
import Box from "../_snowpack/pkg/@mui/material/Box.js";
import Drawer from "../_snowpack/pkg/@mui/material/Drawer.js";
import CssBaseline from "../_snowpack/pkg/@mui/material/CssBaseline.js";
import MuiAppBar from "../_snowpack/pkg/@mui/material/AppBar.js";
import Toolbar from "../_snowpack/pkg/@mui/material/Toolbar.js";
import List from "../_snowpack/pkg/@mui/material/List.js";
import Typography from "../_snowpack/pkg/@mui/material/Typography.js";
import Divider from "../_snowpack/pkg/@mui/material/Divider.js";
import IconButton from "../_snowpack/pkg/@mui/material/IconButton.js";
import MenuIcon from "../_snowpack/pkg/@mui/icons-material/Menu.js";
import ChevronLeftIcon from "../_snowpack/pkg/@mui/icons-material/ChevronLeft.js";
import ChevronRightIcon from "../_snowpack/pkg/@mui/icons-material/ChevronRight.js";
import ListItem from "../_snowpack/pkg/@mui/material/ListItem.js";
import ListItemIcon from "../_snowpack/pkg/@mui/material/ListItemIcon.js";
import ListItemText from "../_snowpack/pkg/@mui/material/ListItemText.js";
import Settings from "../_snowpack/pkg/@mui/icons-material/Settings.js";
import FormControlLabel from "../_snowpack/pkg/@mui/material/FormControlLabel.js";
import Switch from "../_snowpack/pkg/@mui/material/Switch.js";
import VolumeOffIcon from "../_snowpack/pkg/@mui/icons-material/VolumeOff.js";
import HomeIcon from "../_snowpack/pkg/@mui/icons-material/Home.js";
import ProfileImage from "./assets/images/profile.jpg.proxy.js";
import TaskView from "./Tasks.js";
import SettingsView from "./Settings.js";
import WorkBreaksView from "./SettingsViews/WorkBreaks.js";
import NotificationsView from "./SettingsViews/Notifications.js";
import MealBreaksView from "./SettingsViews/MealBreaks.js";
import ActiveHoursView from "./SettingsViews/ActiveHours.js";
import "./App.css.proxy.js";
const drawerWidth = 240;
const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})(({theme, open}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({theme, open}) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));
const DrawerHeader = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));
function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return /* @__PURE__ */ React.createElement(Box, {
    sx: {display: "flex"}
  }, /* @__PURE__ */ React.createElement(HashRouter, null, /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement(AppBar, {
    position: "fixed",
    open
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(IconButton, {
    color: "inherit",
    "aria-label": "open drawer",
    onClick: handleDrawerOpen,
    edge: "start",
    sx: {mr: 2, ...open && {display: "none"}}
  }, /* @__PURE__ */ React.createElement(MenuIcon, null)), /* @__PURE__ */ React.createElement(Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h6",
    noWrap: true,
    component: "div"
  }, "Day On Track"))), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row self-center ml-auto pr-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col self-center mr-2 text-right"
  }, /* @__PURE__ */ React.createElement("p", {
    cl: true
  }, "Andre C"), /* @__PURE__ */ React.createElement("p", null, "test@email.com")), /* @__PURE__ */ React.createElement(IconButton, null, /* @__PURE__ */ React.createElement("img", {
    src: ProfileImage,
    className: "rounded-full h-14",
    alt: ""
  }))))), /* @__PURE__ */ React.createElement(Drawer, {
    sx: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box"
      }
    },
    variant: "persistent",
    anchor: "left",
    open
  }, /* @__PURE__ */ React.createElement(DrawerHeader, {
    className: ""
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row justify-start"
  }, /* @__PURE__ */ React.createElement(IconButton, {
    className: "",
    onClick: handleDrawerClose
  }, theme.direction === "ltr" ? /* @__PURE__ */ React.createElement(ChevronLeftIcon, null) : /* @__PURE__ */ React.createElement(ChevronRightIcon, null)))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(List, {
    className: "items-center"
  }, /* @__PURE__ */ React.createElement(Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement(ListItem, {
    button: true,
    key: "Home"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(HomeIcon, null)), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Home"
  }))), /* @__PURE__ */ React.createElement(ListItem, {
    key: "Mute"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(VolumeOffIcon, null)), /* @__PURE__ */ React.createElement(FormControlLabel, {
    control: /* @__PURE__ */ React.createElement(Switch, null),
    label: "Mute"
  }))), /* @__PURE__ */ React.createElement("div", {
    style: {marginTop: `auto`}
  }, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(List, null, /* @__PURE__ */ React.createElement(Link, {
    to: "/settings"
  }, /* @__PURE__ */ React.createElement(ListItem, {
    button: true,
    key: "Settings"
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(Settings, null)), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Settings"
  })))))), /* @__PURE__ */ React.createElement(Main, {
    open
  }, /* @__PURE__ */ React.createElement(DrawerHeader, null), /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/",
    element: /* @__PURE__ */ React.createElement(TaskView, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "settings",
    element: /* @__PURE__ */ React.createElement(SettingsView, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "settings/workbreaks",
    element: /* @__PURE__ */ React.createElement(WorkBreaksView, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "settings/notifications",
    element: /* @__PURE__ */ React.createElement(NotificationsView, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "settings/mealbreaks",
    element: /* @__PURE__ */ React.createElement(MealBreaksView, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "settings/activehours",
    element: /* @__PURE__ */ React.createElement(ActiveHoursView, null)
  })))));
}
export default App;

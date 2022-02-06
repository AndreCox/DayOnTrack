import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import {HashRouter, Routes, Route, Link} from "../_snowpack/pkg/react-router-dom.js";
import {styled, useTheme} from "../_snowpack/pkg/@mui/material/styles.js";
import {initializeApp} from "../_snowpack/pkg/firebase/app.js";
import firebase from "../_snowpack/pkg/firebase/compat/app.js";
import * as firebaseui from "../_snowpack/pkg/firebaseui.js";
import "../_snowpack/pkg/firebaseui/dist/firebaseui.css.proxy.js";
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
import Button from "../_snowpack/pkg/@mui/material/Button.js";
import Avatar from "../_snowpack/pkg/@mui/material/Avatar.js";
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
const firebaseConfig = {
  apiKey: "AIzaSyDTrdN0Q-HZttr-f_4oXP7g8wK-8HCbuRg",
  authDomain: "day-on-track.firebaseapp.com",
  projectId: "day-on-track",
  storageBucket: "day-on-track.appspot.com",
  messagingSenderId: "999226928678",
  appId: "1:999226928678:web:96fb0204be64d8956f40e7",
  measurementId: "G-K1WY671BJ6"
};
const app = firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var email = "";
function App() {
  const [signedIn, setSignedIn] = useState("block");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("User is signed in.");
      setSignedIn("none");
      email = user.email;
    } else {
      setSignedIn("flex");
      email = "";
      ui.start("#firebaseui-auth-container", {
        signInSuccessUrl: document.location.href,
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInOptions: [
              firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
              firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
          }
        ]
      });
    }
  });
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = hash >> i * 8 & 255;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }
  function stringAvatar(name) {
    if (name !== "") {
      return {
        sx: {
          bgcolor: stringToColor(name)
        },
        children: `${name[0].toUpperCase()}`
      };
    }
    return {
      sx: {
        bgcolor: "#ffffff"
      },
      children: `a`
    };
  }
  return /* @__PURE__ */ React.createElement(Box, {
    sx: {display: "flex"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute w-screen h-screen left-0 right-0 backdrop-brightness-75 flex flex-col justify-center",
    style: {zIndex: 1e5, display: signedIn},
    id: "firebaseui-auth-container"
  }), /* @__PURE__ */ React.createElement(HashRouter, null, /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement(AppBar, {
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
  }, /* @__PURE__ */ React.createElement("p", null, email), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-shrink justify-end"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "bg-[#155faa] rounded-md pt-[0.5] pb-[0.5] pl-2 pr-2 hover:bg-[#2988e7] transition-all",
    onClick: () => {
      firebase.auth().signOut();
      location.reload();
    }
  }, "Sign Out"))), /* @__PURE__ */ React.createElement(IconButton, null, /* @__PURE__ */ React.createElement(Avatar, {
    ...stringAvatar(email)
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
    open,
    onClick: () => setOpen(false)
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

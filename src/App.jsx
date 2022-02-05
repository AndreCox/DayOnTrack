import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Settings from '@mui/icons-material/Settings';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import HomeIcon from '@mui/icons-material/Home';

import ProfileImage from './assets/images/profile.jpg';

import TaskView from './Tasks';
import SettingsView from './Settings';

import WorkBreaksView from './SettingsViews/WorkBreaks';
import NotificationsView from './SettingsViews/Notifications';
import MealBreaksView from './SettingsViews/MealBreaks';
import ActiveHoursView from './SettingsViews/ActiveHours';
import './App.css';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
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
  // Return the App component.
  return (
    <Box sx={{ display: 'flex' }}>
      <HashRouter>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <div className="flex flex-row">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Link to={'/'}>
                <Typography variant="h6" noWrap component="div">
                  Day On Track
                </Typography>
              </Link>
            </Toolbar>
            <div className="flex flex-row self-center ml-auto pr-4">
              <div className="flex flex-col self-center mr-2 text-right">
                <p cl>Andre C</p>
                <p>test@email.com</p>
              </div>
              <IconButton>
                <img src={ProfileImage} className="rounded-full h-14" alt="" />
              </IconButton>
            </div>
          </div>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader className="">
            <div className="flex flex-row justify-start">
              <IconButton className="" onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
          </DrawerHeader>
          <Divider />
          <List className="items-center">
            <Link to="/">
              <ListItem button key="Home">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <ListItem key="Mute">
              <ListItemIcon>
                <VolumeOffIcon />
              </ListItemIcon>
              <FormControlLabel control={<Switch />} label="Mute" />
            </ListItem>
          </List>
          <div style={{ marginTop: `auto` }}>
            <Divider />
            <List>
              <Link to="/settings">
                <ListItem button key="Settings">
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </Link>
            </List>
          </div>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />

          <Routes>
            <Route path="/" element={<TaskView />} />
            <Route path="settings" element={<SettingsView />} />
            <Route path="settings/workbreaks" element={<WorkBreaksView />} />
            <Route
              path="settings/notifications"
              element={<NotificationsView />}
            />
            <Route path="settings/mealbreaks" element={<MealBreaksView />} />
            <Route path="settings/activehours" element={<ActiveHoursView />} />
          </Routes>
        </Main>
      </HashRouter>
    </Box>
  );
}

export default App;

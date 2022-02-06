import React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CoffeeIcon from '@mui/icons-material/Coffee';
import NotificationIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import { useCookies } from 'react-cookie';

const NotificationsView = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['notifications']);
  if (cookies.notifications === undefined) {
    console.log('undefined');
    setCookie('notifications', true, { path: '/' });
  }
  const [notifications, setNotifications] = useState(
    cookies.notifications == 'true' ? true : false,
  );

  return (
    <div className="h-screen">
      <List>
        <ListItem key="Settings">
          <ListItemIcon>
            <NotificationIcon className="mr-4" />
          </ListItemIcon>
          <p className="text-xl -ml-4" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            Notifications
          </p>
        </ListItem>
        <Divider className="mb-4" />
        <Link to="/settings">
          <ListItem button>
            <ListItemIcon>
              <ArrowBackIcon className="mr-4" />
              <ListItemText primary="Back" />
            </ListItemIcon>
          </ListItem>
        </Link>

        <ListItem button>
          <ListItemIcon>
            <NotificationIcon className="mr-4" />
            <ListItemText primary="Notifications" />
          </ListItemIcon>

          <Switch
            className="align-middle"
            checked={notifications}
            onChange={(e) => {
              setCookie('notifications', e.target.checked);
              setNotifications(e.target.checked);
            }}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default NotificationsView;

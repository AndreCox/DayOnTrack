import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import NotificationIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListItemText from '@mui/material/ListItemText';
import Settings from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const SettingsView = () => {
  function SettingButton(props) {
    return (
      <Link to={props.link}>
        <ListItem button>
          <ListItemIcon>
            {props.icon}
            <ListItemText primary={props.name} />
          </ListItemIcon>
        </ListItem>
      </Link>
    );
  }

  return (
    <div className="h-screen">
      <List>
        <ListItem key="Settings">
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <p className="text-xl -ml-4" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            Settings
          </p>
        </ListItem>
        <Divider className="mb-4" />
        {SettingButton({
          name: 'Notifications',
          icon: <NotificationIcon className="mr-4" />,
          link: '/settings/notifications',
        })}

        {SettingButton({
          name: 'Break Settings',
          icon: <CoffeeIcon className="mr-4" />,
          link: '/settings/workbreaks',
        })}

        {SettingButton({
          name: 'Active hours',
          icon: <AccessTimeIcon className="mr-4" />,
          link: '/settings/activehours',
        })}
      </List>

      {/* <ListItem button>
          <ListItemIcon>
            <EmojiEventsIcon className="mr-4" />
            <ListItemText primary="Reward Breaks" />
          </ListItemIcon>
        </ListItem> */}
    </div>
  );
};

export default SettingsView;

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
        {SettingButton({
          name: 'Notifications',
          icon: <NotificationIcon className="mr-4" />,
          link: '/settings/notifications',
        })}

        {SettingButton({
          name: 'Work Breaks',
          icon: <CoffeeIcon className="mr-4" />,
          link: '/settings/workbreaks',
        })}

        {SettingButton({
          name: 'Meal Breaks',
          icon: <FastfoodIcon className="mr-4" />,
          link: '/settings/mealbreaks',
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

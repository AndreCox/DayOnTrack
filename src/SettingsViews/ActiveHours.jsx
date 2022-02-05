import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CoffeeIcon from '@mui/icons-material/Coffee';
import NotificationIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const ActiveHoursView = () => {
  return (
    <div className="h-screen">
      <List>
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
            <ListItemText primary="Active Hours" />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};

export default ActiveHoursView;

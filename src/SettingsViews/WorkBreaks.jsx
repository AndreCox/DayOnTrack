import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import NotificationIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const WorkBreaksView = () => {
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
            <AccessTimeIcon className="mr-4" />
            <ListItemText primary="Set Active Hours" />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};

export default WorkBreaksView;

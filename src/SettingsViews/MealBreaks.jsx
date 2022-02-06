import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { Link } from 'react-router-dom';

const MealBreaksView = () => {
  return (
    <div className="h-screen">
      <List>
        <ListItem key="Settings">
          <ListItemIcon>
            <FastfoodIcon className="mr-4" />
          </ListItemIcon>
          <p className="text-xl -ml-4" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            Meal Breaks
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
            <FastfoodIcon className="mr-4" />
            <ListItemText primary="Meal Breaks" />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};

export default MealBreaksView;

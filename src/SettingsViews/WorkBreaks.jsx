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
import { useCookies } from 'react-cookie';
import Divider from '@mui/material/Divider';

const WorkBreaksView = () => {
  const [cookies, setCookie] = useCookies(['workBreakTime']);
  if (cookies.sessTime === undefined) {
    setCookie('sessTime', '6', { path: '/' });
  }
  const [value, setValue] = React.useState(
    cookies === undefined ? '3' : cookies.workBreakTime,
  );
  const [sessValue, setSessValue] = React.useState(
    cookies === undefined ? '6' : cookies.sessTime,
  );

  return (
    <div className="h-screen">
      <List>
        <ListItem key="Settings">
          <ListItemIcon>
            <CoffeeIcon className="mr-4" />
          </ListItemIcon>
          <p className="text-xl -ml-4" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            Break Settings
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
          <div className="flex flex-row">
            <ListItemIcon className="">
              <AccessTimeIcon className="" />
            </ListItemIcon>
            <ListItemText
              className="whitespace-nowrap text-[#000000] text-opacity-50 mr-4"
              primary="Set Break Time"
            />
            <ListItemText
              className="whitespace-nowrap text-[#000000] text-opacity-50 mr-4"
              primary={`${value * 5} minutes`}
            />
            <input
              label="Break Time"
              type="range"
              min="1"
              max="12"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setCookie('workBreakTime', e.target.value);
              }}
              className="mx-auto"
              id="myRange"
            />
          </div>
        </ListItem>
        <ListItem button>
          <div className="flex flex-row">
            <ListItemIcon className="">
              <AccessTimeIcon className="" />
            </ListItemIcon>
            <ListItemText
              className="whitespace-nowrap text-[#000000] text-opacity-50 mr-4"
              primary="Set Session Time"
            />
            <ListItemText
              className="whitespace-nowrap text-[#000000] text-opacity-50 mr-4"
              primary={`${sessValue * 5} minutes`}
            />
            <input
              label="Session Time"
              type="range"
              min="1"
              max="12"
              value={sessValue}
              onChange={(e) => {
                setSessValue(e.target.value);
                setCookie('sessTime', e.target.value);
              }}
              className="mx-auto"
              id="myRange"
            />
          </div>
        </ListItem>
      </List>
    </div>
  );
};

export default WorkBreaksView;

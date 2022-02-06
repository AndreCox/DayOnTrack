import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AccessTime from '@mui/icons-material/AccessTime';
import NotificationIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Divider from '@mui/material/Divider';

const ActiveHoursView = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['activeHours']);
  console.log(cookies.activeHours);
  if (cookies.activeHours === undefined) {
    setCookie('activeHours', ['08:00', '20:00'], { path: '/' });
  }
  const [start, setStart] = React.useState(cookies.activeHours[0]);
  const [end, setEnd] = React.useState(cookies.activeHours[1]);
  console.log(cookies.activeHours);
  return (
    <div className="h-screen">
      <List>
        <ListItem key="Settings">
          <ListItemIcon>
            <AccessTime className="mr-4" />
          </ListItemIcon>
          <p className="text-xl -ml-4" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            Active Hours
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
            <AccessTime className="mr-4" />
            <div className="flex flex-row space-x-4">
              <ListItemText primary="Start Time" />
              <input
                value={start}
                type="time"
                step={900}
                onChange={(e) => {
                  setCookie('activeHours', [e.target.value, end]);
                  setStart(e.target.value);
                }}
              />
            </div>
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccessTime className="mr-4" />
            <div className="flex flex-row space-x-4">
              <ListItemText primary="End Time" />
              <input
                type="time"
                value={end}
                onChange={(e) => {
                  setCookie('activeHours', [start, e.target.value]);
                  setEnd(e.target.value);
                }}
              />
            </div>
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};

export default ActiveHoursView;

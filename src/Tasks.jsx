import * as React from 'react';
import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import blue from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';

const localizer = momentLocalizer(moment);

const events = [{}];

const TaskView = () => {
  return (
    <div className="" events={events}>
      <Calendar
        localizer={localizer}
        defaultView="day"
        views={['day']}
        events={events}
        toolbar={false}
        height="100vh"
      />

      <div className="fixed bottom-0 right-0 mr-10 mb-10">
        <Fab color="primary" aria-label="add" onClick={() => setOpen('block')}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default TaskView;

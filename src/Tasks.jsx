import * as React from 'react';
import { useState, useEffect } from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';

const localizer = momentLocalizer(moment);

const events = [{}];

const TaskView = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModel() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="" events={events}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="">
          <div>
            <h2 className="text-xl mb-8">Add Task</h2>
            <TextField
              label="Task Name"
              className="mb-4"
              fullWidth={true}
              variant="outlined"
            />
            <TextField
              label="Task Description"
              fullWidth={true}
              variant="outlined"
            />
          </div>
        </div>
      </Modal>
      <Calendar
        localizer={localizer}
        defaultView="day"
        views={['day']}
        events={events}
        toolbar={false}
        height="100vh"
        className="-z-50"
      />

      <div className="fixed bottom-0 right-0 mr-10 mb-10">
        <Fab
          color="primary"
          className="bg-[#4285f4]"
          aria-label="add"
          onClick={() => setIsOpen(true)}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default TaskView;

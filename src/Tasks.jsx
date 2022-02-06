import * as React from 'react';
import { useState, useEffect } from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';

const localizer = momentLocalizer(moment);

let tasks = [];
let sessions = [];
let eventsArray = [];
let activeTime = [];

let blockLength = 5; //Minutes per block
let sessionLength = 3; //In blocks
let breakLength = 1; //In blocks

let breakTime = 1;
let previouslySelectedEvent = undefined;
let sessTime = 30;

const createTask = (_title, _duration) => {
  let Task = {
    title: _title,
    duration: _duration * sessionLength, //1 unit duration is 1 block
  };

  return Task;
};

const createSession = (_title, _duration) => {
  let Session = {
    title: _title,
    duration: _duration, //In minutes
  };

  return Session;
};

const createEvent = (_title, _startTime, _endTime) => {
  console.log('creating event');
  let Event = {
    title: _title,
    start: _startTime,
    end: _endTime,
    allDay: false,
    resource: null,
  };

  return Event;
};

const breakDownTasks = (_tasks) => {
  let sessions = [];
  _tasks.forEach((task) => {
    for (var i = 0; i < task.duration; i++) {
      let newSession = createSession(task.title, blockLength * sessionLength);
      sessions.push(newSession);
    }
  });

  return sessions;
};

const calculateBreakTime = () => {
  //Get total time
  let startMinute = getMinuteFromTime(activeTime[0]);
  let startHour = getHourFromTime(activeTime[0]);

  let finishMinute = getMinuteFromTime(activeTime[1]);
  let finishHour = getHourFromTime(activeTime[1]);

  let hours = finishHour - startHour;
  let minutes = finishMinute - startMinute;

  if (minutes < 0) {
    hours--;
    minutes += 60;
  }

  let totalTime = hours * 60 + minutes;

  //Get work time
  let duration = 0;
  tasks.forEach((task) => {
    duration += parseInt(task.duration);
  });

  let workTime = duration * blockLength * sessionLength;

  return totalTime - workTime; //In minutes
};

const addBreakSessions = (sessions) => {
  if (sessions.length === 0) return [];
  let availableBreakTime = calculateBreakTime();

  let numberOfBreakSessions = Math.floor(availableBreakTime / blockLength);
  console.log('Number of break sessions', numberOfBreakSessions);
  for (let i = 0; i < numberOfBreakSessions; i++) {
    sessions.push(createSession('Break', blockLength));
  }

  return sessions;
};

const shuffleSessions = (sessions) => {
  // //let sessionLength = 15;
  let workBlocks = [];
  let breakBlocks = [];

  let sortedSessionsArray = [];
  console.log('sessions', sessions);
  sessions.forEach((block) => {
    if (block.title === 'Break') {
      breakBlocks.push(block);
    } else {
      workBlocks.push(block);
    }
  });

  console.log('Work blocks: ', workBlocks);
  console.log('Break blocks: ', breakBlocks);

  function addWork() {
    let s = [];
    for (var i = 0; i < sessionLength; i++) {
      if (workBlocks[i] === undefined) break;

      s.push(workBlocks[i]);
    }
    workBlocks.splice(0, s.length);

    return s;
  }

  function addBreak() {
    let b = [];
    for (var i = 0; i < breakLength; i++) {
      if (workBlocks[i] === undefined) break;

      b.push(workBlocks[i]);
    }
    breakBlocks.splice(0, b.length);

    return b;
  }

  // while (sortedSessionsArray.length < sessions.length) {
  //   let workSession = addWork();
  //   for (let i = 0; i < workSession.length; i++)
  //     sortedSessionsArray.push(workSession[i]);

  //   let breakSession = addBreak();
  //   for (let i = 0; i < breakSession.length; i++)
  //     sortedSessionsArray.push(breakSession[i]);
  // }

  return sortedSessionsArray;
};

const mergeSessions = (sessions) => {
  if (sessions.length === 0) return [];

  let mergedSessions = [];
  mergedSessions[0] = sessions[0];

  let n = 0;
  for (let i = 1; i < sessions.length; i++) {
    if (sessions[i].title == mergedSessions[n].title) {
      mergedSessions[n].duration += sessions[i].duration;
    } else {
      n++;
      mergedSessions[n] = sessions[i];
    }
  }

  return mergedSessions;
};

const getHourFromTime = (time) => {
  let h;
  if (time.charAt(0) == '0') {
    h = time[1];
  } else {
    h = 10 * parseInt(time[0]) + parseInt(time[1]);
  }

  return parseInt(h);
};
const getMinuteFromTime = (time) => {
  let m;
  if (time.charAt(time.length - 2) == '0') {
    m = time[time.length - 1];
  } else {
    m = parseInt(time[time.length - 2]) * 10 + parseInt(time[time.length - 1]);
  }

  return parseInt(m);
};

const makeEventsFromSessions = (sessions) => {
  let e = [];

  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth();
  let cYear = currentDate.getFullYear();

  const millisecondsPerMinute = 60000;

  let startMinute = getMinuteFromTime(activeTime[0]);
  let startHour = getHourFromTime(activeTime[0]);

  let currentTime = new Date(cYear, cMonth, cDay, startHour, startMinute, 0, 0); //Use the starting hour from settings

  sessions.forEach((session) => {
    let endTime = new Date(
      currentTime.getTime() + session.duration * millisecondsPerMinute,
    );
    let newEvent = createEvent(session.title, currentTime, endTime);
    e.push(newEvent);
    currentTime = endTime;
  });

  return e;
};

const TaskView = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['activeHours']);
  if (cookies.activeHours === undefined) {
    setCookie('activeHours', ['08:00', '20:00'], { path: '/' });
  }
  activeTime = cookies.activeHours;
  if (cookies.breakTime === undefined) {
    setCookie('breakTime', 3, { path: '/' });
  }
  if (cookies.sessTime === undefined) {
    setCookie('sessTime', 6, { path: '/' });
  }
  sessTime = cookies.sessTime * 5;
  breakTime = cookies.breakTime * 5;

  const setSchedule = () => {
    sessions = breakDownTasks(tasks);

    sessions = addBreakSessions(sessions);
    //sessions = shuffleSessions(sessions);
    sessions = mergeSessions(sessions);

    //sessions = shuffleSessions(sessions);
    eventsArray = makeEventsFromSessions(sessions);
    setEvents(eventsArray);
    console.log('pure event', eventsArray);
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  function openModel() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setTitle('');
    setDescription('');
  }

  function openEditModel() {
    setEditOpen(true);
  }

  function closeEditModal() {
    setEditOpen(false);
  }

  Modal.setAppElement('#root');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      zIndex: '1200',
    },
  };

  const [time, setTime] = React.useState(1);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  let selectedEvent = undefined;

  const [events, setEvents] =
    eventsArray == undefined ? useState([]) : useState(eventsArray);

  function valuetext(value) {
    value = value * 15;
    //turn value into minutes and hours
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours} hours ${minutes} minutes`;
  }

  const updateTime = (event, newValue) => {
    setTime(event.target.value);
  };

  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="space-y-4">
          <h2 className="text-xl mb-4">Add Task</h2>
          <TextField
            label="Task Name"
            className=""
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth={true}
            variant="outlined"
          />
          <TextField
            label="Task Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth={true}
            variant="outlined"
          />
          <div className="flex flex-row">
            <input
              label="Estimated Duration"
              type="range"
              min="1"
              max="48"
              value={time}
              onChange={updateTime}
              className=""
              id="myRange"
            />
            <div className="flex-grow flex" />
            <p>{valuetext(time)}</p>
          </div>
          <Button
            variant="contained"
            className="bg-[#4285f4]"
            onClick={() => {
              setIsOpen(false);
              tasks.push(createTask(title, time / 3)); // /3 to get in 5 minute blocks
              console.log('Time: ' + time);
              setSchedule();
              setTitle('');
              setDescription('');
            }}
          >
            Add Task
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={editOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit"
        style={customStyles}
      >
        <div className="space-y-4">
          <h2 className="text-xl mb-4">Edit Task</h2>
          <Button
            variant="contained"
            className="bg-[#4285f4]"
            onClick={(event) => {
              setEditOpen(false);

              let index = 0;
              //Find corresponding Task object
              for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].title === previouslySelectedEvent)
                  index = tasks.indexOf(tasks[i]);
              }

              tasks.splice(index, 1);

              setSchedule();
            }}
          >
            Delete Task
          </Button>
        </div>
      </Modal>
      <Calendar
        localizer={localizer}
        defaultView="day"
        views={['day']}
        events={events}
        toolbar={false}
        height="100vh"
        onSelectEvent={(event, e) => {
          console.log('event selected ', event.title);
          selectedEvent = event.title;
          previouslySelectedEvent = event.title;
          setEditOpen(true);
        }}
      />

      <div className="fixed bottom-0 right-0 mr-10 mb-10 z-50">
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

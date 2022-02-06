import * as React from "../_snowpack/pkg/react.js";
import {useState, useEffect} from "../_snowpack/pkg/react.js";
import Fab from "../_snowpack/pkg/@mui/material/Fab.js";
import AddIcon from "../_snowpack/pkg/@mui/icons-material/Add.js";
import {Calendar, momentLocalizer} from "../_snowpack/pkg/react-big-calendar.js";
import "../_snowpack/pkg/react-big-calendar/lib/css/react-big-calendar.css.proxy.js";
import moment from "../_snowpack/pkg/moment.js";
import Modal from "../_snowpack/pkg/react-modal.js";
import TextField from "../_snowpack/pkg/@mui/material/TextField.js";
import Button from "../_snowpack/pkg/@mui/material/Button.js";
import {useCookies} from "../_snowpack/pkg/react-cookie.js";
const localizer = momentLocalizer(moment);
let tasks = [];
let sessions = [];
let eventsArray = [];
let activeTime = [];
let blockLength = 5;
let sessionLength = 3;
let breakLength = 6;
let breakTime = 1;
let previouslySelectedEvent = void 0;
let sessTime = 30;
const createTask = (_title, _duration) => {
  let Task = {
    title: _title,
    duration: _duration * sessionLength
  };
  return Task;
};
const createSession = (_title, _duration) => {
  let Session = {
    title: _title,
    duration: _duration
  };
  return Session;
};
const createEvent = (_title, _startTime, _endTime) => {
  console.log("creating event");
  let Event = {
    title: _title,
    start: _startTime,
    end: _endTime,
    allDay: false,
    resource: null
  };
  return Event;
};
const breakDownTasks = (_tasks) => {
  let s = [];
  _tasks.forEach((task) => {
    for (var i = 0; i < task.duration; i++) {
      let newSession = createSession(task.title, blockLength * sessionLength);
      s.push(newSession);
    }
  });
  return s;
};
const calculateBreakTime = () => {
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
  let duration = 0;
  tasks.forEach((task) => {
    duration += parseInt(task.duration);
  });
  let workTime = duration * blockLength * sessionLength;
  return totalTime - workTime;
};
const addBreakSessions = (sessions2) => {
  if (sessions2.length === 0)
    return [];
  let availableBreakTime = calculateBreakTime();
  let numberOfBreakSessions = Math.floor(availableBreakTime / blockLength);
  console.log("Number of break sessions", numberOfBreakSessions);
  for (let i = 0; i < numberOfBreakSessions; i++) {
    sessions2.push(createSession("Break", blockLength));
  }
  return sessions2;
};
const shuffleSessions = (sessions2) => {
  let workBlocks = [];
  let breakBlocks = [];
  let sortedSessionsArray = [];
  sessions2.forEach((block) => {
    if (block.title === "Break") {
      breakBlocks.push(block);
    } else {
      workBlocks.push(block);
    }
  });
  console.log("Work blocks: ", workBlocks);
  console.log("Break blocks: ", breakBlocks);
  let addingWork = true;
  let canAddWork = true;
  for (let i = 0; i < sessions2.length; i++) {
    if (addingWork) {
      if (!canAddWork) {
        addingWork = !addingWork;
        continue;
      }
      let s = [];
      for (var w = 0; w < 4; w++) {
        if (workBlocks[w] === void 0) {
          canAddWork = false;
          break;
        }
        s.push(workBlocks[w]);
      }
      workBlocks.splice(0, s.length);
      sortedSessionsArray.push(s);
    } else {
      let b = [];
      console.log("break time", breakTime);
      for (var j = 0; j < breakTime / 5; j++) {
        if (breakBlocks[j] === void 0)
          break;
        b.push(breakBlocks[j]);
      }
      breakBlocks.splice(0, b.length);
      sortedSessionsArray.push(b);
    }
    addingWork = !addingWork;
  }
  console.log("sorted array", sortedSessionsArray);
  let arrayToReturn = [];
  let cnt = 0;
  for (let i = 0; i < sortedSessionsArray.length; i++) {
    for (let j2 = 0; j2 < sortedSessionsArray[i].length; j2++) {
      arrayToReturn[cnt] = sortedSessionsArray[i][j2];
      cnt++;
    }
  }
  console.log("final array", arrayToReturn);
  return arrayToReturn;
};
const mergeSessions = (sessions2) => {
  if (sessions2.length === 0)
    return [];
  let mergedSessions = [];
  mergedSessions[0] = sessions2[0];
  let n = 0;
  for (let i = 1; i < sessions2.length; i++) {
    if (sessions2[i].title == mergedSessions[n].title) {
      mergedSessions[n].duration += sessions2[i].duration;
    } else {
      n++;
      mergedSessions[n] = sessions2[i];
    }
  }
  return mergedSessions;
};
const getHourFromTime = (time) => {
  let h;
  if (time.charAt(0) == "0") {
    h = time[1];
  } else {
    h = 10 * parseInt(time[0]) + parseInt(time[1]);
  }
  return parseInt(h);
};
const getMinuteFromTime = (time) => {
  let m;
  if (time.charAt(time.length - 2) == "0") {
    m = time[time.length - 1];
  } else {
    m = parseInt(time[time.length - 2]) * 10 + parseInt(time[time.length - 1]);
  }
  return parseInt(m);
};
const makeEventsFromSessions = (sessions2) => {
  let e = [];
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth();
  let cYear = currentDate.getFullYear();
  const millisecondsPerMinute = 6e4;
  let startMinute = getMinuteFromTime(activeTime[0]);
  let startHour = getHourFromTime(activeTime[0]);
  let currentTime = new Date(cYear, cMonth, cDay, startHour, startMinute, 0, 0);
  sessions2.forEach((session) => {
    let endTime = new Date(currentTime.getTime() + session.duration * millisecondsPerMinute);
    let newEvent = createEvent(session.title, currentTime, endTime);
    e.push(newEvent);
    currentTime = endTime;
  });
  return e;
};
const TaskView = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["activeHours"]);
  if (cookies.activeHours === void 0) {
    setCookie("activeHours", ["08:00", "20:00"], {path: "/"});
  }
  activeTime = cookies.activeHours;
  if (cookies.breakTime === void 0) {
    setCookie("breakTime", 3, {path: "/"});
  }
  if (cookies.sessTime === void 0) {
    setCookie("sessTime", 6, {path: "/"});
  }
  sessTime = cookies.sessTime * 5;
  breakTime = cookies.breakTime * 5;
  const setSchedule = () => {
    sessions = breakDownTasks(tasks);
    sessions = addBreakSessions(sessions);
    sessions = shuffleSessions(sessions);
    sessions = mergeSessions(sessions);
    eventsArray = makeEventsFromSessions(sessions);
    setEvents(eventsArray);
    console.log("pure event", eventsArray);
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  function openModel() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setTitle("");
    setDescription("");
  }
  function openEditModel() {
    setEditOpen(true);
  }
  function closeEditModal() {
    setEditOpen(false);
  }
  Modal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
      zIndex: "1200"
    }
  };
  const [time, setTime] = React.useState(1);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  let selectedEvent = void 0;
  const [events, setEvents] = eventsArray == void 0 ? useState([]) : useState(eventsArray);
  function valuetext(value) {
    value = value * 15;
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours} hours ${minutes} minutes`;
  }
  const updateTime = (event, newValue) => {
    setTime(event.target.value);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: ""
  }, /* @__PURE__ */ React.createElement(Modal, {
    isOpen: modalIsOpen,
    onRequestClose: closeModal,
    contentLabel: "Example Modal",
    style: customStyles
  }, /* @__PURE__ */ React.createElement("div", {
    className: "space-y-4"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "text-xl mb-4"
  }, "Add Task"), /* @__PURE__ */ React.createElement(TextField, {
    label: "Task Name",
    className: "",
    value: title,
    onChange: (event) => setTitle(event.target.value),
    fullWidth: true,
    variant: "outlined"
  }), /* @__PURE__ */ React.createElement(TextField, {
    label: "Task Description",
    value: description,
    onChange: (event) => setDescription(event.target.value),
    fullWidth: true,
    variant: "outlined"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ React.createElement("input", {
    label: "Estimated Duration",
    type: "range",
    min: "1",
    max: "48",
    value: time,
    onChange: updateTime,
    className: "",
    id: "myRange"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex-grow flex"
  }), /* @__PURE__ */ React.createElement("p", null, valuetext(time))), /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    className: "bg-[#4285f4]",
    onClick: () => {
      setIsOpen(false);
      tasks.push(createTask(title, time / 3));
      console.log("Time: " + time);
      setSchedule();
      setTitle("");
      setDescription("");
    }
  }, "Add Task"))), /* @__PURE__ */ React.createElement(Modal, {
    isOpen: editOpen,
    onRequestClose: closeEditModal,
    contentLabel: "Edit",
    style: customStyles
  }, /* @__PURE__ */ React.createElement("div", {
    className: "space-y-4"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "text-xl mb-4"
  }, "Edit Task"), /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    className: "bg-[#4285f4]",
    onClick: (event) => {
      setEditOpen(false);
      let index = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title === previouslySelectedEvent)
          index = tasks.indexOf(tasks[i]);
      }
      tasks.splice(index, 1);
      setSchedule();
    }
  }, "Delete Task"))), /* @__PURE__ */ React.createElement(Calendar, {
    localizer,
    defaultView: "day",
    views: ["day"],
    events,
    toolbar: false,
    height: "100vh",
    onSelectEvent: (event, e) => {
      console.log("event selected ", event.title);
      selectedEvent = event.title;
      previouslySelectedEvent = event.title;
      setEditOpen(true);
    }
  }), /* @__PURE__ */ React.createElement("div", {
    className: "fixed bottom-0 right-0 mr-10 mb-10 z-50"
  }, /* @__PURE__ */ React.createElement(Fab, {
    color: "primary",
    className: "bg-[#4285f4]",
    "aria-label": "add",
    onClick: () => setIsOpen(true)
  }, /* @__PURE__ */ React.createElement(AddIcon, null))));
};
export default TaskView;

import * as React from "../_snowpack/pkg/react.js";
import {useState, useEffect} from "../_snowpack/pkg/react.js";
import Fab from "../_snowpack/pkg/@mui/material/Fab.js";
import AddIcon from "../_snowpack/pkg/@mui/icons-material/Add.js";
import {Calendar, momentLocalizer} from "../_snowpack/pkg/react-big-calendar.js";
import "../_snowpack/pkg/react-big-calendar/lib/css/react-big-calendar.css.proxy.js";
import moment from "../_snowpack/pkg/moment.js";
import Modal from "../_snowpack/pkg/react-modal.js";
import TextField from "../_snowpack/pkg/@mui/material/TextField.js";
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
  Modal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "",
    events
  }, /* @__PURE__ */ React.createElement(Modal, {
    isOpen: modalIsOpen,
    onRequestClose: closeModal,
    contentLabel: "Example Modal",
    style: customStyles
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", {
    className: "text-xl mb-8"
  }, "Add Task"), /* @__PURE__ */ React.createElement(TextField, {
    label: "Task Name",
    className: "mb-4",
    fullWidth: true,
    variant: "outlined"
  }), /* @__PURE__ */ React.createElement(TextField, {
    label: "Task Description",
    fullWidth: true,
    variant: "outlined"
  }))), /* @__PURE__ */ React.createElement(Calendar, {
    localizer,
    defaultView: "day",
    views: ["day"],
    events,
    toolbar: false,
    height: "100vh"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "fixed bottom-0 right-0 mr-10 mb-10"
  }, /* @__PURE__ */ React.createElement(Fab, {
    color: "primary",
    className: "bg-[#4285f4]",
    "aria-label": "add",
    onClick: () => setIsOpen(true)
  }, /* @__PURE__ */ React.createElement(AddIcon, null))));
};
export default TaskView;

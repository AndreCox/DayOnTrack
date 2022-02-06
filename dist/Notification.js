import React from "../_snowpack/pkg/react.js";
import ReactNotifications from "../_snowpack/pkg/react-browser-notifications.js";
class Notification extends React.Component {
  constructor() {
    super();
    this.showNotifications = this.showNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  showNotifications() {
    if (this.n.supported())
      this.n.show();
  }
  handleClick(event) {
    this.n.close(event.target.tag);
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ReactNotifications, {
      onRef: (ref) => this.n = ref,
      title: "Hey There!",
      body: "This is the body",
      icon: "icon.png",
      tag: "abcdef",
      timeout: "2000",
      onClick: (event) => this.handleClick(event)
    }), /* @__PURE__ */ React.createElement("button", {
      onClick: this.showNotifications
    }, "Notify Me!"));
  }
}
export default Notification;

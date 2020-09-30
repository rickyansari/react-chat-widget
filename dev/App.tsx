import React, { Component } from "react";
import WebSocket from "./WebSocket";
import {
  Widget,
  addResponseMessage,
  setQuickButtons,
  toggleMsgLoader,
  addLinkSnippet,
} from "../index";
import { addUserMessage } from "..";
const SOCKET_USER = "9461572825";
const APP_ID = "working";
const WS = WebSocket.getInstance();

export default class App extends Component {
  componentDidMount() {
    debugger;
    console.log(WS);
    WS.on("new_message", (newMessage) => {
      debugger;
      if (newMessage.actor === "bot") {
        addResponseMessage(newMessage.message);
      }
    });
    addResponseMessage("Welcome to this awesome chat!");
    addLinkSnippet({ link: "https://google.com", title: "Google" });
    addResponseMessage(
      "![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)"
    );
    addResponseMessage(
      "![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)"
    );
  }

  handleNewUserMessage = (newMessage: any) => {
    toggleMsgLoader();

    const userMessage = {
      message: newMessage,
      actor: "user",
      userid: SOCKET_USER,
      appId: APP_ID,
    };
    debugger;
    WS.emit("new_message", userMessage);
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage === "fruits") {
        setQuickButtons([
          { label: "Apple", value: "apple" },
          { label: "Orange", value: "orange" },
          { label: "Pear", value: "pear" },
          { label: "Banana", value: "banana" },
        ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  };

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage("Selected " + e);
    setQuickButtons([]);
  };

  handleSubmit = (msgText: string) => {
    if (msgText.length < 80) {
      addUserMessage("Uh oh, please write a bit more.");
      return false;
    }
    return true;
  };

  onFileUpload = (e) => {
    debugger;
    alert("File Uploaded");
  };

  onRestart = (e) => {
    alert("restart clicked");
  };

  onEdit = (e) => {
    alert("Edit clicked");
  };

  render() {
    return (
      <div>
        <Widget
          title="Bienvenido"
          subtitle="Asistente virtual"
          senderPlaceHolder="Escribe aquí ..."
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          imagePreview
          onRestart={this.onRestart}
          onEdit={this.onEdit}
          onFileUpload={this.onFileUpload}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

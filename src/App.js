import React from "react";
import "./App.css";
import Streams from "./Streams";
import Chats from "./Chats";

function App(props) {
  const streamers = props.match.params;

  return (
    <div className="App">
      <Streams streamers={streamers} />
      <Chats streamers={streamers} />
    </div>
  );
}

export default App;

import React from "react";
import "./css/App.scss";
import Streams from "./Streams";
import Chats from "./Chats";
import Split from "react-split";

class App extends React.Component {
  onDrag = () => {
    window.dispatchEvent(new Event("resize"));
  };

  elementStyle = (dimension, size, gutterSize) => {
    return {
      "flex-basis": "calc(" + size + "% - " + gutterSize + "px)"
    };
  };

  gutterStyle = (dimension, gutterSize) => {
    return {
      "flex-basis": gutterSize + "px"
    };
  };

  render() {
    const streamers = this.props.match.params;

    return (
      <div className="App">
        <Split
          direction={"horizontal"}
          className={`Splitview split-horizontal`}
          sizes={[85, 15]}
          gutterSize={10}
          minSize={0}
          elementStyle={this.elementStyle}
          gutterStyle={this.gutterStyle}
          onDrag={this.onDrag}
          snapOffset={50}
        >
          <Streams className="split" streamers={streamers} />
          <Chats className="split" streamers={streamers} />
        </Split>
      </div>
    );
  }
}

export default App;

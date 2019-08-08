import React from "react";
import "./css/Home.scss";
import Logo_Dark from "./img/mixmixer_dark.svg";
import StreamInput from "./StreamInput";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamers: []
    };
  }

  addStreamer = (index, username, platform) => {
    var streamers = this.state.streamers;
    if (username === "") {
      delete streamers[index];
      return this.setState({
        streamers
      });
    }
    streamers[index] = platform === "twitch" ? `t:${username}` : username;
    this.setState({
      streamers
    });
  };

  render() {
    let streamInputs = [];
    const streamers = this.state.streamers;

    for (var i = 2; i < 8; i++) {
      if (!streamers[i] && !streamers[i - 1] && !streamers[i + 1] && i > 2)
        break;
      streamInputs.push(
        <StreamInput
          addStreamer={this.addStreamer}
          index={i}
          inputClass={`${!streamers[i] ? "inputPlaceholder" : ""}`}
          key={i}
        />
      );
    }

    return (
      <div className="Home">
        <div className="header">
          <img
            className="logo"
            src={Logo_Dark}
            alt="MixMixer logo"
            height={70}
            width={70}
          />
        </div>
        <div className="body">
          <div className="container">
            <div className="addstreams">
              <span>
                Add up to 8 usernames below to view their streams simultaneously
              </span>
              <StreamInput addStreamer={this.addStreamer} index={0} />
              <StreamInput addStreamer={this.addStreamer} index={1} />
              {streamInputs}
              <div className="btncontainer">
                <button
                  onClick={() =>
                    this.props.history.push(
                      `/${this.state.streamers.join("/")}`
                    )
                  }
                  className="btn"
                >
                  Watch streams
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

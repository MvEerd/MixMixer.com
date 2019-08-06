import React, { Component } from "react";
import TwitchLogo from "./img/twitch.svg";
import MixerLogo from "./img/mixer.svg";

class Chats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    };
  }
  render() {
    return (
      <div id="chats">
        <div className="tabLinks">
          {Object.keys(this.props.streamers).map((s, i) => {
            if (!this.props.streamers[s]) return false;
            const twitch = this.props.streamers[s].substr(0, 2) === "t:";
            const streamer = twitch
              ? this.props.streamers[s].substr(
                  2,
                  this.props.streamers[s].length
                )
              : this.props.streamers[s];
            return (
              <div
                className={`tabLink ${
                  i === this.state.activeTab ? "active" : null
                }`}
                onClick={() => {
                  this.setState({ activeTab: i });
                }}
              >
                {twitch ? (
                  <img height={21} src={TwitchLogo} />
                ) : (
                  <img height={21} src={MixerLogo} />
                )}
                {streamer}
              </div>
            );
          })}
        </div>
        {Object.keys(this.props.streamers).map((s, i) => {
          if (!this.props.streamers[s]) return false;
          return this.props.streamers[s].substr(0, 2) === "t:" ? (
            <div
              className="chatTab"
              style={{ display: i !== this.state.activeTab ? "none" : "" }}
            >
              <iframe
                src={`https://www.twitch.tv/embed/${this.props.streamers[
                  s
                ].substr(2, this.props.streamers[s].length)}/chat?darkpopout`}
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <div
              className="chatTab"
              style={{ display: i !== this.state.activeTab ? "none" : "" }}
            >
              <iframe
                src={`https://mixer.com/embed/chat/${this.props.streamers[s]}`}
                width="100%"
                height="100%"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Chats;

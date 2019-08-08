import React from "react";
import "./css/StreamInput.scss";
import TwitchLogo from "./img/twitch.svg";
import MixerLogo from "./img/mixer.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "mixer",
      username: ""
    };
  }

  renderSelect = platform => {
    return (
      <div
        className={`select ${platform} ${
          this.state.selected === platform ? "active" : ""
        }`}
        onClick={() => {
          this.setState({ selected: platform }, () => {
            this.addStreamer();
          });
        }}
      >
        <img
          src={platform === "twitch" ? TwitchLogo : MixerLogo}
          alt={platform}
        />
      </div>
    );
  };

  inputChange = e => {
    this.setState({ username: e.target.value }, () => {
      this.addStreamer();
    });
  };

  addStreamer = () => {
    this.props.addStreamer(
      this.props.index,
      this.state.username,
      this.state.selected
    );
  };

  onFocus = () => {
    this.props.addStreamer(
      this.props.index,
      this.state.username ? this.state.username : "",
      this.state.selected
    );
  };

  onBlur = () => {
    this.props.addStreamer(
      this.props.index,
      this.state.username ? this.state.username : undefined,
      this.state.selected
    );
  };

  render() {
    return (
      <div
        className={`streamInput ${
          this.props.inputClass ? this.props.inputClass : ""
        }`}
      >
        {this.renderSelect("mixer")}
        {this.renderSelect("twitch")}
        <input
          type="text"
          value={this.state.username}
          onChange={this.inputChange}
          placeholder={`Username ${this.props.index + 1}`}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

export default App;

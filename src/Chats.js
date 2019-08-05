import React, { Component } from "react";

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
            return this.props.streamers[s] ? (
              <div
                className={`tabLink ${
                  i === this.state.activeTab ? "active" : null
                }`}
                onClick={() => this.setState({ activeTab: i })}
              >
                {this.props.streamers[s]}
              </div>
            ) : null;
          })}
        </div>
        {Object.keys(this.props.streamers).map((s, i) => {
          return this.props.streamers[s] ? (
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
          ) : null;
        })}
      </div>
    );
  }
}

export default Chats;

import React, { Component } from "react";

class Streams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: {
        width: 320,
        height: 240
      }
    };

    this.streamsElement = React.createRef();
  }

  autoSizeStreams = () => {
    if (!this.streamsElement.current) return;

    let streamers = this.props.streamers;
    Object.keys(streamers).forEach(
      key => streamers[key] === undefined && delete streamers[key]
    );

    const numberofstreams = Object.keys(streamers).length || 2;
    let boundingRect = this.streamsElement.current.getBoundingClientRect();

    let v_width = Math.floor(
      boundingRect.width < window.innerWidth
        ? boundingRect.width
        : window.innerWidth
    );
    let v_height = Math.floor(
      boundingRect.height < window.innerHeight
        ? boundingRect.height
        : window.innerHeight
    );

    var max_w = 0;
    var max_h = 0;
    var t_w, t_h;
    for (var x = 1; x <= numberofstreams; x++) {
      for (var y = 1; y <= numberofstreams; y++) {
        if (x * y >= numberofstreams) {
          t_w = v_width / x;
          t_h = (t_w * 9) / 16;

          if (t_h * y > v_height) {
            t_h = v_height / y;
            t_w = t_h * (16 / 9);

            if (t_w * x > v_width) {
              continue;
            }

            max_w = Math.max(max_w, t_w);
            max_h = Math.max(max_h, t_h);
            break;
          }
          max_w = Math.max(max_w, t_w);
          max_h = Math.max(max_h, t_h);
        }
      }
    }

    this.setState({
      streams: {
        ...this.state.streams,
        width: Math.floor(max_w),
        height: Math.floor(max_h)
      }
    });
  };

  autoSizeTimeout = () => {
    clearTimeout(this.state.streams.resizetimer);
    this.setState({
      streams: {
        ...this.state.streams,
        resizetimer: setTimeout(this.autoSizeStreams, 200)
      }
    });
  };

  componentDidMount() {
    this.autoSizeStreams();
    window.addEventListener("resize", this.autoSizeTimeout);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.autoSizeTimeout);
  }

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div id="streams" ref={this.streamsElement}>
        {Object.keys(this.props.streamers).map(s => {
          return this.props.streamers[s] ? (
            <iframe
              width={this.state.streams.width}
              height={this.state.streams.height}
              src={`https://mixer.com/embed/player/${this.props.streamers[s]}`}
            />
          ) : (
            false
          );
        })}
      </div>
    );
  }
}

export default Streams;

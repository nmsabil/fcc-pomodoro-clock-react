import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      reset: false,
      currentTimer: 1500,
      pause: true,
    };
    this.reset = this.reset.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  reset() {
    this.setState({ currentTimer: 1500, breakLength: 5 });
  }

  start() {
    this.setState({ pause: false });
    if (this.state.currentTimer == 0)
      this.setState({
        currentTimer:
          (this.state.reset
            ? this.state.breakLength
            : this.state.sessionLength) * 60,
      });

    let interval = setInterval(() => {
      if (this.state.pause) clearInterval(interval);
      else if (this.state.currentTimer <= 0) {
        this.setState({
          reset: !this.state.reset,
          currentTimer:
            (this.state.reset
              ? this.state.sessionLength
              : this.state.breakLength) * 60,
        });
      } else this.setState({ currentTimer: this.state.currentTimer - 1 });
    }, 1000);
  }

  stop() {
    this.setState({ pause: true, curentTimer: 5, reset: false });
  }

  incrementSession() {
    this.setState((prev) => {
      if (prev.sessionLength === 60) {
        return { sessionLength: 60 };
      } else {
        return { sessionLength: prev.sessionLength + 1 };
      }
    });
  }

  decrementSession() {
    this.setState((prev) => {
      if (prev.sessionLength === 1) {
        return { sessionLength: 1 };
      } else {
        return { sessionLength: prev.sessionLength - 1 };
      }
    });
  }
  incrementBreak() {
    this.setState((prev) => {
      if (prev.breakLength === 60) {
        return { breakLength: 60 };
      } else {
        return { breakLength: prev.breakLength + 1 };
      }
    });
  }

  decrementBreak() {
    this.setState((prev) => {
      if (prev.breakLength === 1) {
        return { breakLength: 1 };
      } else {
        return { breakLength: prev.breakLength - 1 };
      }
    });
  }
  playpause = () => {
    this.setState({});
  };

  convertToTime() {
    let minutes = Math.floor(this.state.currentTimer / 60);
    let seconds = this.state.currentTimer % 60;
    return (
      (minutes.toString().split("").length > 1 ? minutes : "0" + minutes) +
      ":" +
      (seconds.toString().split("").length > 1 ? seconds : "0" + seconds)
    );
  }

  render() {
    return (
      <div className='App'>
        <div id='break-label'>
          Break-length
          <br />
          <button id='break-increment' onClick={this.incrementBreak}>
            Increment
          </button>
          <div id='break-length'>{this.state.breakLength}</div>
          <button id='break-decrement' onClick={this.decrementBreak}>
            Decrement
          </button>
        </div>
        <hr />
        <div id='session-label'>
          Session-length
          <br />
          <button id='session-increment' onClick={this.incrementSession}>
            Increment
          </button>
          <div id='session-length'>{this.state.sessionLength}</div>
          <button id='session-decrement' onClick={this.decrementSession}>
            Decrement
          </button>
        </div>
        <br />
        <br />
        <div id='timer-label'>
          {this.state.reset ? "BREAK" : "WORK"}
          <div id='time-left'>{this.convertToTime()}</div>
          <button id='start_stop' onClick={this.start}>
            Start
          </button>
          <button id='start_stop' onClick={this.stop}>
            Stop
          </button>
          <button id='reset' onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;

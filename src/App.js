import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class App extends Component {
  state = { show: true };
  render() {
    return (
      <div className="App">
        <button onClick={() => this.setState(state => ({ show: !state.show }))}>
          {this.state.show ? 'Hide panel' : 'Show panel'}
        </button>
        <Toggler />
        {this.state.show && <Panel initialColor="blue" />}
      </div>
    );
  }
}

class Toggler extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={() => PubSub.publish('TOGGLE')}>
          Toggle red/blue
        </button>
        <button type="button" onClick={() => PubSub.publish('SET PINK')}>
          Set pink
        </button>
        <button type="button" onClick={() => PubSub.publish('SET YELLOW')}>
          Set yellow
        </button>
      </div>
    );
  }
}

class Panel extends Component {
  state = {
    color: this.props.initialColor
  };

  subscriptions = [
    PubSub.subscribe('SET YELLOW', () => this.setState({ color: 'yellow' })),
    PubSub.subscribe('SET PINK', () => this.setState({ color: 'pink' })),
    PubSub.subscribe('TOGGLE', () => {
      console.log(`Toggling from ${this.state.color}.`);
      this.setState(({ color }) => ({
        color: color === 'red' ? this.props.initialColor : 'red'
      }));
    })
  ];

  componentWillUnmount = () => this.subscriptions.forEach(PubSub.unsubscribe);

  render() {
    return (
      <div
        style={{ width: 100, height: 100, backgroundColor: this.state.color }}
      />
    );
  }
}

export default App;
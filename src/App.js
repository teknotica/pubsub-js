import React, { Component, Fragment } from "react";
import PubSub from "pubsub-js";

import Form from "./components/Form";
import { CONSENT_SUBMITTED } from "./constants";

import "./helper.css";

class App extends Component {
  state = {
    submitted: false
  };

  subscriptions = [
    PubSub.subscribe(CONSENT_SUBMITTED, () =>
      this.setState({ submitted: true })
    )
  ];

  componentWillUnmount = () => this.subscriptions.forEach(PubSub.unsubscribe);

  render() {
    return (
      <Fragment>
        <Form />
        <button disabled={!this.state.submitted}>Continue</button>
      </Fragment>
    );
  }
}

export default App;

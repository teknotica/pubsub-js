import { Component } from "react";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

// The Main Subject/Stream to be listened on.
const mainSubject = new Subject();

// This function is used to publish data to the Subject via next().
export const publish = (topic, data) => mainSubject.next({ topic, data });

export class Subscriber extends Component {
  subscribedTopics = [];

  constructor(props) {
    super(props);

    this.state = { topic: null, data: null };

    const { topic } = this.props;

    this.subscribedTopics = mainSubject
      .pipe(filter(f => f.topic === topic))
      .subscribe(s => this.setState({ topic: topic, data: s.data }));
  }

  componentWillUnmount() {
    this.subscribedTopics.unsubscribe();
  }

  render() {
    return this.props.children(this.state.data);
  }
}

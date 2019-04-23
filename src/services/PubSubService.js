import { Subject } from "rxjs";

export default class PubSubService {
  constructor() {
    this.subject = new Subject();
  }

  hello() {
    console.log("hello");
  }

  publish(topic, data) {
    this.subject.next({ topic, data });
  }
}

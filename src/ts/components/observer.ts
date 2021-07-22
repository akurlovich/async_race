export class Observer {
  listeners: number[];
  constructor() {
    this.listeners = [];
  }
  addListener(callback: number) {
    this.listeners.push(callback);
  }
  dispatch() {
    this.listeners.forEach((it) => it);
  }
}

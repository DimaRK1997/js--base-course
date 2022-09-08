class EventBus {
  listEvent = new Map();

  on(eventName, cb) {
    if (!this.listEvent.has(eventName)) this.listEvent.set(eventName, []);
    this.listEvent.get(eventName).push(cb);
  }

  off(eventName, cb) {
    if (!cb) return this.listEvent.delete(eventName);
    const index = this.listEvent.get(eventName).indexOf(cb);
    this.listEvent.get(eventName).splice(index);
  }

  trigger(eventName) {
    const arg = [].slice.call(arguments).slice(1);
    if (this.listEvent.get(eventName)) {
      this.listEvent.get(eventName).map((el, index) => {
        this.listEvent.get(eventName)[index].apply(this, arg);
      });
    }
  }

  once(eventName, cb) {
    this.on(eventName, cb);
    cb.call(null, arguments);
    this.off(eventName, cb);
  }
}

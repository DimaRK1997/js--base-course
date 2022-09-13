class EventBus {
  listEvent = new Map();

  on(eventName, cb) {
    if (typeof eventName === "string" && typeof cb === "function") {
      if (!this.listEvent.has(eventName)) this.listEvent.set(eventName, []);
      this.listEvent.get(eventName).push(cb);
    }
  }

  off(eventName, cb) {
    if (!cb) return this.listEvent.delete(eventName);
    if (typeof eventName === "string" && typeof cb === "function") {
      const index = this.listEvent.get(eventName).indexOf(cb);
      return this.listEvent.get(eventName).splice(index);
    }
  }

  trigger(eventName, ...args) {
    const arg = [].slice.call(arguments).slice(1);
    if (typeof eventName === "string" && this.listEvent.get(eventName)) {
      this.listEvent.get(eventName).forEach((cb) => {
        cb(...args);
      });
    }
  }
}

module.exports = EventBus;

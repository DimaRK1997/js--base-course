const EventBus = require("./script");

describe("EventBus tests", () => {
  test("EventBus is function", () => {
    expect(typeof EventBus).toBe("function");
  });
  test("listEvent is object", () => {
    const eventBus = new EventBus();
    expect(typeof eventBus.listEvent).toBe("object");
  });
  test("method '.on' is 2 arguments", () => {
    const eventBus = new EventBus();
    expect(eventBus.on).toHaveLength(2);
  });
  test("method '.off' is 2 arguments", () => {
    const eventBus = new EventBus();
    expect(eventBus.off).toHaveLength(2);
  });
  test("method '.trigger' is 1 argument", () => {
    const eventBus = new EventBus();
    expect(eventBus.trigger).toHaveLength(1);
  });
  test("trigger transfers 2 param in method 'on'", () => {
    const eventBus = new EventBus();
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    eventBus.on("click", fn1);
    eventBus.on("click", fn2);
    const args = [1, 2];
    eventBus.trigger("click", ...args);
    expect(fn1).toHaveBeenCalledWith(...args);
    expect(fn2).toHaveBeenCalledWith(...args);
  });
  test("trigger transfers 4 param in method '.on'", () => {
    const eventBus = new EventBus();
    const fn = jest.fn();
    eventBus.on("click", fn);
    const args = [1, 2, 3, 4];
    eventBus.trigger("click", ...args);
    expect(fn).toHaveBeenCalledWith(...args);
  });
  test("trigger work with 3 methods '.on'", () => {
    const eventBus = new EventBus();
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();
    eventBus.on("click", fn1);
    eventBus.on("click", fn2);
    eventBus.on("click", fn3);
    const args = [3, 4];
    eventBus.trigger("click", ...args);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).toHaveBeenCalledTimes(1);
  });
  test("work check method '.off", () => {
    const eventBus = new EventBus();
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    eventBus.on("click", fn1);
    eventBus.on("click", fn2);
    eventBus.off("click", fn1);
    eventBus.off("click", fn2);
    eventBus.trigger("click", 3, 4);
    expect(fn1).toHaveBeenCalledTimes(0);
    expect(fn2).toHaveBeenCalledTimes(0);
  });
  test("work check method '.off' with 1 param (delete all)", () => {
    const eventBus = new EventBus();
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    eventBus.on("click", fn1);
    eventBus.on("click", fn2);
    eventBus.off("click");
    eventBus.trigger("click", 3, 4);
    eventBus.trigger("click", 3, 4);
    expect(fn1).toHaveBeenCalledTimes(0);
    expect(fn2).toHaveBeenCalledTimes(0);
  });
  test("check work for one event", () => {
    const eventBus = new EventBus();
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    eventBus.on("click", fn1);
    eventBus.on("input", fn2);
    eventBus.trigger("click", 3, 4);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(0);
  });
});

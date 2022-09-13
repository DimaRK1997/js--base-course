const EventBus = require("./script");

const eventBus = new EventBus();

describe("EventBus tests", () => {
  test("EventBus is function", () => {
    expect(typeof EventBus).toBe("function");
  });
  test("listEvent is object", () => {
    expect(typeof eventBus.listEvent).toBe("object");
  });
  test("method '.on' is 2 arguments", () => {
    expect(eventBus.on).toHaveLength(2);
  });
  test("method '.off' is 2 arguments", () => {
    expect(eventBus.off).toHaveLength(2);
  });
  test("method '.trigger' is 1 argument", () => {
    expect(eventBus.trigger).toHaveLength(1);
  });
  test("trigger transfers 2 param in method 'on'", () => {
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
    const fn = jest.fn();
    eventBus.on("click", fn);
    const args = [1, 2, 3, 4];
    eventBus.trigger("click", ...args);
    expect(fn).toHaveBeenCalledWith(...args);
  });
  test("trigger work with 3 methods '.on'", () => {
    const fn1 = jest.fn((x, y) => (x * y));
    const fn2 = jest.fn((x, y) => (x + y));
    const fn3 = jest.fn((x, y) => (x - y));
    eventBus.on("click", fn1);
    eventBus.on("click", fn2);
    eventBus.on("click", fn3);
    const args = [3, 4];
    eventBus.trigger("click", ...args);
    expect(fn1(...args)).toBe(12);
    expect(fn2(...args)).toBe(7);
    expect(fn3(...args)).toBe(-1);
  });
  test("work check method '.off", () => {
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
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    eventBus.on("click", fn1);
    eventBus.on("click", fn2);
    eventBus.off("click");
    eventBus.trigger("click", 3, 4);
    expect(fn1).toHaveBeenCalledTimes(0);
    expect(fn2).toHaveBeenCalledTimes(0);
  });
});

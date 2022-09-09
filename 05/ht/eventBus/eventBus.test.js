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
    expect(eventBus.on.length).toBe(2);
  });
  test("method '.off' is 2 arguments", () => {
    expect(eventBus.off.length).toBe(2);
  });
  test("method '.trigger' is 1 argument", () => {
    expect(eventBus.trigger.length).toBe(1);
  });
  test("triger transfers 2 param in method 'on'", () => {
    let a = 0;
    eventBus.on("click", (x, y) => (a = x + y));
    eventBus.trigger("click", 3, 4);
    expect(a).toBe(7);
  });
  test("triger transfers 4 param in method '.on'", () => {
    let a = 0;
    eventBus.on("click", (x, y, z, g) => (a = x + y + z + g));
    eventBus.trigger("click", 3, 4, 5, 6);
    expect(a).toBe(18);
  });
  test("triger work with 3 methods '.on'", () => {
    let multiply = 0;
    let sum = 0;
    let minus = 0;
    eventBus.on("click", (x, y) => (multiply = x * y));
    eventBus.on("click", (x, y) => (sum = x + y));
    eventBus.on("click", (x, y) => (minus = x - y));
    eventBus.trigger("click", 3, 4);
    expect(multiply).toBe(12);
    expect(sum).toBe(7);
    expect(minus).toBe(-1);
  });
  test("work check method '.off", () => {
    let sum = 0;
    let minus = 0;
    function func1(x, y) {
      return (sum = x + y);
    }
    function func2(x, y) {
      return (minus = x - y);
    }
    eventBus.on("click", func1);
    eventBus.on("click", func2);
    eventBus.off("click", func1);
    eventBus.off("click", func2);
    eventBus.trigger("click", 3, 4);
    expect(sum !== 12).toBe(true);
    expect(minus !== -1).toBe(true);
  });
  test("work check method '.off' with 1 param (delete all)", () => {
    let sum = 0;
    let minus = 0;
    function func1(x, y) {
      return (sum = x + y);
    }
    function func2(x, y) {
      return (minus = x - y);
    }
    eventBus.on("click", func1);
    eventBus.on("click", func2);
    eventBus.off("click");
    eventBus.trigger("click", 3, 4);
    expect(sum !== 12).toBe(true);
    expect(minus !== -1).toBe(true);
  });
});

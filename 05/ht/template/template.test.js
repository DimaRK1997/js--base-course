const compileTemplate = require("./template.js");

const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html>`);

describe("Template tests", () => {
  test("compileTemplate is function", () => {
    expect(typeof compileTemplate === "function").toBe(true);
  });

  test("compileTemplate return function", () => {
    expect(typeof compileTemplate() === "function").toBe(true);
  });

  test("DOM Element 'div' contains 'Bob is 33 years old'", () => {
    const tpl = "{{name}} is {{age}} years old";
    const template = compileTemplate(tpl);
    template(dom.window, { name: "Bob", age: 33 });
    expect(dom.window.document.querySelector("div").textContent === "Bob is 33 years old").toBe(true);
  });

  test("template({ name: 'Bob', age: 33 }) return === 'Bob is 33 years old'", () => {
    const tpl = "{{name}} is {{age}} years old";
    const template = compileTemplate(tpl);
    expect(template(dom.window, { name: "Bob", age: 33 })).toBe("Bob is 33 years old");
  });

  test("template({ age: 54, name: 'Boba' }) return === 'Boba is 54 years old'", () => {
    const tpl = "{{name}} is {{age}} years old";
    const template = compileTemplate(tpl);
    expect(template(dom.window, { age: 54, name: "Boba" })).toBe("Boba is 54 years old");
  });
});

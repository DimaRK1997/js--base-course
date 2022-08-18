/* добавить тесты */
describe("curry", function () {
  it("функция", function () {
    assert.isOk(typeof curry === "function");
  });
  it("target1", function () {
    assert.isOk(curry(target1)(3)(4)(5)(5) === 17);
  });
  it("target2", function () {
    assert.isOk(curry(target2)(8)(45)(5) === 58);
  });
  it("target3", function () {
    assert.isOk(curry(target3)(3)(5) === 8);
  });
});

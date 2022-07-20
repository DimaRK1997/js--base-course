/* Написать тесты на функции spiral и quadraticEquation */

describe("quadraticEquation", function() {
    it("фунция", function() {
      return assert.isOk(typeof quadraticEquation === "function");
    });
    it("1x^2 + 3x + 40 - не имеет корней", function() {
        
        return assert.isOk(quadraticEquation(1, 3, 40) === '[]');
    });
    it("1x^2 + 6x +9 - имеет корни", function() {
        return assert.isOk(quadraticEquation(1, 6, 9).length > 2);
    });
});

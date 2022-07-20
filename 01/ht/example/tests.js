/* Написать тесты на функции spiral и quadraticEquation */

describe("quadraticEquation", function() {
    it("фунция", function() {
        assert.isOk(typeof quadraticEquation === "function");
    });
    it("1x^2 + 3x + 40 - не имеет корней", function() {
        assert.isOk(quadraticEquation(1, 4, 40)[0] === undefined);
    });
    it("1x^2 + 3x + 40 - имеет один корень -2", function() {
        assert.isOk(quadraticEquation(1, 4, 4)[0] === -2);
    });
    it("1x^2 + 6x +9 - имеет корни -1, -4", function() {
        assert.isOk(quadraticEquation(1, 5, 4)[0] === -1 
                    && quadraticEquation(1, 5, 4)[1] === -4
                    );
    });
});

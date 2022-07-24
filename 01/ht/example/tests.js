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

describe("spiral", function() {
    it("function", function() {
        assert.isOk(typeof spiral === "function");
    });
    it("display NxN matrix", function() {
        let arr = spiral([[1, 3, 4], [3, 4, 7], [4, 5, 7]]);
        let resarr = [1, 3, 4, 7, 7, 5, 4, 3, 4];
        for(let i of arr) {
            if(arr.length === resarr.length && arr[i] === resarr[i]) {
               return assert.isOk(true);
            }
            return assert.isOk(false);
        } 
    });
    it("display NxM matrix", function() {
        let arr = spiral([[1, 3, 2, 8], [4, 7, 5, 9], [5, 7, 7, 8]]);
        let resarr = [1, 3, 2, 8, 9, 8, 7, 7, 5, 4, 7, 5];
        for(let i of arr) {
            if(arr.length === resarr.length && arr[i] === resarr[i]) {
               return assert.isOk(true);
            }
            return assert.isOk(false);
        } 
    });
});


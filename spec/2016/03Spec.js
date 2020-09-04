describe('TriangleCounter', function(){
    const TriangleCounter = require('../../2016/03/TriangleCounter');

    beforeEach(function(){
        triangleCounter = new TriangleCounter();
    });
    
    describe('convertInputTriangleList', function(){
        it('should convert an input list of triangles counting columnwise in threes instead of row wise', function(){
            expect(triangleCounter.convertInputTriangleList([[1, 1, 1], [2, 2, 2], [3, 3, 3]])).toEqual([[1,2,3], [1,2,3], [1,2,3]])
        })

        it('should not be affected by running count possible triangles first', function(){
            triangleList = [[1, 1, 2], [2, 2, 2], [3, 3, 3]];
            var x = triangleCounter.countPossibleTriangles(triangleList);
            expect(triangleCounter.convertInputTriangleList(triangleList)).toEqual([[1,2,3], [1,2,3], [2,2,3]])
        })
    })
    describe('countPossibleTriangles', function(){
        it('should return the number of possible triangles in a list of input triangles', function(){
            expect(triangleCounter.countPossibleTriangles([[5, 10, 25], [20, 20, 25]])).toBe(1)
            expect(triangleCounter.countPossibleTriangles([[5, 10, 25], [10, 10, 25]])).toBe(0)
        })
    })

    describe('isTrianglePossible', function(){
        it('should return true if the two smallest sides of a triangle is larger than the longest', function(){
            expect(triangleCounter.isTrianglePossible([5, 10, 25])).toBe(false);
            expect(triangleCounter.isTrianglePossible([20, 20, 25])).toBe(true);
        })
    })

    describe('triSort', function(){
        it('should sort an array of 3 numbers numerically', function(){
            expect(triangleCounter.triSort([2,3,1])).toEqual([1,2,3]);
        });
    });
});
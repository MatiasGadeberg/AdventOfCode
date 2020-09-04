const CoordinateFinder = require("../../2016/01/CoordinateFinder")

describe('CoordinateFinder', function(){
    const CoordinateFinder = require('../../2016/01/CoordinateFinder')

    beforeEach(function(){
        coordinateFinder = new CoordinateFinder();
    });

    describe('findRealHQ', function(){
        it('should return the distance from start to the first point where the path crosses itself', function(){
            coordinateFinder.findHQ(['R8', 'R4', 'R4', 'R8']);
            expect(coordinateFinder.findRealHQ()).toBe(4)
        });
    });

    describe('coordinateIsInListOfCoordinates',function(){
        it('should return true if a given coordiante is present in a list of coordiantes', function(){
            expect(coordinateFinder.coordinateIsInListOfCoordinates([0,2], [[0,0], [0,2], [0, 4]])).toBeTrue
            expect(coordinateFinder.coordinateIsInListOfCoordinates([0,8], [[0,0], [0,2], [0, 4]])).toBeFalse
        });
    });

    describe('findVisitedCoordinates', function(){
        it('should return a list of coordinates between a start and end coordinate', function(){
            expect(coordinateFinder.findVisitedCoordinates([0,0], [0, 2])).toEqual([[0, 1],[0, 2]])
        });
    });

    describe('findHQ', function(){
        it('should return the distance from the final position to start after following a walkingpattern', function(){
            expect(coordinateFinder.findHQ(['R2', 'L3'])).toEqual(5);
            coordinateFinder.resetWalker();
            expect(coordinateFinder.findHQ(['R2', 'R2', 'R2'])).toEqual(2);
            coordinateFinder.resetWalker();
            expect(coordinateFinder.findHQ(['R5', 'L5', 'R5', 'R3'])).toEqual(12);
        });
    });

    describe('walk', function(){
        it('Should walk do the full distance given a list of steps', function(){
            expect(coordinateFinder.coordinates).toEqual([[0,0]]);
            expect(coordinateFinder.facingDirection).toEqual(1);
            coordinateFinder.walk(['R2', 'L3'])
            expect(coordinateFinder.coordinates).toEqual([[0,0], [2, 0], [2,3]]);
            expect(coordinateFinder.facingDirection).toEqual(1);
        });
    });

    describe('distanceToStart', function(){
        it('should calulate the absoloute distance in steps between a given coordinate and [0,0] (taxi grid)', function(){
            expect(coordinateFinder.distanceToStart([10, 10])).toBe(20);
            expect(coordinateFinder.distanceToStart([-10, -10])).toBe(20);
        });
    });

    describe('takeStep', function(){
        it('should take turn and take a step given an stepinput like R4', function(){
            expect(coordinateFinder.coordinates).toEqual([[0,0]]);
            expect(coordinateFinder.facingDirection).toEqual(1);
            coordinateFinder.takeStep('R4');
            expect(coordinateFinder.coordinates).toEqual([[0,0], [4, 0]]);
            expect(coordinateFinder.facingDirection).toEqual(2);
        })
    })

    describe('splitInput', function(){
        it('Should return an array with seperate turn direction and step lengt given a step input like R4', function(){
            expect(coordinateFinder.splitInput('R4')).toEqual(['R',4])
        })
    })

    describe('takeStepInDirection', function(){
        it('Should take a step in the current facing direction adding the new coordinate to the list of coordinates', function(){
            expect(coordinateFinder.coordinates).toEqual([[0,0]]);
            coordinateFinder.takeStepInDirection(5);
            expect(coordinateFinder.coordinates).toEqual([[0,0], [0, 5]]);
            coordinateFinder.turn('R');
            coordinateFinder.takeStepInDirection(10);
            expect(coordinateFinder.coordinates).toEqual([[0,0], [0, 5], [10, 5]]);
        });
    });

    describe('lastElement', function(){
        it('should return the last element in an array', function(){
            expect(coordinateFinder.lastElement([1,2,3])).toBe(3);
            expect(coordinateFinder.lastElement([[1,2,3],[4,5,6],[7,8,9]])).toEqual([7,8,9]);
        });
    });

    describe('turn', function(){
        it('Should turn right when given R as input', function(){
            expect(coordinateFinder.facingDirection).toBe(1);
            coordinateFinder.turn('R');
            expect(coordinateFinder.facingDirection).toBe(2);
        });

        it('Should turn Left when given L as input', function(){
            expect(coordinateFinder.facingDirection).toBe(1);
            coordinateFinder.turn('L');
            expect(coordinateFinder.facingDirection).toBe(4);
        });
    });

    describe('turnLeft', function(){
        it('should turn left (from North (1) to West (4)) when called', function(){
            expect(coordinateFinder.facingDirection).toBe(1);
            coordinateFinder.turnLeft();
            expect(coordinateFinder.facingDirection).toBe(4);
        })
    });

    
    describe('turnRight', function(){
        it('should turn right (from North (1) to East (2)) when called', function(){
            expect(coordinateFinder.facingDirection).toBe(1);
            coordinateFinder.turnRight();
            expect(coordinateFinder.facingDirection).toBe(2);
        })
    });
});
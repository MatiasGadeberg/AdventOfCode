describe('KeyFinder', function(){
    const KeyFinder = require('../../2016/02/KeyFinder');
    const testCode = require('../../2016/02/input').testCode;
    var keyFinder

    beforeEach(function(){
        keyFinder = new KeyFinder;
    });

    describe('getCode', function(){
        it('should return an array containing the code digits when given a list of lists of sequence moves', function(){
            expect(keyFinder.getCode(testCode)).toEqual([1,9,8,5]);
        });
    });
    
    describe('getCodeKey', function(){
        it('given a starting key and a sequence of moves it should return the final key', function(){
            expect(keyFinder.getCodeKey(5,['U', 'L', 'L'])).toEqual(1);
            expect(keyFinder.getCodeKey(1,['R', 'R', 'D', 'D', 'D'])).toEqual(9);
            expect(keyFinder.getCodeKey(9,['L', 'U', 'R', 'D', 'L'])).toEqual(8);
            expect(keyFinder.getCodeKey(8,['U', 'U', 'U', 'U', 'D'])).toEqual(5);
        })
    });

    describe('getNewKeyFromDirection', function(){
        
        it('should return null only 1 input is given', function(){
            expect(keyFinder.getNewKeyFromDirection('U')).toBeNull();
            expect(keyFinder.getNewKeyFromDirection(2)).toBeNull();
        });

        it('should return null if the input direction is not one of U, D, L, R', function(){
            expect(keyFinder.getNewKeyFromDirection('E', 9)).toBeNull();
            expect(keyFinder.getNewKeyFromDirection('Q', 9)).toBeNull();
            expect(keyFinder.getNewKeyFromDirection('R', 9)).toBeTruthy();
            expect(keyFinder.getNewKeyFromDirection('D', 9)).toBeTruthy();
            expect(keyFinder.getNewKeyFromDirection('U', 9)).toBeTruthy();
            expect(keyFinder.getNewKeyFromDirection('L', 9)).toBeTruthy();
        })

        it('shoud return null if number is not 1-9', function(){
            expect(keyFinder.getNewKeyFromDirection('U', -4)).toBeNull();
            expect(keyFinder.getNewKeyFromDirection('U', 34)).toBeNull();
        });

        it('should return a number 3 smaller than input when given U as direction and current is not 1,2,3', function(){
            expect(keyFinder.getNewKeyFromDirection('U', 4)).toEqual(1);
            expect(keyFinder.getNewKeyFromDirection('U', 7)).toEqual(4);
            expect(keyFinder.getNewKeyFromDirection('U', 9)).toEqual(6);
        });

        it('should return the input number if going up on 1,2 or 3', function(){
            expect(keyFinder.getNewKeyFromDirection('U', 1)).toEqual(1);
            expect(keyFinder.getNewKeyFromDirection('U', 2)).toEqual(2);
            expect(keyFinder.getNewKeyFromDirection('U', 3)).toEqual(3);
        });

        it('should return a number 3 greater than the input if given D as direction and current is not 7, 8, 9', function(){
            expect(keyFinder.getNewKeyFromDirection('D', 1)).toEqual(4);
            expect(keyFinder.getNewKeyFromDirection('D', 4)).toEqual(7);
            expect(keyFinder.getNewKeyFromDirection('D', 6)).toEqual(9);
        })

        it('should return the input number if direction is D and number is 7, 8 or 9', function(){
            expect(keyFinder.getNewKeyFromDirection('D', 7)).toEqual(7);
            expect(keyFinder.getNewKeyFromDirection('D', 8)).toEqual(8);
            expect(keyFinder.getNewKeyFromDirection('D', 9)).toEqual(9);
        });

        it('should return a number 1 greater than input when given direction right and current is not 3, 6 or 9', function(){
            expect(keyFinder.getNewKeyFromDirection('R', 1)).toEqual(2);
            expect(keyFinder.getNewKeyFromDirection('R', 5)).toEqual(6);
            expect(keyFinder.getNewKeyFromDirection('R', 7)).toEqual(8);
        });

        it('should return the input number if going right from 3,6 or 9', function(){
            expect(keyFinder.getNewKeyFromDirection('R', 3)).toEqual(3);
            expect(keyFinder.getNewKeyFromDirection('R', 6)).toEqual(6);
            expect(keyFinder.getNewKeyFromDirection('R', 9)).toEqual(9);
        });

        it('should return a number 1 less than input if going left from a number other than 1, 4 or 7', function(){
            expect(keyFinder.getNewKeyFromDirection('L', 3)).toEqual(2);
            expect(keyFinder.getNewKeyFromDirection('L', 5)).toEqual(4);
            expect(keyFinder.getNewKeyFromDirection('L', 9)).toEqual(8);
        });

        it('should return the input number when going left from 1, 4 or 7', function(){
            expect(keyFinder.getNewKeyFromDirection('L', 1)).toEqual(1);
            expect(keyFinder.getNewKeyFromDirection('L', 4)).toEqual(4);
            expect(keyFinder.getNewKeyFromDirection('L', 7)).toEqual(7);
        })

    });

    describe('getColumnAndIndex', function(){
        it('should return a column and an index given the current key', function(){
            expect(keyFinder.getColumnAndIndex(5)).toEqual([0, 0]);
            expect(keyFinder.getColumnAndIndex(3)).toEqual([2, 1]);
            expect(keyFinder.getColumnAndIndex('A')).toEqual([1,2]);
        });
    });

    describe('getNewKeyMovingUp', function(){

        it('shoud return null if no input is given', function(){
            expect(keyFinder.getNewKeyMovingUp()).toBeNull();
        });

        it('should return null if the input number is not 1-9', function(){
            expect(keyFinder.getNewKeyMovingUp(-3)).toBeNull();
            expect(keyFinder.getNewKeyMovingUp(15)).toBeNull(); 
        });
        
        it('should return a number that is 3 lower than the input if the input is not 1,2,3', function(){
            expect(keyFinder.getNewKeyMovingUp(4)).toEqual(1);
            expect(keyFinder.getNewKeyMovingUp(8)).toEqual(5);
        });

        it('should return the input number if it is less than 4', function(){
            expect(keyFinder.getNewKeyMovingUp(1)).toEqual(1);
            expect(keyFinder.getNewKeyMovingUp(3)).toEqual(3);
        });

    });

    describe('getNewKeyMoving Down', function(){

        it('should return null if no input is given', function(){
            expect(keyFinder.getNewKeyMovingDown()).toBeNull();
        });

        it('should return null if the input number is not 1-9', function(){
            expect(keyFinder.getNewKeyMovingDown(-3)).toBeNull();
            expect(keyFinder.getNewKeyMovingDown(15)).toBeNull(); 
        });

        it('should return a number 3 less than the input, if the input is not 7,8,9', function(){
            expect(keyFinder.getNewKeyMovingDown(4)).toEqual(7);
            expect(keyFinder.getNewKeyMovingDown(3)).toEqual(6);
        });

        it('should return the input number if it is greater than 7', function(){
            expect(keyFinder.getNewKeyMovingDown(7)).toEqual(7);
            expect(keyFinder.getNewKeyMovingDown(9)).toEqual(9);
        });
    });

    describe('getKeyMovingLeft', function(){

        it('should return null if no input is given', function(){
            expect(keyFinder.getNewKeyMovingLeft()).toBeNull();   
        });

        it('should return null if the input number is not 1-9', function(){
            expect(keyFinder.getNewKeyMovingLeft(-1)).toBeNull();
            expect(keyFinder.getNewKeyMovingLeft(14)).toBeNull();
        });

        it('should return a number 1 lower then the input number if it is not 1,4,7', function(){
            expect(keyFinder.getNewKeyMovingLeft(3)).toEqual(2);
            expect(keyFinder.getNewKeyMovingLeft(8)).toEqual(7);
        });

        it('should return the input number if it is 1,4 or 7',function(){
            expect(keyFinder.getNewKeyMovingLeft(1)).toEqual(1);
            expect(keyFinder.getNewKeyMovingLeft(4)).toEqual(4);
            expect(keyFinder.getNewKeyMovingLeft(7)).toEqual(7);
        });
    });

    describe('getNewKeyMovingRight', function(){
        it('should return null if no input is given', function(){
            expect(keyFinder.getNewKeyMovingRight()).toBeNull();
        });

        it('should return null if input is not 1-9', function(){
            expect(keyFinder.getNewKeyMovingRight(-29)).toBeNull();
            expect(keyFinder.getNewKeyMovingRight(29)).toBeNull();
        });

        it('should return the input number if it is 3, 6 or 9', function(){
            expect(keyFinder.getNewKeyMovingRight(3)).toEqual(3);
            expect(keyFinder.getNewKeyMovingRight(6)).toEqual(6);
            expect(keyFinder.getNewKeyMovingRight(9)).toEqual(9);
        });

        it('should return a number 1 greater than the input if it is not 3, 6, 9', function(){
            expect(keyFinder.getNewKeyMovingRight(1)).toEqual(2);
            expect(keyFinder.getNewKeyMovingRight(5)).toEqual(6);
            expect(keyFinder.getNewKeyMovingRight(7)).toEqual(8);
        })
    });

});
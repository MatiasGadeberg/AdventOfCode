describe('KeyFinder', function(){
    const KeyFinder = require('../../2016/02/KeyFinder');
    const testCode = require('../../2016/02/input').testCode;
    var keyFinder

    beforeEach(function(){
        keyFinder = new KeyFinder;
    });

    describe('getCode', function(){
        it('should return an array containing the code digits when given a list of lists of sequence moves', function(){
            expect(keyFinder.getCode(testCode)).toEqual([5,'D','B',3]);
        });
    });
    
    describe('getCodeKey', function(){
        it('given a starting key and a sequence of moves it should return the final key', function(){
            expect(keyFinder.getCodeKey(5,['U', 'L', 'L'])).toEqual(5);
            expect(keyFinder.getCodeKey(5,['R', 'R', 'D', 'D', 'D'])).toEqual('D');
            expect(keyFinder.getCodeKey('D',['L', 'U', 'R', 'D', 'L'])).toEqual('B');
            expect(keyFinder.getCodeKey('B',['U', 'U', 'U', 'U', 'D'])).toEqual(3);
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
            expect(keyFinder.getNewKeyFromDirection('U', 3)).toEqual(1);
            expect(keyFinder.getNewKeyFromDirection('U', 8)).toEqual(4);
            expect(keyFinder.getNewKeyFromDirection('U', 'D')).toEqual('B');
        });

        it('should return the input number if going up on 1,2 or 3', function(){
            expect(keyFinder.getNewKeyFromDirection('U', 1)).toEqual(1);
            expect(keyFinder.getNewKeyFromDirection('U', 2)).toEqual(2);
            expect(keyFinder.getNewKeyFromDirection('U', 4)).toEqual(4);
        });

        it('should return the key below the input if given D as direction and current is not 5, A, D, C or 9', function(){
            expect(keyFinder.getNewKeyFromDirection('D', 1)).toEqual(3);
            expect(keyFinder.getNewKeyFromDirection('D', 4)).toEqual(8);
            expect(keyFinder.getNewKeyFromDirection('D', 7)).toEqual('B');
        })

        it('should return the input number if direction is D and number is 5, A, D, C or 9', function(){
            expect(keyFinder.getNewKeyFromDirection('D', 5)).toEqual(5);
            expect(keyFinder.getNewKeyFromDirection('D', 'D')).toEqual('D');
            expect(keyFinder.getNewKeyFromDirection('D', 9)).toEqual(9);
        });

        it('should return a number 1 greater than input when given direction right and current is not 3, 6 or 9', function(){
            expect(keyFinder.getNewKeyFromDirection('R', 'A')).toEqual('B');
            expect(keyFinder.getNewKeyFromDirection('R', 5)).toEqual(6);
            expect(keyFinder.getNewKeyFromDirection('R', 7)).toEqual(8);
        });

        it('should return the input number if going right from 1, 4, 9, C and D', function(){
            expect(keyFinder.getNewKeyFromDirection('R', 1)).toEqual(1);
            expect(keyFinder.getNewKeyFromDirection('R', 4)).toEqual(4);
            expect(keyFinder.getNewKeyFromDirection('R', 'C')).toEqual('C');
        });

        it('should return a number 1 less than input if going left from a number other than 1, 4 or 7', function(){
            expect(keyFinder.getNewKeyFromDirection('L', 3)).toEqual(2);
            expect(keyFinder.getNewKeyFromDirection('L', 6)).toEqual(5);
            expect(keyFinder.getNewKeyFromDirection('L', 'C')).toEqual('B');
        });

        it('should return the input number when going left from 1, 2, 5, A or D', function(){
            expect(keyFinder.getNewKeyFromDirection('L', 1)).toEqual(1);
            expect(keyFinder.getNewKeyFromDirection('L', 2)).toEqual(2);
            expect(keyFinder.getNewKeyFromDirection('L', 'A')).toEqual('A');
        })

    });

    describe('getColumnAndIndex', function(){
        it('should return a column and an index given the current key', function(){
            expect(keyFinder.getColumnAndIndex(5)).toEqual([0, 0]);
            expect(keyFinder.getColumnAndIndex(3)).toEqual([2, 1]);
            expect(keyFinder.getColumnAndIndex('A')).toEqual([1,2]);
        });
    });
    
    describe('getRowAndIndex', function(){
        it('should return a column and an index given the current key', function(){
            expect(keyFinder.getRowAndIndex(5)).toEqual([2, 0]);
            expect(keyFinder.getRowAndIndex(3)).toEqual([1, 1]);
            expect(keyFinder.getRowAndIndex('A')).toEqual([3,0]);
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
        
        it('should return a number that is one above in the given column', function(){
            expect(keyFinder.getNewKeyMovingUp('A')).toEqual(6);
            expect(keyFinder.getNewKeyMovingUp('D')).toEqual('B');
            expect(keyFinder.getNewKeyMovingUp(8)).toEqual(4);
        });

        it('should return the input number if it is the first in a column', function(){
            expect(keyFinder.getNewKeyMovingUp(1)).toEqual(1);
            expect(keyFinder.getNewKeyMovingUp(4)).toEqual(4);
            expect(keyFinder.getNewKeyMovingUp(9)).toEqual(9);
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
            expect(keyFinder.getNewKeyMovingDown(4)).toEqual(8);
            expect(keyFinder.getNewKeyMovingDown(3)).toEqual(7);
        });

        it('should return the input number if it is greater than 7', function(){
            expect(keyFinder.getNewKeyMovingDown(5)).toEqual(5);
            expect(keyFinder.getNewKeyMovingDown('C')).toEqual('C');
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

        it('should return a key 1 lower in the row then the input key', function(){
            expect(keyFinder.getNewKeyMovingLeft(3)).toEqual(2);
            expect(keyFinder.getNewKeyMovingLeft(8)).toEqual(7);
            expect(keyFinder.getNewKeyMovingLeft('C')).toEqual('B');
        });

        it('should return the input number if it is 1,4 or 7',function(){
            expect(keyFinder.getNewKeyMovingLeft(1)).toEqual(1);
            expect(keyFinder.getNewKeyMovingLeft('A')).toEqual('A');
            expect(keyFinder.getNewKeyMovingLeft(5)).toEqual(5);
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

        it('should return the input key if it is the right most in the row', function(){
            expect(keyFinder.getNewKeyMovingRight(1)).toEqual(1);
            expect(keyFinder.getNewKeyMovingRight(9)).toEqual(9);
            expect(keyFinder.getNewKeyMovingRight('C')).toEqual('C');
        });

        it('should return the key to the right of the input key when it is not at the end of the row', function(){
            expect(keyFinder.getNewKeyMovingRight(3)).toEqual(4);
            expect(keyFinder.getNewKeyMovingRight('A')).toEqual('B');
            expect(keyFinder.getNewKeyMovingRight(6)).toEqual(7);
        })
    });

});
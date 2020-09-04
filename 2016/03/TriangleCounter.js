class TriangleCounter {
    constructor(){

    }
    
    convertInputTriangleList(triangleList) {
        var newTrianlgeList = [];
        for (let i = 0; i < triangleList.length-2; i+=3) {
            for (let j = 0; j < 3; j++) {
                newTrianlgeList.push([triangleList[i][j], triangleList[i+1][j], triangleList[i+2][j]]);  
            }   
        }
        return newTrianlgeList
    }

    countPossibleTriangles(triangleList) {
        var count = 0;
        triangleList.forEach(triangle => {
            if (this.isTrianglePossible(triangle)){
                count ++
            }
        }, this);
    
        return count
    }

    isTrianglePossible(triangle) {
        var a, b, c
        [a, b, c] = this.triSort(triangle);
    
        if (a + b > c) {
            return true
        }
    
        return false
    }

    triSort(triangle) {
        return triangle.sort((a,b) => a-b);
    }
}

module.exports = TriangleCounter;
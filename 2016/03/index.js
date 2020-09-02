const triangles = require('./input').triangles;


const convertInputTriangleList = triangleList => {
    var newTrianlgeList = [];
    for (let i = 0; i < triangleList.length-2; i+=3) {
        for (let j = 0; j < 3; j++) {
            newTrianlgeList.push([triangleList[i][j], triangleList[i+1][j], triangleList[i+2][j]]);  
        }   
    }
    return newTrianlgeList
}

const countPossibleTriangles = triangleList => {
    var count = 0;
    triangleList.forEach(triangle => {
        if (isTrianglePossible(triangle)){
            count ++
        }
    });

    return count
}

const isTrianglePossible = triangle => {
    var a, b, c
    [a, b, c] = triSort(triangle);

    if (a + b > c) {
        return true
    }

    return false
}

const triSort = triangle => {
    return triangle.sort((a,b) => a-b);
}

console.log(triSort([2,4,6]))
console.log(isTrianglePossible([10, 5, 25]))
console.log(countPossibleTriangles(convertInputTriangleList(triangles)))

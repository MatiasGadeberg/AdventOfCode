const fs = require("fs");

const lines = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .replaceAll("\r", "")
  .split("\n")
  .map((x) => x.replace(" -> ", ","))
  .map((x) => x.split(","))
  .map((x) => {
    return {
      x1: parseInt(x[0]),
      y1: parseInt(x[1]),
      x2: parseInt(x[2]),
      y2: parseInt(x[3])
    };
  });

const straightLines = lines.filter(
  (line) => line.x1 === line.x2 || line.y1 === line.y2
);

const maxX =
  lines.reduce((max, line) => {
    if (line.x1 > max) {
      return line.x1;
    } else if (line.x2 > max) {
      return line.x2;
    } else {
      return max;
    }
  }, 0) + 1;
const maxY =
  lines.reduce((max, line) => {
    if (line.y1 > max) {
      return line.y1;
    } else if (line.y2 > max) {
      return line.y2;
    } else {
      return max;
    }
  }, 0) + 1;

let grid = [];
for (let i = 0; i < maxY; i++) {
  let gridLine = new Array(maxX).fill(0);
  grid.push(gridLine);
}

for (let i = 0; i < straightLines.length; i++) {
  let drawLine = straightLines[i];
  if (drawLine.x1 === drawLine.x2) {
    let xPos = drawLine.x1;
    let start = Math.min(drawLine.y1, drawLine.y2);
    let end = Math.max(drawLine.y1, drawLine.y2);
    for (let j = start; j < end + 1; j++) {
      grid[j][xPos] += 1;
    }
  } else {
    let yPos = drawLine.y1;
    let start = Math.min(drawLine.x1, drawLine.x2);
    let end = Math.max(drawLine.x1, drawLine.x2);
    for (let j = start; j < end + 1; j++) {
      grid[yPos][j] += 1;
    }
  }
}

function getOverlap(grid) {
  let overlap = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] > 1) {
        overlap++;
      }
    }
  }
  return overlap
}


/*********************
**  Part 2
**********************/

// Reset grid
grid = [];
for (let i = 0; i < maxY; i++) {
  let gridLine = new Array(maxX).fill(0);
  grid.push(gridLine);
}

for (let i = 0; i < lines.length; i++) {
  let drawLine = lines[i];
  if (drawLine.x1 === drawLine.x2) {
    let xPos = drawLine.x1;
    let start = Math.min(drawLine.y1, drawLine.y2);
    let end = Math.max(drawLine.y1, drawLine.y2);
    for (let j = start; j < end + 1; j++) {
      grid[j][xPos] += 1;
    }
  } else if (drawLine.y1 === drawLine.y2) {
    let yPos = drawLine.y1;
    let start = Math.min(drawLine.x1, drawLine.x2);
    let end = Math.max(drawLine.x1, drawLine.x2);
    for (let j = start; j < end + 1; j++) {
      grid[yPos][j] += 1;
    } 
  } else if (drawLine.x1 > drawLine.x2 && drawLine.y1 > drawLine.y2) {
    // Diagonal line Going bottom right to top left 
    for (let i = 0; i < drawLine.x1-drawLine.x2 + 1; i++) {
      grid[drawLine.y1 - i][drawLine.x1 - i] += 1  
    }
    
  } else if (drawLine.x1 < drawLine.x2 && drawLine.y1 < drawLine.y2) {
    // Diagonal line Going from top left to bottom right
    for (let i = 0; i < drawLine.x2-drawLine.x1  + 1; i++) {
      grid[drawLine.y1 + i][drawLine.x1 + i] += 1  
    }

  } else if (true) {
    // Diagonal line Going from bottom left to top right
    let startX = Math.min(drawLine.x1, drawLine.x2);
    let endX = Math.max(drawLine.x1, drawLine.x2);
    let startY = Math.max(drawLine.y1, drawLine.y2);
    for (let i = 0; i < endX-startX + 1; i++) {
        grid[startY - i][startX + i] += 1  
    }

  }
}

//console.table(grid)
console.log(getOverlap(grid))
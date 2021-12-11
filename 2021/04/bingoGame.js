let checkNumberOnBoard = (bingoBoard, bingoNumber) => {
  bingoBoard.every((row) => {
    if (row.includes(bingoNumber)) {
      row[row.indexOf(bingoNumber)] = true;
      return false;
    }
    return true;
  });
  return bingoBoard;
};

let boardColumns = (bingoBoard) => {
  let columns = new Array(bingoBoard[0].length);
  for (let i = 0; i < columns.length; i++) {
    columns[i] = new Array(0);
  }
  bingoBoard.forEach((row) => {
    row.forEach((el, idx) => {
      columns[idx].push(el);
    });
  });
  return columns;
};

let isWinner = (bingoArray) => {
  for (let i = 0; i < bingoArray.length; i++) {
    if (!(bingoArray[i] === true)) {
      return false;
    }
  }
  return true;
};

let boardIsWinner = (bingoBoard) => {
  const columns = boardColumns(bingoBoard);
  for (let i = 0; i < bingoBoard.length; i++) {
    if (isWinner(bingoBoard[i])) {
      return true;
    }
  }
  for (let i = 0; i < columns.length; i++) {
    if (isWinner(columns[i])) {
      return true;
    }
  }
  return false;
};

let sumWinnerBoard = (bingoBoard) => {
  let sum = 0;
  bingoBoard.forEach((row) => {
    row.forEach((el) => {
      if (!(el === true)) {
        sum += el;
      }
    });
  });
  return sum;
};

let playBingo = (boardArray, bingoNumbers) => {
  let winnerBoard, winnerNumber, winnerSum;
  let currentNumber;
  for (let i = 0; i < bingoNumbers.length; i++) {
    if (winnerNumber) {
      break;
    }
    currentNumber = bingoNumbers[i];
    for (let j = 0; j < boardArray.length; j++) {
      boardArray[j] = checkNumberOnBoard(boardArray[j], currentNumber);
      if (boardIsWinner(boardArray[j])) {
        winnerBoard = boardArray[j];
        winnerNumber = currentNumber;
        winnerSum = sumWinnerBoard(winnerBoard);
        break;
      }
    }
  }
  return winnerNumber * winnerSum;
};

let playBingoLoser = (boardArray, bingoNumbers) => {
  const numOfBoards = boardArray.length;
  let winnerBoards = [];
  let loserNumber, loserSum;
  let currentNumber;
  for (let i = 0; i < bingoNumbers.length; i++) {
    if (loserNumber) {
      break;
    }
    currentNumber = bingoNumbers[i];
    for (let j = 0; j < boardArray.length; j++) {
      if (boardArray[j].length) {
        boardArray[j] = checkNumberOnBoard(boardArray[j], currentNumber);
        if (boardIsWinner(boardArray[j])) {
          if (winnerBoards.length === numOfBoards - 1) {
            loserNumber = currentNumber;
            loserSum = sumWinnerBoard(boardArray[j]);
            break;
          } else {
            winnerBoards.push(boardArray[j]);
            boardArray[j] = [];
          }
        }
      }
    }
  }
  return loserNumber * loserSum;
};

module.exports = {
  checkNumberOnBoard,
  boardColumns,
  boardIsWinner,
  isWinner,
  sumWinnerBoard,
  playBingo,
  playBingoLoser
};

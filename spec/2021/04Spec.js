const bingoGame = require("../../2021/04/bingoGame.js");

describe("bingoGame", function () {
  describe("checkNumberOnBoard", function () {
    const bingoNumber = 18;
    it("should return the board with a given number marked as true if the number was on the board", function () {
      const boardWithNumber = [
        [1, 24, 30],
        [6, 18, 29],
        [8, 11, 21]
      ];
      const checkedWithNumber = bingoGame.checkNumberOnBoard(
        boardWithNumber,
        bingoNumber
      );
      expect(checkedWithNumber).toEqual([
        [1, 24, 30],
        [6, true, 29],
        [8, 11, 21]
      ]);
    });
    it("should return the same board if the number is not on the board", function () {
      const boardWithoutNumber = [
        [1, 24, 30],
        [6, 17, 29],
        [8, 11, 21]
      ];
      const checkedWithoutNumber = bingoGame.checkNumberOnBoard(
        boardWithoutNumber,
        bingoNumber
      );
      expect(checkedWithoutNumber).toEqual(boardWithoutNumber);
    });
  });

  describe("boardIsWinner", function () {
    describe("boardColumns", function () {
      it("should return an array of arrays representing the columns of the given board", function () {
        const board = [
          [1, 24, 30],
          [6, 18, 29],
          [8, 11, 21]
        ];
        const columns = bingoGame.boardColumns(board);
        expect(columns).toEqual([
          [1, 6, 8],
          [24, 18, 11],
          [30, 29, 21]
        ]);
      });
    });

    describe("isWinner", function () {
      it("should return true if an array is filled with true, otherwise return false", function () {
        const winner = [true, true, true];
        const loser = [1, true, true];
        expect(bingoGame.isWinner(winner)).toBeTrue();
        expect(bingoGame.isWinner(loser)).toBeFalse();
      });
    });

    it("should return true if the input board has a row or column of all true", function () {
      const winnerBoardRow = [
        [true, 24, 30],
        [true, true, true],
        [8, 11, 21]
      ];
      const winnerBoardCol = [
        [true, 24, 30],
        [true, 18, true],
        [true, 11, 21]
      ];
      const isWinnerRow = bingoGame.boardIsWinner(winnerBoardRow);
      expect(isWinnerRow).toBeTrue();
      const isWinnerCol = bingoGame.boardIsWinner(winnerBoardCol);
      expect(isWinnerCol).toBeTrue();
    });

    it("should return false if the input board does not have any rows or colums of all true", function () {
      const board = [
        [1, 24, 30],
        [6, 18, 29],
        [8, 11, 21]
      ];
      const isNotWinner = bingoGame.boardIsWinner(board);
      expect(isNotWinner).toBeFalse();
    });
  });

  describe("playBingo", function () {
    describe("sumWinnerBoard", function () {
      it("should return the sum of the non marked numbers on a bingo board", function () {
        const bingoBoard = [
          [true, 24, 30],
          [true, true, true],
          [8, 11, 21]
        ];
        const bingoSum = bingoGame.sumWinnerBoard(bingoBoard);
        expect(bingoSum).toEqual(94);
      });
    });

    it("should give the final score of the winner board given a set of boards and a string of random numbers", function () {
      const game = require("../../2021/04/example");
      const score = bingoGame.playBingo(
        game.exampleBoards,
        game.exampleNumbers
      );
      expect(score).toEqual(4512);
    });
  });

  describe("playBingoLoser", function () {
    it("Should give the final score of the last board to win", function () {
      const game = require("../../2021/04/example1");
      const score = bingoGame.playBingoLoser(
        game.exampleBoards,
        game.exampleNumbers
      );
      expect(score).toEqual(1924);
    });
  });
});

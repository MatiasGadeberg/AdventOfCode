const Diagnostics = require("../../2021/03/diganostics.js");

describe("diganostics module", function () {
  describe("binaryConuter", function () {
    it("Should take a list of integers and a list representation of a binary number and add 1 for all positions with a 1 and subtract 1 for all positions wiht a 0", function () {
      let binarySum = [0, 0, 0, 0];
      let binary = [1, 0, 1, 0];
      binarySum = Diagnostics.binaryCounter(binarySum, binary);
      expect(binarySum).toEqual([1, -1, 1, -1]);
      binary = [1, 1, 1, 0];
      binarySum = Diagnostics.binaryCounter(binarySum, binary);
      expect(binarySum).toEqual([2, 0, 2, -2]);
    });
  });
  describe("binarySumConverter", function () {
    it("should take a binary sum and convert it to a binary number as a string", function () {
      let binarySum = [-3, -233, 4, 1203];
      let binary = Diagnostics.binarySumConverter(binarySum, "g");
      expect(binary).toEqual("0011");
    });
  });
  describe("binaryFlipper", function () {
    it("should take a binary string and return the inverse binary", function () {
      let binaryString = "1010";
      let binaryInverted = Diagnostics.binaryFlipper(binaryString);
      expect(binaryInverted).toEqual("0101");
      binaryString = "11001010";
      binaryInverted = Diagnostics.binaryFlipper(binaryString);
      expect(binaryInverted).toEqual("00110101");
    });
  });
  const { example } = require("../../2021/03/example.js");
  describe("rateCalculator", function () {
    it("should return the gamma rate for a given input", function () {
      const gammaRate = Diagnostics.rateCalculator(example, "g");
      expect(gammaRate).toEqual("10110");
    });
  });
  describe("powerConsumptionCalculator", function () {
    it("should return the power consumption for a given diagnosticsreport", function () {
      const powerConsumption = Diagnostics.powerConsumptionCalculator(example);
      expect(powerConsumption).toEqual(198);
    });
  });
  describe("ratingGenerator", function () {
    it("should return the oxygen generator rating of a given diganosticreport", function () {
      const oxygenRating = Diagnostics.ratingGenerator(example, "oxygen");
      const co2Rating = Diagnostics.ratingGenerator(example, "co2");
      expect(oxygenRating).toEqual("10111");
      expect(co2Rating).toEqual("01010");
    });
  });
  describe("lifeSupportRatingCalculator", function () {
    it("calculates life support rating given a diagnostics report", function () {
      const lifeSupportRating =
        Diagnostics.lifeSupportRatingCalculator(example);
      expect(lifeSupportRating).toEqual(230);
    });
  });
});

const { sonarDepth, slidingWindowSum } = require("../../2021/01/SonarDepth.js");

const { example } = require("../../2021/01/example.js");

describe("SonarDepth", function () {
  it("Should give the count of increases from array i to i+1", function () {
    const count = sonarDepth(example);
    expect(count).toEqual(7);
  });
});

describe("slidingWindowSonarDepth", function () {
  describe("slidingWindowsum", function () {
    it("should return the sliding window sum of n elements of the input array", function () {
      const resultArray = slidingWindowSum(example, 3);
      expect(resultArray).toEqual([607, 618, 618, 617, 647, 716, 769, 792]);
    });
  });
});

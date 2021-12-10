const subMarine = require("../../2021/02/Submarine.js");

const { example } = require("../../2021/02/example.js");

describe("subMarine", function () {
  describe("steerDown", function () {
    it("should increase the depth by the given amount", function () {
      let pos = [0, 0, 0];
      expect(subMarine.steerDown(pos, 4)).toEqual([0, 0, 4]);
      pos = [10, 20, 30];
      expect(subMarine.steerDown(pos, 4)).toEqual([10, 20, 34]);
    });
  });
  describe("steerUp", function () {
    it("should decrese the depth by the given amount", function () {
      let pos = [0, 0, 5];
      expect(subMarine.steerUp(pos, 4)).toEqual([0, 0, 1]);
      pos = [10, 20, 30];
      expect(subMarine.steerUp(pos, 4)).toEqual([10, 20, 26]);
    });
  });
  describe("steerForward", function () {
    it("should increase the horizontal position by the given amount", function () {
      let pos = [0, 0, 5];
      expect(subMarine.steerForward(pos, 4)).toEqual([4, 20, 5]);
      pos = [10, 20, 30];
      expect(subMarine.steerForward(pos, 4)).toEqual([14, 140, 30]);
    });
  });
  describe("followRoute", function () {
    it("should return the position and depth given a instruction route array", function () {
      const [horz, depth, aim] = subMarine.followRoute(example);
      expect([horz, depth]).toEqual([15, 60]);
    });
  });
});

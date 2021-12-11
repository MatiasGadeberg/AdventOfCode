const { diagnosticsReport } = require("./input");

let binaryCounter = (binarySum, binary) => {
  binary.forEach((digit, idx) => {
    digit == 1 ? binarySum[idx]++ : binarySum[idx]--;
  });
  return binarySum;
};

let binarySumConverter = (binarySum, rateType, ratingType = "") => {
  let binary = [];
  binarySum.forEach((digit) => {
    if (rateType === "g") {
      if (digit === 0 && ratingType === "oxygen") {
        binary.push(1);
      } else if (digit === 0 && ratingType === "co2") {
        binary.push(0);
      } else {
        digit > 0 ? binary.push(1) : binary.push(0);
      }
    } else if (rateType === "e") {
      if (digit === 0 && ratingType === "oxygen") {
        binary.push(1);
      } else if (digit === 0 && ratingType === "co2") {
        binary.push(0);
      } else {
        digit > 0 ? binary.push(0) : binary.push(1);
      }
    }
  });
  const binaryString = binary.join("");
  return binaryString;
};

let binaryFlipper = (binaryString) => {
  let inverted = [];
  binaryString.split("").forEach((digit) => {
    digit === "1" ? inverted.push(0) : inverted.push(1);
  });
  return inverted.join("");
};

let rateCalculator = (binarysArray, rateType, ratingType = "") => {
  let binarySum = new Array(binarysArray[0].length).fill(0);
  binarysArray.forEach((binaryArray) => {
    binarySum = binaryCounter(binarySum, binaryArray);
  });
  const rate = binarySumConverter(binarySum, rateType, ratingType);
  return rate;
};

let powerConsumptionCalculator = (diagnosticsReport) => {
  const gammaRate = rateCalculator(diagnosticsReport, "g");
  const epsilonRate = rateCalculator(diagnosticsReport, "e");
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

let ratingGenerator = (diagnosticsReport, ratingType) => {
  let rating = diagnosticsReport;
  let rate, rateType;
  if (ratingType === "oxygen") {
    rateType = "g";
  } else {
    rateType = "e";
  }
  for (let i = 0; i < diagnosticsReport[0].length; i++) {
    if (rating.length === 1) {
      break;
    }
    rate = rateCalculator(rating, rateType, ratingType);
    rate = rate.split("");
    rating = rating.filter(
      (binaryArray) => binaryArray[i].toString() === rate[i]
    );
  }
  return rating[0].join("");
};

let lifeSupportRatingCalculator = (diagnosticsReport) => {
  const oxygenRating = ratingGenerator(diagnosticsReport, "oxygen");
  const co2Rating = ratingGenerator(diagnosticsReport, "co2");
  return parseInt(oxygenRating, 2) * parseInt(co2Rating, 2);
};

module.exports = {
  binaryCounter,
  binarySumConverter,
  binaryFlipper,
  rateCalculator,
  powerConsumptionCalculator,
  ratingGenerator,
  lifeSupportRatingCalculator
};

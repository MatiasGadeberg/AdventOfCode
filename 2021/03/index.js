const diganosticsModule = require("./diganostics");
const { diagnosticsReport } = require("./input");

console.log(diganosticsModule.powerConsumptionCalculator(diagnosticsReport));
console.log(diganosticsModule.lifeSupportRatingCalculator(diagnosticsReport));

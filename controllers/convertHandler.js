let inputRegex = /[a-z]+|[^a-z]+/gi;
var fromUnit = ["gal", "l", "mi", "km", "lbs", "kg"];
var toUnit = ["l", "gal", "km", "mi", "kg", "lbs"];
var fullUnit = [
  "gallons",
  "liters",
  "miles",
  "kilometers",
  "pounds",
  "kilograms",
];
function ConvertHandler() {
  this.getNum = function (input) {
    let result = input.match(inputRegex);
    if (
      result.length > 2 ||
      (result.length == 2 && !result[1].match(/[a-z]+/i))
    ) {
      return "invalid number";
    }
    if (!input.match(/\d/) && input.match(/[a-z]+/i)) {
      result = 1;
    } else {
      result = result[0];
    }
    //console.log("(inputRegex)[0] result " + result);

    if (result.toString().includes("/")) {
      let values = result.toString().split("/");
      if (values.length != 2) {
        return "invalid number";
      }
      result = parseFloat(values[0]) / parseFloat(values[1]);
    }

    if (!parseFloat(result) || isNaN(result)) {
      result = "invalid number";
    }
    return result;
  };

  this.getUnit = function (input) {
    let result = input.match(inputRegex);
    if (result.length > 2) {
      return "invalid unit";
    }
    result = result[1];
    //console.log("(inputRegex)[1] result " + result);
    if (result && fromUnit.includes(result.toLowerCase())) {
      result = result.toLowerCase();
    } else if (!result && fromUnit.includes(input.toLowerCase())) {
      result = input.toLowerCase();
    } else {
      result = "invalid unit";
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result = toUnit[fromUnit.indexOf(initUnit)];

    //console.log(result);
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = fullUnit[fromUnit.indexOf(unit)];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var factor = [galToL, 1 / galToL, miToKm, 1 / miToKm, lbsToKg, 1 / lbsToKg];

    let result = parseFloat(
      (initNum * factor[fromUnit.indexOf(initUnit)]).toFixed(5)
    );

    return result;
  };

  
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    console.log("initNum "+ initNum);
    console.log("initUnit "+ initUnit);
    
    if (initNum == "invalid number" && initUnit == "invalid unit") {
    	console.log("return invalid number and unit ");
      
      
      return "invalid number and unit";
    } else if (initNum == "invalid number") {
      return initNum;
    } else if (initUnit == "invalid unit") {
      return initUnit;
    } else {
      let result =
        initNum +
        " " +
        this.spellOutUnit(initUnit) +
        " converts to " +
        returnNum +
        " " +
        this.spellOutUnit(returnUnit);
      return result;
    }
  };
}

module.exports = ConvertHandler;

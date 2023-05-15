const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  //convertHandler should correctly read a whole number input.
  // #1
  test('whole number', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(e => {
      assert.equal(convertHandler.getNum(32 + e), 32);
    });
    done();
  });

  //convertHandler should correctly read a decimal number input.
  test('decimal number', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(e => {
      assert.equal(convertHandler.getNum(3.2 + e), 3.2);
    });
    done();
  });
  //convertHandler should correctly read a fractional input.
  test('fraction number', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(e => {
      assert.equal(convertHandler.getNum(3 / 2 + e), 1.5);
    });
    done();
  });
  //convertHandler should correctly read a fractional input with a decimal.
  test('fraction + decimal number', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(e => {
      assert.equal(convertHandler.getNum(3.2 / 2 + e), 1.6);
    });
    done();
  });
  //convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
  test(' double-fraction ', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(e => {
      assert.equal(convertHandler.getNum("3/2/3" + e), "invalid number");
    });
    done();
  });
  //convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
  test('default to a numerical input of 1', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(e => {
      assert.equal(convertHandler.getNum(e), 1);
    });
    done();
  });
  //convertHandler should correctly read each valid input unit.
  test('valid input unit', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(e => {
      assert.equal(convertHandler.getUnit(32 + e), e);
    });
    done();
  });
  //convertHandler should correctly return an error for an invalid input unit.
  test(' invalid input unit', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(e => {
      assert.equal(convertHandler.getUnit(32 + e + 's'), 'invalid unit');
    });
    done();
  });
  //convertHandler should return the correct return unit for each valid input unit.
  test('correct return unit', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(e => {
      assert.equal(convertHandler.getUnit(e.toLowerCase()), convertHandler.getUnit(convertHandler.getUnit(e)));
    });
    done();
  });
  //convertHandler should correctly return the spelled-out string unit for each valid input unit.
  test('spelled-out string unit', function(done) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    var fullUnit = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    let i = 0;
    while (i++ < input.length) {
      assert.equal(convertHandler.spellOutUnit(input[i]), fullUnit[i]);
    }
    done();
  });


  //convertHandler should correctly convert gal to L.
  test('gal to L', function(done) {
    assert.approximately(convertHandler.convert(5, 'gal'), 18.9271, 0.1);
    done();
  });
  //convertHandler should correctly convert L to gal.
  test('L to gal', function(done) {
    assert.approximately(convertHandler.convert(5, 'l'), 1.32086, 0.1);
    done();
  });
  //convertHandler should correctly convert mi to km.
  test('mi to km', function(done) {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
    done();
  });
  //convertHandler should correctly convert km to mi.
  test('km to mi', function(done) {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
    done();
  });
  //convertHandler should correctly convert lbs to kg.
  test('lbs to kg', function(done) {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
    done();
  });
  //convertHandler should correctly convert kg to lbs.
  test('kg to lbs', function(done) {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
    done();
  });
});	

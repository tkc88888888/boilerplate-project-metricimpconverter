  'use strict';

  const expect = require('chai').expect;
  const ConvertHandler = require('../controllers/convertHandler.js');

  module.exports = function(app) {
    let convertHandler = new ConvertHandler();
    app.route('/api/convert')
      .get(function(req, res) {
        var input = req.query.input;
        console.log("input "+input );
        var initNum = convertHandler.getNum(input);
        //console.log("initNum "+initNum );
        var initUnit = convertHandler.getUnit(input);
        //console.log("initUnit "+initUnit );
        var returnNum = convertHandler.convert(initNum, initUnit);
        //console.log("returnNum "+returnNum );
        var returnUnit = convertHandler.getReturnUnit(initUnit);
        //console.log("returnUnit "+returnUnit );
        var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        console.log("toString "+toString );

        let responseObject = {};
        responseObject['initNum'] = initNum;
        responseObject['initUnit'] = initUnit == 'l' ? 'L' : initUnit;
        responseObject['returnNum'] = returnNum;
        responseObject['returnUnit'] = returnUnit == 'l' ? 'L' : returnUnit;
        responseObject['string'] = toString;
        responseObject['string'].startsWith("invalid") ? res.send(responseObject['string']) : res.json(responseObject);
      });
  };

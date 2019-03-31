var mongoose =require("mongoose");
var citiesModel = require("../models/cityModel");

module.exports = {
    searchCity: searchCity
  };

function searchCity(req, res) {
    if(citiesModel){
        const cities = citiesModel.findOne({}, (err, result)=>{
            if(err){
                throw new Error(err);
            }
            res.send(JSON.stringify(result));
            return next();
        });
    } else {
        res.sendStatus(500);
        return next();    
    }
}
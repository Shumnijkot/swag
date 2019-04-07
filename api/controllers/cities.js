var mongoose =require("mongoose");
var citiesModel = require("../models/cityModel");

module.exports = {
    searchCity: searchCity,
    searchCityById,
    putCity
  };

function searchCity(req, res) {
    if(citiesModel){
        const cities = citiesModel.findOne({}, (err, result)=>{
            if(err){
                throw new Error(err);
            }
            res.send(JSON.stringify(result));
        });
    } else {
        res.sendStatus(500);
    }
}

function searchCityById(req, res) {
    const id  = req.swagger.params.cityId.value;
    const castedId = mongoose.Types.ObjectId(id);

    if(!id){
        res.status(404).send("Wrong id");
    }
    citiesModel.findById(castedId).then(
        result=>{
            if(!result){
                res.sendStatus(404);
            }
            res.send(JSON.stringify(result));
        }
    ).catch(err=>{
        res.send(err);
    })
}

function putCity(req, res) {
    const id  = req.swagger.params.cityId.value;
    const castedId = mongoose.Types.ObjectId(id);

    if(!id){
        res.status(404).send("Wrong id");
    }

    const {name, country, capital} = req.swagger.params;

    if(!name.valid || !country.valid || !capital.valid){
        res.sendStatus(500);
    }
    
    if(!name.valid){
        res.status(400).send("Name can not be empty");
    }

    citiesModel.findById(castedId).then(
        city=>{
            if(!city){
                res.sendStatus(404);
            }
            city.name = name.value;
            city.country = country.value;
            city.capital = capital.value;
            city.save();
            res.send(JSON.stringify(city));
        }
    ).catch(err=>{
        res.send(err);
    })
}
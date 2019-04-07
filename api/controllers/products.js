var mongoose = require("mongoose");
var productModel = require("../models/ProductModel");
var querystring = require('querystring');

module.exports = {
    searchProducts: searchProducts,
    addProduct,
    searchProduct,
    searchProductReviews,
    deleteProduct
  };

function searchProducts(req, res) {
    productModel.find({}).then(result=>{
        res.send(JSON.stringify(result));

    }).catch(err=>{
        res.status(500).send(err);
    });

}

function addProduct(req, res) {
    
    if(!req.swagger.params.Product.value){
        res.sendStatus(500);
    }

    const {name, reviews} = querystring.parse(req.swagger.params.Product.value);
    if(!name){
        res.status(400).send("Name can not be empty");
    }
    const parsedReviews = reviews ? JSON.parse(reviews) : null;
    const newProduct = new productModel({name, reviews: parsedReviews});

    newProduct.save().then(result=>{
        res.send("Ok");
        return next();
    }).catch(err=>{
        res.send(err);
    });
}

function searchProduct(req, res) {

    const id  = req.swagger.params.productId.value;
    const castedId = mongoose.Types.ObjectId(id);

    if(!id){
        res.status(404).send("Wrong id");
    }
    productModel.findById(castedId).then(
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

function deleteProduct(req, res) {

    const id  = req.swagger.params.productId.value;
    const castedId = mongoose.Types.ObjectId(id);

    if(!id){
        res.status(404).send("Wrong id");
    }
    productModel.findById(castedId).remove().then(
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

function searchProductReviews(req, res) {
    const id  = req.swagger.params.productId.value;
    const castedId = mongoose.Types.ObjectId(id);

    if(!id){
        res.status(404).send("Wrong id");
    }
    productModel.findById(castedId).then(
        result=>{
            if(!result){
                res.sendStatus(404);
            }
            res.send(JSON.stringify(result.reviews || []));
        }
    ).catch(err=>{
        res.send(err);
    });
}
// require mongoose.js
var mongoose = require('mongoose.js');

var addToCart = (userId, prod) => {
  // find user's cart object in mongoDB via userId

  // access the user's products property
  // push this product object into user's cart prop
  // iterate through user's cart's products prop and calculate the total
  // reset the cartTotal with the total price of all products
};

var removeFromCart = (userId, productId) => {
  // find the user's cart object in MongoDB via userID
  // access the user's products prop
  // init prodInd
  // iterate through products, giving access to index
    // if the given product's Id is equal to the productId we're looking for
      // set prodInd to index
  // remove the product at prodInd
  // calculate the total of all current products
  // set the cartTotal to the current total
};

modeule.exports.addToCart = addToCart;
modeule.exports.removeFromCart = removeFromCart;

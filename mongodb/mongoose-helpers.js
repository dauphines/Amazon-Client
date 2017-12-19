var mongoose = require('mongoose.js');

var addToCart = (userId, prod) => {
  var newTotal;
  // Can we push new product docs within the below function?
  Carts.findById(userId)
    .then((cartObj) => {
      // We probably need a new another .then after this first line...
      // ...since it's an async function.
      cartObj.products.push(prod);
      cartObj.produts.forEach((productObj) => {
        newTotal += productObj.price;
      });
      cartObj.cartTotal = newTotal;
      return cartObj.cartTotal;
    })
    // Do we need to change anything to make this error handling get...
    //... picked up by Kibana?
    .catch((err) => {
      throw err;
    });
};

var removeFromCart = (userId, productId) => {
  var newTotal;

  // find the user's cart object in MongoDB via userID
  Carts.findById(userId)
  // access the user's products prop
  // remove the product at prodInd
    .then((cartObj) => {
      // We probably need to add a .then after the first line.
      cartObj.products.pull(productId);

      // calculate the total of all current products
      cartObj.products.forEach((product) => {
        newTotal += product.price;
      });
      // set the cartTotal to the current total
      cartObj.cartTotal = newTotal;
      return cartObj.cartTotal;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.addToCart = addToCart;
module.exports.removeFromCart = removeFromCart;

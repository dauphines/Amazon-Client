var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyparser = require('body-parser');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/carts', {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We\'ve connected to MongoDB');
});

var productSchema = mongoose.Schema({
  productId: Number,
  productName: String,
  price: Number,
  vendorName: String,
  vendorId: Number,
  quantity: Number,
  isPrimeProduct: Boolean,
});

// Might need to handleIds as something other than Numbers
var cartSchema = mongoose.Schema({
  userId: Number,
  fullName: String,
  phone: String,
  products: [
    productSchema
  ],
  paymentId: Number,
  cartTotal: Number,
  primeTrialSignup: Boolean,
  shippingAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  billingAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  }
});

var Carts = mongoose.model('Carts', cartSchema);
var Products = mongoose.model('Products', productSchema);

var addToCart = (userId, prod) => {
  var newTotal;
  // Can we push new product docs within the below function?
  return Carts.findById(userId)
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

// write funciton to reset products and cartTotal upon purchase



module.exports.addToCart = addToCart;
module.exports.removeFromCart = removeFromCart;

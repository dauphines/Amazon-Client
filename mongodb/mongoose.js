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
  productId: String,
  productName: String,
  price: Number,
  vendorName: String,
  vendorId: Number,
  quantity: Number,
  isPrimeProduct: Boolean,
});

var cartSchema = mongoose.Schema({
  userId: String,
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

var Carts = mongoose.model('carts', cartSchema);

module.exports.addToCart = (amznUserId, product) => {
  var prod = {
    'productId': product.productId,
    'productName': product.productName,
    'price': product.price,
    'vendorName': product.vendorName,
    'quantity': product.quantity,
    'isPrimeProduct': product.isPrimeProduct,
  };
  return Carts.findOneAndUpdate({userId: amznUserId}, {$push: {products: prod}});
};

module.exports.removeFromCart = (amznUserId, thisProdId) => {
  return Carts.findOneAndUpdate({userId: amznUserId}, {$pull: {products: {productId: thisProdId}}});
};

// write funciton to reset products and cartTotal upon purchase
module.exports.clearCart = (amznUserId) => {
  return Carts.findOneAndUpdate({userId: amznUserId}, {products: []});
};

// write function to return array of products
module.exports.getCart = (amznUserId) => {
  return Carts.findOne({userId: amznUserId}, 'products');
};

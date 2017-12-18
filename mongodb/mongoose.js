var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost/cart', {useMongoClient: true});

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


module.exports.cartSchema = cartSchema;
module.exports.productSchema = productSchema;
module.exports.Products = Products;
module.exports.Carts = Carts;

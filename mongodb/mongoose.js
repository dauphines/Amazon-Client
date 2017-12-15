var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost/cart', {useMongoClient: true});

var db = mongoose.connection;

var cartSchema = mongoose.Schema({
  userId: Number,
  products: [
    {
      productId: Number,
      productName: String,
      price: Number,
      vendorName: String,
      quantity: Number,
      isPrimeProduct: Boolean,
      // To do: need to confirm with Enki and Kat about what needs to be sent to transactions
    }
  ],
  cartTotal: Number,
  primeTrialSignup: Boolean
});

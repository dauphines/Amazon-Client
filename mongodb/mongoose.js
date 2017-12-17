var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost/cart', {useMongoClient: true});

var db = mongoose.connection;


// This is currently out of date.  Need to 
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

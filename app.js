const apm = require('elastic-apm-node').start({
  appName: 'Amazon-Client-Service',
  serverUrl: 'http://localhost:3000',
});
const express = require('express');
const app = express();
// add bluebird
// add urlParser
const bodyParser = require('body-parser');
const mongo = require('./mongoose-helpers.js');

// ============= MIDDLEWARE ==============
app.use(bodyParser);
app.use(urlParser);

// ============= CLIENT APP ==============

// Home page
app.get('/', (req, res) => res.send('Hello World!'));

// Search
// To do: add search term to be dynamically put in after keywords
app.get('/s/field-keywords=', (req, res) => {

});

// View product page
// To do: add product id after the slash
app.get('/product/', (req, res) => {

});

// Add to cart
// To do: add product id
// NOTE: maybe we don't need to insert product Id
// NOTE: maybe it would be more effective to include user_id in path
app.post('/cart/add/', (req, res) => {
  // parse product object
  mongo.addToCart(req.userId, req.product);
  // find user's cart object in mongoDB via userId
    // access the user's products property
    // push this product object into user's cart prop
    // iterate through user's cart's products prop and calculate the total
    // reset the cartTotal with the total price of all products

});


// Remove from cart
// To do: add product id
// NOTE: this might be doable with a GET request, which would take less data
// NOTE: it might make sense to move products from an array over to an object
// ...to enable constant time access to each prop & simplify removal.
app.post('/cart/remove/', (req, res) => {
  // parse the productId
  // parse the userId
  // find the user's cart object in MongoDB via userID
  mongo.removeFromCart(req.userId, req.productId);
    // access the user's products prop
    // init prodInd
    // iterate through products, giving access to index
      // if the given product's Id is equal to the productId we're looking for
        // set prodInd to index
    // remove the product at prodInd
    // calculate the total of all current products
    // set the cartTotal to the current total
});


// Make purhcase
app.post('', (req, res) => {

});





// ========== INVENTORY SERVICE ==============

// Update with New Product
app.get('', (req, res) => {

});

// Update with more Quantity of Existing Product
app.get('', (req, res) => {

});


app.listen(7331, () => console.log('Amazon Client app listening on port 3000!'));

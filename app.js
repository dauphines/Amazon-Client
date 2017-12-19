const apm = require('elastic-apm-node').start({
  appName: 'Amazon-Client-Service',
  serverUrl: 'http://localhost:3000',
});
const express = require('express');
const app = express();
const Promise = require('bluebird');
// add urlParser
const bodyParser = require('body-parser');
const mongo = require('./mongoose-helpers.js');

// ============= MIDDLEWARE ==============
app.use(bodyParser);
app.use(urlParser);

// ============= LOADTESTING =============
app.user(apm.middleware.express());

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
app.put('/cart/add/', (req, res) => {
  mongo.addToCart(req.body.userId, req.body.product)
    .then(() => {
      res.send(201);
    })
    .catch(() => {
      // need to insert the correct 
      res.send(501);
    });
  req.body.product.productName === 'teapot' ? res.send(418) : null;
});


// Remove from cart
app.put('/cart/remove/', (req, res) => {
  mongo.removeFromCart(req.userId, req.productId)
    .then(() => {
      res.send(201);
    })
    .catch(() => {
      res.send(501);
    });
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

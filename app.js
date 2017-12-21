// const apm = require('elastic-apm-node').start({
//   appName: 'amazon-client',
//   serverUrl: 'http://localhost:7331',
// });
const express = require('express');
const Promise = require('bluebird');
// add urlParser
const axios = require('axios');
const bodyParser = require('body-parser');
const mongo = require('./mongodb/mongoose.js');
const redisServer = require('./redis/redis-server.js');
const esClient = require('./es/elastic-search.js');
const redisClient = require('./redis/redis-client.js');

const app = express();

// ============= MIDDLEWARE ==============
app.use(bodyParser.json());

// ============= CLIENT APP ==============

// Home page
app.get('/', (req, res) => res.send('Hello World!'));

// Redirected to home with userId to get cart products
app.get('/home/:userId', (req, res) => {
  var userId = req.params.userId;
});

// Search
// To do: add search term to be dynamically put in after keywords
app.get('/s/field-keywords=:search', (req, res) => {
  var s = req.params.search;
});

// View product page
// To do: add product id after the slash
app.get('/product/:productId', (req, res) => {
  var productId = req.params.productId;
  // check to see if a product with given productId exists in cache
    // if so, send client product details
    // if not, fetch product details from inventory
      // then send client product details
});

// Add to cart
app.put('/cart/add', (req, res) => {
  mongo.addToCart(req.body.userId, req.body.product)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(501);
    });
  req.body.product.productName === 'teapot' ? res.send(418) : null;
});


// Remove from cart
app.put('/cart/remove', (req, res) => {
  mongo.removeFromCart(req.body.userId, req.body.productId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(501);
    });
});


// Make purhcase
app.post('/buy/purchase', (req, res) => {
  mongo.getCart(req.userId)
    .then((cart) => {
      var transCart = cart;
      cartTotal;
      cart.products.forEach((product) => cartTotal += product.price);
      transCart.cartTotal = cartTotal;
      return axios();
    })
    // upon response, tell client if there was success or failure
    .then((transRes) =>{
      transRes === 'good' ? res.sendStatus(201) : res.sendStatus(501);
    });
});

// Subscribe
app.post('/account/prime/subscribe', (req, res) => {
  axios(/*Fill in with POST to transactions*/)
    .then((transRes) => {
      transRes === 'good' ? res.sendStatus(201) : res.sendStatus(501);
    });
});

// Unsubscribe
app.post('/account/prime/Unsubscribe', (req, res) => {
  axios(/*Fill in with POST to transactions*/)
    .then((transRes) => {
      transRes === 'good' ? res.sendStatus(201) : res.sendStatus(501);
    });
});

// ========== INVENTORY SERVICE ==============

// Update with New Product
app.get('/inv/new-product', (req, res) => {
  // insert a new product object into the ES database
    // if success, respond with success
    // if failure, respond with failure
});

// Update with more Quantity of Existing Product
app.get('/inv/update-quantity', (req, res) => {
  // check to see if an item exists in the Redis cache
    // if it does, update its quantity with the new Q
    // respond to inventory with success or failure
  // if it does not find product, tell the inventory service
  // ...that we did not update cache
});

// ============= LOADTESTING =============
// app.use(apm.middleware.express());

app.listen(7331, () => console.log('Amazon Client app listening on port 3000!'));

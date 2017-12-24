// const apm = require('elastic-apm-node').start({
//   appName: 'amazon-client',
//   serverUrl: 'http://localhost:7331',
// });
const express = require('express');
const Promise = require('bluebird');
const axios = require('axios');
const bodyParser = require('body-parser');
const mongo = require('./mongodb/mongoose.js');
const redisServer = require('./redis/redis-server.js');
const esClient = require('./es/esClient.js');
// const redisClient = require('./redis/redis-client.js');

const app = express();

// ============= MIDDLEWARE ==============
app.use(bodyParser.json());

// ============= CLIENT APP ==============

// Home page
app.get('/', (req, res) => res.send('Hello World!'));

// Redirected to home with userId to get cart products
app.get('/home/:userId', (req, res) => {
  var userId = req.params.userId;
  mongo.getCart(userId)
    .then((cart) => {
      res.send(cart);
    })
    .catch(() => {
      res.sendStatus(501);
    });
});

// Search
app.get('/s/field-keywords=:search', (req, res) => {
  var s = req.params.search;
  
  esClient.queryResults(s)
    .then((searchResults) => {
      res.send(searchResults.hits.hits);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(501);
    });
});

// View product page
app.get('/product/:productId', (req, res) => {
  var productId = req.params.productId;
  redisClient.getProduct(productId)
    .then((redisRes) => {
      if (redisRes !== undefined) {
        res.send(redisRes);
      } else {
        axios({
          method: 'get',
          url: '/inv/:itemId',
          baseURL: '', // needs to be updated to Inventory location
        })
          .then((invRes) => {
            var prodObj = redisClient.parseProduct(invRes);
            res.send(prodObj);
            redisClient.storeProduct(prodObj);
          });
      }
    });
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
  axios({
    method: 'post',
    url: '/processTrans',
    baseURL: '', // needs to be updated to Transactions' location
    data: {
      cart: req.body.cart,
    }
  })
    .then((transRes) =>{
      transRes === 'good' ? res.sendStatus(201) && mongo.clearCart(req.userId) : res.sendStatus(501);
    });
});

// Subscribe
app.post('/account/prime/subscribe', (req, res) => {
  axios({
    method: 'post',
    url: '/subscribe',
    baseURL: '', // needs to be updated to Transactions' location
    data: {
      userId: req.body.userId,
    }
  })
    .then((transRes) => {
      transRes === 'good' ? res.sendStatus(201) : res.sendStatus(501);
    });
});

// Unsubscribe
app.post('/account/prime/Unsubscribe', (req, res) => {
  axios({
    method: 'post',
    url: '/Unsubscribe',
    baseURL: '', // needs to be updated to Transactions' location
    data: {
      userId: req.body.userId,
    }
  })
    .then((transRes) => {
      transRes === 'good' ? res.sendStatus(201) : res.sendStatus(501);
    });
});

// ========== INVENTORY SERVICE ==============

// Update with New Product
app.post('/inv/new-product', (req, res) => {
  esClient.addProduct(req.body.product)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(501);
    });
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

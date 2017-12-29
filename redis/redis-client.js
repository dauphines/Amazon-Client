var redis = require('redis');
var rejson = require('redis-rejson');
var Promise = require('bluebird');
rejson(redis);

var client = redis.createClient(6378);
 
client.on('error', function (err) {
  console.log('Error ' + err);
});

// ====== HELPER FOR PARSING INV RES INTO PRODUCT JS OBJECTS ========

module.exports.parseProduct = (req) => {
  var prodObj = {};
  var pd = req.body.prodDetailsQA[0];
  var pr = req.body.reviews[0];

  // Arrays
  prodObj.qa = req.body.prodDetailsQA;
  prodObj.reviews = req.body.reviews;

  // Values
  prodObj.productId = pd.productid;
  prodObj.productName = pd.productname;
  prodObj.isPrimeProduct = pd.prime;
  prodObj.price = pd.productprice;
  prodObj.vendorName = pd.soldby;
  prodObj.quantity = pr.amount;
  prodObj.fufilledBy = pd.fufilledby;
  prodObj.description = pd.productdes;
  prodObj.inStock = pd.instock;
  prodObj.categoryName = pr.name;

  return prodObj;
};

// =========== HELPERS FOR INSERTING INTO REDIS  ==================

module.exports.storeProduct = (prodObj) =>{
  client.json_set(prodObj.productId, '.', JSON.stringify(prodObj));
};

module.exports.getProduct = (productId) => {
  return new Promise( (resolve, reject) => {
    client.json_get(productId, (err, obj) => {
      if (err) {
        reject(err);
      }
      return resolve(JSON.parse(obj));
    });
  });
};

module.exports.updateQuantity = (prodId, quantity) => {
  return new Promise( (resolve, reject) => {
    module.exports.getProduct(prodId)
      .then((prod) => {
        if (prod === null) {
          resolve('not found');
        }
        var updatedProduct = prod;
        updatedProduct.quantity = quantity;
        module.exports.storeProduct(updatedProduct);
        resolve('stored');
      })
      .catch((err) => {
        reject(err);
      });
  });
};

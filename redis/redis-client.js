var redis = require('redis');
var rejson = require('redis-rejson');
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
  console.log('The object at', productId, ':', client.json_get(productId));
  return client.json_get(productId);
};

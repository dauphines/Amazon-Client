var redis = require('redis');
var client = redis.createClient();
 
// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 
 
client.on('error', function (err) {
  console.log('Error ' + err);
});

// ============ HELPER FOR RETRIEVING FROM REDIS  ================

module.exports.getProduct = (productId) => {
  // look for productObject in Redis
  // if it's in Redis, return it
  // if it isn't, return undefined;
};

// ====== HELPER TO PARSE INV RES INTO PRODUCT JS OBJECTS =========

module.exports.parseProduct = (req) => {
  var prodObj = {};
  var pd = req.body.prodDetailsQA[0];
  var pr = req.body.reviews[0];

  prodObj.qa = req.body.prodDetailsQA;
  prodObj.reviews = req.body.reviews;

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

  prodObj.reviews = req.body.reviews;
  prodObj.req.body.prodDetailsQA;

  return prodObj;
};

// =========== HELPERS FOR INSERTING INTO REDIS  ==================

// parse reviews into hash
var getReviewHash = (Obj) => {

};

// parse qa into hash
var getQAHash = (Obj) => {

};

module.exports.storeProduct = (prodObj) =>{

};

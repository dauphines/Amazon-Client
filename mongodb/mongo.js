var mongoClient = require('mongodb').MongoClient;
var Promise = require('bluebird');

var url = 'mongodb://localhost:27017/carts';

mongoClient.connect(url, function(err, db) {
  if (err) {
    console.error(err);
  }
  console.log('Connected to MongoDB!');
  // Adds products to cart.  Does *not* update cartTotal
});

module.exports.addToCart = (userId, prod) => {

  db.carts.UpdateOne({'userId': {$eq: userId}},
    {$push: {
      products: prod
    }}
  )
    .catch((err) => {
      throw err;
    });
};

var removeFromCart = () => {

};

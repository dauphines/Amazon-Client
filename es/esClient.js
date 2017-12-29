var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const INDEX = 'products';
const TYPE = 'productSearchResult';

// Switch to add products to search:
const addProduct = product => (
  new Promise((resolve, reject) => {
    client.create({
      index: INDEX,
      type: 'products',
      body: product,
    }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  })
);

// Bulk insert list of products form JSON file
const batchInsertProducts = (products) => {
  const body = [];
  const action = {
    index: {
      _index: INDEX,
      _type: TYPE,
    },
  };

  // Add products to body
  products.forEach(product => body.push(action, product));

  return new Promise((resolve, reject) => {
    client.bulk({ body }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

// Search for products
const queryResults = q => (
  new Promise((resolve, reject) => {
    client.search({
      index: INDEX,
      body: {
        query: {
          match: {
            productName: q
          }
        },
      }
    }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  })
);


module.exports = {
  addProduct,
  batchInsertProducts,
  queryResults,
};

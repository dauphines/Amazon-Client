var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const INDEX = 'products';
const TYPE = 'productSearchResult';


/*
Switch to add products to search:
const addVideoEntry = video => (
  new Promise((resolve, reject) => {
    client.create({
      index: INDEX,
      type: 'products',
      body: video,
    }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  })
);
*/

const batchInsertProducts = (products) => {
  const body = [];
  const action = {
    index: {
      _index: INDEX,
      _type: TYPE,
    },
  };

  // add videos to body
  products.forEach(video => body.push(action, video));

  return new Promise((resolve, reject) => {
    client.bulk({ body }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

/*
const queryResults = q => (
  new Promise((resolve, reject) => {
    client.search({ q, index: INDEX }, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  })
);
*/

module.exports = {
  // addVideoEntry,
  batchInsertProducts,
  // queryResults,
};
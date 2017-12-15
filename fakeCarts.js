var faker = require('faker');
var fs = require('fs');

var prodObj = function() {
  var obj = {
    productId: faker.random.uuid(),
    productName: faker.commerce.productName(),
    price: faker.finance.amount(),
    vendorName: faker.company.companyName(),
    quantity: Math.floor(Math.random() * 2) + 1,
    isPrimeProduct: faker.random.boolean(),
  };
  return obj;
};

var getProducts = () => {
  var output = [];
  for (var i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
    output.push(prodObj());
  }
  return output;
};

var cartObj = function () {
  var obj = {
    userId: faker.random.uuid(),
    products: getProducts(),
    cartTotal: faker.finance.amount(),
    primeTrialSignup: faker.random.boolean(),
  };
  return obj;
};

var getTenMillion = () => {
  var output = [];
  for (var i = 0; i < 100000000; i++) {
    output.push(cartObj());
  }
  return output;
};

fs.writeFileSync('fakeCarts.JSON', JSON.stringify(getTenMillion()));

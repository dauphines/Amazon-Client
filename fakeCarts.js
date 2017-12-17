var faker = require('faker');
var jsonfile = require('jsonfile');
var fs = require('fs');

var getProdObj = () => {
  var obj = {
    productId: faker.random.uuid(),
    productName: faker.commerce.productName(),
    price: faker.finance.amount(),
    vendorName: faker.company.companyName(),
    vendorId: faker.random.uuid(),
    quantity: 1,
    isPrimeProduct: faker.random.boolean(),
  };
  return [obj];
};

// var getProducts = () => {
//   var output = [];
//   for (var i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
//     output.push(getProdObj());
//   }
//   return output;
// };

var cartObj = () => {
  var obj = {
    userId: faker.random.uuid(),
    fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    products: getProdObj(),
    paymentId: faker.random.uuid(),
    cartTotal: faker.finance.amount(),
    primeTrialSignup: faker.random.boolean(),
    shippingAddress: {
      addressLine1: faker.address.streetAddress() + ' ' + faker.address.streetName(),
      addressLine2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      country: faker.address.country(),
    },
  };
  return JSON.stringify(obj);
};

var stream = fs.createWriteStream("./fakeCartsStream4.json", {'flags': 'a', 'encoding': null, 'mode': 0666});
console.log('\x1b[0m' + 'start');
stream.once('open', (fd) => {
    for (var i = 0; i < 2500000; i++) {
      stream.write(cartObj() + '\n');
      if (i % 100000 === 0) {
        console.log(i);
      }
    }
    // Important to close the stream when you're ready
    stream.end();
    console.log('done');
});

// var getCarts = () => {
//   for (var i = 0; i < 2500000; i++) {
//     i % 10000 === 0 ? console.log('iteration:', i) : null;
//     jsonfile.writeFileSync('fakeCarts.json', cartObj(), {flag: 'a'});
//   }
// };

// getCarts();

// fs.createWriteStream
// 

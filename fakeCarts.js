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
    // Billing address was added after files were generated...
    // ...but should be included in future runs of this file.
    billingAddress: {
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
    stream.end();
    console.log('done');
});

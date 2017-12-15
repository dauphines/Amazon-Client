const express = require('express');
const app = express();

// Home page
app.get('/', (req, res) => res.send('Hello World!'));

// Search
// To do: add search term to be dynamically put in after keywords
app.get('/s/field-keywords=', (req, res) => {

});

// View product page
// To do: add product id after the slash
app.get('/product/', (req, res) => {

});

app.listen(7331, () => console.log('Amazon Client app listening on port 3000!'));
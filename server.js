const express = require('express');
const app = express();

let port = 8080;
console.log('port', port);

app.get('/', (req, res) => {
    res.end('<h1>Welcome to Exoress Application</h1>');
});

app.get('/customers/Api', (req, res) =>{
    res.send("<h1>Welcome to Customer API</h1>");
});

app.listen(port, () => {
    console.log('Server is Ready!');
});


console.log('Hello from server.js');
const express = require('express');

const app = express();

 const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

// const data = module.require('./server/modules/data.js')

// let mathObj = {
//     firstNum: '',
//     secondNum: '',
//     operator: '',
// }

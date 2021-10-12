console.log('Hello from server.js');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

let data = require('./modules/data');

const send = require('send');

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

app.delete('/deleteData', (req, res) => {
    console.log('inside app.get deleteData');
    data = [];
    res.send(data);
})

app.get('/calculate', (req, res) => {
    res.send(data);
})

app.post('/calculate', (req, res) => {
    console.log('inside server side calculate POST');
    // answer is where we store our answer...
    let answer = 0;
    // let problem = data sent from client
    let problem = req.body;
    console.log('this is req.body', req.body);
    
    switch(problem.operator){
        case '+': 
            problem.answer = Number(problem.firstNumber) + Number(problem.secondNumber);
        break;

        case '-': 
            problem.answer = problem.firstNumber - problem.secondNumber;
        break;

        case '*':
            problem.answer = problem.firstNumber * problem.secondNumber;
        break;

        case '/':
            problem.answer = problem.firstNumber / problem.secondNumber;
        break;
        
    }
    console.log('this is the answer', problem.answer);
    

    // push the problem into data (storage)
    data.push(problem);
    console.log('this is our data array', data);


    res.sendStatus(201);
})

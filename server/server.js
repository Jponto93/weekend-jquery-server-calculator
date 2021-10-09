console.log('Hello from server.js');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const data = require('./modules/data')

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.use(express.static('../server/public/'));

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

app.get('/calculate', (req, res) => {
    res.send(data);
})

app.post('/calculate', (req, res) => {
    console.log('inside server side calculate POST');
    // answer is where we store our answer...
    let answer = 0;
    // let problem = data sent from client
    let problem = req.body;
    console.log(req.body);
    
    switch(problem.operator){
        case '+': 
            answer = Number(problem.firstNumber) + Number(problem.secondNumber);
        break;

        case '-': 
            answer = Number(problem.firstNumber) - Number(problem.secondNumber);
        break;

        case '*':
            answer = Number(problem.firstNumber) * Number(problem.secondNumber);
        break;

        case '/':
            answer = Number(problem.firstNumber) / Number(problem.secondNumber);
        break;
        
    }
    console.log(answer);
    

    // push the problem into data (storage)
    data.push(problem);
    console.log('this is our data array', data);


    res.sendStatus(201);
})


console.log('hello from client js');

$(ready);

function ready() {
    console.log('JQ Ready');
    // $('.opBtn').on('click', addMathOperator)
    $('#submitBtn').on('click', submitCalculation)
    $('#clearBtn').on('click', clearInputs)
    $('#answerDisplay').on('click', '#clearHistoryBtn', clearHistory)
    $('.numBtn').on('click', numberClicker)
} // ready

let liveNumTracker = '';
let operator = '';
let opData = 0;
let firstNumber = 0;
let secondNumber = 0;


function numberClicker () {
    console.log('inside number clicker');
    console.log($(this).html());
    liveNumTracker += $(this).html();
    console.log(liveNumTracker);
    
    
} // numberClicker

function clearInputs() {
    console.log('in clearInputs');
    $('#firstNumber').val('');
    $('#secondNumber').val('');
    operator = '';
} // end clearInputs

function clearHistory () {
    console.log('inside clearHistory');
    let el = $('#history');
    el.empty();
    clearData();

    
} // clearHistory

function addMathOperator() {
    console.log('inside addMathOperator');
    //log the operator clicked
    console.log('this.html', $(this).html());
    //assign current live number to firstNumber
    firstNumber = Number(liveNumTracker);
    liveNumTracker = '';
    console.log('firstNumber', firstNumber);
    console.log('liveNumTracker', liveNumTracker);
    
    
    // save operator
    return operator = $(this).html()

}// addMathOperator

function submitCalculation() {
    console.log('inside submitCalculation');
    // assign current live number to second number
    secondNumber = Number(liveNumTracker);
    liveNumTracker = 0;
    console.log(`First number: ${firstNumber}, op is ${operator}, Second number: ${secondNumber}`);
    if (firstNumber && secondNumber && operator) {
        $.ajax({
            method: 'POST',
            url: '/calculate',
            data: {
                firstNumber: firstNumber,
                secondNumber: secondNumber,
                operator: operator,
            }
        }).then(function (response) {
            console.log('successful POST', response)
            getCalculations();
            //clear number inputs
            clearInputs();
        }).catch(function (response) {
            alert('POST Failed')
        })
    } else {
        alert('Missing input')
    }
}

function getCalculations() {
    console.log('inside get calculations');

    $.ajax({
        method: 'GET',
        url: '/calculate',
    }).then(function (response) {
        console.log('success', response);
        let answer = response[response.length - 1].answer;
        console.log(answer);
        renderAnswerToDom(answer);
        renderHistoryToDom(response);
        // renderToDom(response);

    }).catch(function () {
        alert('Get failed getCalculation')
    });
}

function renderAnswerToDom(number) {
    console.log('inside renderAnswerToDom');

    $('#answerDisplay').empty();
    $('#answerDisplay').append(`
    <h2 id="answer">
        ${number}
    </h2>
    <button id="clearHistoryBtn">Clear History</button>
    `);
} // end renderToDom

function renderHistoryToDom(answers) {
    console.log('inside renderHistoryToDom');
    let el = $('#history');
    el.empty();
    for (let answer of answers) {
        el.append(`
        <ul>
            <li>${answer.firstNumber} ${answer.operator} ${answer.secondNumber} = ${answer.answer}</li>
        </ul>
        `)
    } // end for
} // renderHistoryToDom

function clearData () {
    console.log('in clearData');
    $.ajax({
        method: 'DELETE',
        url: 'deleteData',
    }).then(function (response) {
        console.log('success', response);

        
    }).catch(function() {
        alert('failed GET clearData')
    })
    
} // end clearData




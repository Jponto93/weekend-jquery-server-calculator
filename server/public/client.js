console.log('hello from client js');

$(ready);

function ready() {
    console.log('JQ Ready');
    $('.opBtn').on('click', addMathOperator)
    $('#submitBtn').on('click', submitCalculation)
    $('#clearBtn').on('click', clearInputs)
    $('#answerDisplay').on('click', '#clearHistoryBtn', clearHistory)
} // ready

let operator = '';
let opData = 0;

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
    //assign operator clicked to operator variable
    // opData = $(this).data();
    // console.log(opData);

    return operator = $(this).html()

}// addMathOperator

function submitCalculation() {
    console.log('inside submitCalculation');
    let num1 = $('#firstNumber').val();
    let num2 = $('#secondNumber').val();
    console.log(`First number: ${num1}, op is ${operator}, Second number: ${num2}`);
    if (num1 && num2 && operator) {
        $.ajax({
            method: 'POST',
            url: '/calculate',
            data: {
                firstNumber: $('#firstNumber').val(),
                secondNumber: $('#secondNumber').val(),
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
        method: 'GET',
        url: 'clearData',
    }).then(function (response) {
        console.log('success', response);

        
    }).catch(function() {
        alert('failed GET clearData')
    })
    
} // end clearData




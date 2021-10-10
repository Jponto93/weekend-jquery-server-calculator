console.log('hello from client js');

$(ready);

function ready () {
    console.log('JQ Ready');
    $('.opBtn').on('click', addMathOperator)
    $('#submitBtn').on('click', submitCalculation)
} // ready

let operator = '';
let opData = 0;


function addMathOperator () {
    console.log('inside addMathOperator');
    //log the operator clicked
    console.log('this.html', $(this).html());
    //assign operator clicked to operator variable
    // opData = $(this).data();
    // console.log(opData);
    
    return operator = $(this).html()
    
}// addMathOperator



function submitCalculation () {
    console.log('inside submitCalculation');
    let num1 = $('#firstNumber').val();
    let num2 = $('#secondNumber').val();
    console.log(`First number: ${num1}, op is ${operator}, Second number: ${num2}`);

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
    }).catch(function (response) {
        alert ('POST Failed')
    })
}




function getCalculations () {
    console.log('inside get calculations');
    
    $.ajax({
        method: 'GET',
        url: '/calculate',
    }).then(function (response) {
        console.log('success', response);
        let answer = response[response.length-1].answer;
        console.log(answer);
        renderAnswerToDom(answer);
        // renderToDom(response);

    }).catch(function () {
        alert('Get failed getCalculation')
    });
}

function renderAnswerToDom(number){
    $('#answer').empty();
    $('#answer').append(
    `
    ${number}
    `);
} // end renderToDom



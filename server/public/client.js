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
    opData = $(this).data();
    console.log(opData);
    
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
            firstNumber: num1,
            secondNumber: num2,
            operator: operator,
        }
    }).then(function (response){
        console.log('Successful POST', response)

    }).catch(function (response){
        alert('POST FAILED', response)
    })
}; // end submitCalculation


function getCalculations () {
    $.ajax({
        method: 'GET',
        url: '/calculate',
    }).then(function (response) {
        console.log('success', response);

    }).catch(function () {
        alert('Get failed getCalculation')
    });
}



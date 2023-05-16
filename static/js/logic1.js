const ANSWER_PATTERN = /^[0-9]{1,5}$/;
const CORRECT_COLOR = 'rgb(81, 255, 81)';
const INCORRECT_COLOR = '#ff9999';

// Setting variables.
var numberOfQuestions = 0;
var selectedOperation;
var maxNumberOption = 9;
var minNumberOption = 0;

// Lists with problems and answers.
var problemList = [];
var answerList = [];

// Extra variables need while running.
var currentTime = 0;
var timer;
var problemIndex = 0;
var correctCount = 0;

// form submit for setting up variables and starting game.
$("form#settingSection").submit(function (e) {
    e.preventDefault();
    // Setup setting variables
    numberOfQuestions = Number($('#totalQuestionSetting').val());
    selectedOperation = $('#operationSetting').val();
    maxNumberOption = Number($('#maxNumberSetting').val());
    minNumberOption = Number($('#minNumberSetting').val());
    // Range error check.
    if (maxNumberOption < minNumberOption) {
        $('.error').show();
        return;
    }
    else
        $('.error').hide();

    // Setup answers and problems
    problemList = generateProblems(numberOfQuestions, selectedOperation);

    // Edit some display elements.
    $('#totalDisplay').text(numberOfQuestions);
    $('#operationDisplay').text(selectedOperation);
    $('#num1').text(problemList[problemIndex][0]);
    $('#num2').text(problemList[problemIndex][1]);

    // Add game timer.
    timer = setInterval(function () { currentTime++; $('.timeDisplay').text(currentTime); }, 1000);

    // Toogle display of screen sections to start game.
    $('#settingSection').hide();
    $('#problemSection').show();
});

// form submit for displaying next problem in game.
$("form#problemSection").submit(function (e) {
    e.preventDefault();
    answer = parseInt($('#displayTextBox').val());

    // Check formating of answer.
    if (ANSWER_PATTERN.test(answer)) {
        $('.error').hide();

        // Answer checking.
        answerList.push(Number(answer));
        if (answerList[problemIndex] == problemList[problemIndex][2]) {
            correctCount++;
            $('#hitOrMissDisplay').text("Correct");
            $('#hitOrMissDisplay').css({ "color": CORRECT_COLOR });
        }
        else {
            $('#hitOrMissDisplay').text("Miss");
            $('#hitOrMissDisplay').css({ "color": INCORRECT_COLOR });
        }

        $('#displayTextBox').val('');
        problemIndex += 1;
        // Update screen or end game.
        if (problemIndex < numberOfQuestions) {
            $('#num1').text(problemList[problemIndex][0]);
            $('#num2').text(problemList[problemIndex][1]);
            $('#displayIndex').text(problemIndex + 1);
        }
        else {
            $('#problemSection').hide();
            clearInterval(timer);
            $('#resultCorrect').text(correctCount);
            $('#resultMiss').text(numberOfQuestions - correctCount);
            $('#resultOperation').text(selectedOperation);
            $('#resultTotal').text(numberOfQuestions);
            $('#resultRange').text(minNumberOption + "-" + maxNumberOption);
            DisplayMathProblems($('#problemsDisplay'), problemList, answerList);
            $('#resultSection').show();
        }
    }
    else {
        $('.error').show();
    }
});

// Form submit for replaying game.
$("form#resultSection").submit(function (e) {
    console.log("test")
    e.preventDefault();
    // Reseting variables.
    answerList = [];
    problemIndex = 0;
    currentTime = 0;
    correctCount = 0;
    // Need to update displays in game.
    $('#hitOrMissDisplay').text("");
    $('#displayIndex').text(0);
    $('.timeDisplay').text(0);
    $('#problemsDisplay').empty();
    $('#resultSection').hide();
    $('#settingSection').show();
});

// Generate a list with each element having two random numbers and an answer given an opertion.
function generateProblems(length, operation) {
    var answers = [];
    var optionLength = maxNumberOption - minNumberOption + 1;
    for (i = 0; i < length; i++) {
        var one = Math.floor(Math.random() * optionLength) + minNumberOption;
        var two = Math.floor(Math.random() * optionLength) + minNumberOption;
        var answer = GetOperationAnswer(one, two, operation);
        answers[i] = [one, two, answer];
    }
    return answers;
}

// Return answer of passed in operation applied to two passed in numbers.
function GetOperationAnswer(one, two, operation) {
    switch (operation) {
        case "+":
            return one + two;
        case "-":
            return one - two;
            break;
        case "*":
            return one * two;
            break;
        case "/":
            return Math.round(one / 2 * 100) / 100;
        default:
            0;
    }
}

// Add display of math problems to an element.
function DisplayMathProblems(element, problemArr, answerArr) {
    var row = $('<div class="row"></div>')

    for(var i = 0; i < numberOfQuestions;i++){
        var col = $('<div class="col-sm-3 col-4"></div>');
        var color = INCORRECT_COLOR;
            if (problemArr[i][2] == answerArr[i])
                color = CORRECT_COLOR;
                col.append('<p style="color:' + color + '"><b>' + problemArr[i][0] + selectedOperation + problemArr[i][1] + '=' + answerArr[i] + '<br>Answer: ' + problemArr[i][2] + '</b></p>');
        row.append(col);
    }
    element.append(row);
}
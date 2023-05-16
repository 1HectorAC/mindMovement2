const ANSWER_PATTERN = /^[a-z]{1,102}$/;
const CORRECT_COLOR = 'rgb(81, 255, 81)';
const INCORRECT_COLOR = '#ff9999';

// Setting Variables.
var lives = 3;
var timeSetting = 1;
var round = 1;

var startTime = 2;
var timeIncreaseRate = 1;
var timer;
var currentTime = 0;

var stringProblem = "";
var stringAnswer = "";

// form submit for setting variables and starting game.
$('form#settingSection').submit(function (e) {
    e.preventDefault();
    // Setup setting variables.
    lives = Number($('#settingLives').val());
    timeSetting = Number($('#settingTime').val());
    round = Number($('#settingRound').val());
    switch (timeSetting) {
        case (1):
            startTime = 2;
            timeIncreaseRate = 1;
            break;
        case (2):
            startTime = 2;
            timeIncreaseRate = .5;
            break;
        case (3):
            startTime = 3;
            timeIncreaseRate = 0;
            break;
        default:
            startTime = 1;
            timeIncreaseRate = 0;
            break;
    }

    // Edit some display for game.
    $('#gameLives').text(lives);
    $('.gameRound').text(round);
    $('#resultLives').text(lives);
    $('#resultSpeed').text($('#settingTime option:selected').text());
    $('#resultStartRound').text(round);

    // Toogle display of setting part off and start game.
    $('#settingSection').hide();
    TempStringDisplaySetup();
});

// Form Submit for getting a result for a problem.
$('form#gameSection').submit(function (e) {
    e.preventDefault();
    stringAnswer = $('#problemResponse').val();
    $('#problemResponse').val("");

    // Check if anwer is correct.
    if (stringAnswer == stringProblem) {
        $('#correctnessDisplay').text("Correct!");
        $('#correctnessDisplay').css({ "color": CORRECT_COLOR });

        $('#answerStringDisplay1').text(stringAnswer);
        $('#answerStringDisplay2').text("");

        round++;
        $('.gameRound').text(round);
    }
    else {
        $('#correctnessDisplay').text("Incorrect");
        $('#correctnessDisplay').css({ "color": INCORRECT_COLOR});

        if (stringAnswer.length < stringProblem.length)
            stringAnswer += "_".repeat(stringProblem.length - stringAnswer.length);
        indexPoint = DifferenceIndex(stringAnswer, stringProblem);
        var correctSection = stringAnswer.substring(0, indexPoint);
        var wrongSection = stringAnswer.substring(indexPoint, stringAnswer.length);
        $('#answerStringDisplay1').text(correctSection);
        $('#answerStringDisplay2').text(wrongSection);
        lives--;
        $('#gameLives').text(lives);
    }
    // Toggle display of answer part off and show result of current problem.
    $('#gameResponseDisplay').hide();
    $('#gameResultDisplay').show();
});

// After looking at problem result button, will either show another problem or end game depending on lives.
$('#gameResultBtn').click(function () {
    $('#gameResultDisplay').hide();
    if (lives <= 0 || round >= 100) {
        $('#gameSection').hide();
        $('#resultRound').text(round);
        $('#resultSection').show();
    }
    else {
        $('#gameProblemDisplay').show();
        TempStringDisplaySetup();
    }
});

// form submit for replaying.
$('form#resultSection').submit(function (e) {
    e.preventDefault();
    $('#resultSection').hide();
    $('#gameProblemDisplay').show();
    $('#settingSection').show();
});

// Setup display of timer section at the start of a problem in game.
function TempStringDisplaySetup() {
    stringProblem = generate_random_string(round + 2);
    $('.problemStringDisplay').text(stringProblem);
    $('#countDownDisplay').text(startTime + Math.ceil(round * timeIncreaseRate));
    $('#gameSection').show();
    currentTime = startTime + Math.ceil(round * timeIncreaseRate);
    timer = setInterval(TimerTick, 1000);
}

// Increment currentTime, change its display, and check if timer ends.
function TimerTick() {
    currentTime--;
    // End of game check.
    if (currentTime == 0) {
        clearInterval(timer);
        $('#gameProblemDisplay').hide();
        $('#gameResponseDisplay').show();
    }
    $('#countDownDisplay').text(currentTime);
}

// Generate a string with random characters of string_length.
function generate_random_string(string_length) {
    let random_string = '';
    let random_ascii;
    // cap: 65-90
    // lower:97-122
    let ascii_low = 97;
    let ascii_high = 122;
    for (let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        random_string += String.fromCharCode(random_ascii);
    }
    return random_string
}

// Compare two strings and return the index point at which they match up the the length of the shortest lenght.
function DifferenceIndex(s1, s2) {
    var index = 0;
    var shortestLength = (s1.length < s2.length) ? s1.length : s2.length;
    for (i = 0; i < shortestLength; i++) {
        if (s1[i] == s2[i])
            index++;
        else
            return index;
    }
    return index;
}

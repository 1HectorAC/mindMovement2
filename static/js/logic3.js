const COLOR_OPTIONS = ["red", "blue", "green", "yellow","HotPink","SlateBlue"];
const CORRECT_COLOR = 'rgb(81, 255, 81)';
const INCORRECT_COLOR = '#ff9999';
const BASE_TEXT_COLOR = 'white';
const EMPTY_COLOR = 'black';
// Setting Variables.
var lives = 3;
var gameTime = 30;
var numberOfColors = 4;

var correctCount = 0;
var colors = ['red','blue','green','yellow'];
var currentProblem = 0;
var startCheck = false;
var timer;
var startTimer = 5;

// form submit for starting game after settings.
$('form#settingSection').submit(function(e){
    e.preventDefault();
    lives = Number($('#settingLives').val());
    gameTime = Number($('#settingTime').val());
    numberOfColors = Number($('#settingColors').val());
    colors = COLOR_OPTIONS.slice(0,numberOfColors);

    $('#gameLives').text(lives);
    $('#gameTime').text(gameTime);
    $('#resultLives').text(lives);
    $('#resultCountdown').text(gameTime);
    $('#resultColorNum').text(numberOfColors);
    $('#countDownDisplay').text(startTimer);
    
    ShuffleArray(colors);

    for(var i  = 0; i < numberOfColors;i++)
        $('#game' + numberOfColors + 'Btn' + i).css({'background-color': colors[i]});
    $('#game'+numberOfColors+'Buttons').show();

    timer = setInterval(TempColorDisplayTick,1000);

    // Toogle display of game and toogle off display of settings part.
    $('#settingSection').hide();
    $('#gameSection').show();
});

// Timer tick for temporary showing colors at start of game.
function TempColorDisplayTick(){
    $('#countDownDisplay').text(--startTimer);
    if(startTimer <= 0){
        clearInterval(timer);
        startTimer = 5;
        $('.gameTempStartDisplay').hide();
        timer = setInterval(TimerTick,1000);
        currentProblem = Math.floor(Math.random() * numberOfColors);
        $('#gameCurrentProblem').css({'background-color': colors[currentProblem]});
        for(var i  = 0; i < numberOfColors;i++)
            $('#game' + numberOfColors + 'Btn' + i).css({'background-color': EMPTY_COLOR});
        startCheck = true;
    }
}

// Timer tick for ending the game.
function TimerTick(){
    $('#gameTime').text(--gameTime);
    if(gameTime <= 0){
        clearInterval(timer);
        startCheck == false;
        $('#resultHits').text(correctCount);

        // Toogle display of results and toogle off display of game.
        $('#gameSection').hide();
        $('#resultSection').show();
    }
}

// Game buttons.
$('.gameBtn0').click(function(){
    GameButtonAction(0);
});
$('.gameBtn1').click(function(){
    GameButtonAction(1);
});
$('.gameBtn2').click(function(){
    GameButtonAction(2);
});
$('.gameBtn3').click(function(){
    GameButtonAction(3);
});
$('.gameBtn4').click(function(){
    GameButtonAction(4);
});
$('.gameBtn5').click(function(){
    GameButtonAction(5);
});
// Function for game buttons.
function GameButtonAction(problemIndex){
    // Check if function is active.
    if(startCheck == true){
        // Check if correct answer given.
        if(currentProblem == problemIndex){
            $('.gameCount').text(++correctCount);
            $('.gameCount').css({'color':CORRECT_COLOR});
            $('#gameLives').css({'color':BASE_TEXT_COLOR});

        }
        else{
            $('#gameLives').text(--lives);
            $('#gameLives').css({'color':INCORRECT_COLOR});
            $('.gameCount').css({'color':BASE_TEXT_COLOR});
        }
        // Check if game over.
        if(lives <= 0){
            startCheck = false;
            clearInterval(timer);
            
            $('#resultHits').text(correctCount);

            $('#gameSection').hide();
            $('#resultSection').show();
        }
        else{
            currentProblem = Math.floor(Math.random() * numberOfColors);
            $('#gameCurrentProblem').css({'background-color': colors[currentProblem]});
        }
    }
}

// Form submit for replaying game.
$('form#resultSection').submit(function(e){
    e.preventDefault();
    correctCount=0;
    $('.gameTempStartDisplay').show();
    $('#gameCurrentProblem').css({'background-color':EMPTY_COLOR});
    $('.gameCount').css({'color':BASE_TEXT_COLOR});
    $('#gameLives').css({'color':BASE_TEXT_COLOR});
    $('.gameCount').text(0);
    $('#game'+numberOfColors+'Buttons').hide();

    // Toogle display of setting and toogle off results.
    $('#resultSection').hide();
    $('#settingSection').show();
});

// Shuffle values in array.
function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

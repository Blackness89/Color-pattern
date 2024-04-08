var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0
var gameStarted =false;



$(document).keypress(function() {
    if (!gameStarted) {
        $("#level-title").text("Level  " + level);
        nextSequence();
        gameStarted = true;
        
    }
});

// store user clicked color in array
$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        //console.log("good");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        };
    } else {
        //console.log("wrong");
        startOver();
    }
        

};



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level  " + level);

    // generate a number between 0 - 3 and store in the array
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    // console.log(gamePattern);
    // console.log(userClickedPattern);


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColor);
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

function startOver(){
    playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 300);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        userClickedPattern = [];
        level = 0;
        gamePattern = [];
};
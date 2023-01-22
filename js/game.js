

var buttonColours = ["red", "blue", "green", "yellow"]; // we have created array here

var gamePattern = []; // empty array 

var userClickedPattern = [];// empty array

var started = false;// we created a variable started

var level = 0;


// we created keypress event when a user cliked any key the nextsequence will call 
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level  );
        nextSequence();
        started = true;
    }
});


// this is the user clicked button 
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

     playSound(userChosenColour);// here we call the function playsound to play the sound from user clicked button

    animatePress(userChosenColour);// here we call the animate function to animation 

    checkAnswer(userClickedPattern.length - 1);

})



// this function is to check answar
function checkAnswer(currentColor) {

    if (gamePattern[currentColor] === userClickedPattern[currentColor]) {

        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {

        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("game over ,press any key to start");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}





// this is randomchosencolor function which is  genrated randomcolor
function nextSequence() {

    userClickedPattern = [];// Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    level++;
    $("#level-title").text("level" + level);



    var randomNumber = Math.floor(Math.random() * 4);//we created random number here and stored in variable

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");// here play audio when random color willl be chossen
    // audio.play();  // play sound;

    playSound(randomChosenColour);// here we call the function playsound to play the sound from user clicked button

    animatePress(randomChosenColour);// here we call the animate function for animation



}





// we created a function playsound to  play audio
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}





// we created a animate function to create a shadow when clicked
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


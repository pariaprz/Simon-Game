
var buttonColours = ["yellow", "red" , "orange", "purple"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("p").hide();
$("a").on("click", function(){
  $("p").fadeToggle(1000);

});

$("button").on("click", function(){
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length -1);


});


  $(document).on("keypress",function(envent){
    if(level===0){
      nextSequence();
    }
    else{
      console.log("error");
    }

  });


function nextSequence(){
  userClickedPattern = [];
  randonNUmber = Math.floor(Math.random()*4);
  randomChosenColours = buttonColours[randonNUmber];
  gamePattern.push(randomChosenColours);
  $("#"+randomChosenColours).fadeOut(100).fadeIn(100);
  playSound(randomChosenColours);
  level ++;
  $("h1").text("Level " + level);
  console.log(level);

}

function playSound(name){
  var audio = new Audio ("sounds/"+ name + ".mp3");
  audio.play();

}

function animatePress(currentColouer){
  $("#" + currentColouer).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColouer).removeClass("pressed")

  }, 100);


}

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  }
  else{

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over")

    }, 200);

    $("h1").text("Game Over, Press any key to start.");

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [] ;

}

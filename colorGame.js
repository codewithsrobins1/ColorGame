var numSquares = 6;
var colors = [];
var pickedColor;
//Variables that Select Things
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

//Put Everything that Needs to run when the page loads
init();

function init(){
    //Mode Buttons Event Listeners
    setupModeButtons();
    //Square Listeners
    setupSquares();
    reset();
}

function setupModeButtons(){
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      //Remove selected class from both buttons; add to one just clicked on
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6; //Ternary Operator- Another way of writing the if statement
      reset();
    });
  }
}

function setupSquares(){
  for(var i = 0; i < squares.length; i++){
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?"
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      }
      else {
        this.style.backgroundColor = "#232323" //If wrong, it will blend with background
        messageDisplay.textContent = "Try Again"
      }
    });
  }
}

function reset(){
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change color display to match picked color
  colorDisplay.textContent = pickedColor;
  //Reset the Play Again text
  resetButton.textContent = "New Colors"
  //clear the Message display
  messageDisplay.textContent = "";
  //change colors of the squares
  for(var i = 0; i < squares.length; i++){
    //Match the amount of colors in the colors array; if there are 3, hide the others
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    }
    //The last 3 on easy mode wont have a color; they are undefined so display none
    else{
      squares[i].style.display = "none"
    }
  }
  //change the banner color to the background again
  h1.style.backgroundColor = "steelblue"
}

resetButton.addEventListener("click", function(){
  reset();
})

function changeColors(color){
  //loop through all squares
  for(i = 0; i < squares.length; i++)
  //change each color to match given color
  squares[i].style.background = color;
}

function pickColor(){
  //Math floor will give whole number -  remove after decimal point
  var random = Math.floor(Math.random() * colors.length)
  return colors[random]; //picks a random number and returns it
  // Math.floor(Math.random() * 6 + 1 //how to generate random number; it will to 6 from 1
}

function generateRandomColors(num){
  //make an array
  var arr = []
  //repeat num times
  for(var i = 0; i < num; i++){
    //get random color and push into arr
    arr.push(randomColor()) //This will push 6 times; add a random color to the array
  }
  //return that array
  return arr;
}

//Function to Generate the random Color
function randomColor(){
  //pick a "red" from 0 - 255
  var r = Math.floor(Math.random() * 256);
  //pick a "green" from 0 - 255
  var g = Math.floor(Math.random() * 256);
  //pick a "blue" from 0 - 255
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}




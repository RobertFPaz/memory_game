const gameContainer = document.getElementById("game");
let clicks = 0;
let flipCard1;
let flipCard2;
let matchedCards = [];
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // let tempCard1 = '';
  // let tempCard2 = '';
  // you can use event.target to see which element was clicked
  if(clicks < 2){
    if((flipCard1.getAttribute('flipped') === false)&& (flipCard2.getAttribute('flipped') === false) ){
      flipCard1 = event.target;
      flipCard1.setAttribute("flipped", true);
      console.log(flipCard1)
      flipCard1.style.backgroundColor = flipCard1.getAttribute('class');
      clicks++;
    } else if(flipCard1.getAttribute("flipped") === true){
      flipCard2 = event.target;
      flipCard2.style.backgroundColor = flipCard2.getAttribute('class')
      clicks++
      if(flipCard1.getAttribute('class') !== flipCard2.getAttribute('class')){
        setTimeout(function(){
          flipCard1.flipped = false;
          flipCard1.style.backgroundColor = '';
          flipCard2.flipped = false;
          flipCard2.style.backgroundColor = '';
          clicks = 0
        },3000)
      } else {
        setTimeout(function(){
          clicks = 0;
        },3000)
      }
    }
    console.log("you just clicked", event.target);
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */
const gameContainer = document.getElementById("game");
const gameScore = document.querySelector('h2');
let hasFlippedCard = false; 
let firstCard,secondCard;
let clickCards = 0;
let cardCount = 0;
let start = false;
let score = 0
gameScore.innerText += `${score}`
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
    newDiv.dataset.flipped = false
    

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", flipCard);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    // gameScore.innerText += `${score}`
  }
}

// TODO: Implement this function!
function flipCard(event) {
  if(!hasFlippedCard && clickCards === 0 && start === true){ // If false, players first click.
    hasFlippedCard = true;
    firstCard = event.target;
    firstCard.style.backgroundColor = event.target.getAttribute('class')
    firstCard.dataset.flipped = true
    clickCards++
    score += 1
    console.log(score)
  } else if(!event.target.style.backgroundColor && clickCards === 1 && start === true) { //second card flip
    hasFlippedCard = false;
    secondCard = event.target;
    secondCard.style.backgroundColor = event.target.getAttribute('class')
    secondCard.dataset.flipped =  true
    clickCards++
    score += 1
    // check if cards match
    if(firstCard.getAttribute('class') === secondCard.getAttribute('class')){
      // if match remove event listner so you can't click again.
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      console.log("even listener removed")
      clickCards = 0;
      cardCount += 2;
      // Not a match
    } else {
      setTimeout(function(){
      firstCard.style.backgroundColor = "";
      firstCard.dataset.flipped = false;
      secondCard.style.backgroundColor = "";
      secondCard.dataset.flipped = false;
      clickCards = 0;
      }, 1000)
    }
  }
  // you can use event.target to see which element was clicked
}

const startButton = document.querySelector('#start');
startButton.addEventListener("click", function(event){
  start = true;
  startButton.style.backgroundColor = 'green'
})
const reset = document.querySelector('#reset')
reset.addEventListener('click', function(event){
    if(cardCount === 10){
      cardCount = 0;
      clickCards = 0;
      start = false;
      hasFlippedCard = false;
      console.log(cardCount, clickCards, start, hasFlippedCard)
      startButton.style.backgroundColor = 'lightgrey';
      let cards = gameContainer.children;
      for(let card of cards){
          card.addEventListener('click', flipCard)
          card.style.backgroundColor = ""
      }
    }
})
// when the DOM loads
createDivsForColors(shuffledColors);

/* */
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();
parseInt;

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  let min = await ask("what is the lowest number you might pick\n");
  let max = await ask("and what is the highest\n");
  min = parseInt(min);
  max = parseInt(max);
  let tries = 1;
  return guessTheNumber(min, max, tries);
};
async function guessTheNumber(min, max, tries) {
  let mean = Math.floor((min + max) / 2); // using the mean reduces the number of times we have to
  let response = await ask(
    "is this your number:... " +
      mean +
      "\nPress y for yes\nIf it is not press l if your number is lower and h if your number is higher\n"
  );
  if (response === "y") {
    // check if guess is right, high or low repeat guess until integer is found
    console.log(
      "Your number was " +
        mean +
        "!\nI guessed it in " +
        tries +
        " tries.\nNow its my turn!\ntry and guess my number!"
    );
    max = Math.floor(Math.random() * 1000);
    humanTurn(Math.floor(Math.random() * Math.random() * max), max);
  } else if (response === "l") {
    max = mean - 1; //used to eliminate all impossible guesses, that which has been guessed and everything higher than it.
    if (mean <= Math.ceil((min + max) / 2)) {
      //check for cheating
      console.log("Cheater!");
      process.exit();
    }
    guessTheNumber(min, max, tries + 1);
  } else if (response === "h") {
    min = mean + 1;   //used to eliminate all impossible guesses, that which has been guessed and everything lower than it.
    if (mean >= Math.floor((min + max) / 2)) {
      console.log("Cheater!");
      process.exit();
    }
    guessTheNumber(min, max, tries + 1);
  } else {
    console.log("please enter y l or h");
    guessTheNumber(min, max, tries);
  }
}
async function humanTurn(comNum, max) {
  console.log("My number is between 1 and " + max);
  let guess = await ask("type what you think my number is.\n");
  guess = parseInt(guess);
  if (guess === comNum) {
    console.log(
      "Wow you guessed my number it was:\n" + comNum + " lets switch again!"
    );
    start();
  } else if (guess > comNum) {
    console.log("Nope! My number is Lower. Try again.");
    humanTurn(comNum, max);
  } else if (guess < comNum) {
    console.log("Nope! My number is Higher. Try again.");
    humanTurn(comNum, max);
  } else {
    console.log("Please enter a number.");
    humanTurn(comNum, max);
  }
}

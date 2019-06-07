const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  let min = await ask("what is the lowist number you might pick\n");
  let max = await ask("and what is the highist\n");
  let tries = 1;
  return guessTheNumber(min, max, tries);
}
let tries = 0;
async function guessTheNumber(min, max, tries) {
  let mean = Math.floor((parseInt(min) + parseInt(max)+1) / 2); // use the mean rounded down as our guesses
  let response = await ask(
    "is this your number:... " +
      mean +
      "\nPress y for yes\nIf it is not press l if your number is lower and h if your number is higher\n"
  );
  if (response === "y") {
    // check if guess is right, high or low repeat guess untile intager is found
    console.log(
      "Your number was " + mean + "!\nI guessed it in " + tries + " tries."
    );
    process.exit();
  } else if (response === "l") {
    max = mean;
    if (mean === (min + max) / 2) {  //check for cheating
      console.log("Cheater!");
      process.exit();
    }
    guessTheNumber(min, max, tries + 1); //chainge min or max to mean and add to tries
  } else if (response === "h") {
    min = mean;
    if (mean === (min + max) / 2) {
      console.log("Cheater!");
      process.exit();
    }
    guessTheNumber(min, max, tries + 1);
  } else {
    console.log("please enter y l or h");
    guessTheNumber(min, max, tries);
  }
}

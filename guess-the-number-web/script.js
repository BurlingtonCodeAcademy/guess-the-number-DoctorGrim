/* START OVER */
function newGame() {
  tries = 1; // TODO Make tries counting non global.
  document.getElementById("result-textarea").value =
    "Let's play a game where you (human) make up a number and I (computer) try to guess it. Think of a number now";
  //TODO ask for min, max, enter number to start askGuess.
  window.setTimeout(explane, 3000);
  function explane() {
    document.getElementById("result-textarea").value =
      "Enter the Lowest number possible and the Highest. Then Think of your number.";
  }
  min = parseInt(document.getElementById("min").value);
  max = parseInt(document.getElementById("max").value);
  //userGuess=document.getElementById("userGuess").value
  mean = Math.floor((min + max) / 2);
  //TODO make it so game does not start until min and max are added.
  window.setTimeout(askGuess, 8000);
}
function askGuess() {
  document.getElementById("result-textarea").value = "Is it... " + mean + "?";
}
function high() {
  //TODO improve cheat detection and game reset.
  if (mean <= min ) {
    document.getElementById("result-textarea").value =
      "Cheater! start a new game";
    return;
  }
  min = mean + 1;
  mean = Math.floor((min + max) / 2);
  tries++;
  askGuess();
}
function low() {
  if (mean >= max || mean<=min) {
    document.getElementById("result-textarea").value =
      "Cheater! start a new game";
    return;
  }
  max = mean - 1;
  mean = Math.floor((min + max) / 2);
  tries++;
  askGuess();
}
function win() {
  document.getElementById("result-textarea").value =
    "Your number was " + mean + "!\nI guessed it in " + tries + " tries.";
}

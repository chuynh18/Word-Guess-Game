// This is the third non-trivial JavaScript program I have written (1: Psychic-Game, 2: RPS)
// learnings from Psychic-Game:  think through the structure of the program more before writing.  I'm not happy with where I did my input sanity checking in Psychic-Game
// learnings from RPS:  functions are really your friend.  let's take using fucntions to the max!
// another thing to note:  There are some variables that I made global in my previous 2 programs.  I have pulled some of those to be local to functions.
// in Psychic-Game and RPS, I wrote the program first then ripped out functionality into functions.  I will try to write functions first, then use them to put the game together
// I've thought through the functionality that I'll need before even writing a single line of code, allowing me to write almost all the functions I'll need before I do anything else

// I feel like I've come a really long way in just seven days, and only two of those days on actual programming with JavaScript
// HUGE THANK YOU to the wonderful staff...  David, the TAs, the support staff.  I know I've left people out for sure, but I'm thankful for them even as I fail to name them.  Thanks so much!

// good developer practices are good
"use strict";

// creating the variables I'll need
    // var (int) that stores # of wins thus far
var wins = 0;
    // var (int) that stores # of losses thus far
var losses = 0;
    // var (int) that stores # of guesses the player has left left in this round
var guessesLeft = 0;
    // array that stores all the player's entries thus far (meaning incorrect AND correct guesses)
var playerGuesses = [];
    // array that stores the player's incorrect guesses thus far
var playerIncorrectGuesses = [];
    // the word the computer chose randomly from the dictionary
var chosenWord = "";
    // array that stores the letters of the word the player is guessing
var wordBeingSolved = [];
    // array that stores blanks for letters the player hasn't successfully guessed yet and also letters the player has successfully guessed
var inProgressWord = [];
    // var (str) that stores lowercase letters the player has typed
var validatedInput = "";
// --- end global variables ---

// creating the functions I'll need
// this time, I will try to write smaller functions and give them logically delineated pieces of work
// let's see how it goes!

    // choose a random word from the dictionary
function pullWordFromDictionary() {  //  NOT TO BE USED MANUALLY - ONLY USED BY OTHER FUNCTIONS
        // this is the dictionary of words my game will use
    var wordDictionary = ["hopeless", "situation", "backstroke", "parliament", "airship", "elephant", "tragedy", "prosperous", "geography", "superior", "underrated", "ability", "satirizing", "presbyterian", "teacher", "blockade", "extrication", "masterpiece", "dedicate", "atmosphere", "airships", "temperature", "atmosphere", "augury", "superfluous"];
    chosenWord = wordDictionary[Math.floor(Math.random() * wordDictionary.length)];
};
    // this function breaks up the word to be guessed into letters and stores those letters in wordBeingSolved array
    // this is how you actually choose the word for the purposes of playing the game
function chooseWord() {
    pullWordFromDictionary();
    for (var i = 0; i < chosenWord.length; i++) {
        wordBeingSolved.push(chosenWord[i]);
    };
    console.log("[info] You must guess the following word: " + chosenWord + ".  Hey, wait a minute!  Get out of here!");
};

    // this function displays the appropriate number of placeholder characters and is called at game start only
function showBlankSpots() {
        // fill it up with the appropriate number of underscores
    for (var i = 0; i < wordBeingSolved.length; i++) {
        inProgressWord.push("_");
    };
    document.getElementById("guessThis").textContent = inProgressWord;
};

    // upon new round, we want to reset the number of guesses and empty out the list of guesses the player has made
    // we also want to choose another word and show blanks
function newRound() {
    wordBeingSolved = [];
    inProgressWord = [];
    playerGuesses = [];
    guessesLeft = 10;
    playerIncorrectGuesses = [];
    updateGuessesDisplay();
    updateWinLossDisplay();
    chooseWord();
    showBlankSpots();
    console.log("[info]: Beginning new game.  Resetting game state...");
    console.log("----------------------")
    console.log("var wins: " + wins);
    console.log("var losses: " + losses);
    console.log("var guessesLeft: " + guessesLeft);
    console.log("var playerGuesses (should be empty): " + playerGuesses);
    console.log("var playerIncorrectGuesses (should be empty): " + playerIncorrectGuesses);
    console.log("var inProgressWord (should be underscores): " + inProgressWord);
};

    // this function is only responsible for updating the player-facing scoreboard with the new number of guesses remaining and list of guessed letters
function updateGuessesDisplay() {
    document.getElementById("guessesRemaining").textContent = guessesLeft;
    document.getElementById("guessedLetters").textContent = playerIncorrectGuesses;
    document.getElementById("guessThis").textContent = inProgressWord;
};

    // this function is only repsonsible for updating the player-facing scoreboard with the new number of wins and losses
function updateWinLossDisplay() { // NOT TO BE USED MANUALLY - perhaps you were looking for newRound()?
    document.getElementById("numWins").textContent = wins;
    document.getElementById("numLosses").textContent = losses;
};

    // this function blinks obnoxiously.  args:  (str) color e.g. "red" or "#ff0000", (int) # of times to blink e.g. 1, 2, 3, 4
function blink(color, reps, timescale) {
    for (var i = 0; i < reps+1; i++) {
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = color;
        }, 200 * timescale * i - 100);
        setTimeout(function(){
        document.getElementById("theBody").style.backgroundColor = "#ffffff";
        }, 200 * timescale * i);
    };
};

// --- end functions ---

// begin game logic

    // kick the game off by readying a word
newRound();

    // listen for keypresses
document.onkeyup = function(pressed) {
        // convert the key to lowercase
    var lowerCaseInput = pressed.key.toLowerCase();

    // validateInput(lowerCaseInput);
// ---

    var lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        // if the input is not a letter, reject it
    if (lettersArray.indexOf(lowerCaseInput) === -1) {
        document.getElementById("readMe").textContent = lowerCaseInput + " is not a letter.  Try again!";
        console.log("[warn]: " + lowerCaseInput + " is not a letter.");
        blink("#ffffaa", 2, 1);
    }
        // otherwise, if the input is a letter...
    else {
        validatedInput = lowerCaseInput;

            // check if it has already been guessed.  if so, reject it.
        if (playerGuesses.indexOf(validatedInput) >= 0) {
            document.getElementById("readMe").textContent = validatedInput + " has already been guessed this round.";
            console.log("[warn]: " + validatedInput + " has already been guessed this round.");
            blink("#ffffaa", 2, 1);
        }
            // otherwise, it hasn't been guessed yet.
        else {
                // log it as a player guess
            playerGuesses.push(validatedInput);
                blink("#cccccc", 1, 1);
                    // if the guessed letter isn't in the word being guessed,
                if (wordBeingSolved.indexOf(validatedInput) === -1) {
                        // decrement guesses by 1
                    guessesLeft--;
                        // log the guess as an invalid guess
                    playerIncorrectGuesses.push(validatedInput);
                        // update the display for the player
                    updateGuessesDisplay();
                        // putting the lose logic here, because you can only lose when you run out of guesses
                        // and you can only run out of guesses when you guess a letter not contained in the word you're trying to guess
                    if (guessesLeft === 0) {
                        blink("#ffaaaa", 4, 5);
                        document.getElementById("readMe").innerHTML = "You've lost this one.  The word you <b>FAILED</b> to guess was <strong>" + chosenWord + "</strong>.  New game will begin shortly...";
                        losses++;
                        setTimeout(function(){
                            newRound();
                            document.getElementById("readMe").textContent = "New game has begun.";
                        }, 4000);
                        setTimeout(function(){
                            document.getElementById("readMe").textContent = "";
                        }, 6000);
                    };
                }
                    // otherwise, it is a valid guess
                else {
                        // for the word that's being solved (stored in an array), iterate over each element
                    for (var i = 0; i < wordBeingSolved.length; i++) {
                            // if the guessed letter matches the letter contained by the ith element
                        if (validatedInput === wordBeingSolved[i]) {
                                // remove the underscore at that index and replace it with the guessed letter
                            inProgressWord.splice(i, 1, validatedInput);
                                // if there are no more underscores in the array inProgressWord,
                                // this means the player has guessed all the letters and should win
                            if (inProgressWord.indexOf("_") === -1) {
                                blink("#aaffaa", 4, 5);
                                document.getElementById("readMe").innerHTML = "<b>You're winner!</b>  The word was <strong>" + chosenWord + "</strong>.  " + "New game will begin shortly...";
                                wins++;
                                setTimeout(function(){
                                    newRound();
                                    document.getElementById("readMe").textContent = "New game has begun.";
                                }, 4000);
                                setTimeout(function(){
                                    document.getElementById("readMe").textContent = "";
                                }, 6000);
                            };
                        }
                            // otherwise, note that the guessed letter doesn't match the ith element in the console
                        else {
                            console.log("[info]: " + validatedInput + " doesn't match the word being guessed at index " + i)
                        };
                    };
                        // update the display for the player
                    updateGuessesDisplay(); 
                };

        };
    
    };
};

// thoughts after completing this assignment:
// my attempt to write all the variables first was very misguided.  I should have known:  YA AIN'T GONNA NEED IT.
// I do not know what my program will need, so I think it is a good exercise to think about what variables I will need,
// however, I think it's a good policy to write the program and pull stuff out into variables if I notice repetition
// this was a fantastic learning exercise, though!
// It will be interesting to see how hard this code is to modify.  That is the true test of how well architected it is.
// Another thing to note is that I had to stop all coding and pull out a piece of paper and diagram how the program should flow
// once I did that, it was fairly easy code out the part that I had diagrammed
// I didn't diagram where I should put the win and loss conditions (I thought that part would be trivial),
// so my pace of writing code took a drastic nosedive as I read my code and thought through where to put the code for win and loss.
// Once I found the right place to put them, it seemed pretty obvious to me that there should only be one place for them
// I shouldn't have done this all in one sitting.  But once I get coding, I don't stop.
// Now I'm very tired.  It is 11:51 PM on Tuesday, April 24th.  Good night.
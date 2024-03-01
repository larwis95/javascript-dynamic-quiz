let playBtn = document.querySelector("#play");
let initialsText = document.querySelector("#initials");
let quizContainer = document.querySelector(".quizcontainer");
let viewBtn = document.querySelector("#viewBtn");

let hsInitials = ""; //intials storage string
let timer = 100; //starting time for timer
let finalTime; //our time we finish the quiz with
let correctCount = 0; //amount of questions we got correct
let incorrectCount = 0; //amount of questions we got incorrect
let scores = []; //array to hold scores from local storage
let endGame = false; //flag set to determine if we got to score screen
let hsLength = 5; //max highscore list size

//multidimensional array to hold our questions+answers, index[0] of every subarray is the question, every index after is the answers 
const questionsDB = [["What scope do variables have in javascript?", "global, block", "local, block", "global, local", "all scopes"], ["What does a loop do?", "Selects all variables.", "Loops through an arrau", "Causes an infinite loop error", "Executes code multiple times"], ["What event handler handles when a button is clicked?", "submit", "click", "keydown", "change"], ["Local storage values are always stored as a(n) ___", "string", "variable", "integer", "boolean"], ["console.log will:", "log errors in your code.", "print something to the console", "tell the console to logout", "log all variables to console"]];

//sets the questionAmount to determine how many questions are in the quiz to the length of the questionDB
let questionAmount = questionsDB.length;

//array to hold our correct answers to check against our user choice
const correctDB = ["global, local", "Executes code multiple times", "click", "string", "print something to the console"];

function init() { //function that runs on load to get our highscores from local storage
    let storedScores = JSON.parse(localStorage.getItem("scores"))
    if (storedScores !== null) 
        scores = storedScores;
    };

function startQuiz() { //starts the quiz when intials are put into textbox and play button is clicked
    if (initialsText.value === "") {
        alert("You must enter your initials in first! (2 characters minimum)");
        return;
    };
    hsInitials = initialsText.value
    let initialsH2 = document.querySelector("#initialsh2");
    let initialDiv = document.querySelector("#initialsinput");
    let startParagraph = document.querySelector("p");
    viewBtn.remove();
    startParagraph.remove();  //removes our starting <p>
    playBtn.remove(); //removes the play button
    initialsText.remove(); //removes our intials input
    initialsH2.remove(); //removes intials label for the textbox
    initialDiv.remove(); //removes our <div> wrapper
    startTimer();  //starts the timer for the quiz
    selectQuestion(); //selects the first question
};

//function used to end the quiz when the timer runs out
function endQuiz() {
    let questionText = document.querySelector("#questiontext"); //selects the text that asks our question
    let ul = document.querySelector("ul"); //selects the UL that holds the answers
    let li = document.querySelectorAll("li"); //select all our li's that hold the button answers
    let buttons = document.querySelectorAll("button");  //selects all our answer buttons
    ul.remove(); //removes our UL
    questionText.remove();  //removes our question
    for (let i = 0; i < li.length; i++) {  //for loop that removes all buttons and li
        li[i].remove();
        buttons[i].remove;
    };
    let gameoverText = document.createElement("h2");  //creates a h2
    let playAgainBtn = document.createElement("button") //creates a button
    gameoverText.setAttribute("id", "questiontext");  //sets the id of our h2
    quizContainer.appendChild(gameoverText); //adds to the dom
    quizContainer.appendChild(playAgainBtn);
    gameoverText.textContent = "Game Over! You ran out of time. Play Again?";
    playAgainBtn.innerHTML = "Play Again";
    playAgainBtn.addEventListener("click", function() {  //event listener that reloads the page when the button is clicked
        location.reload();
        return false;
    });
};

//function that saves our highscore when ever question is answered
function saveHighScore() {
    endGame = true; //flag to end timer
    if (incorrectCount === questionAmount) { //checks to make sure we got at least 1 answer correct, displays endgame screen if we did not
        let gameoverText = document.createElement("h2");
        let playAgainBtn = document.createElement("button");
        gameoverText.setAttribute("id", "questiontext");
        quizContainer.appendChild(gameoverText);
        quizContainer.appendChild(playAgainBtn);
        gameoverText.textContent = "Game Over! You answered 0 correctly. Play Again?";
        playAgainBtn.innerHTML = "Play Again";
        playAgainBtn.addEventListener("click", function() {
            location.reload();
            return false;
        });
    } else {
        let highScore = { //creates our object to store intials and score
            name: hsInitials,
            time: finalTime,
        };
        scores.push(highScore);  //pushes that object to our score array
        let saveText = document.createElement("h2");
        let saveBtn = document.createElement("button");
        let playAgainBtn = document.createElement("button");
        quizContainer.appendChild(saveText);
        quizContainer.appendChild(saveBtn);
        quizContainer.appendChild(playAgainBtn);
        saveText.textContent = "Great Job! You got " + correctCount + " questions correct and " + incorrectCount + " questions incorrect. Would you like to save your score?";
        saveBtn.innerHTML = "Save Score";
        playAgainBtn.innerHTML = "Play Again";
        saveBtn.addEventListener("click", function() {  //event listener that pushes our scores to local storage, and calls a function to render our highscores
            localStorage.setItem("scores", JSON.stringify(scores));
            renderScores(saveBtn, playAgainBtn, saveText);
        });
        playAgainBtn.addEventListener("click", function() {
            location.reload();
            return false;
        });
    };
};

//renders our highscore list
function renderScores(btn, play, text) {
    btn.remove();
    text.remove();
    let scoreUL = document.createElement("ol");
    let clearBtn = document.createElement("button");
    quizContainer.appendChild(scoreUL);
    play.setAttribute("id", "playagain");
    clearBtn.textContent = "Clear Scores";
    clearBtn.setAttribute("id", "clear");
    quizContainer.appendChild(clearBtn);
    scores = scores.sort((a, b) => b.time - a.time);  //sorts the scores in descending order
    for (let i = 0; i < scores.length; i++) {
        if (i < hsLength) { //checks to make sure our hs length is < then max length
            let initials = scores[i].name;
            let score = scores[i].time;
            let li = document.createElement("li");
            li.textContent = "Intials: " + initials + " Score: " + score;
            scoreUL.appendChild(li);
        };
    };
    clearBtn.addEventListener("click", clearScores); //event handler to clear scores when button clicked
};

function clearScores(event) {
    btn = event.target;
    let ol = document.querySelector("ol");
    let li = document.querySelectorAll("li");
    ol.remove();
    for (let i = 0; i < li.length; i++) { //deletes our list items
        li[i].remove();
    };
    localStorage.removeItem("scores") //removes our scores from local storage
    btn.remove();
}


function startTimer() {  //timer function
    let timerText = document.createElement("h2");
    quizContainer.appendChild(timerText);
    timerText.setAttribute("id", "timerh2");
    timerText.textContent = timer + " second(s) left!";
    let timerInterval = setInterval(function() {  //sets a timer interval to run this function every 1000 ms
        timer--;
        timerText.textContent = timer + " second(s) left!";
        if (timer === 0) { //when the time hits 0 do this
            timerText.remove();
            endQuiz(); //ends quiz if we run out of time
            clearInterval(timerInterval); //clears timer
        };
        if (endGame === true) { //if we got to the score screen do this
        clearInterval(timerInterval);
        };
    }, 1000);
};

function handleViewBtn() {
    let initialsH2 = document.querySelector("#initialsh2");
    let initialDiv = document.querySelector("#initialsinput");
    let startParagraph = document.querySelector("p")
    let playAgain = document.createElement("button");
    let scoreUL = document.createElement("ul");
    playAgain.setAttribute("id", "playagain");
    playAgain.textContent = "Back to Main"
    startParagraph.remove(); 
    playBtn.remove(); 
    initialsText.remove(); 
    initialsH2.remove(); 
    initialDiv.remove();
    viewBtn.remove();
    quizContainer.appendChild(playAgain);
    quizContainer.appendChild(scoreUL);
    for (let i = 0; i < scores.length; i++) {
        if (i < hsLength) { //checks to make sure our hs length is < then max length
            let initials = scores[i].name;
            let score = scores[i].time;
            let li = document.createElement("li");
            li.textContent = "Intials: " + initials + " Score: " + score;
            scoreUL.appendChild(li);
        };
    };
    playAgain.addEventListener("click", function() {
        location.reload();
        return false;
    });
}

function selectQuestion() {
    if (questionsDB.length === 0) { //checks to make sure questions are left
        let timerText = document.querySelector("#timerh2");
        finalTime = timer;
        timerText.remove();
        saveHighScore();
        return;
    };
    let questionArray = questionsDB[Math.floor(Math.random() * questionsDB.length)]; //picks and random index to select the question used
    let questionsRemove = questionsDB.indexOf(questionArray) //finds the index of the question we picked
    let questionText = questionArray[0]; //selects our index 0 of our questionarray, which is the question
    questionArray.splice(0, 1) //removes the question text
    let questionH2 = document.createElement("h2");
    let answerList = document.createElement("ul");
    questionH2.setAttribute("id", "questiontext");
    quizContainer.appendChild(questionH2);
    quizContainer.appendChild(answerList);
    answerList.appendChild
    questionH2.textContent = questionText;
    for (let i = 0; i < questionArray.length; i++) {
        let li = document.createElement("li");
        let answers = document.createElement("button");
        answerList.appendChild(li);
        li.appendChild(answers);
        answers.innerHTML = questionArray[i];

    };
    questionsDB.splice(questionsRemove, 1); //removes the question and answers from the DB
    buttonHandler(); //creates the handler for our answer buttons
};

function buttonHandler(){
    let answers = document.querySelectorAll("button");
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener("click", validateAnswers); //when answer buttons are click run validateAnswers
    };
};

function validateAnswers(event) {
    let button = event.target; //makes the button the target of the click event
    if (correctDB.includes(button.innerHTML) === true) { //checks if answer is in our correct answers array
        let correctText = document.createElement("h2");
        quizContainer.appendChild(correctText);
        correctText.setAttribute("id", "outcome");
        correctText.textContent = "Correct!";
        correctText.style.color = "green";
        correctCount = correctCount + 1; //adds 1 to our correct count
        deleteOutcomeText(); //deletes our correct/incorrect text
        removeQuestion(); //deletes our question and answer from the doc
    } else { //same thing except for incorrect answers
        let incorrectText = document.createElement("h2");
        quizContainer.appendChild(incorrectText);
        incorrectText.setAttribute("id", "outcome");
        incorrectText.textContent = "Incorrect!";
        incorrectText.style.color = "red";
        timer = timer - 5;
        incorrectCount = incorrectCount + 1;
        deleteOutcomeText();
        removeQuestion();
    };
}

//delete's our answer outcome text from the doc after 1 second delay
function deleteOutcomeText() {
    let timeDelete = 1
    let outcomeText = document.querySelector("#outcome");
    let timerInterval = setInterval(function() {
        timeDelete--;
        if (timeDelete === 0) {
            outcomeText.remove();
            clearInterval(timerInterval);
        };
    }, 1000);
};

//removes our question + answers from the doc, then select's next question
function removeQuestion() {
    let questionText = document.querySelector("#questiontext");
    let ul = document.querySelector("ul");
    let li = document.querySelectorAll("li");
    let buttons = document.querySelectorAll("button");
    ul.remove();
    questionText.remove();
    for (let i = 0; i < li.length; i++) {
        li[i].remove();
        buttons[i].remove;
    };
    selectQuestion();
};

init();
playBtn.addEventListener("click", startQuiz) //event listener for our play button on click
viewBtn.addEventListener("click", handleViewBtn);
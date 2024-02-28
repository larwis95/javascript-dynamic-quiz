let playBtn = document.querySelector("#play");
let initialsText = document.querySelector("#initials");
let quizContainer = document.querySelector(".quizcontainer");

let hsInitials = "";
let timer = 40;
let finalTime;
let correctCount = 0;
let incorrectCount = 0;
let scores = [];
let endGame = false;
let hsLength = 5;

const questionsDB = [["What scope do variables have in javascript?", "global, block", "local, block", "global, local", "all scopes"], ["What does a loop do?", "Selects all variables.", "Loops through an arrau", "Causes an infinite loop error", "Executes code multiple times"], ["What event handler handles when a button is clicked?", "submit", "click", "keydown", "change"], ["Local storage values are always stored as a(n) ___", "string", "variable", "integer", "boolean"], ["console.log will:", "log errors in your code.", "print something to the console", "tell the console to logout", "log all variables to console"]];

let questionAmount = questionsDB.length

const correctDB = ["global, local", "Executes code multiple times", "click", "string", "print something to the console"];

function init() {
    let storedScores = JSON.parse(localStorage.getItem("scores"))
    if (storedScores !== null) {
        scores = storedScores;
    };
}

function startQuiz() {
    if (initialsText.value === "") {
        console.log(initialsText.value)
        alert("You must enter your initials in first! (2 characters minimum)");
        return;
    };
    hsInitials = initialsText.value
    let initialsH2 = document.querySelector("#initialsh2");
    let initialDiv = document.querySelector("#initialsinput");
    let startParagraph = quizContainer.children[0];
    startParagraph.remove();
    playBtn.remove();
    initialsText.remove();
    initialsH2.remove();
    initialDiv.remove();
    startTimer();
    selectQuestion();
};

function endQuiz() {
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
    let gameoverText = document.createElement("h2");
    let playAgainBtn = document.createElement("button")
    gameoverText.setAttribute("id", "questiontext");
    quizContainer.appendChild(gameoverText);
    quizContainer.appendChild(playAgainBtn);
    gameoverText.textContent = "Game Over! You ran out of time. Play Again?";
    playAgainBtn.innerHTML = "Play Again";
    playAgainBtn.addEventListener("click", function() {
        location.reload();
        return false;
    });
};

function saveHighScore() {
    endGame = true;
    if (incorrectCount === questionAmount) {
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
        let highScore = {
            name: hsInitials,
            time: finalTime,
        };
        scores.push(highScore);
        let saveText = document.createElement("h2");
        let saveBtn = document.createElement("button");
        let playAgainBtn = document.createElement("button");
        quizContainer.appendChild(saveText);
        quizContainer.appendChild(saveBtn);
        quizContainer.appendChild(playAgainBtn);
        saveText.textContent = "Great Job! You got " + correctCount + " questions correct and " + incorrectCount + " questions incorrect. Would you like to save your score?";
        saveBtn.innerHTML = "Save Score";
        playAgainBtn.innerHTML = "Play Again";
        saveBtn.addEventListener("click", function() {
            localStorage.setItem("scores", JSON.stringify(scores));
            renderScores(saveBtn, saveText);
        });
        playAgainBtn.addEventListener("click", function() {
            location.reload();
            return false;
        });
    };
};

function renderScores(btn, text) {
    btn.remove();
    text.remove();
    let scoreUL = document.createElement("ol");
    quizContainer.appendChild(scoreUL);
    let clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Scores"
    quizContainer.appendChild(clearBtn);
    scores = scores.sort((a, b) => b.time - a.time);
    console.log(scores);
    for (let i = 0; i < hsLength; i++) {
        var name = scores[i].name;
        console.log(name);
        var score = scores[i].time;
        var li = document.createElement("li");
        li.textContent = "Intials: " + name + " Score: " + score;
        scoreUL.appendChild(li)
    };
    clearBtn.addEventListener("click", clearScores);
};

function clearScores(event) {
    btn = event.target;
    let ol = document.querySelector("ol");
    let li = document.querySelectorAll("li");
    ol.remove();
    for (let i = 0; i < li.length; i++) {
        li[i].remove();
    };
    localStorage.removeItem("scores")
    btn.remove();
}

function startTimer() {
    let timerText = document.createElement("h2");
    quizContainer.appendChild(timerText);
    timerText.setAttribute("id", "timerh2");
    timerText.textContent = timer + " second(s) left!";
    let timerInterval = setInterval(function() {
        timer--;
        timerText.textContent = timer + " second(s) left!";
        if (timer === 0) {
            timerText.remove();
            endQuiz();
            clearInterval(timerInterval);
        };
        if (endGame === true) {
        clearInterval(timerInterval);
        };
    }, 1000);
};

function selectQuestion() {
    if (questionsDB.length === 0) {
        let timerText = document.querySelector("#timerh2");
        finalTime = timer;
        timerText.remove();
        saveHighScore();
        return;
    };
    console.log(questionsDB.length)
    console.log(timer)
    let questionArray = questionsDB[Math.floor(Math.random() * questionsDB.length)];
    let questionsRemove = questionsDB.indexOf(questionArray)
    let questionText = questionArray[0];
    questionArray.splice(0, 1)
    let questionH2 = document.createElement("h2");
    let answerList = document.createElement("ul");
    questionH2.setAttribute("id", "questiontext");
    quizContainer.appendChild(questionH2);
    quizContainer.appendChild(answerList);
    answerList.appendChild
    questionH2.textContent = questionText;
    console.log(questionArray);
    for (let i = 0; i < questionArray.length; i++) {
        let li = document.createElement("li");
        let answers = document.createElement("button");
        answerList.appendChild(li);
        li.appendChild(answers);
        answers.innerHTML = questionArray[i];

    };
    questionsDB.splice(questionsRemove, 1);
    buttonHandler();
};

function buttonHandler(){
    let answers = document.querySelectorAll("button");
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener("click", validateAnswers);
    };
};

function validateAnswers(event) {
    let button = event.target
    if (correctDB.includes(button.innerHTML) === true) {
        let correctText = document.createElement("h2");
        quizContainer.appendChild(correctText);
        correctText.setAttribute("id", "outcome");
        correctText.textContent = "Correct!";
        correctText.style.color = "green";
        correctCount = correctCount + 1;
        deleteOutcomeText();
        removeQuestion();
    } else {
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

function deleteOutcomeText() {
    let timeDelete = 1
    let outcomeText = document.querySelector("#outcome")
    let timerInterval = setInterval(function() {
        timeDelete--;
        if (timeDelete === 0) {
            outcomeText.remove();
            clearInterval(timerInterval);
        };
    }, 1000);
};

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
playBtn.addEventListener("click", startQuiz)
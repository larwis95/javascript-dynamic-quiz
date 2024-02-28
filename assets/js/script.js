let playBtn = document.querySelector("#play");
let initialsText = document.querySelector("#initials");
let quizContainer = document.querySelector(".quizcontainer");

let hsInitials = ""
let timer = 60;

let questionsDB = [["What scope do variables have in javascript?", "global, block", "local, block", "global, local", "all scopes"]];
let correctDB = ["global, local"];



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

function startTimer() {
    let timerText = document.createElement("h2");
    quizContainer.appendChild(timerText);
    timerText.setAttribute("id", "timerh2");
    timerText.textContent = timer + " second(s) left!";
    let timerInterval = setInterval(function() {
        timer--;
        timerText.textContent = timer + " second(2) left!";
        if (timer === 0) {
            timerText.remove();
            clearInterval(timerInterval);
            // endQuiz();
        }
    }, 1000);
};

function selectQuestion() {
    if (questionsDB.length === 0) {
        // saveHighScore();
        return;
    }
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
        deleteOutcomeText();
        // removeQuestion();
    } else {
        let incorrectText = document.createElement("h2");
        quizContainer.appendChild(incorrectText);
        incorrectText.setAttribute("id", "outcome");
        incorrectText.textContent = "Incorrect!";
        incorrectText.style.color = "red";
        timer = timer-5
        deleteOutcomeText();
        // removeQuestion();
    };
}

function deleteOutcomeText() {
    let timeDelete = 3
    let outcomeText = document.querySelector("#outcome")
    let timerInterval = setInterval(function() {
        timeDelete--;
        if (timeDelete === 0) {
            outcomeText.remove();
            clearInterval(timerInterval);
        }
    }, 1000)
};

function removeQuestion() {
    
}


playBtn.addEventListener("click", startQuiz)
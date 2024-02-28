let playBtn = document.querySelector("#play");
let initialsText = document.querySelector("#initials");
let quizContainer = document.querySelector(".quizcontainer");

let hsInitials = ""
let timer = 60;

let questionsDB = [["What scope do variables have in javascript?", "global, block", "local, block", "global, local", "all scopes"]];
let correctDB = [];



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
    let questionArray = questionsDB[Math.floor(Math.random() * questionsDB.length)];
    let questionsRemove = questionsDB.indexOf(questionArray)
    let questionText = questionArray[0];
    questionArray.splice(0, 1)
    let questionH2 = document.createElement("h2");
    questionH2.setAttribute("id", "questiontext");
    quizContainer.appendChild(questionH2);
    questionH2.textContent = questionText;
    console.log(questionArray);
    for (let i = 0; i < questionArray.length; i++) {
        let answers = document.createElement("button");
        quizContainer.appendChild(answers);
        answers.value = questionArray[i];

    };
    questionsDB.splice(questionsRemove, 1);
    console.log(questionsDB);
};

playBtn.addEventListener("click", startQuiz)
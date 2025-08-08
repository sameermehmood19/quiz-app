let quizData = [
  {
    question: "Capital city of Kashmir is: ",
    options: ["Islamabad", "Lahore", "Kharachi", "Muzaffarabad"],
    answer: "Muzaffarabad"
  },
  {
    question: "Capital city of Pakistan is:",
    options: ["Islamabad", "Lahore", "Karachi", "Muzaffarabad"],
    answer: "Islamabad"
  },
  {
    question: "National animal of Pakistan is:",
    options: ["Horse", "Cow", "Goat", "Markhor"],
    answer: "Markhor"
  },
  {
    question: "Favourite meat of Islamabad and Lahore is:",
    options: ["Donkey", "Cow", "Goat", "Chicken"],
    answer: "Donkey"
  },
  {
    question: "National dish of Pakistan is:",
    options: ["Haleem", "Nihari", "Qorma", "Sarson ka Saag"],
    answer: "Nihari"
  },
  {
    question: "National drink of Pakistan is:",
    options: ["Malt 79", "Rooh Afza", "Ganna ka ras", "Water"],
    answer: "Ganna ka ras"
  }
];

let currentQuestionIndex = 0;
let userScore = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const currentQNoEl = document.getElementById("currentQuestionNo");
const totalQNoEl = document.getElementById("totalQuestionNo");
const startScreen = document.getElementById("startscreen");
const quizCard = document.getElementById("card");
const resultScreen = document.querySelector(".showResult");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("submit");
const restartBtn = document.getElementById("restart");
const timeDisplay = document.getElementById("timeRemaining");

function loadData() {
  let currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  optionButtons.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.style.backgroundColor = "";
    button.disabled = false;
  });

  currentQNoEl.textContent = currentQuestionIndex + 1;
  totalQNoEl.textContent = quizData.length;
  nextBtn.disabled = true;

  // Start new timer
  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timeDisplay.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      optionButtons.forEach(btn => btn.disabled = true);
      nextBtn.disabled = false; // allow moving on after time out
    }
  }, 1000);
}

function dly() {
  startScreen.style.display = "none";
  quizCard.style.display = "inline";
  loadData();
}

function handleOptionClick(e) {
  clearInterval(timer); // stop timer when option clicked

  const selectedAnswer = e.target.textContent.trim();
  const correctAnswer = quizData[currentQuestionIndex].answer.trim();

  if (selectedAnswer === correctAnswer) {
    e.target.style.backgroundColor = "green";
    userScore++;
  } else {
    e.target.style.backgroundColor = "red";
    optionButtons.forEach(btn => {
      if (btn.textContent.trim() === correctAnswer) {
        btn.style.backgroundColor = "green";
      }
    });
  }

  optionButtons.forEach(btn => btn.disabled = true);
  nextBtn.disabled = false;
}

optionButtons.forEach(button => {
  button.addEventListener("click", handleOptionClick);
});

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadData();
  } else {
    quizCard.style.display = "none";
    resultScreen.style.display = "flex";
    scoreEl.textContent = `${userScore} / ${quizData.length}`;
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  userScore = 0;
  resultScreen.style.display = "none";
  quizCard.style.display = "inline";
  loadData();
});

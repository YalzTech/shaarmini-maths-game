const questions = [
  {
    question: "Year 1: What number comes after 19?",
    answers: ["18", "20", "21", "29"],
    correct: 1,
    hint: "Count forward: 17, 18, 19, ...",
    explanation: "The number after 19 is 20."
  },
  {
    question: "Year 1: 6 + 3 = ?",
    answers: ["8", "9", "10", "7"],
    correct: 1,
    hint: "Start from 6 and count 3 more.",
    explanation: "6 + 3 = 9."
  },
  {
    question: "Year 1: Which number is bigger?",
    answers: ["12", "21", "9", "15"],
    correct: 1,
    hint: "Compare the tens digit first.",
    explanation: "21 is the biggest number because it has 2 tens."
  },
  {
    question: "Year 1: Which shape has 3 sides?",
    answers: ["Circle", "Square", "Triangle", "Rectangle"],
    correct: 2,
    hint: "The word 'tri' means three.",
    explanation: "A triangle has 3 sides."
  },
  {
    question: "Year 1: 10 - 4 = ?",
    answers: ["5", "6", "7", "4"],
    correct: 1,
    hint: "Count backwards four steps from 10.",
    explanation: "10 - 4 = 6."
  },
  {
    question: "Year 1: How many sen are there in RM1?",
    answers: ["10 sen", "50 sen", "100 sen", "20 sen"],
    correct: 2,
    hint: "RM1 is equal to one hundred sen.",
    explanation: "RM1 = 100 sen."
  },
  {
    question: "Year 1: Which object is usually used to measure length?",
    answers: ["Ruler", "Cup", "Clock", "Coin"],
    correct: 0,
    hint: "Students use it to draw straight lines.",
    explanation: "A ruler is used to measure length."
  },
  {
    question: "Year 2: 25 + 14 = ?",
    answers: ["38", "39", "40", "41"],
    correct: 1,
    hint: "Add tens and ones separately.",
    explanation: "25 + 14 = 39."
  },
  {
    question: "Year 2: 46 - 12 = ?",
    answers: ["32", "34", "36", "38"],
    correct: 1,
    hint: "46 - 10 = 36, then minus 2 more.",
    explanation: "46 - 12 = 34."
  },
  {
    question: "Year 2: What is 5 groups of 2?",
    answers: ["7", "10", "12", "15"],
    correct: 1,
    hint: "This is 5 × 2.",
    explanation: "5 groups of 2 equals 10."
  },
  {
    question: "Year 2: Half of 12 is?",
    answers: ["4", "5", "6", "8"],
    correct: 2,
    hint: "Share 12 equally into 2 groups.",
    explanation: "Half of 12 is 6."
  },
  {
    question: "Year 2: Which time shows half past 3?",
    answers: ["3:00", "3:15", "3:30", "4:30"],
    correct: 2,
    hint: "Half past means 30 minutes after the hour.",
    explanation: "Half past 3 is 3:30."
  },
  {
    question: "Year 2: RM2.00 + RM1.50 = ?",
    answers: ["RM2.50", "RM3.00", "RM3.50", "RM4.00"],
    correct: 2,
    hint: "Add ringgit and sen together.",
    explanation: "RM2.00 + RM1.50 = RM3.50."
  },
  {
    question: "Year 2: A rectangle has how many sides?",
    answers: ["3", "4", "5", "6"],
    correct: 1,
    hint: "It has the same number of sides as a square.",
    explanation: "A rectangle has 4 sides."
  },
  {
    question: "Year 2: There are 18 apples. If they are shared equally among 3 children, each child gets?",
    answers: ["5", "6", "7", "8"],
    correct: 1,
    hint: "Think of 18 ÷ 3.",
    explanation: "18 ÷ 3 = 6, so each child gets 6 apples."
  }
];

const scores = [
  "10 points", "20 points", "30 points", "40 points", "50 points",
  "60 points", "70 points", "80 points", "90 points", "100 points",
  "110 points", "120 points", "130 points", "140 points", "150 points"
];

let currentQuestion = 0;
let playerName = "Student";

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const popup = document.getElementById("popup");

function startGame() {
  const nameInput = document.getElementById("player-name").value.trim();
  playerName = nameInput || "Student";
  currentQuestion = 0;

  document.getElementById("player-display").textContent = playerName;
  startScreen.classList.remove("active");
  endScreen.classList.remove("active");
  gameScreen.classList.add("active");

  buildPrizeLadder();
  loadQuestion();
}

function buildPrizeLadder() {
  const ladder = document.getElementById("prize-ladder");
  ladder.innerHTML = "";

  scores.slice().reverse().forEach((score, index) => {
    const actualLevel = scores.length - 1 - index;
    const li = document.createElement("li");
    li.id = `ladder-${actualLevel}`;
    li.innerHTML = `<span>Q${actualLevel + 1}</span><span>${score}</span>`;
    ladder.appendChild(li);
  });
}

function loadQuestion() {
  document.getElementById("hint-btn").disabled = false;

  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("level-display").textContent = `${currentQuestion + 1} / ${questions.length}`;
  document.getElementById("prize-display").textContent = scores[currentQuestion];

  document.querySelectorAll(".prize-ladder li").forEach(li => li.classList.remove("active-level"));
  const activeLevel = document.getElementById(`ladder-${currentQuestion}`);
  if (activeLevel) activeLevel.classList.add("active-level");

  const answerBox = document.getElementById("answers");
  answerBox.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.innerHTML = `<span class="answer-prefix">${String.fromCharCode(65 + index)}:</span> ${answer}`;
    button.onclick = () => checkAnswer(index);
    answerBox.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  const isCorrect = selectedIndex === q.correct;

  if (isCorrect) {
    showPopup(
      "Correct Answer!",
      `${q.explanation}\n\nYour score is ${scores[currentQuestion]}.`,
      currentQuestion === questions.length - 1 ? finishWinner : nextQuestion
    );
  } else {
    showPopup(
      "Try Again Next Time",
      `The correct answer is ${q.answers[q.correct]}.\n\n${q.explanation}`,
      () => finishGame()
    );
  }
}

function nextQuestion() {
  currentQuestion++;
  hidePopup();

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    finishWinner();
  }
}

function showHint() {
  const q = questions[currentQuestion];
  document.getElementById("hint-btn").disabled = true;
  showPopup("AI Hint", q.hint, hidePopup);
}

function quitGame() {
  finishGame(true);
}

function finishWinner() {
  hidePopup();
  gameScreen.classList.remove("active");
  endScreen.classList.add("active");

  document.getElementById("end-title").textContent = "Excellent Work!";
  document.getElementById("end-message").textContent =
    `Congratulations ${playerName}! You completed all questions and scored 150 points.`;
}

function finishGame(quit = false) {
  hidePopup();
  gameScreen.classList.remove("active");
  endScreen.classList.add("active");

  const previousScore = currentQuestion > 0 ? scores[currentQuestion - 1] : "0 points";
  document.getElementById("end-title").textContent = quit ? "Game Ended" : "Game Over";
  document.getElementById("end-message").textContent =
    `${playerName}, your final score is ${previousScore}.`;
}

function restartGame() {
  endScreen.classList.remove("active");
  startScreen.classList.add("active");
}

function showPopup(title, message, action) {
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup-button").onclick = action;
  popup.classList.remove("hidden");
}

function hidePopup() {
  popup.classList.add("hidden");
}

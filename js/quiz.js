let loginForm = document.getElementById("loginForm");
let nameInput = document.getElementById("name");
let passwordInput = document.getElementById("password");
let loginPage = document.getElementById("loginPage");
let quizPage = document.getElementById("quizPage");
let resultsPage = document.getElementById("resultsPage");
let loginMessage = document.getElementById("loginMessage");
let userName = document.getElementById("userName");
let question = document.getElementById("question");
let answers = document.getElementById("answers");
let currentQuestion = document.getElementById("currentQuestion");
let totalQuestions = document.getElementById("totalQuestions");
let progressBar = document.getElementById("progressBar");
let nextBtn = document.getElementById("nextBtn");
let resultName = document.getElementById("resultName");
let scorePercentage = document.getElementById("scorePercentage");
let correctAnswers = document.getElementById("correctAnswers");
let resultTotal = document.getElementById("resultTotal");
let quizDate = document.getElementById("quizDate");
let quizTime = document.getElementById("quizTime");
let restartBtn = document.getElementById("restartBtn");

let quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which language is used to style a webpage?",
    options: ["HTML", "CSS", "Python", "SQL"],
    answer: "CSS",
  },

  {
    question: "Which language is mainly used to make webpages interactive?",
    options: ["HTML", "CSS", "JavaScript", "MySQL"],
    answer: "JavaScript",
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    question: "Which CSS property changes the background color?",
    options: ["text-color", "background-color", "color-background", "bg-color"],
    answer: "background-color",
  },
  {
    question: "Which symbol is used for an ID selector in CSS?",
    options: [".", "#", "*", "@"],
    answer: "#",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["variable", "let", "varName", "declare"],
    answer: "let",
  },
  {
    question: "Which method is used to print something to the browser console?",
    options: [
      "console.print()",
      "print.console()",
      "console.log()",
      "log.console()",
    ],
    answer: "console.log()",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },

  {
    question: "Which HTML tag is used to create a button?",
    options: ["<button>", "<btn>", "<input-button>", "<click>"],
    answer: "<button>",
  },
];
let currentIndex = 0;
let score = 0;
let selectedAnswer = null;

totalQuestions.textContent = quizQuestions.length;
resultTotal.textContent = quizQuestions.length;

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let name = nameInput.value.trim();
 let password = passwordInput.value.trim();

if (password === "") {
    loginMessage.textContent = "Please enter a password.";
    loginMessage.style.color = "red";
    return;
}
  if (name === "") {
    loginMessage.textContent = "Please enter your name.";
    loginMessage.style.color = "red";
    return;
  }

  loginMessage.textContent = "";
  userName.textContent = name;
  resultName.textContent = name;

  loginPage.style.display = "none";
  quizPage.style.display = "block";
  showQuestion();
});

function showQuestion() {
  let currentQuiz = quizQuestions[currentIndex];
       question.textContent = currentQuiz.question;
       currentQuestion.textContent = currentIndex + 1;
  let progress = ((currentIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = progress + "%";
  answers.innerHTML = "";
  selectedAnswer = null;
  currentQuiz.options.forEach(function (option) {
    let answerDiv = document.createElement("div");
    answerDiv.classList.add("answer-option");
    answerDiv.textContent = option;
    answerDiv.addEventListener("click", function () {
      let allAnswers = document.querySelectorAll(".answer-option");
      allAnswers.forEach(function (answer) {
        answer.classList.remove("selected");
      });
      answerDiv.classList.add("selected");
      selectedAnswer = option;
    });
    answers.appendChild(answerDiv);
  });
  if (currentIndex === quizQuestions.length - 1) {
    nextBtn.textContent = "Submit";
  } else {
    nextBtn.textContent = "Next →";
  }
}
nextBtn.addEventListener("click", function () {
  if (selectedAnswer === null) {
    alert("Please select an answer before continuing.");
    return;
  }
  if (selectedAnswer === quizQuestions[currentIndex].answer) {
    score++;
  }
  if (currentIndex === quizQuestions.length - 1) {
    showResults();
  } else {
    currentIndex++;
    showQuestion();
  }
});

function showResults() {
  quizPage.style.display = "none";
  resultsPage.style.display = "block";
  let percentage = (score / quizQuestions.length) * 100;
  scorePercentage.textContent = percentage;
  correctAnswers.textContent = score;
  let now = new Date();
  quizDate.textContent = now.toLocaleDateString();
  quizTime.textContent = now.toLocaleTimeString();
}

restartBtn.addEventListener("click", function () {
  // Reset quiz
  currentIndex = 0;
  score = 0;
  selectedAnswer = null;
  passwordInput.value = "";
  resultsPage.style.display = "none";
  quizPage.style.display = "block";
  showQuestion();
});

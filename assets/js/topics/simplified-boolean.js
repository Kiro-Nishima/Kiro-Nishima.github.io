'use strict';
//Add event on element
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

//Navbar toggle
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);

const backTopBtn = document.querySelector("[data-back-top-btn]");

const toggleBackToTopBtn = function () {
    if (window.scrollY > 100) {
        backTopBtn.classList.add("active");
    } else {
        backTopBtn.classList.remove("active");
    }
};

const scrollToTop = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// Event listeners
window.addEventListener("scroll", toggleBackToTopBtn);
backTopBtn.addEventListener("click", scrollToTop);

  /* === Q&A === */
  const questions = [
    {
        question: "Which of the following is an example of a Boolean expression?",
        answers: [
            {text: "A) (A+B) × C" ,correct: true},
            {text: "B) A − B" ,correct: false},
            {text: "C) A ÷ B" ,correct: false},
            {text: "D) A ∪ B" ,correct: false},
        ]
    },
    {
        question: "What is the simplified form of the expression A ∧ (A∨B)?",
        answers: [
            {text: " A) A ∧ B" ,correct: false},
            {text: "B) A ∨ B" ,correct: true},
            {text: "C) A ∧ 1" ,correct: false},
            {text: "D) A ∨ 0" ,correct: false},
        ]
    },
    {
        question: "Which of the following is a correct step in simplifying Boolean expressions using the distributive law?",
        answers: [
            {text: "A) A∧(B∨C) = (A∧B)∨(A∧C)" ,correct: true},
            {text: "B) A∧(B∨C) = (A∨B)∧(A∨C)" ,correct: false},
            {text: "C) A∨(B∧C) = (A∨B)∧(A∨C)" ,correct: false},
            {text: "D) A∨(B∧C) = (A∧B)∨(A∧C)" ,correct: false},
        ]
    },
    {
        question: "What is the simplified form of the expression A ∧ A′?",
        answers: [
            {text: "A) A ∧ 1" ,correct: false},
            {text: "B) A ∧ 0" ,correct: true},
            {text: "C) A" ,correct: false},
            {text: "D) 11" ,correct: false},
        ]
    },
    {
        question: "Which of the following is a correct step in simplifying Boolean expressions using De Morgan's law?",
        answers: [
            {text: "A) ¬(A∧B) = ¬A∧B" ,correct: false},
            {text: "B) ¬(A∧B) = ¬A∨¬B" ,correct: true},
            {text: "C) ¬(A∨B) = ¬A∧¬B" ,correct: false},
            {text: "D) ¬(A∨B) = ¬A∨B" ,correct: false},
        ]
    },
  ];

  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-btn");
  const nextButton = document.getElementById("next-btn");
  const playButton = document.getElementById("play-btn");
  const topicsSection = document.getElementById("topics");
  const quizSection = document.getElementById("quiz");

  let currentQuestionIndex = 0;
  let score = 0;

  playButton.addEventListener("click", (e) => {
      e.preventDefault();
      topicsSection.classList.add("hide");
      quizSection.classList.remove("hide");
      startQuiz();
  });

  function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      shuffleQuestions();
      nextButton.innerHTML = "Next";
      showQuestion();
  }

  function shuffleQuestions() {
      for (let i = questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [questions[i], questions[j]] = [questions[j], questions[i]];
      }
  }

  function showQuestion() {
      resetState();
      let currentQuestion = questions[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

      if (currentQuestion.image) {
          const img = document.createElement("img");
          img.src = currentQuestion.image;
          img.alt = "Question image";
          img.style.display = "block";
          img.style.marginLeft = "auto";
          img.style.marginRight = "auto";
          img.style.width = "100%";
          questionElement.appendChild(img);
      }

      let numAnswers = currentQuestion.answers.length;
      if (numAnswers === 2) {
          answerButtons.classList.add("two-answers");
      } else if (numAnswers === 3) {
          answerButtons.classList.add("three-answers");
      } else {
          answerButtons.classList.remove("two-answers", "three-answers");
      }

      currentQuestion.answers.forEach(answer => {
          const button = document.createElement("button");
          button.innerHTML = answer.text;
          button.classList.add("btn-answer");
          answerButtons.appendChild(button);
          if(answer.correct) {
              button.dataset.correct = answer.correct;
          }
          button.addEventListener("click", selectAnswer);
      });
  }

  function resetState() {
      nextButton.style.display = "none";
      while(answerButtons.firstChild) {
          answerButtons.removeChild(answerButtons.firstChild);
      }
  }

  function selectAnswer(e) {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";

      if(isCorrect) {
          selectedBtn.classList.add("correct");
          score++;
      } else {
          selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach(button => {
          if(button.dataset.correct === "true") {
              button.classList.add("correct");
          }
          button.disabled = true;
      });
      nextButton.style.display = "block";
  }

  function showScore() {
      resetState();
      questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
      nextButton.innerHTML = "Play Again?";
      nextButton.style.color = "white"
      nextButton.style.display = "block";
  }

  function handleNextButton() {
      currentQuestionIndex++;
      if(currentQuestionIndex < questions.length) {
          showQuestion();
      } else {
          showScore();
      }
  }

  nextButton.addEventListener("click", () => {
      if(currentQuestionIndex < questions.length) {
          handleNextButton();
      } else {
          startQuiz();
      }
  });

  // Initialize the quiz
  startQuiz();

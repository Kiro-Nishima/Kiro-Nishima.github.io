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
        question: "Which of the following represents the Modus Ponens rule of inference?",
        answers: [
            {text: "A) If P→Q and ¬Q are true, then ¬P true." ,correct: false},
            {text: "B) If P→Q and P are true, then Q is true." ,correct: true},
            {text: "C) If P→Q and Q are true, then P is true." ,correct: false},
            {text: "D) If P and Q are true, then P∧Q is true" ,correct: false},
        ]
    },
    {
        question: "What is the rule of inference known as Modus Tollens?",
        answers: [
            {text: "A) If P→Q and ¬Q are true, then ¬P is true." ,correct: true},
            {text: "B) If P→Q and P are true, then Q is true." ,correct: false},
            {text: "C) If P→Q and ¬P are true, then ¬Q is true." ,correct: false},
            {text: "D) If P→Q and Q are true, then P is true." ,correct: false},
        ]
    },
    {
        question: "Which of the following rules of inference is known as Disjunctive Syllogism?",
        answers: [
            {text: "A) If P∧Q is true, then P is true." ,correct: false},
            {text: "B) If P∨QP or QP∨Q and ¬P are true, then Q is true." ,correct: true},
            {text: "C) If P∨QP or QP∨Q and PPP are true, then ¬Q is true." ,correct: false},
            {text: "D) If P→QP right arrow QP→Q and ¬Q are true, then ¬P is true." ,correct: false},
        ]
    },
    {
        question: "What is the rule of inference called Hypothetical Syllogism?",
        answers: [
            {text: "A) If P→Q and Q→R are true, then P→R is true." ,correct: true},
            {text: "B) If P∧Q is true, then P is true." ,correct: false},
            {text: "C) If P∨Q and ¬P are true, then Q is true." ,correct: false},
            {text: "D) If P∨Q is true, then Q∨P is true." ,correct: false},
        ]
    },
    {
        question: "Which of the following represents the rule of inference known as Addition?",
        answers: [
            {text: "A) If P is true, then P∧Q is true." ,correct: false},
            {text: "B) If P is true, then Q is true." ,correct: false},
            {text: "C) If P is true, then P∨ Q is true." ,correct: true},
            {text: "D) If P∧Q is true, then Q is true." ,correct: false},
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

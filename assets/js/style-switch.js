/* ==== TOGGLE SWITCH STYLE ==== */
const styleSwitchToggle = document.querySelector(".style-switch-toggle");
styleSwitchToggle.addEventListener('click', () => {
    document.querySelector(".style-switch").classList.toggle("open");
})

/* ==== HIDE SWITCHER ==== */
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switch").classList.contains("open")) {
        document.querySelector(".style-switch").classList.remove("open");
    }
})

/* ==== THEME ==== */
const alternateStyleLinks = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyleLinks.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

/* ==== THEME CLOSE ==== */
const styleSwitchClose = document.querySelector(".theme-close");
styleSwitchClose.addEventListener("click", () => {
    document.querySelector(".style-switch").classList.remove("open");
});

// ==== THEME LIGHT | DARK ==== //
const lumosNox = document.querySelector('.lumos-nox');
const navLogo = document.querySelector('.logo img');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add("dark");
        lumosNox.querySelector("i").classList.add("fa-sun");
        // navLogo.src = './assets/img/discreteHub_dark.svg';
    } else {
        document.body.classList.remove("dark");
        lumosNox.querySelector("i").classList.add("fa-moon");
        // navLogo.src = './assets/img/discreteHub_light.svg';
    }
}

function toggleTheme() {
    lumosNox.querySelector("i").classList.toggle("fa-sun");
    lumosNox.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem('theme', 'dark'); // Save theme to localStorage
    } else {
        localStorage.setItem('theme', 'light'); // Save theme to localStorage
    }
}

lumosNox.addEventListener("click", toggleTheme);
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme);
});
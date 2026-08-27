/* =========================
   PAGE NAVIGATION
========================= */

function goTo(screenId) {

  const screens = document.querySelectorAll(".screen");

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);

  if (target) {
    target.classList.add("active");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}


/* =========================
   HEART CHECK
========================= */

function heartCheck() {

  const heart = document.getElementById("heartButton");
  const hint = document.getElementById("tapHint");
  const next = document.getElementById("gameNext");

  heart.classList.add("clicked");

  heart.innerHTML = "♥";

  hint.innerHTML = "See? I knew you'd agree. 😂❤️";

  next.classList.remove("hidden");

  createBurst();
}


/* =========================
   MEMORY CARDS
========================= */

const cardData = {

  heart: {
    icon: "♡",
    title: "That Good Heart",
    text: "One of the things that makes you special is simply the kind of heart you have. Genuine, caring and good. Never lose that part of yourself."
  },

  kind: {
    icon: "✿",
    title: "Your Kindness",
    text: "Kindness is something people remember. The little things you do and the way you treat people say a lot about the person you are."
  },

  beauty: {
    icon: "✦",
    title: "Beautiful Soul",
    text: "Of course you're beautiful 😂❤️. But what makes it even better is that your beauty isn't just about how you look. There's something beautiful about who you are."
  },

  sister: {
    icon: "♕",
    title: "Big Sister Energy",
    text: "Being a big sister is more than just having the title. It's being someone whose presence matters. And yours genuinely does."
  }

};


function openCard(type) {

  const data = cardData[type];

  if (!data) return;

  document.getElementById("modalIcon").innerHTML = data.icon;
  document.getElementById("modalTitle").innerHTML = data.title;
  document.getElementById("modalText").innerHTML = data.text;

  document.getElementById("modal").classList.add("show");

  document.getElementById("cardsNext").classList.remove("hidden");
}


function closeCard() {

  document.getElementById("modal").classList.remove("show");
}


/* =========================
   FLOATING PARTICLES
========================= */

const particleContainer = document.getElementById("particles");

function createParticle() {

  const particle = document.createElement("span");

  const symbols = ["♡", "✦", "·", "✧"];

  particle.innerHTML =
    symbols[Math.floor(Math.random() * symbols.length)];

  particle.classList.add("particle");

  particle.style.left = Math.random() * 100 + "%";

  particle.style.fontSize =
    (8 + Math.random() * 12) + "px";

  particle.style.animationDuration =
    (7 + Math.random() * 8) + "s";

  particle.style.color =
    Math.random() > .5 ? "#f2a7c6" : "#b99cff";

  particleContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 16000);
}

setInterval(createParticle, 700);


/* =========================
   HEART BURST
========================= */

function createBurst() {

  const heart = document.getElementById("heartButton");

  const rect = heart.getBoundingClientRect();

  for (let i = 0; i < 15; i++) {

    const particle = document.createElement("span");

    particle.innerHTML = "♡";

    particle.style.position = "fixed";
    particle.style.left = rect.left + rect.width / 2 + "px";
    particle.style.top = rect.top + rect.height / 2 + "px";
    particle.style.color = "#f2a7c6";
    particle.style.fontSize = "18px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "50";

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 80;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    particle.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 1
        },
        {
          transform:
            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(.2)`,
          opacity: 0
        }
      ],
      {
        duration: 900,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      particle.remove();
    }, 950);
  }
}


/* =========================
   RESTART
========================= */

function restart() {

  const heart = document.getElementById("heartButton");
  const hint = document.getElementById("tapHint");
  const next = document.getElementById("gameNext");

  heart.innerHTML = "♡";
  heart.classList.remove("clicked");

  hint.innerHTML = "Tap the heart 👆";

  next.classList.add("hidden");

  document.getElementById("cardsNext")
    .classList.add("hidden");

  closeCard();

  goTo("intro");
}


/* =========================
   CLOSE MODAL BY BACKDROP
========================= */

document.getElementById("modal").addEventListener("click", function(e) {

  if (e.target === this) {
    closeCard();
  }

});
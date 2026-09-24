// data proyek
const projects = [
  { title: "Lisa Photoshoot", cover: "img/p1.jpg", link: "https://youtu.be/IFrsuzrRcWo?si=g9Qzpt2Gvh2A20Hp" },
  { title: "Lisa Angel", cover: "img/p2.jpg", link: "https://youtu.be/dKmPEhJ4wjY?si=WdEfFnPtgUNPDD_H" },
  { title: "LISA in YELLOW", cover: "img/p3.jpg", link: "https://youtu.be/xi1YS_HfNyY?si=V_jPO2jQN8GodgO8" },
  { title: "IVE Sports", cover: "img/p4.jpg", link: "https://youtu.be/x7_s8ZJoK_A?si=fnNp5YmQL6CcuO6S" },
  { title: "IVE Photoshoot", cover: "img/p5.jpg", link: "https://youtu.be/MK-hRnbImpU?si=r2UgsydJ-R1A90iE" },
  { title: "IVE School", cover: "img/p6.jpg", link: "https://youtu.be/Uu8MZDVypT4?si=rX8fkIrlfOMHOjjZ" },
  { title: "IVE Summer", cover: "img/p7.jpg", link: "https://youtu.be/_ApV7Lm87cg?si=Nn58wqE8DwizbUcL" }
];

const slides = {
  lisa: ["img/ss_lisa1.jpg", "img/ss_lisa2.jpg", "img/ss_lisa3.jpg", "img/ss_lisa4.jpg"],
  ive: ["img/ss_ive1.jpg", "img/ss_ive2.jpg", "img/ss_ive3.jpg", "img/ss_ive4.jpg"]
};

function menu() {
  const menuEl = document.querySelector("#menu");
  const burger = document.querySelector(".burger");
  const closeBtn = document.querySelector(".menu-close");

  if (!menuEl || !burger) return;

  const toggle = (open) => {
    menuEl.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  };

  burger.addEventListener("click", () => toggle(true));
  closeBtn.addEventListener("click", () => toggle(false));
  menuEl.addEventListener("click", (e) => {
    if (e.target.closest("a")) toggle(false);
  });
}

function heroParallax() {
  const bg = document.querySelector(".hero-bg");

  if (bg) {
    window.addEventListener("scroll", () => {
      const p = window.scrollY / window.innerHeight;
      if (p <= 1) {
        bg.style.transform = `translateY(${p * 30}%) scale(${1 + p * 0.25})`;
      }
    });
  }
}

function wipeEffect() {
  const sections = document.querySelectorAll(".wipe-section");

  function cekPosisi() {
    sections.forEach((s) => {
      const rect = s.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        s.classList.add("in");
      }
    });
  }

  window.addEventListener("scroll", cekPosisi);
  cekPosisi();
}

// slideshow lisa
function lisaSlideshow() {
  const box = document.querySelector("#lisa-slides");
  if (!box) return;

  box.innerHTML = slides.lisa.map((src, i) => `<img src="${src}" alt="" class="${i === 0 ? "on" : ""}">`).join("");

  let i = 0;
  const imgs = box.querySelectorAll("img");
  setInterval(() => {
    imgs[i].classList.remove("on");
    i = (i + 1) % imgs.length;
    imgs[i].classList.add("on");
    box.classList.add("glitch");
    setTimeout(() => box.classList.remove("glitch"), 700);
  }, 5000);
}

// slideshow ive
function iveSlideshow() {
  const box = document.querySelector("#ive-slides");
  if (!box) return;

  box.innerHTML = slides.ive.map((src, i) => `<img src="${src}" alt="" class="${i === 0 ? "on" : ""}">`).join("");

  let i = 0;
  const imgs = box.querySelectorAll("img");
  setInterval(() => {
    imgs[i].classList.remove("on");
    i = (i + 1) % imgs.length;
    imgs[i].classList.add("on");
    box.classList.add("glitch");
    setTimeout(() => box.classList.remove("glitch"), 700);
  }, 5000);
}

// project card
function renderTiles() {
  const grid = document.querySelector(".tiles");
  if (!grid) return;

  let htmlContent = "";
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    htmlContent += `
      <li class="tile">
        <a href="${proj.link}" target="_blank" rel="noopener noreferrer" aria-label="${proj.title}, view">
          <img src="${proj.cover}" alt="" loading="lazy">
          <span class="tile-text">
            <h3>${proj.title}</h3>
            <span class="tile-view">VIEW></span>
          </span>
        </a>
      </li>`;
  }
  grid.innerHTML = htmlContent;
}

// form subscribe
function subscribeForm() {
  const form = document.querySelector("#subscribe");
  if (!form) return;
  const msg = form.querySelector(".msg");
  const btn = form.querySelector("button");

  form.addEventListener("input", () => {
    msg.textContent = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.elements.email.value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = "Enter a valid email address.";
      return;
    }

    msg.textContent = "Sending...";
    btn.disabled = true;
    btn.style.opacity = "0.5";

    setTimeout(() => {
      alert("Thanks for submitting!");
      form.reset();
      msg.textContent = "";
      btn.disabled = false;
      btn.style.opacity = "1";
    }, 1500);
  });
}

menu();
heroParallax();
wipeEffect();
lisaSlideshow();
iveSlideshow();
renderTiles();
subscribeForm();
const carousel = document.getElementById("heroCarousel");
const track = carousel.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = carousel.querySelector(".next");
const prevBtn = carousel.querySelector(".prev");
const dotsContainer = carousel.querySelector(".carousel-dots");

let index = 0;

/* Create dots */
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function goToSlide(i) {
  index = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach(d => d.classList.remove("active"));
  dots[i].classList.add("active");
}

nextBtn.onclick = () => goToSlide((index + 1) % slides.length);
prevBtn.onclick = () => goToSlide((index - 1 + slides.length) % slides.length);

/* Optional auto-play */
//setInterval(() => {
//  goToSlide((index + 1) % slides.length);
//}, 6000);

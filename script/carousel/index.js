const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Clone first and last slide
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const updatedSlides = Array.from(track.children);
let currentIndex = 1;
const slideWidth = slides[0].getBoundingClientRect().width;

track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

function updateSlide() {
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

track.addEventListener("transitionend", () => {
  if (updatedSlides[currentIndex] === firstClone) {
    track.style.transition = "none";
    currentIndex = 1;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  if (updatedSlides[currentIndex] === lastClone) {
    track.style.transition = "none";
    currentIndex = updatedSlides.length - 2;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex >= updatedSlides.length - 1) return;
  currentIndex++;
  updateSlide();
});

prevButton.addEventListener("click", () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateSlide();
});

// Optional autoplay
setInterval(() => {
  currentIndex++;
  updateSlide();
}, 5000);
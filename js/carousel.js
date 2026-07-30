/*=========================================
        PROJECTS CAROUSEL v3
        PART 1 / 4
=========================================*/

const slider = document.querySelector(".projects-slider");
const viewport = document.querySelector(".projects-viewport");
const track = document.querySelector(".projects-track");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dotsContainer = document.querySelector(".slider-dots");

if (
    slider &&
    viewport &&
    track &&
    prevBtn &&
    nextBtn &&
    dotsContainer
) {

    let cards = [];
    let currentIndex = 0;
    let cardsPerView = 3;

    let GAP = 32;

    let cardWidth = 0;

    let autoplay = null;

    let isAnimating = false;

    let startX = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let isDragging = false;

    /*=========================
            Responsive
    =========================*/

    function updateCardsPerView() {

        if (window.innerWidth < 768) {

            cardsPerView = 1;

        }

        else if (window.innerWidth < 1024) {

            cardsPerView = 2;

        }

        else {

            cardsPerView = 3;

        }

    }

    updateCardsPerView();

    /*=========================
            Build Clones
    =========================*/

const originalCards = [...track.children];

function buildCarousel() {

    track.innerHTML = "";

    cards = originalCards.map(card => card.cloneNode(true));

    const before = cards
        .slice(-cardsPerView)
        .map(card => {

            const clone = card.cloneNode(true);
            clone.classList.add("clone");
            return clone;

        });

    const after = cards
        .slice(0, cardsPerView)
        .map(card => {

            const clone = card.cloneNode(true);
            clone.classList.add("clone");
            return clone;

        });

    before.forEach(card => track.appendChild(card));

    cards.forEach(card => track.appendChild(card));

    after.forEach(card => track.appendChild(card));

    currentIndex = cardsPerView;

}

    buildCarousel();

    /*=========================
            Measurements
    =========================*/

function updateMeasurements() {

    const firstCard = track.querySelector(".project-card");

    if (!firstCard) return;

    GAP = parseFloat(getComputedStyle(track).columnGap) ||
          parseFloat(getComputedStyle(track).gap) ||
          0;

    cardWidth = firstCard.offsetWidth + GAP;

}

    updateMeasurements();

    /*=========================
            Translate
    =========================*/

    function moveTo(index, animate = true) {

        if (animate) {

            track.style.transition =
                "transform .65s cubic-bezier(.22,.61,.36,1)";

        }

        else {

            track.style.transition = "none";

        }

        currentTranslate =
            -(index * cardWidth);

        previousTranslate =
            currentTranslate;

        track.style.transform =
            `translateX(${currentTranslate}px)`;

    }

    moveTo(currentIndex, false);

    /*=========================
            Active Card
    =========================*/

    function updateActiveCard() {

        const allCards =
            [...track.children];

        allCards.forEach(card =>
            card.classList.remove("active")
        );

        let activeIndex =
            currentIndex + 1;

        if (cardsPerView === 1)
            activeIndex = currentIndex;

        if (cardsPerView === 2)
            activeIndex = currentIndex;

        const active =
            allCards[activeIndex];

        if (active)
            active.classList.add("active");

    }

    updateActiveCard();
        /*=========================
            Dots
    =========================*/

    function buildDots() {

        dotsContainer.innerHTML = "";

        cards.forEach((_, index) => {

            const dot = document.createElement("button");

            dot.className = "dot";

            dot.dataset.index = index;

            dotsContainer.appendChild(dot);

        });

    }

    buildDots();

    function updateDots() {

        const dots = [...dotsContainer.children];

        dots.forEach(dot =>
            dot.classList.remove("active")
        );

        let index = currentIndex - cardsPerView;

        if (index < 0)
            index = cards.length - 1;

        if (index >= cards.length)
            index = 0;

        dots[index]?.classList.add("active");

    }

    updateDots();

    /*=========================
            Slide
    =========================*/

    function slideTo(index) {

        if (isAnimating) return;

        isAnimating = true;

        currentIndex = index;

        moveTo(currentIndex);

        updateActiveCard();

        updateDots();

    }

    function nextSlide() {

        slideTo(currentIndex + 1);

    }

    function prevSlide() {

        slideTo(currentIndex - 1);

    }

    /*=========================
            Infinite Loop
    =========================*/

    track.addEventListener("transitionend", () => {

        if (
            currentIndex >=
            cards.length + cardsPerView
        ) {

            currentIndex = cardsPerView;

            moveTo(currentIndex, false);

        }

        if (
            currentIndex < cardsPerView
        ) {

            currentIndex =
                cards.length + cardsPerView - 1;

            moveTo(currentIndex, false);

        }

        updateActiveCard();

        updateDots();

        isAnimating = false;

    });

    /*=========================
            Buttons
    =========================*/

    nextBtn.addEventListener("click", () => {

        nextSlide();

    });

    prevBtn.addEventListener("click", () => {

        prevSlide();

    });

    /*=========================
            Keyboard
    =========================*/

    document.addEventListener("keydown", e => {

        if (e.key === "ArrowRight") {

            nextSlide();

        }

        if (e.key === "ArrowLeft") {

            prevSlide();

        }

    });

    /*=========================
            Dots Click
    =========================*/

    dotsContainer.addEventListener("click", e => {

        if (!e.target.classList.contains("dot"))
            return;

        const index =
            Number(e.target.dataset.index);

        slideTo(index + cardsPerView);

    });
        /*=========================
            Auto Play
    =========================*/

    function startAutoplay() {

        stopAutoplay();

        autoplay = setInterval(() => {

            nextSlide();

        }, 2500);

    }

    function stopAutoplay() {

        if (autoplay) {

            clearInterval(autoplay);

        }

    }

    slider.addEventListener("mouseenter", stopAutoplay);

    slider.addEventListener("mouseleave", startAutoplay);

    /*=========================
            Drag
    =========================*/

    function dragStart(e) {

        isDragging = true;

        stopAutoplay();

        startX =
            e.type.includes("mouse")
                ? e.pageX
                : e.touches[0].clientX;

        track.style.transition = "none";

    }

    function dragMove(e) {

        if (!isDragging) return;

        const currentX =
            e.type.includes("mouse")
                ? e.pageX
                : e.touches[0].clientX;

        const distance =
            currentX - startX;

        currentTranslate =
            previousTranslate + distance;

        track.style.transform =
            `translateX(${currentTranslate}px)`;

    }

    function dragEnd() {

        if (!isDragging) return;

        isDragging = false;

        const moved =
            currentTranslate - previousTranslate;

        if (moved < -80) {

            currentIndex++;

        }

        else if (moved > 80) {

            currentIndex--;

        }

        moveTo(currentIndex);

        updateActiveCard();

        updateDots();

        startAutoplay();

    }

    viewport.addEventListener("mousedown", dragStart);

    viewport.addEventListener("mousemove", dragMove);

    viewport.addEventListener("mouseup", dragEnd);

    viewport.addEventListener("mouseleave", dragEnd);

    viewport.addEventListener("touchstart", dragStart);

    viewport.addEventListener("touchmove", dragMove);

    viewport.addEventListener("touchend", dragEnd);
        /*=========================
            Prevent Image Drag
    =========================*/

    track.querySelectorAll("img").forEach(img => {

        img.draggable = false;

    });

    /*=========================
            Resize
    =========================*/

    window.addEventListener("resize", () => {

        stopAutoplay();

        updateCardsPerView();

        buildCarousel();

        updateMeasurements();

        moveTo(cardsPerView, false);

        buildDots();

        updateActiveCard();

        updateDots();

        startAutoplay();

    });

    /*=========================
            Visibility
    =========================*/

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            stopAutoplay();

        }

        else {

            startAutoplay();

        }

    });

    /*=========================
            Init
    =========================*/

    updateMeasurements();

    moveTo(currentIndex, false);

    updateActiveCard();

    updateDots();

    startAutoplay();

}
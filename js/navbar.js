/*=========================================
            ACTIVE NAVIGATION
=========================================*/

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveLink() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${sectionId}`) {

                    link.classList.add("active");

                }

            });

        }

    });

}

let ticking = false;

window.addEventListener("scroll", () => {

    if (!ticking) {

        requestAnimationFrame(() => {

            setActiveLink();
            ticking = false;

        });

        ticking = true;

    }

});

window.addEventListener("load", setActiveLink);

/*=========================================
            MOBILE MENU
=========================================*/

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        menuBtn.classList.toggle("active");
        mobileMenu.classList.toggle("active");

    });

    mobileMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            menuBtn.classList.remove("active");
            mobileMenu.classList.remove("active");

        });

    });

    document.addEventListener("click", (e) => {

        if (
            !menuBtn.contains(e.target) &&
            !mobileMenu.contains(e.target)
        ) {

            menuBtn.classList.remove("active");
            mobileMenu.classList.remove("active");

        }

    });

}

/* =========================
   1. MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close the menu after clicking a navigation link.
    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Close the menu when switching to desktop width.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
}


/* =========================
   2. SCROLL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    // Show content immediately if animations are unsupported
    // or the visitor prefers reduced motion.
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* =========================
   3. AUTOMATIC COPYRIGHT YEAR
========================= */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================
   4. HERO IMAGE FALLBACK
========================= */

document.querySelectorAll(".hero-image, .about-image, .winzy-image")
    .forEach((image) => {
        image.addEventListener("error", () => {
            image.style.display = "none";
        });
    });


/* =========================
   5. HOMEPAGE READY
========================= */

console.log("Missi Auto Spa homepage is ready.");

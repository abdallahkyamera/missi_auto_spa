
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
}

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Set the current year
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Booking form
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");
const visitDate = document.getElementById("visitDate");

// Prevent selecting a date in the past
if (visitDate) {
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  visitDate.min = localToday;
}

if (bookingForm && formMessage) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    if (visitDate && visitDate.value && visitDate.value < visitDate.min) {
      formMessage.textContent = "Please choose today or a future date.";
      formMessage.className = "form-message error";
      visitDate.focus();
      return;
    }

    const formData = new FormData(bookingForm);

    const booking = {
      name: formData.get("fullName").trim(),
      phone: formData.get("phone").trim(),
      email: formData.get("email").trim(),
      service: formData.get("service"),
      date: formData.get("visitDate") || "Not specified",
      message: formData.get("message").trim()
    };

    // Prepare a booking message for WhatsApp.
    const message = [
      "MISSI AUTO SPA - BOOKING ENQUIRY",
      "",
      `Name: ${booking.name}`,
      `Phone: ${booking.phone}`,
      `Email: ${booking.email || "Not provided"}`,
      `Service: ${booking.service}`,
      `Preferred date: ${booking.date}`,
      `Message: ${booking.message || "No additional message"}`
    ].join("\n");

    // Add the business WhatsApp number here when available.
    // Use the international number without +, spaces or dashes.
    const BUSINESS_WHATSAPP = "+256776356325";

    if (!BUSINESS_WHATSAPP) {
      formMessage.textContent =
        "Your booking request is ready, but it has not been sent. Add the business WhatsApp number in js/contact.js to enable sending.";
      formMessage.className = "form-message success";

      console.log("Prepared booking request:", booking);
      return;
    }

    const whatsappURL =
      `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    formMessage.textContent =
      "Your booking message has been prepared in WhatsApp. Send it there to complete your enquiry.";
    formMessage.className = "form-message success";
  });
}

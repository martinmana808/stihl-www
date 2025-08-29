// Main JavaScript file for STIHL Shop website

document.addEventListener("DOMContentLoaded", function () {
  // Accordion functionality
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all accordion items
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.backgroundColor = "#FFFFFF";
      header.style.backdropFilter = "none";
    }

    lastScrollTop = scrollTop;
  });

  // Testimonial carousel functionality
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot");
  const testimonials = [
    {
      quote:
        "Had a wonderful experience. The very friendly team were able to sort me out with the best gear suitable for my needs.",
      author: "Darren Smith",
    },
    {
      quote:
        "Excellent service and expert advice. They really know their stuff when it comes to outdoor power equipment.",
      author: "Sarah Johnson",
    },
    {
      quote:
        "Fast turnaround on repairs and great prices. Highly recommend for all your STIHL needs.",
      author: "Mike Thompson",
    },
  ];

  let currentTestimonial = 0;

  function updateTestimonial(index) {
    const testimonial = document.querySelector(".testimonial blockquote");
    const author = document.querySelector(".testimonial cite");

    testimonial.textContent = testimonials[index].quote;
    author.textContent = `- ${testimonials[index].author}`;

    // Update dots
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentTestimonial = index;
      updateTestimonial(index);
    });
  });

  // Auto-rotate testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
  }, 5000);

  // Product card hover effects
  const productCards = document.querySelectorAll(".product-cardo");

  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Article card hover effects
  const articleCards = document.querySelectorAll(".article-carda");

  articleCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Button click handlers
  const shopButtons = document.querySelectorAll(".btn-primary");

  shopButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add your shop functionality here
      console.log("Shop button clicked");
      alert("Shop functionality would be implemented here!");
    });
  });

  const bookButtons = document.querySelectorAll(".btn-outline");

  bookButtons.forEach((button) => {
    if (button.textContent.includes("Book")) {
      button.addEventListener("click", function () {
        // Add your booking functionality here
        console.log("Booking button clicked");
        alert("Booking functionality would be implemented here!");
      });
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections for animation
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Mobile menu toggle (for future implementation)
  const mobileMenuToggle = document.createElement("button");
  mobileMenuToggle.className = "mobile-menu-toggle";
  mobileMenuToggle.innerHTML = "☰";
  mobileMenuToggle.style.display = "none";

  const headerContent = document.querySelector(".header-content");
  headerContent.appendChild(mobileMenuToggle);

  // Show mobile menu toggle on small screens
  function checkMobileMenu() {
    if (window.innerWidth <= 768) {
      mobileMenuToggle.style.display = "block";
      document.querySelector(".nav").style.display = "none";
    } else {
      mobileMenuToggle.style.display = "none";
      document.querySelector(".nav").style.display = "flex";
    }
  }

  checkMobileMenu();
  window.addEventListener("resize", checkMobileMenu);

  // Mobile menu functionality
  mobileMenuToggle.addEventListener("click", () => {
    const nav = document.querySelector(".nav");
    nav.style.display = nav.style.display === "none" ? "flex" : "none";
  });

  // Form validation (for future contact forms)
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add your form validation and submission logic here
      console.log("Form submitted");
      alert("Form submission would be implemented here!");
    });
  });

  // Lazy loading for images (if needed)
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Console log for debugging
  console.log("STIHL Shop website loaded successfully!");

  // Performance monitoring
  window.addEventListener("load", () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  });
});

// FLICKITY SHIT
// 1) Init with imagesLoaded so Flickity re-measures after images load
const el = document.querySelector(".js-reviews"); // your carousel element
const flkty = new Flickity(el, {
  cellAlign: "left",
  contain: true,
  pageDots: false,
  prevNextButtons: true,
  setGallerySize: true, // default, but keep it explicit
  imagesLoaded: true, // <-- important
});

// 2) Force a resize after fonts & other async layout shifts
window.addEventListener("load", () => flkty.resize());

// 3) If you have dynamic content (webfonts, JS-injected text, etc.),
//    lock the viewport to the tallest cell as a fallback.
function setTallestViewport() {
  const cells = el.querySelectorAll(".carousel-cell");
  if (!cells.length) return;
  const maxH = Math.max(
    ...[...cells].map((c) => c.offsetHeight || c.getBoundingClientRect().height),
  );
  const viewport = el.querySelector(".flickity-viewport");
  if (viewport) viewport.style.height = `${maxH}px`;
}

flkty.on("ready", setTallestViewport);
flkty.on("cellSelect", setTallestViewport);
window.addEventListener("resize", setTallestViewport);

document.querySelector(".reviews-arrow--prev").addEventListener("click", () => flkty.previous());

document.querySelector(".reviews-arrow--next").addEventListener("click", () => flkty.next());

// Optional: disable arrows at ends when not wrapping
function updateArrows() {
  const i = flkty.selectedIndex;
  const last = flkty.slides.length - 1;
  document.querySelector(".reviews-arrow--prev").toggleAttribute("disabled", i === 0);
  document.querySelector(".reviews-arrow--next").toggleAttribute("disabled", i === last);
}
flkty.on("select", updateArrows);
updateArrows();

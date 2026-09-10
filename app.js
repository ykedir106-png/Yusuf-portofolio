// ==========================================
// YUSUF KEDIR | PORTFOLIO
// Main JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------
  // MOBILE MENU
  // ------------------------------------------

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll("#navLinks a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }


  // ------------------------------------------
  // DARK / LIGHT MODE
  // ------------------------------------------

  const themeToggle = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  function updateThemeIcon() {
    if (!themeToggle) return;

    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = "☀️";
      themeToggle.setAttribute("aria-label", "Light Mode");
    } else {
      themeToggle.textContent = "🌙";
      themeToggle.setAttribute("aria-label", "Dark Mode");
    }
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("dark");

      const isDark =
        document.body.classList.contains("dark");

      localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
      );

      updateThemeIcon();
    });
  }


  // ------------------------------------------
  // CURRENT YEAR
  // ------------------------------------------

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // ------------------------------------------
  // CONTACT FORM
  // ------------------------------------------

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const name =
        document.getElementById("contactName")?.value.trim();

      const email =
        document.getElementById("contactEmail")?.value.trim();

      const message =
        document.getElementById("contactMessage")?.value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all fields.", "error");
        return;
      }

      showToast(
        "Thank you! Your message has been received.",
        "success"
      );

      contactForm.reset();
    });
  }


  // ------------------------------------------
  // ADMIN LOGIN
  // ------------------------------------------

  const adminForm = document.getElementById("adminLoginForm");

  if (adminForm) {

    adminForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const email =
        document.getElementById("adminEmail")?.value.trim();

      const password =
        document.getElementById("adminPassword")?.value;

      if (!email || !password) {
        showToast(
          "Please enter your email and password.",
          "error"
        );
        return;
      }

      // Supabase authentication will be connected
      // in the next step.

      showToast(
        "Supabase authentication will be connected next.",
        "info"
      );
    });
  }


  // ------------------------------------------
  // SMOOTH SCROLL
  // ------------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });

  });


  // ------------------------------------------
  // PWA SERVICE WORKER
  // ------------------------------------------

  if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

      navigator.serviceWorker
        .register("./sw.js")
        .then(() => {
          console.log("Service Worker registered.");
        })
        .catch(error => {
          console.log(
            "Service Worker registration failed:",
            error
          );
        });

    });

  }


  // ------------------------------------------
  // TOAST FUNCTION
  // ------------------------------------------

  window.showToast = function(message, type = "info") {

    let toast =
      document.getElementById("toast");

    if (!toast) {
      return;
    }

    toast.textContent = message;

    toast.className = "toast show";

    if (type === "success") {
      toast.classList.add("success");
    }

    if (type === "error") {
      toast.classList.add("error");
    }

    if (type === "info") {
      toast.classList.add("info");
    }

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  };


  // ------------------------------------------
  // ACTIVE NAVIGATION
  // ------------------------------------------

  const sections =
    document.querySelectorAll("section[id]");

  const navItems =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );

  function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }

    });

    navItems.forEach(link => {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveNav
  );

  updateActiveNav();


  // ------------------------------------------
  // SCROLL REVEAL
  // ------------------------------------------

  const revealElements =
    document.querySelectorAll(
      ".card, .skill-card, .project-card, .blog-card"
    );

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  }


  console.log(
    "Yusuf Kedir Portfolio loaded successfully."
  );

});

document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // MENU
  // ================================
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

  // ================================
  // DARK MODE
  // ================================
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

      localStorage.setItem(
        "portfolio-theme",
        document.body.classList.contains("dark")
          ? "dark"
          : "light"
      );

      updateThemeIcon();
    });
  }

  // ================================
  // YEAR
  // ================================
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ================================
  // CONTACT FORM
  // ================================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
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

      try {
        const { error } = await window.supabaseClient
          .from("messages")
          .insert([
            {
              name: name,
              email: email,
              message: message
            }
          ]);

        if (error) throw error;

        showToast(
          "Your message has been sent successfully! ✅",
          "success"
        );

        contactForm.reset();

      } catch (error) {
        console.error("Message error:", error);

        showToast(
          "Failed to send message.",
          "error"
        );
      }
    });
  }

  // ================================
  // ADMIN LOGIN
  // ================================
  const adminForm =
    document.getElementById("adminLoginForm");

  if (adminForm) {

    adminForm.addEventListener("submit", async (event) => {

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

      try {

        showToast("Signing in...", "info");

        // Supabase Authentication
        const { data, error } =
          await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
          });

        if (error) {
          throw error;
        }

        const user = data.user;

        if (!user) {
          throw new Error("User not found.");
        }

        // Check ADMIN role
        const { data: profile, error: profileError } =
          await window.supabaseClient
            .from("profiles")
            .select("id, full_name, role")
            .eq("id", user.id)
            .single();

        if (profileError) {
          throw profileError;
        }

        if (!profile || profile.role !== "admin") {

          await window.supabaseClient.auth.signOut();

          showToast(
            "This account is not an admin.",
            "error"
          );

          return;
        }

        // Successful admin login
        showToast(
          "Admin login successful! 🎉",
          "success"
        );

        // Hide login section
        const adminSection =
          document.getElementById("admin");

        if (adminSection) {
          adminSection.scrollIntoView({
            behavior: "smooth"
          });
        }

        // Store admin state
        sessionStorage.setItem(
          "portfolio-admin",
          "true"
        );

        console.log(
          "✅ ADMIN LOGIN SUCCESS:",
          profile.full_name
        );

      } catch (error) {

        console.error("Admin login error:", error);

        showToast(
          error.message || "Login failed.",
          "error"
        );
      }
    });
  }

  // ================================
  // SMOOTH SCROLL
  // ================================
  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener("click", function(event) {

        const targetId =
          this.getAttribute("href");

        if (!targetId || targetId === "#") return;

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

  // ================================
  // SERVICE WORKER
  // ================================
  if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

      navigator.serviceWorker
        .register("./sw.js")
        .then(() => {
          console.log(
            "✅ Service Worker registered."
          );
        })
        .catch(error => {
          console.error(
            "Service Worker error:",
            error
          );
        });

    });
  }

  // ================================
  // TOAST
  // ================================
  window.showToast = function (
    message,
    type = "info"
  ) {

    const toast =
      document.getElementById("toast");

    if (!toast) return;

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

  // ================================
  // ACTIVE NAV
  // ================================
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
        currentSection =
          section.getAttribute("id");
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

  console.log(
    "🚀 Yusuf Kedir Portfolio loaded."
  );

});

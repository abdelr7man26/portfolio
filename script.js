const header = document.getElementById("site-header");
const navToggle = document.getElementById("navToggle");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
};

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

const progressBar = document.getElementById("scrollProgress");

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${pct}%`;
};

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("show", window.scrollY > 500);
    },
    { passive: true }
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("in-view"));
}

document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const value = btn.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      const original = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => {
        btn.textContent = original;
      }, 1500);
    } catch (err) {
      btn.textContent = "Copy failed";
    }
  });
});
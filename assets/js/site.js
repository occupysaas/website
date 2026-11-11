// Theme toggle. The initial theme is applied inline in <head> to avoid a flash.
const root = document.documentElement;
const themeToggles = document.querySelectorAll("[data-theme-toggle]");

function syncTheme() {
  const isDark = root.classList.contains("dark");
  for (const button of themeToggles) {
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }
}

for (const button of themeToggles) {
  button.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {}
    syncTheme();
  });
}

syncTheme();

// Mobile navigation
const navToggle = document.querySelector("[data-nav-toggle]");
const mobileNav = document.getElementById("mobile-nav");

function setMobileNav(open) {
  if (!navToggle || !mobileNav) return;
  mobileNav.classList.toggle("hidden", !open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    setMobileNav(mobileNav.classList.contains("hidden"));
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMobileNav(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileNav(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMobileNav(false);
  });
}

// Refresh GitHub star counts. If the request fails or is rate-limited,
// the counts written in index.html stay on the page.
fetch("https://api.github.com/orgs/occupysaas/repos?per_page=100")
  .then((response) => (response.ok ? response.json() : []))
  .then((repos) => {
    for (const repo of repos) {
      const count = document.querySelector(`[data-stars="${repo.name}"]`);
      if (count) count.textContent = repo.stargazers_count.toLocaleString("en-US");
    }
  })
  .catch(() => {});

// Reveal sections as they scroll into view. Without JS the content stays visible.
const revealed = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && window.gsap && window.ScrollTrigger) {
  root.classList.add("gsap");
  const { gsap } = window;
  const { ScrollTrigger } = window;

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(revealed, { autoAlpha: 0, y: 16 });

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .from("header nav", { y: -12, autoAlpha: 0, duration: 0.55 }, 0)
    .from("#top h1 .block", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.08)
    .from("#top .wrap > div:first-child > p, #top .wrap > div:first-child > div", {
      y: 16,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.05,
    }, 0.3)
    .from("#top .relative img", { scale: 0.97, autoAlpha: 0, duration: 0.9 }, 0.2);

  ScrollTrigger.batch(revealed, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        overwrite: true,
      }),
  });

  document.querySelectorAll(".project-details").forEach((details) => {
    const panel = details.querySelector("div");
    if (!panel) return;
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      gsap.fromTo(panel, { y: -6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.25, ease: "power2.out" });
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );

  revealed.forEach((element) => observer.observe(element));
} else {
  revealed.forEach((element) => element.classList.add("is-in"));
}

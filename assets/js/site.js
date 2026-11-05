// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

links.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Refresh GitHub star counts. If the request fails or is rate-limited,
// the counts written in index.html stay on the page.
fetch("https://api.github.com/orgs/occupysaas/repos?per_page=100")
  .then((res) => (res.ok ? res.json() : []))
  .then((repos) => {
    for (const repo of repos) {
      const count = document.querySelector(`[data-stars="${repo.name}"]`);
      if (count) count.textContent = repo.stargazers_count.toLocaleString("en-US");
    }
  })
  .catch(() => {});

// Fade sections in as they scroll into view
const revealed = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: "0px 0px -10% 0px" });
  revealed.forEach((el) => io.observe(el));
} else {
  revealed.forEach((el) => el.classList.add("is-in"));
}

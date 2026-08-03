(function () {
  const root = document.documentElement;

  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      root.dataset.theme = saved;
    }
  } catch (err) {
    /* storage unavailable, keep default */
  }

  const themeBtn = document.getElementById("theme-toggle");
  themeBtn &&
    themeBtn.addEventListener("click", function () {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (err) {
        /* storage unavailable */
      }
    });

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const bar = document.querySelector(".progress-bar");
  if (bar) {
    const update = function () {
      const max = root.scrollHeight - root.clientHeight;
      const ratio = max > 0 ? root.scrollTop / max : 0;
      bar.style.width = ratio * 100 + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }
})();

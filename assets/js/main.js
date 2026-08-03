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
  const musicScript = document.currentScript;
  const musicBase = musicScript && musicScript.src
    ? musicScript.src.replace(/\/js\/main\.js[^/]*$/, "")
    : "assets/";

  const audio = document.createElement("audio");
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.4;
  audio.src = musicBase + "audio/background-music.wav";

  const musicBtn = document.createElement("button");
  musicBtn.type = "button";
  musicBtn.className = "music-btn";
  musicBtn.title = "播放背景音乐";
  musicBtn.setAttribute("aria-label", "播放背景音乐");
  musicBtn.setAttribute("aria-pressed", "false");
  musicBtn.innerHTML =
    '<svg class="music-icon icon-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"></path></svg>' +
    '<svg class="music-icon icon-pause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.2v14H7zM13.8 5H17v14h-3.2z"></path></svg>';

  let musicOn = true;
  try {
    musicOn = localStorage.getItem("musicOn") !== "0";
  } catch (err) {
    /* storage unavailable, keep music on */
  }

  function setMusicState(playing) {
    musicBtn.classList.toggle("is-playing", playing);
    musicBtn.setAttribute("aria-pressed", String(playing));
    musicBtn.setAttribute("aria-label", playing ? "暂停背景音乐" : "播放背景音乐");
    musicBtn.title = playing ? "暂停背景音乐" : "播放背景音乐";
  }

  function startMusic() {
    const p = audio.play();
    if (p && p.catch) {
      p.catch(function () { });
    }
  }

  musicBtn.addEventListener("click", function () {
    if (audio.paused) {
      startMusic();
      musicOn = true;
    } else {
      audio.pause();
      musicOn = false;
    }
    try {
      localStorage.setItem("musicOn", musicOn ? "1" : "0");
    } catch (err) {
      /* storage unavailable */
    }
  });

  audio.addEventListener("play", function () {
    setMusicState(true);
  });
  audio.addEventListener("pause", function () {
    setMusicState(false);
  });

  function tryAutoplay() {
    if (musicOn && audio.paused) {
      startMusic();
    }
  }

  if (audio.readyState >= 3) {
    tryAutoplay();
  } else {
    audio.addEventListener("loadeddata", tryAutoplay, { once: true });
  }

  ["pointerdown", "keydown", "touchstart"].forEach(function (type) {
    window.addEventListener(type, tryAutoplay, { passive: true });
  });

  document.body.appendChild(audio);
  document.body.appendChild(musicBtn);




})();

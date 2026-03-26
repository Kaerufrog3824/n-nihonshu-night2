/* ===================================================
   N 日本酒 Night — Main Application
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initNavbar();
  initReveal();
  renderLineup();
  initDiagnosis();
});

/* --------------------------------------------------
   Particle Background (Canvas)
   -------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height, particles;
  const PARTICLE_COUNT = 60;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;

      // Wrap
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 110, ${p.alpha})`;
      ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59, 111, 212, ${0.08 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
}

/* --------------------------------------------------
   Navbar Scroll Effect
   -------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });

    // Close on link click
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        links.classList.remove("open");
      });
    });
  }
}

/* --------------------------------------------------
   Scroll Reveal
   -------------------------------------------------- */
function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------
   Render Lineup Cards
   -------------------------------------------------- */
function renderLineup() {
  const grid = document.getElementById("lineup-grid");
  if (!grid || typeof SAKE_LIST === "undefined") return;

  const axisLabels = {
    sweetDry: "甘さ",
    richLight: "濃醇さ",
    aroma: "フルーティーさ",
    mouthfeel: "まろやかさ",
  };

  SAKE_LIST.forEach((sake, index) => {
    const card = document.createElement("div");
    card.className = "sake-card";
    card.style.transitionDelay = `${index * 0.06}s`;

    const profileHTML = Object.entries(axisLabels)
      .map(([key, label]) => {
        const val = sake[key];
        const pct = (val / 5) * 100;
        return `
          <div class="profile-item">
            <span class="profile-item-label">${label}</span>
            <div class="profile-bar">
              <div class="profile-bar-fill" style="width: ${pct}%"></div>
            </div>
          </div>`;
      })
      .join("");

    // Extract short name (first word/part before space) for placeholder
    const shortName = sake.name.split(/\s+/)[0];

    card.innerHTML = `
      <div class="sake-card-visual">
        <div class="sake-card-placeholder">
          <span class="sake-card-placeholder-num">#${String(sake.id).padStart(2, "0")}</span>
          <span class="sake-card-placeholder-name">${shortName}</span>
          <span class="sake-card-placeholder-type">${sake.type}</span>
        </div>
        ${sake.image ? `<img src="${sake.image}" alt="${sake.name}" class="sake-card-img" onerror="this.remove()">` : ""}
      </div>
      <div class="sake-card-body">
        <h3 class="sake-card-name">${sake.name}</h3>
        <span class="sake-card-type">${sake.type}</span>
        <p class="sake-card-meta">${sake.brewery}（${sake.region}）</p>
        <p class="sake-card-desc">${sake.desc}</p>
        <div class="sake-profile">${profileHTML}</div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Observe cards for staggered reveal
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  grid.querySelectorAll(".sake-card").forEach((card) => cardObserver.observe(card));
}

/* --------------------------------------------------
   Diagnosis System — Step-by-Step Wizard
   -------------------------------------------------- */
function initDiagnosis() {
  const intro = document.getElementById("diag-intro");
  const wizard = document.getElementById("diag-wizard");
  const analyzing = document.getElementById("diag-analyzing");
  const resultsSection = document.getElementById("diagnosis-results");
  const startBtn = document.getElementById("diag-start-btn");
  const prevBtn = document.getElementById("diag-prev");
  const nextBtn = document.getElementById("diag-next");
  const retryBtn = document.getElementById("retry-btn");
  const slides = document.querySelectorAll(".diag-slide");
  const progressFill = document.getElementById("diag-progress-fill");
  const stepDots = document.querySelectorAll(".diag-step-dot");
  const stepCounter = document.getElementById("diag-current-step");

  if (!startBtn || slides.length === 0) return;

  let currentStep = 0;
  const totalSteps = slides.length;

  // --- Point selection for each slide ---
  slides.forEach((slide) => {
    const points = slide.querySelectorAll(".diag-point");
    const lineFill = slide.querySelector(".diag-scale-line-fill");

    points.forEach((point) => {
      point.addEventListener("click", () => {
        points.forEach((p) => p.classList.remove("selected"));
        point.classList.add("selected");

        // Update line fill
        const val = parseInt(point.dataset.value);
        if (lineFill) {
          lineFill.style.width = `${((val - 1) / 4) * 100}%`;
        }
      });
    });

    // Init line fill for default (value 3)
    if (lineFill) {
      lineFill.style.width = "50%";
    }
  });

  // --- Show/hide helpers (direct class toggle, no animation dependency) ---
  function showSection(el) {
    el.classList.remove("hidden");
  }

  function hideSection(el, callback) {
    el.classList.add("hidden");
    if (callback) setTimeout(callback, 50);
  }

  // --- Step navigation ---
  function goToStep(step) {
    // Deactivate current slide, clear inline styles
    slides[currentStep].classList.remove("active", "exit-left");
    slides[currentStep].style.transform = "";

    // Activate new slide
    currentStep = step;
    slides[currentStep].classList.remove("exit-left");
    slides[currentStep].style.transform = "";
    slides[currentStep].classList.add("active");

    // Update progress
    progressFill.style.width = `${((currentStep + 1) / totalSteps) * 100}%`;
    stepDots.forEach((dot, i) => {
      dot.classList.remove("active", "done");
      if (i < currentStep) dot.classList.add("done");
      if (i === currentStep) dot.classList.add("active");
    });
    stepCounter.textContent = currentStep + 1;

    // Update buttons
    prevBtn.disabled = currentStep === 0;

    if (currentStep === totalSteps - 1) {
      nextBtn.innerHTML =
        '<span>診断する</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
      nextBtn.classList.add("final-step");
    } else {
      nextBtn.innerHTML =
        '<span>次へ</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
      nextBtn.classList.remove("final-step");
    }

    // Scroll wizard into view
    wizard.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // --- Collect preferences ---
  function collectPreferences() {
    const prefs = {};
    slides.forEach((slide) => {
      const axis = slide.dataset.axis;
      const selected = slide.querySelector(".diag-point.selected");
      prefs[axis] = selected ? parseInt(selected.dataset.value) : 3;
    });
    return prefs;
  }

  // --- Run analysis ---
  function runAnalysis() {
    const prefs = collectPreferences();

    hideSection(wizard, () => {
      showSection(analyzing);
      analyzing.scrollIntoView({ behavior: "smooth", block: "center" });

      // Simulate analysis time
      setTimeout(() => {
        const results = calculateMatch(prefs);
        renderResults(results);

        hideSection(analyzing, () => {
          showSection(resultsSection);
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });

          // Stagger result cards
          setTimeout(() => {
            const cards = resultsSection.querySelectorAll(".result-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("visible");
                const fill = card.querySelector(".result-match-fill");
                if (fill) fill.style.width = fill.dataset.width;
              }, 200 + i * 250);
            });
          }, 300);
        });
      }, 2200);
    });
  }

  // --- Initialize wizard to step 0 ---
  function resetWizard() {
    currentStep = 0;
    slides.forEach((s) => {
      s.classList.remove("active", "exit-left");
      s.style.transform = "";
    });
    slides[0].classList.add("active");

    progressFill.style.width = "25%";
    stepDots.forEach((dot, i) => {
      dot.classList.remove("active", "done");
      if (i === 0) dot.classList.add("active");
    });
    stepCounter.textContent = "1";
    prevBtn.disabled = true;
    nextBtn.innerHTML =
      '<span>次へ</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
    nextBtn.classList.remove("final-step");
  }

  // --- Event: Start ---
  startBtn.addEventListener("click", () => {
    hideSection(intro, () => {
      resetWizard();
      showSection(wizard);
      wizard.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // --- Event: Next ---
  nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    } else {
      runAnalysis();
    }
  });

  // --- Event: Prev ---
  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  });

  // --- Event: Retry ---
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      hideSection(resultsSection, () => {
        // Reset share button
        if (shareSlackBtn) {
          shareSlackBtn.classList.remove("copied");
          shareSlackBtn.querySelector("span").textContent =
            "診断結果を #hobby-nihonshu に投稿";
        }
        if (shareHint) {
          shareHint.classList.remove("visible");
          shareHint.textContent = "";
        }

        // Reset selections to default (value 3)
        slides.forEach((slide) => {
          const points = slide.querySelectorAll(".diag-point");
          points.forEach((p) => p.classList.remove("selected"));
          const mid = slide.querySelector('.diag-point[data-value="3"]');
          if (mid) mid.classList.add("selected");
          const lineFill = slide.querySelector(".diag-scale-line-fill");
          if (lineFill) lineFill.style.width = "50%";
        });

        showSection(intro);
        setTimeout(() => {
          document.getElementById("diagnosis").scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      });
    });
  }

  // --- Event: Share to Slack ---
  const shareSlackBtn = document.getElementById("share-slack-btn");
  const shareHint = document.getElementById("slack-share-hint");
  if (shareSlackBtn) {
    shareSlackBtn.addEventListener("click", () => {
      // Already copied → open Slack channel
      if (shareSlackBtn.classList.contains("copied")) {
        window.open(
          "https://nikkeidevs.slack.com/archives/C08PQ6NUTU1",
          "_blank"
        );
        return;
      }

      // Get the #1 result (BEST sake)
      const firstCard = resultsSection.querySelector(".result-card");
      if (!firstCard) return;

      const name = firstCard.querySelector(".result-name").textContent;
      const matchPct = firstCard.querySelector(".result-match-pct").textContent;

      const text =
        `:sake: 日本酒診断の結果、私のBESTは *${name}* でした！\n` +
        `（マッチ度 ${matchPct}）\n` +
        `#NNN2`;

      navigator.clipboard.writeText(text).then(() => {
        shareSlackBtn.classList.add("copied");
        shareSlackBtn.querySelector("span").textContent =
          "コピーしました！タップしてSlackを開く";
        if (shareHint) {
          shareHint.textContent = "Slackのチャンネルに貼り付けて投稿してね";
          shareHint.classList.add("visible");
        }
      });
    });
  }
}

/* --------------------------------------------------
   Calculate Match Score
   -------------------------------------------------- */
function calculateMatch(preferences) {
  if (typeof SAKE_LIST === "undefined") return [];

  const axes = ["sweetDry", "richLight", "aroma", "mouthfeel"];
  const maxDistance = Math.sqrt(axes.length * 16); // max possible Euclidean distance (4 axes, max diff=4 each)

  const scored = SAKE_LIST.map((sake) => {
    let sumSq = 0;
    axes.forEach((axis) => {
      const diff = preferences[axis] - sake[axis];
      sumSq += diff * diff;
    });
    const distance = Math.sqrt(sumSq);
    const matchPct = Math.round((1 - distance / maxDistance) * 100);
    return { ...sake, matchPct };
  });

  scored.sort((a, b) => b.matchPct - a.matchPct);
  return scored.slice(0, 3);
}

/* --------------------------------------------------
   Render Results
   -------------------------------------------------- */
function renderResults(results) {
  const container = document.getElementById("results-cards");
  if (!container) return;

  container.innerHTML = "";

  const rankClasses = ["result-rank-1", "result-rank-2", "result-rank-3"];

  results.forEach((sake, i) => {
    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      <div class="result-rank ${rankClasses[i]}">${i + 1}</div>
      <div class="result-body">
        <h4 class="result-name">${sake.name}</h4>
        <p class="result-meta">${sake.type} ／ ${sake.brewery}（${sake.region}）</p>
        <p class="result-desc">${sake.desc}</p>
        <div class="result-match">
          <span class="result-match-label">マッチ度</span>
          <div class="result-match-bar">
            <div class="result-match-fill" data-width="${sake.matchPct}%"></div>
          </div>
          <span class="result-match-pct">${sake.matchPct}%</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

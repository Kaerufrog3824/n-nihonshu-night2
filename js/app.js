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
    sweetDry: "甘辛",
    richLight: "濃淡",
    aroma: "香り",
    mouthfeel: "飲み口",
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

    card.innerHTML = `
      <span class="sake-card-number">#${String(sake.id).padStart(2, "0")}</span>
      <h3 class="sake-card-name">${sake.name}</h3>
      <span class="sake-card-type">${sake.type}</span>
      <p class="sake-card-meta">${sake.brewery}（${sake.region}）</p>
      <p class="sake-card-desc">${sake.desc}</p>
      <div class="sake-profile">${profileHTML}</div>
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
   Diagnosis System
   -------------------------------------------------- */
function initDiagnosis() {
  const form = document.getElementById("diagnosis-form");
  const resultsSection = document.getElementById("diagnosis-results");
  const diagnoseBtn = document.getElementById("diagnose-btn");
  const retryBtn = document.getElementById("retry-btn");

  if (!form || !diagnoseBtn) return;

  // Axis button selection
  form.querySelectorAll(".axis-group").forEach((group) => {
    const btns = group.querySelectorAll(".axis-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });
  });

  // Diagnose
  diagnoseBtn.addEventListener("click", () => {
    const preferences = {};
    form.querySelectorAll(".axis-group").forEach((group) => {
      const axis = group.dataset.axis;
      const selected = group.querySelector(".axis-btn.selected");
      preferences[axis] = selected ? parseInt(selected.dataset.value) : 3;
    });

    const results = calculateMatch(preferences);
    renderResults(results);

    // Animate transition
    form.style.opacity = "0";
    form.style.transform = "translateY(-16px)";
    setTimeout(() => {
      form.style.display = "none";
      resultsSection.classList.remove("hidden");
      resultsSection.style.opacity = "0";
      resultsSection.style.transform = "translateY(16px)";

      requestAnimationFrame(() => {
        resultsSection.style.transition =
          "opacity 0.6s ease, transform 0.6s ease";
        resultsSection.style.opacity = "1";
        resultsSection.style.transform = "translateY(0)";

        // Stagger result cards
        const cards = resultsSection.querySelectorAll(".result-card");
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("visible");
            // Animate match bar
            const fill = card.querySelector(".result-match-fill");
            if (fill) {
              fill.style.width = fill.dataset.width;
            }
          }, 200 + i * 200);
        });

        // Scroll to results
        setTimeout(() => {
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      });
    }, 400);
  });

  // Retry
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      resultsSection.style.opacity = "0";
      resultsSection.style.transform = "translateY(16px)";
      setTimeout(() => {
        resultsSection.classList.add("hidden");
        form.style.display = "";
        form.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        requestAnimationFrame(() => {
          form.style.opacity = "1";
          form.style.transform = "translateY(0)";
        });

        // Scroll to diagnosis section
        setTimeout(() => {
          document.getElementById("diagnosis").scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }, 400);
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

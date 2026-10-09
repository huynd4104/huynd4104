/**
 * Nguyen Danh Huy — Portfolio Interactive Logic
 * Features:
 *  - Native <dialog> Modal with modern light-dismiss & exit animation
 *  - Project category filtering
 *  - Clipboard copy with toast notification feedback
 *  - Scroll-triggered metric counters
 *  - Header scroll state & active section scroll-spy
 *  - Mobile menu toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProjectFiltering();
  initMetricsCounter();
  initModalListeners();
});

/* ==========================================================================
   1. Navbar & Scroll-Spy
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  // Sticky header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveNav();
  }, { passive: true });

  // Mobile menu toggle
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when link is clicked
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section scroll-spy
  function highlightActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }
}

/* ==========================================================================
   2. Project Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. Animated Metrics Counter
   ========================================================================== */
function initMetricsCounter() {
  const counters = document.querySelectorAll('.metric-number[data-target]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1200; // ms
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
              counter.textContent = `${Math.floor(current)}${suffix}`;
            } else {
              counter.textContent = `${Math.floor(current)}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-strip');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   4. Deep Dive Project Modal (<dialog>)
   ========================================================================== */
const projectData = {
  carebridge: {
    badge: 'CAPSTONE GRADUATION PROJECT • FPT UNIVERSITY',
    title: 'CareBridge — Maternal & Early Childhood Healthcare Platform',
    content: `
      <div class="modal-section">
        <h4>System Overview & Mission</h4>
        <p>
          CareBridge is an enterprise-grade omnichannel healthcare platform (88 use cases across 9 domains) built in compliance with 
          <strong>WHO and Vietnam Ministry of Health (MOH)</strong> standards. It connects mothers, pediatric clinicians, family care circles, 
          and AI triage assistants into a unified digital continuum.
        </p>
      </div>

      <div class="modal-section">
        <h4>Core Architectural Highlights</h4>
        <div class="modal-tech-list">
          <span class="tech-tag highlight">Java 21</span>
          <span class="tech-tag highlight">Spring Boot 3.5</span>
          <span class="tech-tag highlight">Python FastAPI RAG</span>
          <span class="tech-tag highlight">pgvector</span>
          <span class="tech-tag highlight">RS256 JWT Ring</span>
          <span class="tech-tag">Flutter 3.22</span>
          <span class="tech-tag">React 19</span>
          <span class="tech-tag">TrackAsia Maps</span>
          <span class="tech-tag">Cloudflare R2</span>
          <span class="tech-tag">ZegoCloud WebRTC</span>
          <span class="tech-tag">Docker Compose</span>
        </div>
        <ul class="bullet-list">
          <li><strong>Modular Monolith Architecture:</strong> 9 cleanly segregated domain boundaries sharing unified RS256 token verification and Flyway migration controls.</li>
          <li><strong>AI Nurse & Clinical RAG Engine:</strong> Integrated Google Gemini API with hybrid n-gram lexical and pgvector semantic retrieval over MOH clinical guidelines.</li>
          <li><strong>Emergency Hospital Locator & TrackAsia Maps:</strong> Spatial proximity search locating nearest accredited pediatric & maternal hospitals with turn-by-turn navigation and 1-tap emergency SOS coordinate broadcasts.</li>
          <li><strong>Community & AI Content Moderation:</strong> High-engagement Q&A forum with automated semantic analysis detecting and filtering harmful content, spam, and medical misinformation.</li>
          <li><strong>Real-time IMU Fall Detection:</strong> Native accelerometer and gyroscope sensor processing in Flutter with 30-second automated emergency broadcast countdown.</li>
          <li><strong>Secure WebRTC Consultation:</strong> HD audio/video calls with automated recording and background direct uploads to Cloudflare R2 object storage.</li>
        </ul>
      </div>

      <div class="modal-section">
        <h4>Technical Challenge & Solution Matrix</h4>
        <table class="matrix-table">
          <thead>
            <tr>
              <th>Engineering Challenge</th>
              <th>Architectural Solution</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Medical hallucination risk in AI chatbot</td>
              <td>Enforced strict RAG retrieval boundaries with verified MOH clinical embeddings + pgvector similarity filtering + medical disclaimers</td>
              <td>100% answers grounded in vetted health literature</td>
            </tr>
            <tr>
              <td>Harmful misinformation & toxicity in user community posts</td>
              <td>Integrated AI moderation pipeline performing semantic NLP classification and automated violation queue flags</td>
              <td>Real-time filtering of unverified medical claims and user safety protection</td>
            </tr>
            <tr>
              <td>Ultra-reliable emergency routing during maternal crisis</td>
              <td>TrackAsia Maps API integration with GPS spatial proximity queries, offline facility cache & 1-tap SOS family broadcast</td>
              <td>Instant turn-by-turn navigation to closest medical center with synchronized coordinates dispatch</td>
            </tr>
            <tr>
              <td>Accidental fall trigger false alarms</td>
              <td>Implemented calibrated acceleration vector magnitude & angular velocity thresholds + 30s cancellation window</td>
              <td>Minimizes false alarms while protecting pregnant mothers</td>
            </tr>
            <tr>
              <td>High server bandwidth during consultation recording uploads</td>
              <td>Presigned S3 upload URLs direct from client to Cloudflare R2 object storage</td>
              <td>Zero server bandwidth overhead for large audio/video files</td>
            </tr>
            <tr>
              <td>Zero-downtime key rotation across clients</td>
              <td>RS256 asymmetric JWT with SPKI public key ring caching in Spring Security</td>
              <td>Seamless key rotation without client session invalidation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-section">
        <h4>Repository & Documentation</h4>
        <p>
          Contains complete SRS (Report 3), Technical Design Specs (TDS), Test-Specs, Architecture Diagrams, and 100% test route coverage.
        </p>
        <div style="margin-top: 14px;">
          <a href="https://github.com/huynd4104/Care-Bridge" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            Visit CareBridge GitHub Repository &rarr;
          </a>
        </div>
      </div>
    `
  },
  heykid: {
    badge: 'PERSONAL PROJECT • EDTECH & INTERVENTION',
    title: 'HeyKid — Language Intervention Platform for Children',
    content: `
      <div class="modal-section">
        <h4>Project Background</h4>
        <p>
          HeyKid is a cross-platform web and mobile application designed to assist speech language pathologists and parents 
          in conducting speech intervention exercises for children with developmental delays and speech speech impairments.
        </p>
      </div>

      <div class="modal-section">
        <h4>Key Technical Contributions</h4>
        <div class="modal-tech-list">
          <span class="tech-tag highlight">Java 17</span>
          <span class="tech-tag highlight">Spring Boot 3.5</span>
          <span class="tech-tag highlight">Flutter Mobile</span>
          <span class="tech-tag highlight">React Admin</span>
          <span class="tech-tag">Cloudflare R2 (S3 SDK)</span>
          <span class="tech-tag">On-Device STT/TTS</span>
          <span class="tech-tag">GitHub Actions CI/CD</span>
          <span class="tech-tag">Render & Vercel</span>
        </div>
        <ul class="bullet-list">
          <li><strong>3-Module Monolith Monorepo:</strong> Clean domain separation between core domain, therapy management, and API gateways.</li>
          <li><strong>AI Mascot Speech Flow:</strong> On-device low-latency speech recognition and text-to-speech providing children with interactive practice companions.</li>
          <li><strong>Admin Curriculum Builder:</strong> Dynamic nested hierarchy: Programs &rarr; Learning Paths &rarr; Path Items &rarr; Lessons &rarr; Activities.</li>
          <li><strong>Gamified Child Map:</strong> XP points, learning streaks, daily missions, and contactless child account login via NFC cards or QR codes.</li>
          <li><strong>Cloud Optimization:</strong> Direct-to-storage presigned uploads with AWS S3 SDK & Cloudflare R2; automated CI/CD pipeline deploying to Render & Vercel.</li>
        </ul>
      </div>

      <div class="modal-section">
        <h4>Repository</h4>
        <div style="margin-top: 14px;">
          <a href="https://github.com/huynd4104/project-ha" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            Visit HeyKid GitHub Repository &rarr;
          </a>
        </div>
      </div>
    `
  }
};

function initModalListeners() {
  const dialog = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!dialog) return;

  // Close on button click
  closeBtn?.addEventListener('click', () => closeDialogWithAnimation(dialog));

  // Light-dismiss: click outside the modal card (on backdrop) closes the dialog
  dialog.addEventListener('click', (event) => {
    const rect = dialog.querySelector('.dialog-card').getBoundingClientRect();
    const isInDialog = (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
    if (!isInDialog) {
      closeDialogWithAnimation(dialog);
    }
  });

  // Handle escape key
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeDialogWithAnimation(dialog);
  });
}

function openDeepDiveModal(projectId) {
  const dialog = document.getElementById('projectModal');
  const badge = document.getElementById('modalBadge');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  const data = projectData[projectId];
  if (!data || !dialog) return;

  badge.textContent = data.badge;
  title.textContent = data.title;
  body.innerHTML = data.content;

  dialog.showModal();
}

function closeDialogWithAnimation(dialog) {
  // Graceful exit animation
  dialog.style.opacity = '0';
  dialog.style.transform = 'scale(0.96) translateY(10px)';
  setTimeout(() => {
    dialog.close();
    dialog.style.opacity = '';
    dialog.style.transform = '';
  }, 200);
}

// Make accessible globally
window.openDeepDiveModal = openDeepDiveModal;

/* ==========================================================================
   5. Clipboard Copy & Toast Feedback
   ========================================================================== */
function copyContact(type) {
  let text = '';
  let label = '';

  if (type === 'email') {
    text = 'huy412004@gmail.com';
    label = 'Email address copied: huy412004@gmail.com';
  } else if (type === 'phone') {
    text = '0866046581';
    label = 'Phone number copied: 0866 046 581';
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(label);
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(label);
  } catch (err) {
    showToast(`Contact: ${text}`);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 20 20" width="18" height="18" fill="#10b981">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

window.copyContact = copyContact;

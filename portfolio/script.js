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
  initCarebridgeGallery();
  initImageLightbox();
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

/* ==========================================================================
   6. CareBridge Omnichannel Multi-Role Gallery & Image Lightbox Modal
   ========================================================================== */

const carebridgeScreens = [
  // 1. Mother Role & Journey
  {
    id: 'cb-mother-home',
    title: 'Mother Daily Care Dashboard',
    role: 'Mother & Pregnancy',
    category: 'mother',
    badge: 'Mobile App • Mother Role',
    src: 'assets/carebridge-mother-home.png',
    desc: 'Personalized maternal health dashboard featuring daily gestational tracking, MOH milestones, medication reminders, and instant access to AI nurse assistance.'
  },
  {
    id: 'cb-ai-symptom',
    title: 'AI Clinical Symptom Intake (RAG)',
    role: 'Mother & Pregnancy',
    category: 'mother',
    badge: 'AI & RAG Engine',
    src: 'assets/carebridge-ai-symptom.png',
    desc: 'Conversational clinical triage powered by Google Gemini API & pgvector hybrid search, evaluating maternal symptoms against WHO/MOH guidelines.'
  },
  {
    id: 'cb-today-tasks',
    title: 'Daily Care Tasks & Vital Schedule',
    role: 'Mother & Pregnancy',
    category: 'mother',
    badge: 'Mobile App • Routine Care',
    src: 'assets/carebridge-today-tasks.png',
    desc: 'Automated daily clinical care checklist including blood pressure logging, fetal movement count, hydration goals, and doctor appointments.'
  },
  {
    id: 'cb-safety-monitoring',
    title: 'IMU Sensor Safety & Fall Detection',
    role: 'Mother & Pregnancy',
    category: 'mother',
    badge: 'IoT & Accelerometer',
    src: 'assets/carebridge-safety-monitoring.png',
    desc: 'Real-time maternal fall detection leveraging mobile accelerometer and gyroscope data with 30-second emergency dispatch countdown timer.'
  },

  // 2. Family Cooperative Care Circle
  {
    id: 'cb-family-caregroup',
    title: 'Family Care Group & Multi-Caregiver Sync',
    role: 'Family Circle',
    category: 'family',
    badge: 'Mobile App • Family Role',
    src: 'assets/carebridge-family-caregroup.png',
    desc: 'Collaborative care network allowing husband, grandparents, and caregivers to monitor pregnancy progression, share duties, and receive status updates.'
  },
  {
    id: 'cb-family-tasks',
    title: 'Family Cooperative Care Tasks',
    role: 'Family Circle',
    category: 'family',
    badge: 'Mobile App • Shared Duties',
    src: 'assets/carebridge-family-tasks.png',
    desc: 'Delegated household and caregiving checklist for family members, ensuring timely medicine purchase, nutrition prep, and clinic check-ins.'
  },
  {
    id: 'cb-family-alerts',
    title: 'Real-Time Family Emergency SOS Alerts',
    role: 'Family Circle',
    category: 'family',
    badge: 'Real-time Alerts & Push',
    src: 'assets/carebridge-family-alerts.png',
    desc: 'Instant broadcast alerts dispatched to all registered family members when anomalous vitals, fall detection, or manual SOS triggers occur.'
  },

  // 3. Healthcare Expert & Doctor Experience
  {
    id: 'cb-expert-home',
    title: 'Healthcare Expert Dashboard',
    role: 'Doctor & Expert',
    category: 'expert',
    badge: 'Mobile App • Doctor Role',
    src: 'assets/carebridge-expert-home.png',
    desc: 'Mobile clinical command center for pediatricians and OB/GYN specialists showing active patients, upcoming consults, and pending triage reviews.'
  },
  {
    id: 'cb-expert-consultation-requests',
    title: 'Consultation Queue & Triage Intake',
    role: 'Doctor & Expert',
    category: 'expert',
    badge: 'Mobile App • Patient Triage',
    src: 'assets/carebridge-expert-consultation-requests.png',
    desc: 'Incoming patient consultation request management with prioritized AI urgency scores, clinical notes review, and instant appointment confirmation.'
  },
  {
    id: 'cb-teleconsultation',
    title: 'High-Definition Teleconsultation (WebRTC)',
    role: 'Doctor & Expert',
    category: 'expert',
    badge: 'ZegoCloud WebRTC Video',
    src: 'assets/carebridge-teleconsultation.png',
    desc: 'Secure end-to-end 1-on-1 video call between certified doctor and mother with screen sharing, automated session recording, and real-time messaging.'
  },
  {
    id: 'cb-web-expert-portal',
    title: 'Web Clinical Expert Portal',
    role: 'Doctor & Expert',
    category: 'expert',
    badge: 'React 19 Web App',
    src: 'assets/carebridge-web-expert-portal.png',
    desc: 'Desktop web portal for clinical experts to examine comprehensive electronic medical records (EMR), prescribe guidance, and manage scheduled shifts.'
  },

  // 4. Baby & Child Health Hub
  {
    id: 'cb-baby-profiles',
    title: 'Child & Infant Digital Health Records',
    role: 'Baby & Child Hub',
    category: 'baby',
    badge: 'Mobile App • Pediatric Hub',
    src: 'assets/carebridge-baby-profiles.png',
    desc: 'Multi-child digital profile tracking immunization history, developmental milestones, pediatric checkups, and allergy registries.'
  },
  {
    id: 'cb-baby-growth-chart',
    title: 'WHO Pediatric Growth & Milestone Curves',
    role: 'Baby & Child Hub',
    category: 'baby',
    badge: 'Analytics & Standards',
    src: 'assets/carebridge-baby-growth-chart.png',
    desc: 'Dynamic WHO growth chart plotting weight-for-age, height-for-age, and BMI percentiles with automated pediatric percentile anomaly alerts.'
  },

  // 5. Community & Admin Safety
  {
    id: 'cb-community-moderation',
    title: 'Maternal Community & Doctor Q&A Forum',
    role: 'Community & Admin',
    category: 'community-admin',
    badge: 'Mobile Community',
    src: 'assets/carebridge-community-moderation.png',
    desc: 'Peer support community with verified doctor badges, stage-based topic channels, and automated semantic sentiment & content guardrails.'
  },
  {
    id: 'cb-web-moderation-queue',
    title: 'AI Moderation Queue & Content Safety',
    role: 'Community & Admin',
    category: 'community-admin',
    badge: 'React Web • Content Safety',
    src: 'assets/carebridge-web-moderation-queue.png',
    desc: 'Administrative moderation workspace with automated AI toxicity scoring, unapproved medical claims flagging, and one-click quarantine actions.'
  },
  {
    id: 'cb-web-admin-dashboard',
    title: 'Enterprise System Admin Dashboard',
    role: 'Community & Admin',
    category: 'community-admin',
    badge: 'React Web • Operations Center',
    src: 'assets/carebridge-web-admin-dashboard.png',
    desc: 'Central operations console monitoring 88 use case endpoints, doctor licensing verification, platform traffic analytics, and database health.'
  },

  // 6. Emergency GIS & Architecture
  {
    id: 'cb-hospital-map',
    title: 'Emergency GIS Hospital Locator & Routing',
    role: 'Emergency & Maps',
    category: 'emergency',
    badge: 'TrackAsia GIS & GPS',
    src: 'assets/carebridge-hospital-map.png',
    desc: 'Proximity-based interactive map finding accredited maternal & pediatric hospitals within seconds, with turn-by-turn routing and direct hotline dial.'
  },
  {
    id: 'cb-architecture',
    title: 'Modular Monolith Architecture Blueprint',
    role: 'System Architecture',
    category: 'emergency',
    badge: 'Spring Boot 3.5 & Docker',
    src: 'assets/carebridge-architecture.png',
    desc: 'Comprehensive system architecture diagram illustrating 9 domain modules, RS256 key rotation ring, RAG pipeline, WebRTC media, and PostgreSQL schema.'
  }
];

let activeGalleryRole = 'all';
let isGalleryExpanded = false;
let currentLightboxIndex = 0;
const INITIAL_VISIBLE_COUNT = 6;

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initCarebridgeGallery() {
  const roleTabBtns = document.querySelectorAll('#galleryRoleTabs .role-tab-btn');
  const toggleBtn = document.getElementById('btnToggleCarebridgeGallery');

  // Role filter tab click handlers
  roleTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedRole = btn.getAttribute('data-role');
      if (!selectedRole || selectedRole === activeGalleryRole) return;

      roleTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeGalleryRole = selectedRole;
      renderCarebridgeGallery();
    });
  });

  // Expander button click handler ('+' / '-')
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isGalleryExpanded = !isGalleryExpanded;
      renderCarebridgeGallery();
    });
  }

  // Initial render
  renderCarebridgeGallery();
}

function renderCarebridgeGallery() {
  const gridContainer = document.getElementById('carebridgeGalleryGrid');
  const toggleBtn = document.getElementById('btnToggleCarebridgeGallery');
  const expandIcon = document.getElementById('galleryExpandIcon');
  const expandText = document.getElementById('galleryExpandText');
  const countLabel = document.getElementById('galleryCountLabel');

  if (!gridContainer) return;

  // Filter dataset
  const filtered = activeGalleryRole === 'all'
    ? carebridgeScreens
    : carebridgeScreens.filter(screen => screen.category === activeGalleryRole);

  if (countLabel) {
    countLabel.textContent = `${filtered.length} ${filtered.length === 1 ? 'Mockup' : 'Mockups'}`;
  }

  // Determine slice
  const shouldLimit = (activeGalleryRole === 'all') && !isGalleryExpanded;
  const visibleItems = shouldLimit ? filtered.slice(0, INITIAL_VISIBLE_COUNT) : filtered;

  // Render cards
  gridContainer.innerHTML = visibleItems.map((screen) => {
    const globalIndex = carebridgeScreens.findIndex(s => s.id === screen.id);
    return `
      <div class="gallery-card" onclick="openImageLightbox(${globalIndex})" role="button" tabindex="0" aria-label="View screenshot: ${escapeHtml(screen.title)}">
        <div class="gallery-card-thumb">
          <img src="${screen.src}" alt="${escapeHtml(screen.title)}" loading="lazy">
          <div class="gallery-card-badge">${escapeHtml(screen.badge)}</div>
          <div class="gallery-zoom-overlay">
            <div class="zoom-icon-circle">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
            <span>Click to Zoom</span>
          </div>
        </div>
        <div class="gallery-card-meta">
          <div class="gallery-card-role">${escapeHtml(screen.role)}</div>
          <h5 class="gallery-card-title">${escapeHtml(screen.title)}</h5>
        </div>
      </div>
    `;
  }).join('');

  // Add keyboard Enter / Space accessibility to cards
  gridContainer.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Update Expander Button UI
  if (toggleBtn && expandIcon && expandText) {
    if (activeGalleryRole !== 'all') {
      // In a specific role category tab, all screens for that role are already shown
      toggleBtn.style.display = 'none';
    } else {
      toggleBtn.style.display = 'inline-flex';
      if (isGalleryExpanded) {
        expandIcon.textContent = '−';
        expandText.textContent = 'Show Fewer Screens (Collapse)';
      } else {
        expandIcon.textContent = '+';
        expandText.textContent = `View All ${carebridgeScreens.length} Screens & Multi-Role Flows`;
      }
    }
  }
}

/* ==========================================================================
   High-Resolution Image Lightbox Modal Functionality
   ========================================================================== */
function initImageLightbox() {
  const dialog = document.getElementById('imageLightboxModal');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  if (!dialog) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeImageLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }

  // Close on backdrop click (click outside card)
  dialog.addEventListener('click', (event) => {
    const card = dialog.querySelector('.lightbox-dialog-card');
    if (card && !card.contains(event.target)) {
      closeImageLightbox();
    }
  });

  // Handle escape & keyboard navigation
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeImageLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (dialog.open) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateLightbox(1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeImageLightbox();
      }
    }
  });
}

function openImageLightbox(index) {
  if (index < 0 || index >= carebridgeScreens.length) return;
  currentLightboxIndex = index;
  updateLightboxContent();

  const dialog = document.getElementById('imageLightboxModal');
  if (dialog && !dialog.open) {
    dialog.showModal();
  }
}

function openImageLightboxById(screenId) {
  const index = carebridgeScreens.findIndex(s => s.id === screenId);
  if (index !== -1) {
    openImageLightbox(index);
  } else {
    openImageLightbox(0);
  }
}

function updateLightboxContent() {
  const screen = carebridgeScreens[currentLightboxIndex];
  if (!screen) return;

  const badgeEl = document.getElementById('lightboxBadge');
  const titleEl = document.getElementById('lightboxTitle');
  const counterEl = document.getElementById('lightboxCounter');
  const imgEl = document.getElementById('lightboxMainImage');
  const descEl = document.getElementById('lightboxDesc');
  const rawLinkEl = document.getElementById('lightboxRawLink');

  if (badgeEl) badgeEl.textContent = `${screen.role.toUpperCase()} • ${screen.badge}`;
  if (titleEl) titleEl.textContent = screen.title;
  if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${carebridgeScreens.length}`;
  if (descEl) descEl.textContent = screen.desc;
  if (rawLinkEl) rawLinkEl.href = screen.src;

  if (imgEl) {
    imgEl.style.opacity = '0.35';
    imgEl.src = screen.src;
    imgEl.alt = screen.title;
    imgEl.onload = () => {
      imgEl.style.opacity = '1';
    };
  }
}

function navigateLightbox(step) {
  const total = carebridgeScreens.length;
  currentLightboxIndex = (currentLightboxIndex + step + total) % total;
  updateLightboxContent();
}

function closeImageLightbox() {
  const dialog = document.getElementById('imageLightboxModal');
  if (dialog && dialog.open) {
    dialog.style.opacity = '0';
    dialog.style.transform = 'scale(0.96)';
    setTimeout(() => {
      dialog.close();
      dialog.style.opacity = '';
      dialog.style.transform = '';
    }, 180);
  }
}

// Expose globals for onclick handlers
window.openImageLightbox = openImageLightbox;
window.openImageLightboxById = openImageLightboxById;
window.closeImageLightbox = closeImageLightbox;
window.navigateLightbox = navigateLightbox;

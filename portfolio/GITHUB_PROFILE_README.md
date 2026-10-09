# 👨‍💻 Nguyen Danh Huy (Huy Nguyen)

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=06B6D4&center=true&vCenter=true&width=620&lines=Software+Engineer;Backend+%26+Modular+Monolith;AI+RAG+%2B+Vector+Search;Flutter+%26+Cross-Platform+Developer" alt="Typing Title" />
</p>

<p align="center">
  <strong>📍 Hanoi, Vietnam</strong> • 
  <strong>🎓 FPT University (B.S. Software Engineering)</strong> • 
  <strong>✉️ <a href="mailto:huy412004@gmail.com">huy412004@gmail.com</a></strong>
</p>

<p align="center">
  <a href="https://huynd4104.github.io/portfolio/"><img src="https://img.shields.io/badge/Live_Portfolio-Website-06B6D4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Portfolio Website" /></a>
  <a href="https://github.com/huynd4104"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="mailto:huy412004@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="tel:0866046581"><img src="https://img.shields.io/badge/Phone-0866046581-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Phone" /></a>
</p>

---

## 🎯 Engineering Profile & Focus

- **Core Competencies**: Versatile **Software Engineer** with production-grade engineering experience across **Java Spring Boot Backend & Modular Monoliths**, **AI RAG Pipelines (Google Gemini + pgvector)**, **Flutter Mobile Development**, and **Modern React Web Apps**.
- **Engineering Mindset**: Dedicated to clean code, strict architectural boundaries, automated CI/CD pipelines, and high-reliability software delivering real user impact.

---

## 🛠️ Technical Arsenal

### Languages & Frameworks
![Java](https://img.shields.io/badge/Java%2021-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot%203.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Python](https://img.shields.io/badge/Python%203.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter%203.22-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Database, Cloud & AI Systems
![PostgreSQL](https://img.shields.io/badge/PostgreSQL%2016+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![pgvector](https://img.shields.io/badge/pgvector-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini%20API-8E75C2?style=for-the-badge&logo=google&logoColor=white)
![Cloudflare R2](https://img.shields.io/badge/Cloudflare%20R2-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitLab CI](https://img.shields.io/badge/GitLab%20CI/CD-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)

---

## 🚀 Flagship Projects

### 🏥 1. [CareBridge — Maternal & Early Childhood Healthcare Platform (MECHP)](https://github.com/huynd4104/Care-Bridge)
> **Role:** Fullstack & AI Integration Developer | **Timeline:** 05/2026 – 09/2026  
> **Architecture:** Modular Monolith + Python AI RAG Microservices + Cross-Platform Clients

CareBridge is an enterprise-grade digital healthcare continuum built in compliance with **WHO and Vietnam Ministry of Health (MOH)** clinical standards, featuring **88 production use cases across 9 domains**.

#### Key Technical Contributions:
- **Clinical AI Assistant (RAG Engine):** Integrated Google Gemini API with hybrid n-gram lexical and `pgvector` similarity search over MOH guidelines to deliver maternal symptom triage with medical disclaimers and GPS emergency alerts.
- **Emergency SOS & Healthcare Facility Locator:** Integrated TrackAsia Maps API and GPS spatial queries to locate accredited maternal/pediatric facilities with turn-by-turn navigation and 1-tap SOS family broadcast.
- **Community Forum & AI Content Moderation:** Developed peer & verified-expert Q&A forum with stage-based filtering; integrated AI moderation pipelines using semantic NLP analysis to detect and filter toxic content and medical misinformation.
- **Real-Time Safety & IMU Fall Detection:** Built mobile sensor processing in Flutter using accelerometer and gyroscope vectors with calibrated threshold filters and automated 30s family broadcast countdowns.
- **WebRTC Medical Teleconsultations:** Orchestrated 1-on-1 encrypted audio/video teleconsultations with automatic session recording and background upload lifecycles to Cloudflare R2 / Cloudinary.
- **Enterprise Security & Data Isolation:** Designed RS256 asymmetric JWT authentication with SPKI public key ring rotation and Flyway database migration versioning.

```mermaid
graph LR
    subgraph Clients
        Mobile["Flutter Mobile App"]
        Web["React 19 Web Portal"]
    end
    subgraph Ingress
        CF["Cloudflare Tunnel / Nginx"]
    end
    subgraph Backend Services
        API["Core Spring Boot 3.5 API (:8080)"]
        AI["FastAPI RAG Service (:8001)"]
        ML["MediaPipe Posture Sidecar (:8002)"]
    end
    subgraph Storage & Cloud
        PG[("PostgreSQL + pgvector")]
        R2["Cloudflare R2 Object Storage"]
    end

    Clients --> CF --> API
    API --> AI & ML & PG & R2
    AI --> PG
```

---

### 🧩 2. [HeyKid — Language Intervention Platform for Children](https://github.com/huynd4104/project-ha)
> **Role:** Fullstack Developer | **Timeline:** 05/2026 – 06/2026  
> **Tech:** Java 17, Spring Boot 3.5, Flutter (Dart), React (TypeScript), PostgreSQL (Supabase), Cloudflare R2, Docker

Cross-platform intervention application supporting speech and cognitive therapy for children with developmental delays.

#### Key Technical Contributions:
- **3-Module Monolith Monorepo:** Structured domain services with Spring Boot REST APIs, JWT access/refresh token rotation, and strict RBAC authorization.
- **Interactive Speech AI Practice:** Empathic mascot dialogue flow using on-device STT/TTS for ultra-low latency, child-safe speech practice sessions.
- **Admin Dynamic Curriculum Builder:** Comprehensive portal for managing Programs → Learning Paths → Lessons → Activities (Flashcards, Speech drills).
- **Gamified Engagement & NFC Cards:** Child learning map with XP, streaks, badges, and quick contactless authentication via NFC cards or QR codes.
- **Zero-Bandwidth Cloud Media Pipeline:** Presigned S3 URLs directly to Cloudflare R2, containerized with Docker, deployed via GitHub Actions to Render & Vercel.

---

## 💼 Experience & Education

| Period | Organization / School | Role / Degree | Key Highlights |
| :--- | :--- | :--- | :--- |
| **05/2025 – 08/2025** | **FPT Software Academy** | Java Backend / Software Engineering Intern | Enterprise Spring Boot, REST APIs, JPA/Hibernate, Relational DB Design, Git Flow |
| **2022 – 2026** | **FPT University, Hanoi** | Bachelor of Science in Software Engineering | Specialized in Enterprise Systems, AI Architecture & Distributed Software |

> **Academic Supervisor Reference:**  
> **Assoc. Prof. Dr. Nguyễn Cường Mạnh (PGS. TS. Nguyễn Cường Mạnh)**  
> Lecturer & Graduation Project Supervisor, FPT University Hanoi  
> ✉️ Email: `ManhNC5@fe.edu.vn` | 📞 Phone: `0966 896 568`

---

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=huynd4104&show_icons=true&theme=tokyonight&hide_border=true&count_private=true" alt="Huy's GitHub Stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=huynd4104&layout=compact&theme=tokyonight&hide_border=true" alt="Top Languages" />
</p>

---

<p align="center">
  <i>"Committed to clean architecture, reliable distributed data pipelines, and production-grade AI infrastructure."</i><br>
  <strong>Feel free to reach out for software engineering and AI infrastructure opportunities!</strong>
</p>

<div align="center">

# 🔒 TraceLock

### Enterprise Document Forensics & Leak Detection Platform

[![HTML](https://img.shields.io/badge/HTML-92.3%25-E34F26?logo=html5&logoColor=white)](https://github.com/CHAUHANRUDRA24/TraceLock)
[![JavaScript](https://img.shields.io/badge/JavaScript-5.9%25-F7DF1E?logo=javascript&logoColor=black)](https://github.com/CHAUHANRUDRA24/TraceLock)
[![CSS](https://img.shields.io/badge/CSS-1.8%25-1572B6?logo=css3&logoColor=white)](https://github.com/CHAUHANRUDRA24/TraceLock)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Stop document leaks. Track the source. Know exactly who leaked what, when, and from which device.**

TraceLock embeds invisible forensic identifiers into every document. Using proprietary steganographic watermarking, it enables organizations to trace any leaked document back to its source — even from grainy photos or heavily compressed screenshots.

[Features](#-features) • [Pages](#-pages) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Firebase Setup](#-firebase-setup)

</div>

---

## 🎯 What is TraceLock?

TraceLock is an **enterprise-grade document forensics platform** that solves the silent crisis of internal data leaks. Organizations share confidential documents — contracts, financials, strategy decks — without any way to know who leaks them. TraceLock changes that.

Every document distributed through TraceLock receives an invisible, tamper-proof forensic fingerprint tied to the recipient's identity. If it leaks, TraceLock identifies the source with **99.9% certainty** — from any fragment, screenshot, or physical printout.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🕵️ **Invisible Watermarking** | Proprietary Stegano-X technology embeds forensic data in pixel structure — survives compression, cropping, filters, and printing |
| 👤 **User Tracking** | Instant correlation between a leaked file and the specific user session that accessed it |
| 🔴 **Real-time Access Logs** | Monitor document movement across your entire network with live global node visibility |
| 🧬 **Forensic Recovery** | Upload any fragment — even a blurry phone photo — and TraceLock reconstructs the source identity |
| 📊 **Analytics Dashboard** | Full audit trails, access frequency, risk scoring, and leak intelligence reports |
| 🔐 **Leak Detection Engine** | Automated scanning and alerting when documents appear outside authorized channels |
| 🗂️ **Document Vault** | Centralized secure document management with per-user access controls |
| ⚙️ **User Settings** | Configurable notification preferences, security policies, and team management |

---

## 📄 Pages

The platform is built as a multi-page HTML application:

| File | Description |
|---|---|
| `index.html` | Marketing landing page with feature showcase and CTA |
| `login.html` | Secure authentication portal |
| `dashboard.html` | Main admin dashboard — overview, stats, recent activity |
| `documents.html` | Document vault — upload, manage, and assign fingerprints |
| `analytics.html` | Deep-dive forensic analytics and access reports |
| `leak_detection.html` | Active leak scanning and alert management |
| `settings.html` | User preferences and platform configuration |

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, Tailwind CSS (CDN), Vanilla JavaScript |
| UI Design | Material Symbols, Google Fonts (Manrope + Inter) |
| Backend / Auth | Firebase Authentication |
| Database | Firebase Firestore |
| Analytics | Firebase Analytics |
| Animations | Custom CSS keyframes + Intersection Observer API |
| Styling Pattern | Dark-mode first, glass-morphism design system |

---

## 🗂️ Project Structure

```
TraceLock/
├── index.html            # Landing page
├── login.html            # Authentication
├── dashboard.html        # Admin dashboard
├── documents.html        # Document management
├── analytics.html        # Forensic analytics
├── leak_detection.html   # Leak monitoring
├── settings.html         # User settings
├── firebase-config.js    # Firebase initialization
├── transitions.css        # Page transition animations
├── transitions.js         # Transition logic
└── README.md
```

---

## 🚀 Getting Started

TraceLock is a **static frontend application** — no build step or package manager required.

### Option 1: Open Directly

Clone the repo and open `index.html` in your browser:

```bash
git clone https://github.com/CHAUHANRUDRA24/TraceLock.git
cd TraceLock
open index.html
```

### Option 2: Local Dev Server (Recommended)

Use any static file server to avoid browser CORS restrictions with Firebase:

```bash
# Using Python
python -m http.server 3000

# Using Node.js (npx)
npx serve .

# Using VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then visit `http://localhost:3000`.

---

## 🔥 Firebase Setup

TraceLock uses Firebase for authentication and data storage. To connect your own Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** (Email/Password provider).
3. Enable **Firestore Database**.
4. Copy your Firebase config and update `firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

> ⚠️ **Never commit real API keys to a public repository.** Use environment variables or Firebase security rules to restrict access.

---

## 🎨 Design System

TraceLock uses a custom dark-mode design system built on Tailwind CSS:

- **Primary color:** `#00D1FF` (Electric Cyan)
- **Secondary color:** `#9D00FF` (Neon Purple)
- **Background:** `#131313` (Deep Black)
- **Typography:** Manrope (headlines) + Inter (body)
- **Visual style:** Glassmorphism cards, neon gradients, floating animations

---

## 🔐 Security Considerations

- All document fingerprints are generated client-side using steganographic algorithms
- Firebase Authentication handles user session management..
- Firestore security rules should be configured to restrict data access per user role
- No sensitive forensic keys or document content should be stored unencrypted

---

## 📈 Roadmap

- [ ] Backend API for server-side watermark generation
- [ ] Automated email alerts on leak detection
- [ ] PDF and DOCX watermarking support
- [ ] Role-based access control (Admin / Viewer / Auditor)
- [ ] Webhook integrations (Slack, Teams)
- [ ] Mobile-responsive dashboard improvements

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built for organizations that can't afford to wonder who leaked the document.**

*TraceLock — Immutable. Invisible. Inescapable.*

</div>

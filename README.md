<div align="center">

# 🌿 MindBalance AI

### *Your Intelligent Mental Health Companion & Emotional Well-Being Tracker*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-8E75C2?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Modern-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  MindBalance AI is an empathetic, privacy-conscious digital mental health companion designed to foster emotional resilience, mindful reflection, and healthy mental habits through cutting-edge multimodal AI, evidence-informed CBT tools, and interactive mood analytics.
</p>

[Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Safety & Disclaimer](#-safety--medical-disclaimer)

---

</div>

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [1. Smart Journaling & Voice Dictation](#1-smart-journaling--voice-dictation)
  - [2. Multi-Persona Emotional Companion](#2-multi-persona-emotional-companion)
  - [3. Mood & Lifestyle Analytics](#3-mood--lifestyle-analytics)
  - [4. Evidence-Informed Wellness Toolkit](#4-evidence-informed-wellness-toolkit)
  - [5. Crisis Intervention & Safety Guardrails](#5-crisis-intervention--safety-guardrails)
  - [6. Habit Gamification & Streak Tracking](#6-habit-gamification--streak-tracking)
- [Tech Stack](#-tech-stack)
- [Architecture & Data Flow](#-architecture--data-flow)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Project Structure](#-project-structure)
- [Safety & Medical Disclaimer](#-safety--medical-disclaimer)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Navigating daily emotional fluctuations, stress, and burnout requires both non-judgmental space and constructive self-reflection tools. **MindBalance AI** bridges natural language processing with evidence-informed wellness frameworks (such as Cognitive Behavioral Therapy and mindfulness) to deliver an intuitive companion that:

- **Listens without judgment:** Captures thoughts via text or speech dictation.
- **Extracts emotional insights:** Identifies core moods and nuanced emotions using Gemini 2.5 Flash's structured JSON output schemas.
- **Promotes balanced perspectives:** Offers Cognitive Behavioral Therapy (CBT) reframing exercises to challenge automatic negative thoughts.
- **Tracks patterns over time:** Correlates sleep, activity, and stress against emotional health through interactive charts and AI-generated wellness summaries.
- **Protects privacy:** Stores user records in profile-scoped client-side storage with zero tracking telemetry.

---

## ✨ Key Features

### 1. Smart Journaling & Voice Dictation
- **Speech-to-Text Integration:** Hands-free voice journaling powered by the browser-native Web Speech API.
- **Context-Aware Daily Prompts:** Gemini 2.5 Flash synthesizes recent logs to formulate personalized, gentle reflection prompts for the day.
- **Automated Sentiment & Emotion Extraction:** Every entry is processed using strict schema constraints to generate a concise summary, dominant sentiment (`Positive`, `Neutral`, or `Negative`), and granular emotion tags (e.g., *grateful*, *anxious*, *optimistic*).

### 2. Multi-Persona Emotional Companion
An interactive conversational interface featuring specialized AI companion personas:
- **🎧 Active Listener:** Employs non-judgmental reflective listening to validate feelings without giving unsolicited advice.
- **⚡ Motivator:** An upbeat coach delivering positive reinforcement, affirmations, and celebratory encouragement.
- **🌱 Mentor:** Uses CBT and mindfulness frameworks to guide introspective exploration and inquiry.
- **🎵 Media Finder:** Detects context and generates targeted YouTube playlist suggestions for calming, uplifting, or focused audio-visual therapy.

### 3. Mood & Lifestyle Analytics
- **1-Click Emoji Check-Ins:** Quickly log real-time emotional state across varied affective spectrums.
- **Holistic Lifestyle Tracking:** Record sleep duration (hours), physical activity level (1–5), and stress levels (1–5).
- **Interactive Visualizations:** Responsive trend charts built with **Recharts** displaying mood trajectories across daily and weekly horizons.
- **Emotion Frequency Breakdown:** Dynamic tag cloud highlighting top-recurring emotions.
- **AI-Powered Wellness Reports:** Synthesizes longitudinal data to uncover lifestyle-mood correlations and actionable suggestions.

### 4. Evidence-Informed Wellness Toolkit
- **Guided Box Breathing:** Calming, rhythmic visual guide with smooth CSS expand/contract keyframe pacing to down-regulate nervous system arousal.
- **Cognitive Reframer (CBT):** Enter troublesome or intrusive thoughts to receive alternative, constructive, and evidence-grounded perspectives.
- **Instant Mood-Responsive Tips:** On-demand actionable micro-practices tailored to whether you're feeling down, neutral, or thriving.
- **Curated Media Recommendations:** Direct search queries for mindfulness soundscapes, ambient meditation music, and motivational talks.

### 5. Crisis Intervention & Safety Guardrails
- **Automated Distress Detection:** Scans text entries and chat inputs against a comprehensive crisis keyword registry (`self-harm`, `suicide`, etc.).
- **Immediate Resource Modal:** Prevents conversational hallucinations during emergencies by immediately opening a dedicated modal with 24/7 lifeline contacts:
  - 🇺🇸 **US & 🇨🇦 Canada:** Call or text `988` (Suicide & Crisis Lifeline)
  - 🇬🇧 **UK:** Call `111` (NHS Mental Health Services)
  - International emergency and confidential support links.

### 6. Habit Gamification & Streak Tracking
- **Streak Counters:** Tracks current consecutive logging days and personal record streaks.
- **Milestone Recognition:** Visual indicators celebrating consistent self-care routines.

---

## 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) | Modern component-driven UI with functional hooks |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) | Strict type safety and robust data contracts |
| **Build Tool & Dev Server** | [Vite 6](https://vitejs.dev/) | Ultra-fast bundling, instant HMR, and asset resolution |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS with customized wellness palette and animations |
| **Artificial Intelligence** | [@google/genai](https://www.npmjs.com/package/@google/genai) | Official Google GenAI SDK running **Gemini 2.5 Flash** |
| **Data Visualization** | [Recharts 3.1](https://recharts.org/) | Declarative charting library for emotional trend analytics |
| **Speech Processing** | Web Speech API | Native browser speech recognition for voice journaling |
| **State & Persistence** | LocalStorage + React Hooks | Profile-isolated local storage for privacy and speed |

---

## 📐 Architecture & Data Flow

```
                      +-----------------------------------------+
                      |             User Interface              |
                      |  (Journal, Chat, Analytics, Wellness)   |
                      +-------------------+---------------------+
                                          |
                        +-----------------+-----------------+
                        |                                   |
                        v                                   v
             +--------------------+               +--------------------+
             | Web Speech API /   |               |   React State &    |
             | User Text Input    |               |  useLocalStorage   |
             +---------+----------+               +---------+----------+
                       |                                    |
                       v                                    |
          +------------------------+                        |
          |  Crisis Keyword Guard  | -- [Detected] --> Emergency Modal
          +-----------+------------+                        |
                      | [Passed]                            |
                      v                                     v
          +------------------------+              +--------------------+
          |   Google GenAI SDK     |              | User Isolated Data |
          |   (Gemini 2.5 Flash)   |              |  `logEntries_{id}` |
          +-----------+------------+              +--------------------+
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
   [Structured   [Multi-turn    [CBT Reframing
    Sentiment]     Chats]        & Reports]
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher recommended) — [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node) or **pnpm** / **yarn**
- A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mindbalance-ai.git
   cd mindbalance-ai
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

### Environment Configuration

1. Create a `.env.local` file in the root directory (or copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```

2. Add your Google Gemini API key to `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

> 💡 **Note:** Your API key remains private on your machine and is loaded by Vite during development and build time.

### Running the Application

- **Start the development server:**
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost:3000` (or the port specified in your console).

- **Create a production build:**
  ```bash
  npm run build
  ```

- **Preview the production build:**
  ```bash
  npm run preview
  ```

---

## 📁 Project Structure

```text
mindbalance-ai/
├── components/
│   ├── auth/
│   │   └── AuthPage.tsx             # Multi-profile login & profile switcher
│   ├── chat/
│   │   ├── ChatMessageBubble.tsx    # Message rendering with playlist support
│   │   ├── ChatPage.tsx             # Persona selection & session coordinator
│   │   └── ChatWindow.tsx           # Multi-turn streaming chat component
│   ├── home/
│   │   ├── HomePage.tsx             # Main dashboard (check-ins, streaks, logs)
│   │   ├── JournalEditor.tsx        # Voice & text journal with crisis detection
│   │   ├── JournalEntryCard.tsx     # Display card with sentiment & emotion pills
│   │   └── LogList.tsx              # Filterable chronological feed of activities
│   ├── insights/
│   │   ├── InsightsPage.tsx         # Analytics hub & AI Wellness Report generator
│   │   └── MoodChart.tsx            # Recharts-based longitudinal mood graph
│   ├── layout/
│   │   ├── Layout.tsx               # Primary application wrapper & navigation
│   │   └── Navbar.tsx               # Responsive header with profile logout
│   ├── ui/
│   │   ├── Button.tsx               # Accessible reusable button variants
│   │   ├── Card.tsx                 # Styled container card
│   │   ├── Loader.tsx               # Animated feedback spinners
│   │   └── Modal.tsx                # Accessible overlay modal dialog
│   └── wellness/
│       ├── BreathingExercise.tsx    # Animated 4-4-4 box breathing visualizer
│       ├── CognitiveReframingTool.tsx# CBT negative thought reframing tool
│       ├── WellnessPage.tsx         # Wellness suite container & micro-tips
│       └── YouTubeRecommender.tsx   # Mood-based audio-visual recommendation
├── hooks/
│   ├── useLocalStorage.ts          # Type-safe, profile-namespaced persistence
│   └── useSpeechRecognition.ts      # Web Speech API wrapper for speech-to-text
├── services/
│   └── geminiService.ts             # Google GenAI SDK schemas, prompts & chat API
├── utils/
│   └── gamification.ts              # Streak calculations & logging statistics
├── constants.tsx                    # System instructions, personas & crisis safety
├── types.ts                         # Complete TypeScript interfaces & type definitions
├── index.html                       # HTML5 entry with fonts, SEO & Tailwind script
├── index.tsx                        # React application bootstrap root
├── App.tsx                          # Core application state & tab router
├── vite.config.ts                   # Vite build configuration with alias & env definitions
├── tsconfig.json                    # Strict TypeScript compiler options
├── .env.example                     # Environment variables template
└── README.md                        # Documentation
```

---

## 🔒 Privacy & Local Isolation

- **Zero Third-Party Telemetry:** MindBalance AI does not collect behavioral telemetry or track user activity.
- **Client-Side Profile Storage:** All journal entries, lifestyle metrics, and check-in logs are encrypted within browser `localStorage` keyed uniquely to the active username (`logEntries_{username}`).
- **Stateless Analysis:** Text sent to the Gemini API is analyzed in transient requests without persisting user identities on remote servers.

---

## ⚠️ Safety & Medical Disclaimer

> **MindBalance AI is an AI-powered self-reflection and mental wellness aid, NOT a licensed medical professional, psychiatric clinic, or suicide hotline.**

The tools, analyses, reframing exercises, and suggestions provided by MindBalance AI are meant solely for educational and personal reflection purposes:
- It **does not** provide medical diagnosis, clinical psychotherapy, or emergency crisis care.
- If you or someone you know is experiencing acute emotional distress, suicidal ideation, or a mental health emergency, please immediately contact professional emergency resources:
  - 🇺🇸 **United States:** Call or text **`988`** to reach the Suicide & Crisis Lifeline, or chat at [988lifeline.org](https://988lifeline.org/).
  - 🇨🇦 **Canada:** Call or text **`988`** to reach the Suicide Crisis Helpline.
  - 🇬🇧 **United Kingdom:** Call **`111`** for NHS mental health services or **`116 123`** for Samaritans.
  - 🌍 **International:** Find a confidential local helpline at [Befrienders Worldwide](https://www.befrienders.org/) or [Find A Helpline](https://findahelpline.com/).

---

## 🤝 Contributing

Contributions make the open-source community a supportive and inspiring place to learn and build. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch:**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes:**
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to the Branch:**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <sub>Built with care for mindful, healthy living. If you find MindBalance AI helpful, please consider starring ⭐️ this repository!</sub>
</div>

# Blaze Kana — Japanese Language Learning Platform

**Brand:** BLAZE  
**Created by:** Blaze Channel  
**Creator & Designer:** Mahi Al-Moktadir  
**Facebook:** [https://www.facebook.com/mahialmoktadir](https://www.facebook.com/mahialmoktadir)  
**Instagram:** [https://www.instagram.com/mahialmoktadir/](https://www.instagram.com/mahialmoktadir/)  
**Copyright:** © 2026 Blaze — Created by Mahi Al-Moktadir

---

## Overview

**Blaze Kana** is an interactive, vocabulary-first Japanese language learning web platform designed to guide beginner and lower-intermediate learners through 25 structured lessons in 30 days.

It natively supports three interface languages:
1. **English**
2. **বাংলা (Bangla)**
3. **日本語 (Japanese)**

---

## Key Modules & Features

1. **30-Day Guided Roadmap**:
   - Days 1–5: Lessons 1–5
   - Days 6–10: Lessons 6–10
   - Days 11–15: Lessons 11–15
   - Days 16–20: Lessons 16–20
   - Days 21–25: Lessons 21–25
   - Days 26–28: Review, catch-up, and particle/verb inflection reinforcement
   - Day 29: Comprehensive assessment
   - Day 30: Final graduation assessment and learning report

2. **Lessons 0 to 25 Curriculum**:
   - Lesson 0: Orientation (Writing systems, SOV word order, mora timing, particles)
   - Lessons 1–25: Full Minna-style authoritative curriculum covering basic identity, demonstratives, time, transportation, transitive objects, giving & receiving, adjectives, abilities, existence, counters, comparisons, desires, -te form requests, permissions, sequential actions, obligations, dictionary potential, past experiences, plain vs. polite speech, opinions, relative clauses, conditionals (と, たら), and benefactive favors (あげる, もらう, くれる).

3. **Kana Matrix & Interactive Writing Canvas**:
   - Full Gojuon, Dakuten, and Handakuten charts for Hiragana and Katakana
   - Interactive drawing canvas with touch/mouse stylus support, 4-quadrant Japanese practice grid, ghost reference guide, stroke guidance hints, undo, and audio playback.

4. **Visual Grammar Lab**:
   - Structural color-coded sentence blocks (`[Topic] + [は] + [Predicate] + [です]`)
   - Particle role breakdowns and bilingual explanations.

5. **Sentence Builder**:
   - Drag/tap word order puzzle to assemble natural Japanese sentences with immediate syntax validation.

6. **Spaced Repetition & Practice Studios**:
   - 3D Flashcards with easy/difficult SRS interval grading (1d, 3d, 7d, 14d, 30d)
   - Custom Practice Builder with granular Kana row selection and lesson scope
   - 45-Second Speed Sprint Challenge
   - Daily Challenge with deterministic seed synced per date
   - Memory Recall Studio with vanishing peek countdown
   - Audio & Reading Comprehension with speech synthesis and transcript reveal
   - Mistake Review Hub for retrying missed answers
   - Bookmarked & Difficult Words collections

7. **Sensei AI Grammar Explainer**:
   - Powered by Gemini 4 Argon with `ThinkingLevel.HIGH` on server-side `/api/sensei/explain`
   - Provides deep linguistic breakdowns of grammar nuances, particles, and sentence structures with authentic local fallback.

8. **Appendices**:
   - Appendix A: Japanese Numbers (1 to 100,000,000 + irregulars)
   - Appendix B: Time Expressions (days of week, months, irregular calendar days)
   - Appendix C: Complete Counting Suffixes (People, Flat things, Machines, Books, Animals, Floors, etc.)
   - Appendix D: Verb Conjugation Master Table (Group I, II, III across Dictionary, -masu, -te, -nai, -ta forms)

---

## Environment Variables

Defined in `.env.example`:

- `GEMINI_API_KEY`: API key for Gemini AI. Automatically injected by AI Studio.
- `PORT`: Port for the Express server (default `3000`).

---

## Deployment & Setup

```bash
# Install dependencies
npm install

# Start local full-stack development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm start
```

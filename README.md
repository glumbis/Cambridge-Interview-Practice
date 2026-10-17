# Supervision: Cambridge Engineering Interview Practice

A focused, no-install web app for preparing for the **Cambridge Engineering** admissions interview.

**Live app:** https://glumbis.github.io/Cambridge-Interview-Practice/

## What's inside

- **158 hard questions** across 15 topics, each with progressive hints, a full model answer, the key insight, and the follow-up an interviewer would push you on.
- **Topics weighted by likelihood.** Mechanics and maths get the most questions, then circuits, then fluids, thermodynamics, materials, estimation and motivation. The weighting follows the Cambridge Engineering Department's own practice-problem distribution and reported interview content.
- **Difficulty:** every question is Hard, Very hard or Brutal. There are no warm-ups.

## How it trains you

| Technique | How the app uses it |
|---|---|
| Active recall | You attempt each problem before you can see the answer. |
| Think-aloud practice | There's a working box on every question, plus prompts for interview habits (sketch it, state assumptions, check limits). |
| Progressive hints | Hints work like interviewer nudges. Using them caps your self-grade, so "mastered" means solved unaided. |
| Spaced repetition | SM-2-style scheduling. Failed questions come back in the same session and the next day. Solved ones come back at growing intervals. |
| Interleaving | Sessions mix topics so you practise recognising which tool a problem needs. |
| Timed mocks | 20–60 minute mock interviews split into a maths/mechanics part and a physics/engineering part, followed by a graded review. |

**Readiness** is a likelihood-weighted measure of how much of the question bank you have mastered (a question counts as mastered once its review interval reaches 14 days).

## Run locally

It's a static site. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Progress is stored in your browser's `localStorage`. Use **Method → Export** to back it up.

## Structure

```
index.html
css/style.css
js/topics.js        topic list + likelihood weights
js/data/*.js        question bank (KaTeX maths)
js/app.js           SRS, sessions, mock interviews, library, settings
```

To add questions, push objects onto `window.QB` in any data file: `{ id, topic, diff (3–5), mins, title, q, hints[], sol, insight, follow }`.

*Independent practice tool. Not affiliated with the University of Cambridge.*

# 🦅 Shumkar

Shumkar is a gamified educational platform for children.  
It combines video-based lessons with interactive games to reinforce knowledge and track user progress.

---

## Overview

The platform is designed to make learning engaging through gameplay mechanics.  
Users first watch a lesson and then complete interactive tasks such as quizzes and sequence-based challenges.

The application includes a reward system, progress tracking, and map-based level navigation.

---

## Features

- Video-based lessons  
- Interactive quiz system (image choice, sequence ordering)  
- Level progression with map navigation  
- Reward system (tumars, XP)  
- Lives and streak mechanics  
- In-app shop (hints, shields, skins)  
- Achievements and leaderboard  
- Persistent state using Redux Persist  

---

## Tech Stack

- React  
- TypeScript  
- Redux Toolkit  
- Redux Persist  
- React Router  
- Tailwind CSS  
- Axios  

---

## Architecture

The project follows **Feature-Sliced Design (FSD)**:

```txt
src/
  app/        # application setup (store, routing)
  pages/      # route-level components
  widgets/    # layout and large UI blocks
  features/   # business logic (game, shop, profile)
  entities/   # domain models (level, player, progress)
  shared/     # reusable components, utils, api
```
---


## Key Principles
Separation of concerns between UI, state, and business logic
Game logic extracted into custom hooks
Redux used as a single source of truth
Local storage handled via redux-persist

---


## Getting Started
-git clone https://github.com/kalybekovanurai/Shumkar.git
-cd Shumkar
-npm install
-npm run dev
-Build
-npm run build


---


## Project Structure Highlights
- features/game — core gameplay logic and UI
- features/level-game — level execution logic (custom hooks)
- entities/level — level data and API mapping
- entities/player — player state (lives, XP, currency)
- features/map — map generation and navigation logic


---

Future Improvements
- AI-based assistant for lessons
- Voice support for younger users
- Mobile adaptation
- Adaptive difficulty system

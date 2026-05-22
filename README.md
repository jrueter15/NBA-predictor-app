# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# NBA-Predictor

# Goal: to pull in all daily NBA games

# I have pulled in the daily NBA games. I have the odds/juice based off the major sportsbooks. Now I'd like to get some insights. I feel like the easiest would be totals. I'll want to take in stats from recent games. Probably form a few averages/medians like road/home, against X opponent, the last 5/10/30. Then compare those numbers to the line. I'd also like to factor in missing/injured players. That will be a little more difficult. You'll have to judge the impact of the player vs. replacement. I'll also want to think about continuous road fatigue, pace of teams, averages of games against similarly paced teams (maybe weight games higher the more similar in pace, but teams might be drastically different). Also, can't forget efficiency. Recent pace trend? Scheduling? Defensive/offensive efficiency?

# What's V1?
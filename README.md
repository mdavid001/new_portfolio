# Solved. · Michelle David's portfolio

**Name:** Michelle David
**Matric number:** 23120111010
**Course:** CSC 419, Advances in Web, Mobile and Blockchain Development (Pan-Atlantic University)
**Live site:** https://mdavid001.github.io/solved/ <!-- update if the repo has a different name -->

A personal portfolio styled as the puzzle page of a Lagos newspaper. The hero Sudoku solves itself, the projects sit in a 3x3 grid ("The nine"), and every project has its own case-study page.

## Where each assignment requirement lives

| Requirement | Where |
|---|---|
| About me | `index.html` → **Notes** section |
| Projects (name, description, image, stack, live link) | `index.html` → **The nine**, built from `js/data.js` |
| Call to action (email, WhatsApp, Hire me) | Hero (first screen), Contact section, and footer |
| Project details page | `project.html?id=sibas` (one template for all nine projects) |
| Responsive | Mobile-first CSS, checked at 360px, 768px and 1280px |

## Project structure

```
index.html          home page: hero, The nine, Notes, Experience, Contact
project.html        case-study template, reads ?id= from the URL
404.html            not-found page (GitHub Pages uses it automatically)
favicon.svg
css/style.css       design tokens, layout and home page styles
css/project.css     case-study page styles
js/data.js          ALL content: site details + the nine projects
js/site.js          shared helpers, contact links, recruiter mode
js/board.js         self-solving hero Sudoku
js/home.js          projects grid, tool filter, keys 1-9, hover, recruiter mode
js/project.js       renders a case study from data.js
js/contact.js       contact form (Web3Forms) with email fallback
assets/img/         og.png, profile photo, project screenshots
assets/cv/          downloadable CV (PDF)
play/               the Sudoku game
```

No frameworks, no build step and no npm packages: plain HTML, CSS and JavaScript.

## Editing content

- **Add or change a project:** edit `js/data.js`. The grid, filter, recruiter list and project page all update.
- **Screenshots:** save them as `assets/img/projects/<project-id>/cover.webp`, `1.webp`, `2.webp`… Missing images show a "Screenshot coming" card instead of breaking.
- **Your photo:** `assets/img/michelle.webp` (square).
- **Unfinished text:** anything starting with `[TODO` shows on the site in a yellow dashed box. Search the code for `TODO` to find them all.

## Features

- Self-solving Sudoku in the hero; rows, columns and boxes flash green as they complete
- Tool filter: highlights every project that uses a tool, like Sudoku's same-number highlight
- Keys 1-9 open a project
- "Skip the puzzle" recruiter mode: a plain, fast layout (kept in the URL as `?view=plain`, no cookies)
- Respects reduced-motion settings, keyboard accessible, visible focus states

## Credits

Fonts: Newsreader, IBM Plex Mono and Kalam (Google Fonts).

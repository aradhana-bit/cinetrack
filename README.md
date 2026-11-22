# CineTrack

<p align="center">
  <strong>Discover. Track. Organize. Your personal space for movies.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-State_Management-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-Routing-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
</p>

---

## Overview

CineTrack is a movie discovery and tracking web application built to help users explore movies and organize their personal watchlists in one place.

The application uses React for its interface, Redux Toolkit for centralized state management, and Vite for a fast development and build workflow.

## Key Features

- **Movie Discovery:** Browse movie collections and explore titles.
- **Movie Search:** Search for movies by title.
- **Watchlist Management:** Add and organize movies in a personal watchlist.
- **Movie Details:** View information about selected movies.
- **Dashboard:** Access movie-related information through a dedicated dashboard.
- **Theme State:** Manage the application's theme state.
- **Charts:** Present selected data through Recharts visualizations.
- **Responsive Components:** Navigate through reusable interface components.

## Technology Stack

| Technology | Purpose |
|:---|:---|
| React 19 | Component-based user interface |
| Vite 8 | Development server and build tool |
| JavaScript (ES6+) | Application logic |
| Redux Toolkit | Centralized state management |
| React Redux | React and Redux integration |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| Recharts | Data visualization |
| CSS Modules | Component-level styling |
| ESLint | Code quality and linting |

## Project Structure

```text
cinetrack/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Charts/
│   │   ├── Loader/
│   │   ├── MovieCard/
│   │   ├── Navbar/
│   │   ├── SearchBar/
│   │   └── Sidebar/
│   ├── hooks/
│   ├── pages/
│   │   ├── AddToWatchlist/
│   │   ├── Dashboard/
│   │   ├── Discover/
│   │   └── Watchlist/
│   ├── services/
│   ├── store/
│   │   └── slices/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aradhana-bit/cinetrack.git
   ```

2. Open the project directory:

   ```bash
   cd cinetrack
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

Open the local URL displayed in the terminal to view the application.

## Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs ESLint checks |

## Concepts Implemented

- React functional components
- Component-based application architecture
- Reusable UI components
- Centralized state management with Redux Toolkit
- Client-side routing
- API communication with Axios
- Custom React hooks
- CSS Modules
- Data visualization with Recharts

## Project Objectives

- Build a practical movie discovery and tracking application.
- Apply modern React development practices.
- Understand centralized state management and routing.
- Practice API integration and reusable component design.
- Maintain a clear and scalable project structure.

## Purpose

CineTrack is a frontend development project created to apply and strengthen skills in React, state management, API integration, and modern web application development.

---

<p align="center">
  <strong>DISCOVER. TRACK. WATCH. REPEAT.</strong>
  <br/><br/>
  <strong>Aradhana</strong>
  <br/>
  B.Tech Computer Science and Engineering
</p>

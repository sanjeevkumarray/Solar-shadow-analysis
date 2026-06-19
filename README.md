# 🌞 Solar Shadow & Edge Occlusion Lab

A browser-based 3D application that simulates solar panel shading and analyzes its impact on energy production. The project includes a custom **Edge Occlusion Factor (EOF)** metric to better represent how edge shading can affect panel performance.

### 🚀 Live Demo

https://solar-shadow-sanjeev.netlify.app/

---

## Overview

This project was built to visualize how nearby structures such as buildings and water tanks cast shadows on solar panels throughout the day.

Users can modify object dimensions, move solar tables, adjust sun position, and instantly see how shading affects panel performance.

---

## Features

* Interactive 3D solar site visualization
* Adjustable buildings and water tanks
* Movable solar tables (2×3 panel layout, 15° tilt)
* Manual and date/time-based sun simulation
* Real-time shadow visualization
* Panel-level shading analysis
* Edge Occlusion Factor (EOF) calculation
* Estimated efficiency scoring

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run the Project

```bash
npm run dev
```

### Open

```text
http://localhost:5173
```

---

## Tech Stack

* React
* Vite
* Three.js
* React Three Fiber
* Tailwind CSS

---

## Shadow & Efficiency Analysis

The application calculates the sun's position and evaluates how surrounding objects affect each solar panel.

Along with shaded area, an **Edge Occlusion Factor (EOF)** is used during efficiency analysis. This helps account for situations where shadows near panel edges may have a greater impact on power generation than their visible area alone.

---

## Assumptions

* Fixed 2×3 panel arrangement
* Fixed table tilt of 15°
* Default location based on New Delhi coordinates
* Geometry-based shadow calculations
* Fully client-side implementation

---

## Author

**Sanjeev Kumar Ray**

Built as part of a solar shadow analysis assignment to explore 3D visualization, solar geometry, and shading analysis in a web application.

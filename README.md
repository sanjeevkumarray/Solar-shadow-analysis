# 🌞 Solar Shadow & Edge Occlusion Lab

A lightweight 3D web application built to explore how shadows impact solar panel performance. The project simulates real-world sun movement, obstacle-based shading, and panel efficiency loss using a custom metric called **Edge Occlusion Factor (EOF)**.

### 🚀 Live Demo

https://solar-shadow-sanjeev.netlify.app/

---

## Why I Built This

Most solar shading calculators focus only on the percentage of panel area covered by shadow. In reality, even a small shadow near the edge of a panel can significantly reduce power output because of how solar cell strings and bypass diodes work.

This project was created to visualize that behavior in an interactive 3D environment and provide a more realistic estimate of efficiency loss.

---

## Features

* 🌞 Real-time solar position simulation
* 🏢 Adjustable obstacles that cast dynamic shadows
* ⚡ Panel efficiency calculation based on shading impact
* 📉 Custom Edge Occlusion Factor (EOF) analysis
* 🎮 Interactive 3D scene powered by WebGL
* 📱 Fully client-side application with no backend dependency

---

## Getting Started

### Prerequisites

* Node.js 20+ recommended

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Open the Application

```text
http://localhost:5173
```

---

## Tech Stack

* React 18
* Vite
* Three.js
* React Three Fiber
* Drei
* Tailwind CSS
* Lucide React

---

## Project Structure

### UI Layer

Built with React and Tailwind CSS.

Responsible for:

* User inputs
* Simulation controls
* Live statistics
* Dashboard interactions

### 3D Visualization

Powered by Three.js through React Three Fiber.

Responsible for:

* Solar panels and obstacles
* Dynamic sunlight direction
* Real-time shadow rendering
* Camera controls

### Solar Calculation Engine

Calculates solar position using:

* Date
* Time
* Latitude
* Longitude

Outputs:

* Solar azimuth
* Solar elevation
* Sun direction vectors

### Analysis Engine

Processes:

* Shadow intersections
* Obstacle collisions
* Coverage estimation
* Efficiency calculations

---

## How the Analysis Works

### 1. Solar Position

The application calculates the sun's position throughout the day using standard solar geometry formulas.

The result is a dynamic sun vector that drives both lighting and shadow calculations inside the 3D scene.

### 2. Shadow Detection

Virtual rays are projected from solar panels toward the sun.

When an obstacle blocks the path, the system registers a shading event and estimates how much of the panel is affected.

### 3. Edge Occlusion Factor (EOF)

Traditional shading percentages don't always represent actual electrical losses.

EOF focuses on how close the shadow is to the panel edges, where bypass diode activation can cause larger performance drops.

EOF Scale:

* 0.0 → No shading
* 0.5 → Moderate edge interference
* 0.95 → High risk of string loss
* 1.0 → Full panel shutdown

### 4. Efficiency Estimation

Final panel efficiency is derived from:

* Total shaded area
* Edge Occlusion Factor penalty

This provides a more realistic estimate of production loss than simple area-based shading metrics.

---

## Engineering Assumptions

To keep the application fast and browser-friendly, a few simplifications were made:

* Fixed 2×3 solar panel layout
* Default location based on New Delhi coordinates
* Mathematical ray intersections instead of expensive pixel-level calculations
* Fully client-side processing with no external APIs

---

## Future Improvements

Potential enhancements include:

* Multiple solar farm layouts
* Historical weather integration
* Geographic map selection
* Annual energy production reports
* Exportable simulation results
* Battery and inverter loss modelling

---

## Author

**Sanjeev Kumar Ray**

Built as a practical engineering project to combine frontend development, 3D graphics, geometry calculations, and renewable energy concepts into a single interactive application.

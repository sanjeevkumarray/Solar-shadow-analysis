

# HELIOS // Solar Shadow & Edge Occlusion Lab

A lean, client-side 3D application built to simulate solar geometry, cast physics-based shadows, and analyze real-time efficiency degradation on PV strings using the **Edge Occlusion Factor (EOF)** metric.

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have **Node.js (v20.11.0 or higher)** installed.

### 1. Install Dependencies

Grab the packages specified in the `package.json`:

```bash
npm install

```

### 2. Spin Up Dev Server

Launch Vite's local development environment:

```bash
npm run dev

```

### 3. Open the App

Ctrl+Click the link in your terminal or navigate to:

```text
http://localhost:5173/

```

---

## 🏗️ Architecture

The app runs entirely in the user's browser (100% frontend). It uses a unified state approach to bind the 3D rendering context directly to mathematical calculation modules:

* **UI Layer (React + Tailwind CSS):** Handles the sidebar inputs, real-time value tracking, and simulation playback controls.
* **Viewport (Three.js via R3F):** Renders the hardware-accelerated 3D environment, dynamic lighting, and directional shadow maps.
* **Astrological Engine (`solarCalc.js`):** Pure math module calculating solar coordinates based on date, time, and positioning algorithms.
* **Analytics Engine (`analysisEngine.js`):** Intersects geometric vectors between obstacles and panels to calculate shadow coverage and electrical dropouts.

---

## 📐 How the Analysis Works

### 1. Sun Position Math

The solar position pathing determines **Azimuth** ($0^\circ$ to $360^\circ$ tracking clockwise from North) and **Elevation** ($0^\circ$ to $90^\circ$ relative to the horizon plane) using standard celestial coordination formulas:

$$\text{Declination } (\delta) = 23.45 \times \sin\left(\frac{2\pi}{365} \times (d - 80)\right)$$

$$\text{Elevation } (\alpha) = \arcsin\left(\sin(\phi)\sin(\delta) + \cos(\phi)\cos(\delta)\cos(H)\right)$$

* ($d$ = day of year, $\phi$ = site latitude, $H$ = solar hour angle)

### 2. Shadow Projection

The script projects vector rays from the center coordinates of each solar panel toward the calculated sun vector position. If an obstacle's physical bounding box breaks this ray path below its max height limit, a shading collision is registered.

### 3. Edge Occlusion Factor (EOF)

Real-world solar panel modules use internal bypass diodes. Shading a tiny fraction of a panel's edge can drop out an entire electrical cell string, making standard area-shading percentages visually misleading.

To address this, we introduce the **Edge Occlusion Factor (EOF)**:

* **$\text{EOF} = 0.0$**: Panel is completely clear.
* **$\text{EOF} \to 0.95$**: Partial shadow clips the physical perimeter boundary of the array frame, initiating high string drop risks.
* **$\text{EOF} = 1.0$**: The panel is fully engulfed in shadow, forcing a complete circuit shutdown.

### 4. Total Panel Efficiency Formula

The final power generation capacity per panel is calculated by compounding the raw shaded area with the EOF penalty multiplier:

$$\text{Efficiency} = \max\left(0, \,\, 1 - (\text{Shade Ratio} + (\text{EOF} \times 0.45))\right)$$

---

## 🧠 Engineering Assumptions & Limitations

* **Fixed Layout Setup:** The solar array is structured strictly on a 2×3 tracker framework locked at a forward-facing pitch angle of $15^\circ$.
* **Geodetic Baseline:** Location coordinates are mapped using standard reference values (New Delhi coordinates: $28.61^\circ \text{N}, 77.21^\circ \text{E}$) to keep calculations completely client-side without heavy geo-lookup database requests.
* **Ray Approximations:** Bounding boxes are processed mathematically rather than calculating complex pixel-depth textures to maintain responsive performance across laptop GPUs.

---

## 📦 Tech Stack

* **Vite 5.2** - Ultra-fast development server & bundler setup.
* **React 18.3** - Declarative component shell and reactive state bindings.
* **Three.js / React Three Fiber / Drei** - Handles WebGL scenes, lighting models, orbital cameras, and shadow matrix maps.
* **Tailwind CSS 3.4** - Functional design utility layouts for dashboard sidebars.
* **Lucide React** - Clean, minimal engineering iconography.
<!-- =======================================================
     HealthScope - README.md
     Copy-paste this file into your repo root as README.md
     ======================================================= -->

<!-- Animated SVG header -->
<div align="center">
  <!-- Inline SVG pulse + heart + app name -->
  <svg width="680" height="140" viewBox="0 0 680 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="g1" x1="0" x2="1">
        <stop offset="0%" stop-color="#5ee7df" />
        <stop offset="100%" stop-color="#b490ca" />
      </linearGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.15"/>
      </filter>
    </defs>

    <!-- glowing rounded rectangle background -->
    <rect x="10" y="10" rx="18" ry="18" width="660" height="120" fill="url(#g1)" filter="url(#shadow)" opacity="0.18"></rect>

    <!-- heart icon with pulse -->
    <g transform="translate(80,70)" style="transform-origin:80px 70px;">
      <path d="M10 30 A12 12 0 0 1 34 30 Q34 40 22 52 Q10 40 10 30 Z" fill="#ff6b6b">
        <animate attributeName="transform" dur="1s" values="scale(1); scale(1.08); scale(1)" repeatCount="indefinite" />
      </path>
      <!-- heartbeat line -->
      <polyline points="-10,0 0,0 6,-20 12,12 22,-18 32,0 52,0" fill="none" stroke="#ff6b6b" stroke-width="3" stroke-linecap="round">
        <animate attributeName="stroke-opacity" dur="1s" values="0.6;1;0.6" repeatCount="indefinite" />
        <animate attributeName="stroke-dashoffset" values="0;100" dur="2s" repeatCount="indefinite" />
      </polyline>
    </g>

    <!-- Title text -->
    <text x="170" y="70" font-family="Segoe UI, Roboto, Arial" font-size="34" fill="#0f172a" font-weight="700" dominant-baseline="middle">
      HealthScope
    </text>

    <!-- Subtitle with animated letters sliding in -->
    <g transform="translate(170,92)">
      <text font-family="Segoe UI, Roboto, Arial" font-size="14" fill="#0f172a" opacity="0.9">
        <tspan>
          Your pocket symptom analyzer, age aware suggestions, and health journaling hub
        </tspan>
        <!-- subtle slide-in using SMIL -->
        <animate attributeName="x" from="180" to="0" dur="1.2s" begin="0.2s" fill="freeze"/>
      </text>
    </g>
  </svg>
</div>

<p align="center">
  <a href="#"><img alt="Stars" src="https://img.shields.io/github/stars/M-Nivetha7/HealthScope?style=flat-square" /></a>
  <a href="#"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" /></a>
  <a href="#"><img alt="Made with ❤️" src="https://img.shields.io/badge/made%20with-AI%20%26%20ML-orange?style=flat-square" /></a>
</p>

---

## 🚀 Project Overview

**HealthScope** is an interactive web app that helps users quickly identify possible diseases based on symptoms and age, suggests next steps, and provides an easy to use health journal. The UI is vibrant, modern, and animation friendly, it includes separate signup and login flows for secure access, and a dashboard that appears only after login.

Key highlights:
- Symptom to probable disease mapping
- Age aware medication and advice hints
- Doctor and patient user types, separate dashboards
- Webcam based exercise tracker planned for future releases
- Interactive charts and downloadable reports

---

## ✨ Live animation demo, GIF option

You can replace the SVG header with an animated GIF in this repo for fancier visuals. Put `demo.gif` in the repo root, then replace the SVG block above with:

```html
<p align="center">
  <img src="./demo.gif" alt="HealthScope demo" width="680" />
</p>

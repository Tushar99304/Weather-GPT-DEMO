# WeatherGPT — Grounded Conversational Weather Intelligence Platform

**Smart India Hackathon (SIH) 2026 Project Prototype**

> *"We don't replace meteorological forecasting systems. We make trusted meteorological intelligence conversational, traceable, multilingual and actionable."*

---

## 🌟 Core Product Architecture & Idea

WeatherGPT is **NOT** simply "ChatGPT + weather API". It is a grounded, evidence-backed conversational weather intelligence system built specifically for the Indian meteorological context.

```
USER QUERY (English / Hindi / Marathi / Hinglish)
       ↓
  WeatherGPT
       ↓
Understand Intent + Location + Timeframe + Language
       ↓
Retrieve Trusted Weather Evidence (IMD / NDMA SACHET / GFS)
       ↓
Validate & Prioritize Official Warnings (IMD Priority)
       ↓
AI Explanation & Evidence Quality Rating (HIGH / MEDIUM / LOW)
       ↓
Actionable Multilingual Response
```

### Key Differentiators & Principles
1. **Source Transparency**: LLM generated text is NEVER visually presented as the source of numerical weather truth. Weather values display their source badges (`IMD Official`, `NDMA Disaster Alert`, `GFS Model`) and observation timestamps.
2. **Evidence Quality Index**: AI responses show **Evidence Quality** (`HIGH`, `MEDIUM`, `LOW`) rather than deceptive AI confidence numbers.
3. **Official Warning Supremacy**: Disaster warnings from IMD and NDMA SACHET automatically override general model predictions.
4. **Offline Resilience**: Full offline center with cached weather snapshots and emergency guidance for floods, cyclones, heatwaves, and severe lightning.
5. **Decoupled FastAPI Service Layer**: Abstracted services in `src/services/` enable seamless connection to a FastAPI backend without modifying frontend components.

---

## 🎨 Design System & Theme

WeatherGPT uses a **Natural Light-Green Weather Theme** tailored for modern Indian civic-tech products:

- **Primary Green**: `#2E7D5B`
- **Primary Light**: `#E8F5EE`
- **Background**: `#F7FBF8`
- **Surface**: `#FFFFFF`
- **Secondary Green**: `#6BAF92`
- **Dark Text**: `#17352A`
- **Muted Text**: `#6B7D74`
- **Border**: `#DCEAE2`
- **Warning Amber**: `#F4B942`
- **Danger Red**: `#D9534F`

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Geospatial Maps**: Leaflet + React Leaflet
- **Voice Capabilities**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **Offline Cache**: LocalStorage + IndexedDB abstraction

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production (zero TypeScript or lint errors)
npm run build
```

---

## 🎬 SIH 2026 Demo Mode & Jury Walkthrough Flow

To showcase the application to SIH judges without requiring an active backend server:

1. **Toggle Demo Mode**: Click **`DEMO MODE`** in the top header.
2. **Dashboard Exploration**: View live weather cards for Mumbai, New Delhi, Pune, Bengaluru, or Manali.
3. **Conversational AI Query**: Type or ask: `"Kal Mumbai mein baarish hogi kya?"`
4. **Inspect Provenance**: Click **`Why this answer?`** on any AI response to inspect the IMD evidence metadata drawer.
5. **View Intent Routing**: Expand **`How WeatherGPT understood your question`** to demonstrate intent parsing, Hinglish translation, and source validation.
6. **Live Map & Layers**: Open **Live Map** (`/map`) and toggle between Rainfall Radar, Temperature, Wind Vector, and IMD Warning zones.
7. **Official Warnings**: Navigate to **Alerts** (`/alerts`) to inspect CAP-format NDMA SACHET disaster warnings.
8. **Simulate Offline Mode**: Disconnect your internet connection or inspect **Offline Center** (`/offline`) to demonstrate cached resilience and emergency disaster protocols.

---

## 🗺️ Application Routes

| Route | Feature Page | Key Highlights |
|---|---|---|
| `/` | **Dashboard** | Hero input, `CurrentWeatherCard`, `WeatherInsightCard`, hourly scroll & 7-day forecast |
| `/chat` | **WeatherGPT Chat** | Grounded conversational assistant with `Why this answer?` evidence provenance |
| `/forecast` | **Forecast Center** | 24-hr nowcast trend & 7-day district meteorological outlook |
| `/map` | **Live Map** | Interactive Leaflet map with temperature, rain radar, wind vectors, and alert circles |
| `/alerts` | **Alert Center** | Official IMD & NDMA SACHET disaster warnings with CAP directives |
| `/climate` | **Climate Analytics** | Recharts multi-year rainfall trends and temperature anomaly curves |
| `/advisory` | **Sector Advisory** | Decision support matrix for Driving, Travel, Outdoor Events, Trekking, Agriculture, Marine |
| `/voice` | **Voice Assistant** | Multi-lingual STT & TTS voice assistant (English, Hindi, Marathi, Hinglish) |
| `/offline` | **Offline Center** | Cached weather snapshots and emergency disaster protocols |
| `/settings` | **Settings** | Measurement units (°C/°F, km/h / m/s), language, SMS fallback toggle |
| `/sources` | **Trusted Sources** | Provenance details for IMD, NDMA SACHET, GFS, and Open-Meteo |

---

## 🔌 FastAPI Backend Integration Contract

The frontend expects a FastAPI backend server running at `VITE_API_BASE_URL` (default: `http://localhost:8000/api`).

### API Endpoints Expected:
- `GET /api/weather/current?location={id}` -> Returns `WeatherEvidence`
- `GET /api/forecast/hourly?location={id}` -> Returns `HourlyForecast[]`
- `GET /api/forecast/daily?location={id}` -> Returns `DailyForecast[]`
- `GET /api/alerts/active?location={id}` -> Returns `WeatherAlert[]`
- `POST /api/chat/ask` -> Request: `{ query, location, language }` -> Returns `{ message, queryAnalysis, evidence, activeAlert }`
- `GET /api/climate/annual` -> Returns `ClimateDataPoint[]`

---

## 🛡️ License & Credits

Designed & Developed for **Smart India Hackathon 2026**.
Observation evidence attribution: **India Meteorological Department (IMD)** & **National Disaster Management Authority (NDMA SACHET)**.

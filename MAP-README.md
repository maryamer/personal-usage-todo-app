# 🗺️ Map Component

## 📌 Introduction

This component provides an interactive map to display provinces and their cities.  
It is designed for systems that need to visualize **regional data** (province/city level) based on values retrieved from a backend API.

---

## ⚙️ Data Structure

The map requires **two JSON files**:

1. **Provinces JSON**  
   Contains geometry and properties for each province.

2. **Cities JSON**  
   Contains geometry and properties for cities.  
   This file should be requested from the API **based on the selected province**.

> ⚠️ In the current version, JSON files are added manually. In the final implementation, they must be retrieved from the backend API.

---

## 🗺️ Display Modes

- **Country view (Provinces):**  
  At the start, the map shows all provinces.
- **Province view (Cities):**  
  When a province is clicked, the corresponding cities are fetched from the API and displayed.

---

## 🧩 Main States

- `selectedProvince` → Currently selected province (used to filter cities)
- `filteredCities` → Cities belonging to the selected province
- `zoom` → Map zoom level (low for provinces, higher for cities)
- `centerPosition` → Map center coordinates based on selected province/country
- `keyNumber` → Forces a full re-render of `MapContainer` whenever the province changes

---

## 🎨 Province & City Styling

- Both provinces and cities are styled based on the value of `feature.properties.shapeValue`.
- The function `getColorByValue` applies system-defined thresholds:

| Condition (`shapeValue`) | Color                 |
| ------------------------ | --------------------- |
| > 80                     | 🔴 Red (`#F04438`)    |
| > 40                     | 🟠 Orange (`#F79009`) |
| > 20                     | 🟡 Yellow (`#FDB022`) |
| ≤ 20                     | ⚪ Gray (`#F2F4F7`)   |

---

## 🔄 Workflow

1. Fetch the **Provinces JSON** from the backend API and render them on the map.
2. On province click → fetch the **Cities JSON** for that province from the backend.
3. Render cities and apply styles based on `shapeValue`.
4. Allow users to return to the **country view** (provinces).

---

## 📥 Dependencies

- [React Leaflet](https://react-leaflet.js.org/) → Map rendering
- [Leaflet](https://leafletjs.com/) → Core map engine
- [Tailwind CSS](https://tailwindcss.com/) → Optional styling support

---

## 📌 Notes

- JSON files are currently used locally for demonstration.
- In production, provinces and cities must be loaded via API calls.
- `keyNumber` ensures that the `MapContainer` fully re-renders on province change.
- If the user zooms out below a defined level, the map resets back to the **country view**.

---

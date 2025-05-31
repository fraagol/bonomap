# Bonomap

This project is a Vite + React + TypeScript web app that displays a map with locations from a list of addresses. It uses React-Leaflet for mapping functionality. Addresses are fetched from https://bonocompramalvarrosa.com/comercios-adheridos/?f=a, geocoded, and displayed as markers on the map.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```

## Features
- Interactive map using React-Leaflet
- Fetches and parses address data from the provided URL
- Geocodes addresses and displays them as markers

## To Do
- Implement address fetching and parsing
- Integrate geocoding service
- Display markers for each location

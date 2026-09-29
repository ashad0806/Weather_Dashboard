# Weather Dashboard

A simple weather app built with React, Vite, and Tailwind CSS. Search any city for current conditions, a 5-day forecast, and more.

## Features

- Search current weather by city name
- 5-day forecast
- °C / °F toggle
- Auto-detect location (Geolocation API)
- Recent search history (saved in localStorage)
- Loading and error states

## Tech stack

- React + Vite
- Tailwind CSS
- [OpenWeatherMap API](https://openweathermap.org/api)

## Setup

1. Clone the repo:
```bash
   git clone https://github.com/ashad0806/Weather_Dashboard.git
   cd Weather_Dashboard
```
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env` file in the project root:

VITE_WEATHER_API_KEY=your_api_key_here

   Get a free key at [openweathermap.org](https://openweathermap.org/api).
4. Run the dev server:
```bash
   npm run dev
```
"use client";
import { useState, useEffect } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async (lat, lon, city, country) => {
      const wRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
      );
      const wData = await wRes.json();
      const current = wData.current;
      setWeather({
        city,
        country,
        temp: Math.round(current.temperature_2m),
        humidity: current.relative_humidity_2m,
        wind: Math.round(current.wind_speed_10m),
        code: current.weather_code,
      });
    };

    const getCityFromCoords = async (lat, lon) => {
      // BigDataCloud — free, no key, very accurate
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await res.json();
      const city =
        data.city ||
        data.locality ||
        data.principalSubdivision ||
        "Your City";
      const country = data.countryName || "";
      return { city, country };
    };

    const fetchByIP = async () => {
      try {
        const ipRes = await fetch("https://freeipapi.com/api/json");
        const ipData = await ipRes.json();
        const lat = ipData.latitude || 26.8467;
        const lon = ipData.longitude || 80.9462;

        // IP se coords mile — BigDataCloud se sahi city lo
        const { city, country } = await getCityFromCoords(lat, lon);
        await getWeather(lat, lon, city, country);
      } catch (err) {
        console.error("IP fetch failed:", err);
        // Final fallback
        await getWeather(26.8467, 80.9462, "Lucknow", "India");
      } finally {
        setLoading(false);
      }
    };

    const fetchByGeo = () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude: lat, longitude: lon } = pos.coords;
            // Exact GPS coords se sahi city milegi
            const { city, country } = await getCityFromCoords(lat, lon);
            await getWeather(lat, lon, city, country);
          } catch (err) {
            console.error("Geo failed:", err);
            await fetchByIP();
          } finally {
            setLoading(false);
          }
        },
        async () => {
          // Permission deny — IP fallback
          await fetchByIP();
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    };

    if (navigator.geolocation) {
      fetchByGeo();
    } else {
      fetchByIP();
    }
  }, []);

  const getEmoji = (code) => {
    if (code === 0) return "☀️";
    if (code <= 2) return "🌤️";
    if (code <= 3) return "☁️";
    if (code <= 48) return "🌫️";
    if (code <= 57) return "🌦️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌧️";
    if (code <= 99) return "⛈️";
    return "🌡️";
  };

  const getDesc = (code) => {
    if (code === 0) return "Clear sky";
    if (code <= 2) return "Partly cloudy";
    if (code <= 3) return "Overcast";
    if (code <= 48) return "Foggy";
    if (code <= 57) return "Drizzle";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Showers";
    if (code <= 99) return "Thunderstorm";
    return "Unknown";
  };

  if (loading) return (
    <span style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.68rem",
      color: "rgba(250,248,245,0.5)",
    }}>
      ⏳ loading…
    </span>
  );

  if (!weather) return null;

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      fontFamily: "'DM Mono', monospace", fontSize: "0.68rem",
      color: "rgba(250,248,245,0.85)", flexWrap: "wrap",
    }}>
      <span>{getEmoji(weather.code)}</span>
      <span style={{ color: "white", fontWeight: 600 }}>{weather.city}</span>
      <span style={{ color: "var(--accent-gold)", fontWeight: 700 }}>
        {weather.temp}°C
      </span>
      <span>{getDesc(weather.code)}</span>
      <span>💧{weather.humidity}%</span>
      <span>💨{weather.wind}km/h</span>
    </span>
  );
}
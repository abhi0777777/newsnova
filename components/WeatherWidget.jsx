"use client";
import { useState, useEffect } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const ipRes = await fetch("https://ipapi.co/json/");
        const ipData = await ipRes.json();
        const { latitude, longitude, city, country_name } = ipData;

        const wRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        );
        const wData = await wRes.json();

        setWeather({
          city,
          country: country_name,
          temp: Math.round(wData.main.temp),
          desc: wData.weather[0].description,
          icon: wData.weather[0].icon,
          humidity: wData.main.humidity,
          wind: Math.round(wData.wind.speed),
        });
      } catch (err) {
        console.error("Weather failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getEmoji = (icon) => {
    if (!icon) return "🌡️";
    if (icon.startsWith("01")) return "☀️";
    if (icon.startsWith("02")) return "🌤️";
    if (icon.startsWith("03") || icon.startsWith("04")) return "☁️";
    if (icon.startsWith("09") || icon.startsWith("10")) return "🌧️";
    if (icon.startsWith("11")) return "⛈️";
    if (icon.startsWith("13")) return "❄️";
    if (icon.startsWith("50")) return "🌫️";
    return "🌡️";
  };

  if (loading) {
    return (
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.68rem",
        color: "rgba(250,248,245,0.5)",
      }}>
        ⏳ loading weather…
      </span>
    );
  }

  if (!weather) return null;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.68rem",
      color: "rgba(250,248,245,0.85)",
      flexWrap: "wrap",
    }}>
      <span>{getEmoji(weather.icon)}</span>
      <span style={{ color: "white", fontWeight: 600 }}>{weather.city}</span>
      <span style={{ color: "var(--accent-gold)", fontWeight: 700 }}>{weather.temp}°C</span>
      <span style={{ textTransform: "capitalize" }}>{weather.desc}</span>
      <span>💧{weather.humidity}%</span>
      <span>💨{weather.wind}m/s</span>
    </span>
  );
}
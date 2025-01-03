"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { getCurrentTime, fetchWeatherData } from "../utils";

export default function Topbar() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme, systemTheme } = useTheme();
  const actualTheme = theme === "system" ? systemTheme : theme;
  const isDark = actualTheme === "dark";

  const [time, setTime] = useState(getCurrentTime());
  const [weather, setWeather] = useState<string>("_°_");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const updateCurrentTime = () => {
      setTime(getCurrentTime());
      animationFrame = requestAnimationFrame(updateCurrentTime);
    };

    animationFrame = requestAnimationFrame(updateCurrentTime);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    async function getWeather() {
      const weatherData = await fetchWeatherData();
      const temperature = weatherData?.current?.temperature_2m
        ? Math.round(weatherData.current.temperature_2m).toString() + "°C"
        : "N/A";

      setWeather(temperature);
    }

    getWeather();
  }, []);

  if (!mounted) {
    return (
      <div className="z-50 flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center space-x-2">
          <span className="text-xl">👋</span>
          <span className="text-lg font-tiempos">Hello</span>
        </a>
        <p className="text-base text-black dark:text-cream font-mono">
          WATERLOO --:-- _°_
        </p>
        <button
          className="z-50 shadow-md p-2 rounded-md bg-white text-black dark:bg-black dark:text-white"
          aria-label="Toggle theme"
          disabled
          style={{ cursor: "not-allowed", opacity: 0.5 }}
        >
          <Sun />
        </button>
      </div>
    );
  }

  return (
    <div className="z-50 flex items-center justify-between px-6 py-4">
      <a href="/" className="flex items-center space-x-2">
        <span className="text-xl">👋</span>
        <span className="text-lg font-tiempos">Hello</span>
      </a>

      <p className="text-base text-black dark:text-cream font-mono">
        WATERLOO {time} {weather}
      </p>

      <button
        className="z-50 shadow-md p-2 rounded-md bg-white text-black dark:bg-black dark:text-white"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}

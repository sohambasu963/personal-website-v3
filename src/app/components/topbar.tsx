"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Home } from "lucide-react";
import { useTheme } from "next-themes";
import { getCurrentTime, fetchWeatherData } from "../utils";
import Link from "next/link";

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
      <div className="z-50 flex items-center justify-between px-2 md:px-6 py-2 md:py-4 relative">
        <Link href="/" className="flex items-center space-x-2">
          <span className="md:hidden"><Home /></span>
          <span className="hidden md:block text-lg font-mono">sohambas
            <span className="tracking-[-0.2em]">u.</span>
            com
          </span>
        </Link>
        <p className="absolute left-1/2 transform -translate-x-1/2 text-base text-black dark:text-cream font-mono">
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
    <div className="z-50 flex items-center justify-between px-2 md:px-6 py-2 md:py-4 relative">
      <Link href="/" className="flex items-center space-x-2">
        <span className="md:hidden"><Home /></span>
        <span className="hidden md:block text-lg font-mono">sohambas
          <span className="tracking-[-0.2em]">u.</span>
          com
        </span>
      </Link>

      <p className="absolute left-1/2 transform -translate-x-1/2 text-base text-black dark:text-cream font-mono">
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

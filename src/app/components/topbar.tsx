"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Topbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-2">
        <span className="text-xl">👋</span>
        <span className="text-lg">Hello</span>
      </div>

      <p className="text-base text-black dark:text-gray-500">WATERLOO 09:41 2°C</p>

      <button
        className="z-50 shadow-md p-2 rounded-md bg-white text-black dark:bg-black dark:text-white"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}

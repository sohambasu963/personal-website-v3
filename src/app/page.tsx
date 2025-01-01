"use client";

import React, { useState } from "react";
import Topbar from "./components/topbar";
import ThreeDShapes from "./components/3d-shapes";
import Contact from "./components/contact";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`relative min-h-screen flex flex-col justify-between ${isDarkMode ? "dark" : ""}`}
    >
      <div className="flex-grow">
        <ThreeDShapes />
        <Topbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="flex justify-center">
          <h1 className="mt-[20%]">Hello</h1>
        </div>
      </div>

      <div className="absolute bottom-2 w-full">
        <Contact />
      </div>
    </div>
  );
}

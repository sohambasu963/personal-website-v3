"use client";

import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const followCursor = () => {
      setCirclePosition((prev) => {
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      requestAnimationFrame(followCursor);
    };

    if (!isMobile) {
      document.addEventListener("mousemove", updateCursorPosition);
      requestAnimationFrame(followCursor);
    }

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, [cursorPosition]);

  return (
    <>
      {!isMobile && (
        <div
          className="fixed rounded-full border border-dark-gray dark:border-cream pointer-events-none z-50"
          style={{
            width: "80px",
            height: "80px",
            left: `${circlePosition.x}px`,
            top: `${circlePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      )}
    </>
  );
};

export default Cursor;

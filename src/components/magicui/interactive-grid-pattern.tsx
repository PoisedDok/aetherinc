"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. [horizontal, vertical]
 * @param dotColor - Optional stroke color for the grid lines.
 * @param size - If provided, overrides width and height with this single value.
 * @param className - The class name of the overall SVG.
 * @param squaresClassName - The class name of each square.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  className?: string;
  squaresClassName?: string;
  dotColor?: string;
  size?: number;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  size,
  className,
  squaresClassName,
  dotColor,
  ...props
}: InteractiveGridPatternProps) {
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  // If 'size' is passed, override width & height
  if (typeof size === "number") {
    width = size;
    height = size;
  }

  const [horizontal, vertical] = squares;

  return (
    <svg
      // Let the SVG fill the parent container:
      width="100%"
      height="100%"
      // Define the viewBox using the total grid dimensions:
      viewBox={`0 0 ${width * horizontal} ${height * vertical}`}
      preserveAspectRatio="none"
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-gray-400/30 fill-transparent transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
              hoveredSquare === index && "fill-gray-300/30",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
            style={{
              stroke: dotColor ?? "rgba(156,163,175,0.3)",
            }}
          />
        );
      })}
    </svg>
  );
}

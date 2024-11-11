import React, { useRef, useEffect } from 'react';

interface PolygonDrawerProps {
  polygonPoints: string;
  isPolarMode: boolean;
}

const PolygonDrawer: React.FC<PolygonDrawerProps> = ({ polygonPoints, isPolarMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = 1000;
  const height = 600;

  // Draw the polygon directly with the provided points
  const drawPolygon = (ctx: CanvasRenderingContext2D) => {
    // Split the string of points into an array and parse each one
    const points = polygonPoints.split(' ').map((point) => {
      const [x, y] = point.split(',').map(Number);
      return { x, y };
    });

    // Check if points array is empty or malformed
    if (points.length === 0) {
      console.error('No valid points provided for the polygon.');
      return;
    }

    console.log('Drawing points:', points);  // Debugging the points

    // Start drawing the polygon
    ctx.beginPath();
    points.forEach(({ x, y }, index) => {
      // Optional: scale the coordinates or adjust the origin (if needed)
      // For now, no scaling is applied, as points should fit within the canvas range.

      // Ensure that points are within canvas bounds
      const scaledX = Math.max(0, Math.min(x, width));  // Make sure X stays within bounds
      const scaledY = Math.max(0, Math.min(y, height)); // Make sure Y stays within bounds

      if (index === 0) {
        ctx.moveTo(scaledX, scaledY);  // Move to the first point
      } else {
        ctx.lineTo(scaledX, scaledY);  // Draw lines to the next points
      }
    });

    ctx.closePath();
    ctx.strokeStyle = isPolarMode ? 'blue' : 'red'; // Different colors for Polar/Cartesian
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height); // Clear previous drawings
    drawPolygon(ctx); // Draw the polygon
  }, [polygonPoints, isPolarMode]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px solid black' }} />;
};

export default PolygonDrawer;

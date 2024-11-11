import React, { useRef, useEffect } from 'react';

interface CartesianCanvasProps {
  polygonPoints: string;
  isPolarMode: boolean;
}

const CartesianCanvas: React.FC<CartesianCanvasProps> = ({ polygonPoints, isPolarMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = 1000;
  const height = 600;
  const [originX, originY] = [width / 2, height / 2]; // Set the origin at the center of the canvas

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height); // Clear the canvas before redrawing

    ctx.beginPath();
    ctx.strokeStyle = 'black'; // Color of the axes
    ctx.lineWidth = 1;

    // Draw X-axis
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY); // Horizontal axis

    // Draw Y-axis
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height); // Vertical axis

    // Draw tick marks
    const tickSize = 5;
    for (let i = 0; i <= width; i += 50) {
      ctx.moveTo(i, originY - tickSize); // Top ticks
      ctx.lineTo(i, originY + tickSize); // Bottom ticks
      ctx.strokeText((i - originX).toString(), i, originY + 15); // Label ticks (x-axis)
    }

    for (let j = 0; j <= height; j += 50) {
      ctx.moveTo(originX - tickSize, j); // Left ticks
      ctx.lineTo(originX + tickSize, j); // Right ticks
      ctx.strokeText((originY - j).toString(), originX + 10, j); // Label ticks (y-axis)
    }

    ctx.stroke();
  };

  // Draw the polygon points (if provided)
  const drawPolygon = (ctx: CanvasRenderingContext2D, polygonPoints: string) => {
    const points = polygonPoints.split(' ').map(point => {
      const [x, y] = point.split(',').map(Number);
      return [x,y]; // Offset to the Cartesian center
    });

    ctx.beginPath();
    points.forEach(([x, y], index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.strokeStyle = isPolarMode ? 'blue' : 'red'; // Use blue for Polar mode, red for Cartesian mode
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawAxes(ctx); // Draw the coordinate axes
    drawPolygon(ctx, polygonPoints); // Draw the polygon points
  }, [polygonPoints, isPolarMode]); // Re-run whenever polygonPoints or isPolarMode changes

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid black' }}
    />
  );
};

export default CartesianCanvas;

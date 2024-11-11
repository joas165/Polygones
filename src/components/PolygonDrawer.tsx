import React from 'react';

interface PolygonDrawerProps {
  polygonPoints: string;
  isPolarMode: boolean;
}

const PolygonDrawer: React.FC<PolygonDrawerProps> = ({ polygonPoints, isPolarMode }) => {
  // Adjust the drawing area based on the mode (Cartesian or Polar)
  const width = 1000;
  const height = 600;

  return (
    <svg width={width} height={height} style={{ border: '1px solid black' }}>
      {isPolarMode ? (
        // In Polar Mode: Set the origin more to the left and scale accordingly
        <polygon points={polygonPoints} fill="none" stroke="blue" />
      ) : (
        // In Cartesian Mode: Standard display with regular scaling
        <polygon points={polygonPoints} fill="none" stroke="red" />
      )}
    </svg>
  );
};

export default PolygonDrawer;

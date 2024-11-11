// Convert Cartesian (x, y) coordinates to image (canvas) coordinates
export const cartesianToImageCoordinates = (
  x: number, 
  y: number,
): { x_image: number, y_image: number } => {
  const canvasWidth = 1000;
  const canvasHeight = 600;

  // Log input Cartesian coordinates
  console.log(`Input Cartesian Coordinates: x: ${x}, y: ${y}`);

  // Shift origin to the center of the canvas
  const x_image = x + canvasWidth / 2;
  const y_image = canvasHeight / 2 - y;

  // Log the image coordinates after conversion
  console.log(`Converted Image Coordinates: x_image: ${x_image}, y_image: ${y_image}`);

  return { x_image, y_image };
};

// Convert polar coordinates (radius, angle) to Cartesian (x, y)
export const polarToCartesian = (radius: number, angle: number): { x: number, y: number } => {
  // Log input polar coordinates
  console.log(`Input Polar Coordinates: radius: ${radius}, angle: ${angle}`);

  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  // Log the resulting Cartesian coordinates
  console.log(`Converted to Cartesian Coordinates: x: ${x}, y: ${y}`);

  return { x, y };
};

// Convert angle based on whether it is in radians or degrees
export const convertAngle = (angle: number, isRadians: boolean): number => {
  if (!isRadians) {
    // Convert from degrees to radians
    console.log(`Converting angle from degrees to radians: ${angle}°`);
    return (angle * Math.PI) / 180;
  }

  // Log angle in radians if not converted
  console.log(`Angle is already in radians: ${angle}`);
  return angle; // Angle is already in radians
};

// Scale polar radius (you can adjust this scale factor if necessary)
export const scalePolarCoordinates = (radius: string): number => {
  const scaleFactor = 1;  // You can adjust this scale factor
  const scaledRadius = parseFloat(radius) * scaleFactor;

  // Log the scaled polar radius
  console.log(`Scaled Polar Radius: ${scaledRadius}`);

  return scaledRadius;
};

// Convert all polar coordinates into a string of points
export const convertPolarCoordinatesToPoints = (
  complexNumbers: { radius: string, angle: string }[], 
  isRadians: boolean
): string => {
  let points = '';

  complexNumbers.forEach((complex) => {
    // Log the current complex number being processed
    console.log('Processing complex number:', complex);

    const radius = scalePolarCoordinates(complex.radius);

    // Convert angle to radians if needed
    let angle = parseFloat(complex.angle);
    angle = convertAngle(angle, isRadians);

    // Convert polar to Cartesian coordinates
    const { x, y } = polarToCartesian(radius, angle);

    // Convert Cartesian to image coordinates (adjust to canvas)
    const { x_image, y_image } = cartesianToImageCoordinates(x, y);

    // Log the final point in image coordinates
    console.log(`Final point: x_image: ${x_image}, y_image: ${y_image}`);

    points += `${x_image.toString()},${y_image.toString()} `;
  });

  return points.trim();
};

// Convert all Cartesian coordinates into a string of points
export const convertCartesianCoordinatesToPoints = (
  coordinates: { x_coordinate: string, y_coordinate: string }[], 
): string => {
  let points = '';

  coordinates.forEach((coord) => {
    let x = parseFloat(coord.x_coordinate);
    let y = parseFloat(coord.y_coordinate);

    // Log input Cartesian coordinates
    console.log(`Input Cartesian Coordinates: x: ${x}, y: ${y}`);

    // Convert Cartesian to image coordinates (adjust to canvas)
    const { x_image, y_image } = cartesianToImageCoordinates(x, y);

    // Log the final point in image coordinates
    console.log(`Converted to Image Coordinates: x_image: ${x_image}, y_image: ${y_image}`);

    points += `${x_image.toString()},${y_image.toString()} `;
  });

  return points.trim();
};

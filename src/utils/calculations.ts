
export const cartesianToImageCoordinates = (
  x: number, 
  y: number, 
): { x_image: number, y_image: number } => {
  // Convert Cartesian x to image x by shifting origin to the center of the canvas
  const canvasWidth = 1000;
  const canvasHeight = 600;
  
  const x_image = x + canvasWidth / 2;
  
  // Convert Cartesian y to image y by flipping the y-axis and shifting origin to center
  const y_image = canvasHeight / 2 - y;
  
  return { x_image, y_image };
};


// Example of using the function:
const { x_image, y_image} = cartesianToImageCoordinates(100, 200);
console.log(`x_image: ${x_image}, y_image: ${y_image}`); // Correct access


export const polarToCartesian = (radius: number, angle: number): { x: number, y: number } => {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
};

// Function to handle angle conversion based on the unit (radians or degrees)
export const convertAngle = (angle: number, isRadians: boolean): number => {
  if (!isRadians) {
    // Convert from degrees to radians
    return (angle * Math.PI) / 180;
  }
  return angle; // Already in radians
};

// Function to scale the radius based on the complex number mode
export const scalePolarCoordinates = (radius: string): number => {
  const scaleFactor = 1;
  return parseFloat(radius) * scaleFactor;
};

// Function to handle Cartesian conversion when in Cartesian mode
export const cartesianToString = (coordinates: { x_coordinate: string, y_coordinate: string }[]) => {
  return coordinates.map(coord => `${coord.x_coordinate},${coord.y_coordinate}`).join(' ');
};

// Function to convert all polar coordinates and return points

export const convertPolarCoordinatesToPoints = (
  complexNumbers: { radius: string, angle: string }[], 
  isRadians: boolean
): string => {
  let points = '';

  complexNumbers.forEach((complex) => {
    // Log the current complex number being processed
    console.log('Processing complex number:', complex);

    const radius = scalePolarCoordinates(complex.radius);

    // Log the scaled radius
    console.log('Scaled radius:', radius);

    let angle = parseFloat(complex.angle);
    angle = convertAngle(angle, isRadians);

    // Log the angle in radians
    console.log('Converted angle in radians:', angle);

    const { x, y } = polarToCartesian(radius,angle);
    const {x_image, y_image} = cartesianToImageCoordinates(x,y)

    // Log the Cartesian (x, y) coordinates
    console.log(`Converted to image coordinates: x: ${x_image}, y: ${y_image}`);

    points += `${x_image.toString()},${y_image.toString()} `;
  });

  return points.trim();
};

export const convertCartesianCoordinatesToPoints = (
  coordinates: { x_coordinate: string, y_coordinate: string }[], 
 ): string => {
  let points = '';

  coordinates.forEach((coordinates) => {
    // Log the current complex number being processed
  
    let x = parseFloat(coordinates.x_coordinate);
    let y = parseFloat(coordinates.y_coordinate);

    const {x_image, y_image} = cartesianToImageCoordinates(x,y)

    // Log the Cartesian (x, y) coordinates
    console.log(`Converted to image coordinates: x: ${x_image}, y: ${y_image}`);

    points += `${x_image.toString()},${y_image.toString()} `;
  });

  return points.trim();
};


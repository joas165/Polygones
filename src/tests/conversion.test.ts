import { 
  cartesianToImageCoordinates, 
  polarToCartesian, 
  convertAngle, 
  scalePolarCoordinates, 
  convertPolarCoordinatesToPoints,
  convertCartesianCoordinatesToPoints 
} from '../utils/calculations'; // Update this import path as necessary

describe('cartesianToImageCoordinates', () => {
  it('should convert positive Cartesian coordinates to image coordinates', () => {
    const { x_image, y_image } = cartesianToImageCoordinates(100, 200);
    expect(x_image).toBe(600);  // 100 + 1000 / 2
    expect(y_image).toBe(100);  // 600 / 2 - 200
  });

  it('should convert negative Cartesian coordinates to image coordinates', () => {
    const { x_image, y_image } = cartesianToImageCoordinates(-150, -250);
    expect(x_image).toBe(350);  // -150 + 1000 / 2
    expect(y_image).toBe(550);  // 600 / 2 - (-250)
  });

  it('should convert zero coordinates to the center of the canvas', () => {
    const { x_image, y_image } = cartesianToImageCoordinates(0, 0);
    expect(x_image).toBe(500);  // Center x-coordinate (1000 / 2)
    expect(y_image).toBe(300);  // Center y-coordinate (600 / 2)
  });
});

describe('polarToCartesian', () => {
  it('should convert polar coordinates to Cartesian coordinates', () => {
    const { x, y } = polarToCartesian(5, Math.PI / 4);  // radius = 5, angle = 45° (π/4)
    expect(x).toBeCloseTo(5 * Math.cos(Math.PI / 4), 5);
    expect(y).toBeCloseTo(5 * Math.sin(Math.PI / 4), 5);
  });
});

describe('convertAngle', () => {
  it('should convert degrees to radians', () => {
    const radians = convertAngle(180, false);  // 180 degrees
    expect(radians).toBeCloseTo(Math.PI, 5);   // Expect close to π (3.14159)
  });

  it('should leave radians unchanged', () => {
    const radians = convertAngle(Math.PI, true);  // π radians
    expect(radians).toBe(Math.PI);
  });
});

describe('scalePolarCoordinates', () => {
  it('should scale radius correctly with factor of 1', () => {
    const scaledRadius = scalePolarCoordinates('10');
    expect(scaledRadius).toBe(10);
  });
});

describe('convertPolarCoordinatesToPoints', () => {
  it('should convert polar coordinates array to image coordinates points string', () => {
    const complexNumbers = [
      { radius: '5', angle: '45' },
      { radius: '10', angle: '90' }
    ];

    const result = convertPolarCoordinatesToPoints(complexNumbers, false);

    // Expected values are pre-calculated for 1000x600 canvas
    // For 5 at 45 degrees: x_image = 503.535, y_image = 296.464
    // For 10 at 90 degrees: x_image = 500, y_image = 290
    const expectedResult = '503.5355339059327,296.46446609406723 500,290';
    expect(result).toBe(expectedResult);
  });

  it('should handle empty array input', () => {
    const result = convertPolarCoordinatesToPoints([], false);
    expect(result).toBe('');
  });
});

describe('convertCartesianCoordinatesToPoints', () => {
  it('should convert Cartesian array to image coordinates points string', () => {
    const coordinates = [
      { x_coordinate: '100', y_coordinate: '200' },
      { x_coordinate: '-150', y_coordinate: '-250' }
    ];

    const result = convertCartesianCoordinatesToPoints(coordinates);

    // Expected values are pre-calculated for 1000x600 canvas
    const expectedResult = '600,100 350,550';
    expect(result).toBe(expectedResult);
  });

  it('should handle empty array input', () => {
    const result = convertCartesianCoordinatesToPoints([]);
    expect(result).toBe('');
  });
});

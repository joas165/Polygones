import React, { useState } from 'react';
import { ComplexNumber, Coordinate } from '../types';
import { convertPolarCoordinatesToPoints, convertCartesianCoordinatesToPoints } from '../utils/calculations'; // Import conversion function
import CartesianCanvas from './CartesianCanvas'; // Import the CartesianCanvas component
import Form from './Form';

const App: React.FC = () => {
  const [polygonPoints, setPolygonPoints] = useState<string>("");
  const [complexNumbers, setComplexNumbers] = useState<ComplexNumber[]>([
    { radius: "", angle: "" }
  ]);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([
    { x_coordinate: "", y_coordinate: "" }
  ]);
  const [isPolarMode, setIsPolarMode] = useState<boolean>(false); // Toggle between modes
  const [isRadians, setIsRadians] = useState<boolean>(false); // Toggle between radians and degrees

  // Handle changes in the coordinate form (for Cartesian mode)
  const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedCoordinates = [...coordinates];
    updatedCoordinates[index] = { ...updatedCoordinates[index], [name]: value };
    setCoordinates(updatedCoordinates);
  };

  // Handle changes in the complex number form (for Polar mode)
  const handleComplexNumberChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedComplexNumbers = [...complexNumbers];
    updatedComplexNumbers[index] = { ...updatedComplexNumbers[index], [name]: value };
    setComplexNumbers(updatedComplexNumbers);
  };

  // Submit form and generate points
  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    let points = '';
    if (isPolarMode) {
      points = convertPolarCoordinatesToPoints(complexNumbers, isRadians);
    } else {
      points = convertCartesianCoordinatesToPoints(coordinates);
    }

    setPolygonPoints(points); // Set the generated points for rendering on the canvas
  };

  // Add an edge (point) to the current form
  const addEdge = () => {
    if (isPolarMode) {
      setComplexNumbers([...complexNumbers, { radius: "", angle: "" }]);
    } else {
      setCoordinates([...coordinates, { x_coordinate: "", y_coordinate: "" }]);
    }
  };

  // Remove an edge (point) from the current form
  const removeEdge = () => {
    if (isPolarMode) {
      setComplexNumbers(complexNumbers.slice(0, -1));
    } else {
      setCoordinates(coordinates.slice(0, -1));
    }
  };

  // Toggle between Polar and Cartesian modes
  const toggleMode = () => {
    setIsPolarMode(!isPolarMode);
  };

  // Toggle between radians and degrees for Polar coordinates
  const toggleAngleUnit = () => {
    setIsRadians(!isRadians);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Form Component */}
      <Form
        isPolarMode={isPolarMode}
        isRadians={isRadians}
        complexNumbers={complexNumbers}
        coordinates={coordinates}
        handleFormChange={handleFormChange}
        handleComplexNumberChange={handleComplexNumberChange}
        addEdge={addEdge}
        removeEdge={removeEdge}
        submit={submit}
        toggleMode={toggleMode}
        toggleAngleUnit={toggleAngleUnit}
      />

      {/* CartesianCanvas Component: Pass polygonPoints and isPolarMode as props */}
      <CartesianCanvas polygonPoints={polygonPoints} isPolarMode={isPolarMode} />
    </div>
  );
};

export default App;

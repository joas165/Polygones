import React, { useState } from 'react';
import { ComplexNumber, Coordinate } from '../types';
import { convertPolarCoordinatesToPoints, convertCartesianCoordinatesToPoints } from '../utils/calculations'; // Import conversion function
import PolygonDrawer from './PolygonDrawer';
import Form from './Form';

const App: React.FC = () => {
  const [polygonPoints, setPolygonPoints] = useState<string>("");
  const [complexNumbers, setComplexNumbers] = useState<ComplexNumber[]>([
    {radius: "", angle: "" }
  ]);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([
    { x_coordinate: "", y_coordinate: "" }
  ]);
  const [isPolarMode, setIsPolarMode] = useState<boolean>(false); // Toggle between modes
  const [isRadians, setIsRadians] = useState<boolean>(false); // Toggle between radians and degrees

  const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedCoordinates = [...coordinates];
    updatedCoordinates[index] = { ...updatedCoordinates[index], [name]: value };
    setCoordinates(updatedCoordinates);
  };

  const handleComplexNumberChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedComplexNumbers = [...complexNumbers];
    updatedComplexNumbers[index] = { ...updatedComplexNumbers[index], [name]: value };
    setComplexNumbers(updatedComplexNumbers);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    
    let points = '';
    if (isPolarMode) {
      points = convertPolarCoordinatesToPoints(complexNumbers, isRadians);
    } else {
      points = convertCartesianCoordinatesToPoints(coordinates) 
    }

    setPolygonPoints(points);
  };

  const addEdge = () => {
    if (isPolarMode) {
      setComplexNumbers([...complexNumbers, {radius: "", angle: "" }]);
    } else {
      setCoordinates([...coordinates, { x_coordinate: "", y_coordinate: "" }]);
    }
  };

  const removeEdge = () => {
    if (isPolarMode) {
      setComplexNumbers(complexNumbers.slice(0, -1));
    } else {
      setCoordinates(coordinates.slice(0, -1));
    }
  };

  const toggleMode = () => {
    setIsPolarMode(!isPolarMode);
  };

  const toggleAngleUnit = () => {
    setIsRadians(!isRadians);
  };

  return (
    <div style={{ display: 'flex' }}>
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
      <PolygonDrawer polygonPoints={polygonPoints} isPolarMode={isPolarMode}/>
    </div>
  );
};

export default App;

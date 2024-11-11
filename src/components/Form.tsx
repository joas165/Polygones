import React from 'react';
import { ComplexNumber, Coordinate } from '../types';

interface FormProps {
  isPolarMode: boolean;
  isRadians: boolean;
  complexNumbers: ComplexNumber[];
  coordinates: Coordinate[];
  handleFormChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleComplexNumberChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  addEdge: () => void;
  removeEdge: () => void;
  submit: (event: React.FormEvent) => void;
  toggleMode: () => void;
  toggleAngleUnit: () => void;
}

const Form: React.FC<FormProps> = ({
  isPolarMode,
  isRadians,
  complexNumbers,
  coordinates,
  handleFormChange,
  handleComplexNumberChange,
  addEdge,
  removeEdge,
  submit,
  toggleMode,
  toggleAngleUnit
}) => {
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <button type="button" onClick={toggleMode}>
            Switch to {isPolarMode ? 'Cartesian' : 'Polar'} Mode
          </button>
        </div>

        {isPolarMode ? (
          <div>
            <h3>Polar Coordinates</h3>
            {complexNumbers.map((complex, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="radius"
                  value={complex.radius}
                  onChange={(e) => handleComplexNumberChange(index, e)}
                  placeholder="Radius"
                />
                <input
                  type="text"
                  name="angle"
                  value={complex.angle}
                  onChange={(e) => handleComplexNumberChange(index, e)}
                  placeholder="Angle"
                />
                <button type="button" onClick={removeEdge}>Remove Edge</button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3>Cartesian Coordinates</h3>
            {coordinates.map((coord, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="x_coordinate"
                  value={coord.x_coordinate}
                  onChange={(e) => handleFormChange(index, e)}
                  placeholder="X Coordinate"
                />
                <input
                  type="text"
                  name="y_coordinate"
                  value={coord.y_coordinate}
                  onChange={(e) => handleFormChange(index, e)}
                  placeholder="Y Coordinate"
                />
                <button type="button" onClick={removeEdge}>Remove Edge</button>
              </div>
            ))}
          </div>
        )}

        <div>
          <button type="button" onClick={addEdge}>Add Edge</button>
        </div>

        <div>
          {isPolarMode && (
            <button type="button" onClick={toggleAngleUnit}>
              Switch to {isRadians ? 'Degrees' : 'Radians'}
            </button>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;

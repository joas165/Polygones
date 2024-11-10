import React, { useState, ChangeEvent, FormEvent } from 'react';
import ReactDOM from 'react-dom/client';

type CoordinatePair = {
  x: string;
  y: string;
};

const App: React.FC = () => {
  // State for formatted SVG points as a single string
  const [svgPoints, setSvgPoints] = useState<string>('');
  // State for storing array of coordinate pairs
  const [coordinates, setCoordinates] = useState<CoordinatePair[]>([
    { x: '', y: '' }
  ]);

  // Handle changes to coordinate inputs
  const handleCoordinateChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedCoordinates = [...coordinates];
    updatedCoordinates[index] = { ...updatedCoordinates[index], [name]: value };
    setCoordinates(updatedCoordinates);
  };

  // Add a new pair of empty coordinates
  const addCoordinatePair = () => {
    const newPair: CoordinatePair = { x: '', y: '' };
    setCoordinates([...coordinates, newPair]);
  };

  // Remove a pair of coordinates at the specified index
  const removeCoordinatePair = (index: number) => {
    const updatedCoordinates = [...coordinates];
    updatedCoordinates.splice(index, 1);
    setCoordinates(updatedCoordinates);
  };

  // Submit form data, transform coordinates, and update SVG points string
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Extract and combine all x and y coordinates for the SVG points attribute
    const pointsString = coordinates
      .map(pair => `${pair.x},${pair.y}`)
      .join(' ');

    // Update svgPoints to render the polygon
    setSvgPoints(pointsString);
    console.log('Updated svgPoints:', pointsString);
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button type="button" onClick={handleSubmit}>Draw</button>
        <button type="button" onClick={addCoordinatePair}>Add Coordinate</button>
        <button
          type="button"
          onClick={() => removeCoordinatePair(coordinates.length - 1)}
          disabled={coordinates.length <= 1}
        >
          Remove Coordinate
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {coordinates.map((pair, index) => (
          <div key={index} style={{ marginBottom: '8px' }}>
            <input
              name="x"
              placeholder="X-Coordinate 0-1000"
              value={pair.x}
              onChange={(event) => handleCoordinateChange(index, event)}
              style={{ marginRight: '5px' }}
            />
            <input
              name="y"
              placeholder="Y-Coordinate 0-600"
              value={pair.y}
              onChange={(event) => handleCoordinateChange(index, event)}
            />
          </div>
        ))}
      </form>
      
      <svg width="1000" height="600" style={{ marginTop: '20px', border: '1px solid black' }}>
        <polygon points={svgPoints} fill="none" stroke="red" />
      </svg>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

export default App;

import {useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  
  const [SXCoordinates, updateSXCoordinates] = useState('');
  const [sCoordinates, updateCoordinates] = useState([{x_coordinate:'', y_coordinate: ''}]);

  const handleFormChange = (index, event) => {
    let data = [...sCoordinates];
    data[index][event.target.name] = event.target.value;
    updateCoordinates(data);
  }
 
  const increaseEdges = () => {
    let edge = {
      x_coordinate: '',
      y_coordinate: '',
    }

    updateCoordinates([...sCoordinates, edge]);
  }
  
  const removeEdges = (index) => {
    let data = [...sCoordinates];
    data.splice(index, 1)
    updateCoordinates(data)
}
  
  
  const submit = (event) => {
    event.preventDefault();
    let data = [...sCoordinates];
    let outputX = data.map(element => element.x_coordinate);
    let outputY = data.map(element => element.y_coordinate);
    let output = [];
    for (let i = 0; i < outputX.length;i++) { 
      output.push(outputX[i]);
      output.push(outputY[i]); 
    }
    updateCoordinates(sCoordinates);
    updateSXCoordinates(output);
    console.log(SXCoordinates);
    console.log(sCoordinates);  
    console.log(output);  
  }

  
  return (
    <div className="App">
       <button
        type =  {"position:absolute"}
        onClick={submit}>
        Draw</button>
        <button type = {"position:absolute"} onClick={increaseEdges}>Add Edges</button>
        <button type = {"position:absolute"} onClick={removeEdges}>Remove Edges</button> 
       <form onSubmit={submit}>
        {sCoordinates.map((form, index) => {
          return (
       <div key={index}>  
            <input
              name='x_coordinate'
              placeholder='X-Coordinate 0-1000'
              value={form.x_coordinate}
              onChange={event => handleFormChange(index,event)}
              />
            <input
              name='y_coordinate'
              placeholder='Y-Coordinate 0-600'
              value={form.y_coordinate}
              onChange={event => handleFormChange(index,event)} />
            
        </div>
        )})}
        </form>  
      <svg width="1000" height="600">
       <polygon points={SXCoordinates} fill ="none" stroke = "red" />
      </svg>  
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


export default App;

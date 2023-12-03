import {useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  
  const [SXCoordinates, updateSXCoordinates] = useState('0,0');
  const [sCoordinates, updateCoordinates] = useState([{r_coordinate:'0', angle_coordinate: '0'}]);

  const handleFormChange = (index, event) => {
    let data = [...sCoordinates];
    data[index][event.target.name] = event.target.value;
    updateCoordinates(data);
  }
 
  const increaseEdges = () => {
    let edge = {
      x_coordinate: '0',
      y_coordinate: '0',
    }

    updateCoordinates([...sCoordinates, edge]);
  }
  
  const removeEdges = (index) => {
    let data = [...sCoordinates];
    data.splice(index, 1)
    updateCoordinates(data)
  }
  
  const xCoordinate = (r,angle) => {
    let nr = Number(r)
    let nangle = Number(angle)
    return String(nr*Math.acos(nangle*Math.PI/180));
  }
 
  const yCoordinate = (r,angle) => {
    let nr = Number(r)
    let nangle = Number(angle)
    return String(nr*Math.asin(nangle*Math.PI/180));
  }

  //Canvas size 1000*1000
  const translationToCenter = (coordinate) => {
    let ncoordinate = Number(coordinate);
    return String(500 + ncoordinate); 
  }

  const submit = (event) => {
    event.preventDefault();
    let data = [...sCoordinates];
    let outputX = data.map(element => translationToCenter(element.r_coordinate));
    let outputY = data.map(element => translationToCenter(element.angle_coordinate));
    let xyCoordinates = [];
    for (let i = 0; i < outputX.length;i++) { 
      xyCoordinates.push(xCoordinate(outputX[i],outputY[i]));
      xyCoordinates.push(yCoordinate(outputX[i],outputY[i]));
    }
    updateCoordinates(sCoordinates);
    updateSXCoordinates(xyCoordinates);
    console.log(SXCoordinates);
    console.log(sCoordinates);  
    console.log(xyCoordinates);  
  }

  
  return (
    
    <div className="App">
       <form onSubmit={submit}>
        {sCoordinates.map((form, index) => {
          return (
       <div key={index}>  
            <input
              name='r_coordinate'
              placeholder='r-coordinate'
              value={form.r_coordinate}
              onChange={event => handleFormChange(index,event)}
              />
            <input
              name='angle_coordinate'
              placeholder='angle'
              value={form.angle_coordinate}
              onChange={event => handleFormChange(index,event)} />
            
        </div>
        )})}
        </form>
        <div className="btn-group-vertical">
          <button type="button" className="btn btn-primary btn-lg" onClick={submit}> Draw</button>
          <button onClick={increaseEdges} className="btn btn-primary btn-lg"> Add Edges</button>
          <button onClick={removeEdges} className="btn btn-primary btn-lg"> Remove Edges </button>   
        </div>
      <svg width="1000" height="1000">
       <polygon points={SXCoordinates} fill ="none" stroke = "red" />
      </svg>  
    </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


export default App;

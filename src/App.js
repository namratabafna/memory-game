import React,{ useState } from 'react'
import Playfield from './Playfield'
import './App.css'

function App() {
  const [pairs, setPairs] = useState(1)
 
  return (
    <div>
      <h1 className="center">Memory Game</h1>
      <div className="btn btn-lg center" >
      <button className="btn-primary mr-4" value="5" onClick={() => setPairs(5)}>Easy</button>
      <button className="btn-success mr-4" value="10" onClick={() => setPairs(10)}>Medium</button>
      <button className="btn-warning" value="25" onClick={() => setPairs(25)}>Hard</button>
      </div>
      
      <Playfield pairs={pairs} />
    </div>
  );
}

export default App

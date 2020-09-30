import React,{ useState } from 'react'
import Playfield from './Playfield'
import './App.css'

function App() {
  const [pairs, setPairs] = useState(5) 
 
  return (
    <div className="App">
      <div >
      <button variant="success" value="5" >Easy</button>
      <button variant="warning" value="10" onClick={() => setPairs(10)}>Medium</button>
      <button variant="danger" value="25" onClick={() => setPairs(25)}>Hard</button>
      </div>
      
      <Playfield pairs={pairs} />
    </div>
  );
}

export default App

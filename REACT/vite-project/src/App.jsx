import { useState } from 'react'

import './App.css'

function App() {
  
//let counter= 15


const[countervalue, setcountervalue]=useState(15)

const addvalue=()=>{
  setcountervalue(countervalue+1)
}
const removevalue=()=>{
  let newcountervalue=countervalue-1
  setcountervalue(newcountervalue )
}
  return (
    <>
     <h1>React Course {countervalue}</h1>
     <h2>Vite + React</h2>
     <span>countervalue value:{countervalue}</span>
     <button onClick={addvalue}
     >add value</button>
     <button onClick={removevalue}> remove value</button>
     <p> footer:{countervalue}</p>
    </>
  )
}

export default App

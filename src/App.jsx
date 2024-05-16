import { useState } from 'react'
import Touch from './Touch'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-center bg-red-500 w-screen font-bold text-xl py-2'>Get your sign</h1>
      <Touch />
    </>
  )
}

export default App

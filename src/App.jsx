import React from 'react'
import Navbar from './components/Navbar'
import Swipe from './components/Swipe'
import Square from './components/Square'
import Foreground from './components/Foreground'
function App() {
  return (
    <div className='main'>
      <Navbar/>
      <Swipe/>
      <Foreground/>
    </div>
  )
}

export default App

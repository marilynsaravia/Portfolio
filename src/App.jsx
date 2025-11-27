import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <Navbar/>
      <Hero/>  
      <Skills/>
      <About/>  
      <Experience/>
      <Projects/>
      <Contact/>
    </>
  )
}

export default App

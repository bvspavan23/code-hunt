import React from "react"
import Publiccode from "./components/codes/Publiccode"
import HomePage from "./components/Home/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hint" element={<Publiccode />} />
    </Routes>
    </Router>
    </>
  )
}
export default App



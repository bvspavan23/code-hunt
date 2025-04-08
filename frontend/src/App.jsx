import React from "react"
import Publiccode from "./components/codes/Publiccode"
import HomePage from "./components/Home/Home"
import HintForm from "./components/codes/upload";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hint" element={<Publiccode />} />
      <Route path="/upload/hint" element={<HintForm />} />
    </Routes>
    </Router>
    </>
  )
}
export default App



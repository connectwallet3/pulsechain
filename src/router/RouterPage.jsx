import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import ManualConnect from '../pages/manualConnect/ManualConnect'


function RouterPage() {
  return (
    <Router>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/manual-connect' element={<ManualConnect/>}/>
        </Routes>
      
    </Router>
  )
}

export default RouterPage

import React from 'react'
import './LandingPage.css'
import { Link, useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate();


  return (
    <div className='landing-page'>
      <h1>Welcome to PetCare</h1>
      <button onClick={() => navigate('/login')}>
        Login
      </button>
      <button className='register' onClick={() => navigate('/register')}>
        Register
      </button>
    </div>
  )
}

export default LandingPage
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    navigate('/login')
  }

  return (
    <nav>
      <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer', margin: 0 }}>
        Easy
      </h2>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/cart')}>Cart</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🔆 Light' : '🌙 Dark'}
        </button>
        {user ? (
          <>
            <span>Hi, {user.name}!</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Signup</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
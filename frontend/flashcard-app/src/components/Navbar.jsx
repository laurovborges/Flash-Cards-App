import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Navbar() {
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const navigate = useNavigate()

  function toggleProfileMenu() {
    setShowProfileMenu(prev => !prev)
  }

  function logOut() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <nav>
      <Link to="/dashboard"><b>Dashboard</b></Link>
      <p onClick={toggleProfileMenu}>{username}</p>
      {showProfileMenu &&
        <div className="deck-overflow-menu">
          <button onClick={logOut}>Log out</button>
        </div>
      }
    </nav>
  )
}

export default Navbar
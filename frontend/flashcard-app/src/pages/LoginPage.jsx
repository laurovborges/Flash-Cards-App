import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'

function LoginPage() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  
  async function login(formData) {
    const username = formData.get("username")
    const password = formData.get("password")
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', {username, password})

      // save token to localStorage
      localStorage.setItem('accessToken', response.data.token)
      localStorage.setItem('username', response.data.username)

      // redirect to dashboard
      navigate('/dashboard')

    } catch (error) {
      console.log(error)
      setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
    }
  }

  useEffect(() => {
    async function checkIfAlreadyLoggedIn() {
      const accessToken = localStorage.getItem('accessToken')
      if(accessToken){
        try {
          await axios.get('http://localhost:3000/api/v1/decks', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          navigate('/dashboard')
        } catch (error) {
          console.log(error)
        }
      }
    }
    checkIfAlreadyLoggedIn()
  }, [])

  return (
    <section className="login-section">
      <h1>Login</h1>
      <p className="auth-error-text">{errorMsg ? errorMsg : null}</p>
      <form action={login}>
        <div className="username-password-inputs">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button>Login</button>
      </form>
      <br />
      <Link to="/register">Register</Link>
    </section>
  )
}

export default LoginPage
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'

function RegisterPage() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')

  async function register(formData) {
    const username = formData.get("username")
    const password = formData.get("password")

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/register', {username, password})
      
      localStorage.setItem('accessToken', response.data.token)
      localStorage.setItem('username', response.data.username)
      navigate('/dashboard')

    } catch (error) {
      console.log(error)
      setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
    }
  }

  return (
    <section className="login-section">
      <h1>Register</h1>
      <p className="auth-error-text">{errorMsg ? errorMsg : null}</p>
      <form action={register}>
        <div className="username-password-inputs">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button>Register</button>
      </form>
      <br />
      <Link to="/login">Already registered? Login</Link>
    </section>
  )
}

export default RegisterPage
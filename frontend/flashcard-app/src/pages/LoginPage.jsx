import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'

function LoginPage() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const [buttonText, setButtonText] = useState('Login')
  const [buttonClass, setButtonClass] = useState('')

  async function login(formData) {
    const username = formData.get("username")
    const password = formData.get("password")
    setButtonText('Please wait...')
    setButtonClass('login-button-pressed')
    
    // The setTimeout forces a rerender after setButtonText before executing API call. This fixes the problem where setButtonText's changes are only reflected in the DOM at the end of the try catch block due to React's state update batching
    setTimeout(async () => { 
      try {
        const response = await axios.post('https://flash-cards-app-backend.onrender.com/api/v1/auth/login', {username, password})
  
        // save token to localStorage
        localStorage.setItem('accessToken', response.data.token)
        localStorage.setItem('username', response.data.username)
  
        // redirect to dashboard
        navigate('/dashboard')
  
      } catch (error) {
        console.log(error)
        setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
        setButtonText('Login')
        setButtonClass('')
      }
    }, 0)

  }

  useEffect(() => {
    async function checkIfAlreadyLoggedIn() {
      const accessToken = localStorage.getItem('accessToken')
      if(accessToken){
        console.log('access token found')
        setButtonText('Please wait...')
        setTimeout(async () => {
          try {
            await axios.get('https://flash-cards-app-backend.onrender.com/api/v1/decks', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            navigate('/dashboard')
          } catch (error) {
            console.log(error)
            setButtonText('Login')
          }
        }, 0)
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
          <input type="text" name="username" id="username" required={true} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required={true} />
        </div>
        <button className={buttonClass}>{buttonText}</button>
      </form>
      <br />
      <Link to="/register">Register</Link>
    </section>
  )
}

export default LoginPage
import React from 'react'
import {Link} from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="message-box">
        <b>Error 404</b>
        <p>That page doesn't exist</p>
        <Link to="/dashboard">Back to dashboard</Link>
    </div>
  )
}

export default NotFoundPage
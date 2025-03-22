import React from 'react'
import {useState, useEffect} from 'react'
import Deck from '../components/Deck'
import NewDeckModal from '../components/NewDeckModal'
import axios from 'axios'

import Navbar from '../components/Navbar' //temp

function Dashboard() {
  const [decks, setDecks] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  
  const fetchDecks = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.get('https://flash-cards-app-backend.onrender.com/api/v1/decks', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      setDecks(response.data)

    } catch (error) {
      console.log(error)
      setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
    }
  }

  useEffect(() => {
    fetchDecks();
  }, [])

  return (
    <>
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Decks</h1>
        <NewDeckModal />
      </div>
      <div className="decks-container">
        {errorMsg && <p className="auth-error-text">{errorMsg}</p>}
        {decks.map(deck => <Deck key={deck._id} deckID={deck._id} name={deck.name} fetchDecks={fetchDecks} numCards={deck.numCards}/>)}
        {console.log(decks)}
      </div>
    </div>
    </>
  )
}

export default Dashboard
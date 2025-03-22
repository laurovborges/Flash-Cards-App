import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import RenameDeckModal from './RenameDeckModal'

function Deck(props) {
  const [showMenu, setShowMenu] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)

  function toggleMenu() {
    setShowMenu(prev => !prev)
  }

  function toggleRenameModal() {
    setShowRenameModal(prev => !prev)
  }

  async function deleteDeck() {
    const accessToken = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete(`https://flash-cards-app-backend.onrender.com/api/v1/decks/${props.deckID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      props.fetchDecks()
    } catch (error) {
      console.log(error)
      // setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
    }
  }

  return (
    <div className="deck">
      <Link to={`/decks/${props.deckID}/cards`}>
        <h1>{props.name || 'deck'}</h1>
      </Link>
      <button className="deck-overflow-menu-btn" onClick={toggleMenu}>...</button>
      {showMenu &&
        <div className="deck-overflow-menu">
          <button onClick={toggleRenameModal}>Rename</button>
          <button onClick={deleteDeck}>Delete</button>
        </div>
      }
      {showRenameModal && <RenameDeckModal deckID={props.deckID} toggleRenameModal={toggleRenameModal} fetchDecks={props.fetchDecks} toggleMenu={toggleMenu}/>}
    </div>
  )
}

export default Deck
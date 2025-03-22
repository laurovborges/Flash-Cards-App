import React, { useState } from 'react'
import axios from 'axios'

function RenameDeckModal(props) {

    async function renameDeck(formData) {
        const accessToken = localStorage.getItem('accessToken')
        const newDeckName = formData.get("deck-name")

        try {
            const response = await axios.patch(`https://flash-cards-app-backend.onrender.com/api/v1/decks/${props.deckID}`, {name: newDeckName}, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            props.toggleMenu()
            props.toggleRenameModal()
            props.fetchDecks()
          } catch (error) {
            console.log(error)
            // setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
        }
    }

    return (
        <div className="new-deck-modal-container">
            <div className="gray-overlay" onClick={props.toggleRenameModal}></div>
            <div className="new-deck-modal">
                <h1>Rename Deck</h1>
                <form action={renameDeck}>
                    <label htmlFor="deck-name">New Name</label>
                    <input
                        type="text"
                        name="deck-name"
                        id="deck-name"
                        required={true}></input>
                    <button className="confirm-rename-deck-btn">Rename</button>
                </form>
                <button
                    className="close-modal-btn"
                    onClick={props.toggleRenameModal}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default RenameDeckModal
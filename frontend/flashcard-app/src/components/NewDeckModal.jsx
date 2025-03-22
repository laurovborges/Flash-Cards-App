import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function NewDeckModal() {
    const [showModal, setShowModal] = useState(false)
    const [createDeckBtnText, setCreateDeckBtnText] = useState('Create Deck')
    const navigate = useNavigate()

    function toggleModal() {
        setShowModal(prev => !prev)
    }

    async function createNewDeck(formData) {
        const accessToken = localStorage.getItem('accessToken')
        const deckName = formData.get("deck-name")
        setCreateDeckBtnText('Creating deck...')

        try {
            const response = await axios.post(`https://flash-cards-app-backend.onrender.com/api/v1/decks/`, {name: deckName}, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            const newDeckID = response.data._id
            setCreateDeckBtnText('Deck successfully created')
            navigate(`/decks/${newDeckID}/cards/edit`)

          } catch (error) {
            console.log(error)
            // setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
            setCreateDeckBtnText('Something went wrong.')
        }
    }

    return (
        <>
            <button className='new-deck-btn' onClick={toggleModal}>+</button>
            {showModal &&
            <div className="new-deck-modal-container">
                <div className="gray-overlay" onClick={toggleModal}></div>
                <div className="new-deck-modal">
                    <h1>New Deck</h1>
                    <form action={createNewDeck}>
                        <label htmlFor="deck-name">Deck Name</label>
                        <input
                        type="text"
                        placeholder="e.g. Medical Terminology"
                        name="deck-name"
                        id="deck-name"
                        required="true"></input>
                        <button className="confirm-new-deck-btn">{createDeckBtnText}</button>
                    </form>
                    <button
                    className="close-modal-btn"
                    onClick={toggleModal}>
                        Close
                    </button>
                </div>
            </div>}
        </>
    )
}

export default NewDeckModal
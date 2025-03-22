const {createDeck, getAllDecks, getDeck, deleteDeck, renameDeck} = require('../controllers/decks')
const express = require('express')
const router = express.Router()
const cardsRouter = require('./cards')

router.use('/:deckID/cards', cardsRouter)

router.route('/')
    .post(createDeck)
    .get(getAllDecks)

router.route('/:deckID')
    .get(getDeck)
    .delete(deleteDeck)
    .patch(renameDeck)


module.exports = router
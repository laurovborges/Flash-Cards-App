const {createCard, getAllCards, getCard, updateCard, deleteCard} = require('../controllers/cards')
const express = require('express')
const router = express.Router({mergeParams: true}) // so that :deckID is included in the request body

router.route('/')
    .get(getAllCards)
    .post(createCard)

router.route('/:cardID')
    .get(getCard)
    .patch(updateCard)
    .delete(deleteCard)

module.exports = router
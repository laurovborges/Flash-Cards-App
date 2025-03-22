const Card = require('../models/Card')
const Deck = require('../models/Deck')

const createCard = async (req, res) => {
    req.body.createdBy = req.user.userID
    req.body.deck = req.params.deckID

    // make sure someone can't just create a card into anybody's deck
    const deck = await Deck.findById({_id: req.params.deckID, createdBy: req.user.userID})
    if(!deck){
        res.status(404).json({msg: `No deck with ID ${req.params.deckID}`})
    }

    const card = await Card.create(req.body)
    res.status(201).json(card)
}

const getAllCards = async (req, res) => {
    const cards = await Card.find({createdBy: req.user.userID, deck: req.params.deckID})
    res.status(200).json(cards)
}

const getCard = async (req, res) => {
    const card = await Card.findOne({_id: req.params.cardID, deck: req.params.deckID, createdBy: req.user.userID})
    if(!card){
        res.status(404).json({msg: `No card with ID ${req.params.cardID}`})
    }

    res.status(200).json(card)
}

const updateCard = async (req, res) => {
    const {cardID, deckID} = req.params
    const {front, back} = req.body
    if(!front || !back){
        return res.status(400).json({msg: 'Please provide text for the front and back of the card'})
    }

    const card = await Card.findOneAndUpdate({_id: cardID, deck: deckID, createdBy: req.user.userID}, {front, back}, {new: true, runValidators: true})
    if(!card){
        return res.status(404).json({msg: `No card with ID ${req.params.cardID}`})
    }

    res.status(200).json(card)
}

const deleteCard = async (req, res) => {
    const {cardID, deckID} = req.params
    const card = await Card.findByIdAndDelete({_id: cardID, deck: deckID, createdBy: req.user.userID})
    if(!card){
        res.status(404).json({msg: `No card with ID ${req.params.cardID}`})
    }

    res.status(200).send()
}


module.exports = {createCard, getAllCards, getCard, updateCard, deleteCard}
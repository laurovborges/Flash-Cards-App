const Deck = require('../models/Deck')
const Card = require('../models/Card')

const createDeck = async (req, res) => {
    req.body.createdBy = req.user.userID
    const deck = await Deck.create(req.body)
    res.status(201).json(deck)
}

const getAllDecks = async (req, res) => {
    const decks = await Deck.find({createdBy: req.user.userID})
    res.status(200).json(decks)
}

const getDeck = async (req, res) => {
    const deck = await Deck.findOne({_id: req.params.deckID, createdBy: req.user.userID})
    if(!deck){
        res.status(404).json({msg: `No deck with ID ${req.params.deckID}`})
    }
    res.status(200).json(deck)
}

const deleteDeck = async (req, res) => {
    // all the cards within the deck need to be deleted too
    await Card.deleteMany({deck: req.params.deckID})

    const deck = await Deck.findByIdAndDelete({_id: req.params.deckID, createdBy: req.user.userID})
    if(!deck){
        res.status(404).json({msg: `No deck with ID ${req.params.deckID}`})
    }
    res.status(200).send()
}

const renameDeck = async (req, res) => {
    const deckID = req.params.deckID
    const newName = req.body.name
    if(!newName){
        res.status(400).json({msg: 'Please enter a name'})
    }

    const deck = await Deck.findOneAndUpdate({_id: deckID, createdBy: req.user.userID}, {name: newName}, {new:true, runValidators: true})
    if(!deck){
        res.status(404).json({msg: `No deck with ID ${req.params.deckID}`})
    }

    res.status(200).json(deck)
}

module.exports = {createDeck, getAllDecks, getDeck, deleteDeck, renameDeck}
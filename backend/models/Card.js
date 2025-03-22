const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    front: {
        type: String,
        maxLength: 500,
        required: true
    },
    back: {
        type: String,
        maxLength: 500,
        required: true
    },
    deck: {
        type: mongoose.Schema.ObjectId,
        ref: 'Deck',
        required: [true, 'Pleae provide the deck that the card is a part of.']
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
})


module.exports = mongoose.model('Card', cardSchema)
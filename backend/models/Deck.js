const mongoose = require('mongoose')

const deckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [50, 'Maximum of 50 characters']
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
})

module.exports = mongoose.model('Deck', deckSchema)
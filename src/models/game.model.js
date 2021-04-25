const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  NamePlayerOne: {
    type: String,
    required: true
  },
  NamePlayerTwo: {
    type: String,
    required: true
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  PlayerTurn: {
    type: Number,
    default: 1
  },
  P1pits: {
    type:Array,
    default: [6,6,6,6,6,6]
  },
  P2pits: {
    type:Array,
    default: [6,6,6,6,6,6]
  },
  P1Treasure: {
    type:Number,
    default: 0
  },
  P2Treasure: {
    type:Number,
    default: 0
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Game', GameSchema);
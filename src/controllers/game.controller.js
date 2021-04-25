const Joi = require('joi');
const socket = require('socket.io');
const response = require("../dto/response.dto"); // may have been used an interceptor would be much more nice :)

const Game = require('../models/game.model');
const moveDTO = require('../dto/move.dto');
const gameSchema = require("../dto/game.dto");
const makeMove = require('../middleware/move');

module.exports = {
  newGame,
  move
}

async function newGame(game) {
  game = await Joi.validate(game, gameSchema, { abortEarly: false });

  return response.success(
     await new Game(game).save()
  );  
}

async function move(move) {
   move = await Joi.validate(move, moveDTO, { abortEarly: false });
  
   await makeMove(move);
  let game = await Game.findById(move.gameId).lean().exec();

  // socket.emit('gameState',newState);
  return response.success(
    game
 ); 
}
const Joi = require('joi');
  const moveDTO = Joi.object (
  {
    gameId: Joi.string().required(),
    playerNumber: Joi.number().required(),
    pitNumber: Joi.number().required()
  }
  )

  module.exports = moveDTO;
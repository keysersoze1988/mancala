const Joi = require('joi');
const gameSchema = Joi.object({
    NamePlayerOne: Joi.string().required(),
    NamePlayerTwo: Joi.string().required() 
  });

  module.exports = gameSchema;
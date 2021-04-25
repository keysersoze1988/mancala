const express = require('express');
const asyncHandler = require('express-async-handler');
const gameCtrl = require('../controllers/game.controller');

const router = express.Router();
module.exports = router;

router.route('/')
  .post(asyncHandler(newGame));

  router.route('/move')
  .post(asyncHandler(move));

async function newGame(req, res) {
  let game = await gameCtrl.newGame(req.body);
  res.json(game);
}

async function move(req, res) {
  let game = await gameCtrl.move(req.body);
  res.json(game);
}
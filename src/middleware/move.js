const Game = require('../models/game.model');
const moveDTO = require('../dto/move.dto');
const response = require("../dto/response.dto");


async function makeMove(moveDTO){

    if(await canMove(moveDTO)) {   // TODO check game exists
        let game = await move (moveDTO);
        return game;
    }
    else {        
            return response.error('you are not allowed to make a move');
    }
   
  }

 async function canMove(moveDTO){
    let game = await Game.findById(moveDTO.gameId).lean().exec();

    if (game && game.PlayerTurn == moveDTO.playerNumber){
    return true;
    }
    else 
    return false;
  } 

  async function move (moveDTO) {

  if (moveDTO.playerNumber == 1)
    return await playerOneMove(moveDTO);
  else   
    return await playerTwoMove(moveDTO);
  }

  async function playerOneMove (moveDTO) {

    let game = await Game.findById(moveDTO.gameId).lean().exec();
    let pitNum = moveDTO.pitNumber;  
    let stoneCount = game.P1pits[pitNum];
 
   // change turn
   game.PlayerTurn = moveDTO.playerNumber == 1 ? 2 : 1;
 
  // take first stone
    if (stoneCount == 1){
     game.P1pits[pitNum] = 0
    }
    else {
    game.P1pits[pitNum] = 1;
    }
    pitNum++;
    
    while(stoneCount > -1 ) { 
      
     if (pitNum == 6 ){ // we have got a treasure
       game.P1Treasure++;          
       stoneCount--;    
       if (stoneCount == 0) {
         game.PlayerTurn = moveDTO.playerNumber;
       }
     }
     else if (pitNum > 5 ) // to place opponents pit
        {           
            game.P2pits[pitNum - 7]++;
           // to know where last stone placed into opponent pits
            if(stoneCount == 1){
            game.P1Treasure += game.P2pits [pitNum - 7];
            game.P2pits [pitNum - 7] = 0;
            }
        }       
        else {              
         game.P1pits[pitNum]++;           
        }
 
        pitNum++; 
        stoneCount--;       
    }       
 
    return await Game.updateOne(game);

  }



  async function playerTwoMove (moveDTO) {

    let game = await Game.findById(moveDTO.gameId).lean().exec();
    let pitNum = moveDTO.pitNumber;  
    let stoneCount = game.P2pits[pitNum];
 
   // change turn
   game.PlayerTurn = moveDTO.playerNumber == 1 ? 2 : 1;
 
  // take first stone
    if (stoneCount == 1){
     game.P2pits[pitNum] = 0
    }
    else {
    game.P2pits[pitNum] = 1;
    }
    pitNum++;
    
    while(stoneCount > -1 ) { 
      
     if (pitNum == 6 ){ // we have got a treasure
       game.P2Treasure++;          
       stoneCount--;    
       if (stoneCount == 0) {
         game.PlayerTurn = moveDTO.playerNumber;
       }
     }
     else if (pitNum > 5 ) // to place opponents pit
        {           
            game.P1pits[pitNum - 7]++;
           // to know where last stone placed into opponent pits
            if(stoneCount == 1){
            game.P2Treasure += game.P1pits [pitNum - 7];
            game.P1pits [pitNum - 7] = 0;
            }
        }       
        else {              
         game.P2pits[pitNum]++;           
        }
 
        pitNum++; 
        stoneCount--;       
    }       
 
    return await Game.updateOne(game)

  }


  module.exports = makeMove;
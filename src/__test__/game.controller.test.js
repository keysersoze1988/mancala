const supertest = require('supertest');
const app = require('../../config/express');
const mongoose = require('mongoose');
const Game = require('../models/game.model');
const config = require('../../config/config');

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { 
  keepAlive: 1,
  useCreateIndex: true,
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// Testing the POST /api/game endpoint
it("tests the post new game endpoint and returns as success message", async () => {

    const response = await supertest(app).post('/api/game').send({
        NamePlayerOne: 'Kutlu',
        NamePlayerTwo: 'Jennifer'
    }).set("Accept", "application/json")
    .expect("Content-Type", "application/json; charset=utf-8");
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success');    

},30000);

// This is run after 
afterEach(async () => {
    await Game.deleteOne({
        NamePlayerOne: 'Kutlu'
    })
})
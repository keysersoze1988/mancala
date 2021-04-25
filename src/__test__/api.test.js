const supertest = require('supertest');
const app = require('../../config/express');


describe("Testing Mancala API", () => {

	it("tests the base route and returns undefined for status", async () => {

		const response = await supertest(app).post('/api/game');

		expect(response.status).toBe(400); // changed because we dont have a base route 
		expect(response.body.status).toBe(undefined);  // changed because we dont have a base route 

	});

});
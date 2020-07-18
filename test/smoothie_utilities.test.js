const mongoose = require('mongoose');
const expect = require('expect');
const utilities = require('../utils/smoothies_utilities');
const Smoothie = require('../models/smoothie');
const {
    connectToDb,
    disconnectFromDb
} = require('./config');


let smoothieId = null;


// Use done to deal with asynchronous code - done is called when the hooks completes
before((done) => {
    // Connect to the database (same as we do in app.js)
    connectToDb(done);
});

after((done) => {
    disconnectFromDb(done);
})

// Set up test data before each test
beforeEach(async function () {
    // Load a test record in setupData
    // Use await so we can access the smoothieId, which is used by some tests
    let smoothie = await setupData();
    smoothieId = smoothie._id;
});

// Delete test data after each test
afterEach((done) => {
    // Execute the deleteMany query
    tearDownData().exec(() => done());
});

describe('getAllsmoothies with one smoothie', (done) => {
    it('should get a smoothie if one exists', function (done) {
        let req = {
            query: {}
        };
        utilities.getAllSmoothies(req).exec((err, smoothies) => {
            expect(Object.keys(smoothies).length).toBe(1);
            done();
        });
    });
   it('item of first smoothie should be lychee love', async function () {
        let req = {
            query: {}
        };
        await utilities.getAllSmoothies(req).exec((err, smoothies) => {
            expect(smoothies[0].name).toBe('Lychee love');
        });

    });
});

describe('getSmoothieById', (done) => {
    it('item of first smoothie should be Lychee love', function (done) {
        // Set up req with smoothieId
        utilities.getSmoothieById(smoothieId).exec((err, smoothie) => {
            expect(smoothie.name).toBe('Lychee love');
            done();
        });
    });
});

// addSmoothie
describe('addSmoothie', (done) => {
    it('should add a smoothie', function (done) {
        // define a req object with expected structure
        const req = {
            body: {
                name: 'Lychee love',
                category: 'detox',
                ingredients: {berries:"1 cup"},
                instructions:'Blend well and enjoy',
                fyi: 11
            }
        }
        utilities.addSmoothie(req.body).save((err, smoothie) => {
            
            expect(smoothie.name).toBe(req.body.name);
            done();
        });
    });
    it('should fail if a required field is missing', function (done) {
        // define a req object with missing required field 
        const req = {
            body: {
                name: 'Lychee love',
                category:'10',
                ingredients: '' 
            }
        }
        utilities.addSmoothie(req).save((err, smoothie) => {
            if (err) {
                expect(err.message).toMatch(/validation/);
                done();
            } else {
                expect(true).toBe(false);
                done();
            }
        });
    });
});

// deleteSmoothie
describe('deleteSmoothie', (done) => {
    it('should delete the specified smoothie', function (done) {
        utilities.deleteSmoothie(smoothieId).exec(() => {
           Smoothie.findById(smoothieId).exec((err, smoothie) => {
                expect(smoothie).toBe(null);
                done();
            });
        });
    });
});

// updateSmoothie
describe('updateSmoothie', (done) => {
    it('should update a smoothie', function (done) {
        // set up a req object
        const req = {
            params: {
                id: smoothieId
            },
            body: {
                name: 'egg',
                category: 'detox',
                ingredients: {berries:"2 cups"},
                instructions: "Mix very well",
                fyi: '' 
            }
        };
        utilities.updateSmoothie(req).exec((err, smoothie) => {
            expect(smoothie.name).toBe(req.body.name);
            done();
        });
    });
});



// Setup and tear down functions
function setupData() {
    let testSmoothie = {};
    testSmoothie.name = 'Lychee love';
    testSmoothie.category = 'detox';
    testSmoothie.ingredients = {berries:"1 cup"};
    testSmoothie.instructions = "Blend well and enjoy";
    testSmoothie.fyi = '';
    return Smoothie.create(testSmoothie);
}

function tearDownData() {
    return Smoothie.deleteMany();
}
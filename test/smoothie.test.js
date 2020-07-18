const expect = require("expect")
const fs = require("fs")
const utilities = require("../utils/utilities")
// Use test data file
const testDataFile = "../data/smoothies.test.json"
// When we write to the file, the path is relative to app.js
const testDataFileRelative= utilities.getDataFileRelativeToApp(testDataFile)

beforeEach(() => {
  // Set and load data from test data file
	setupData()
})

describe("test setup", () => {
	it("should load data", () => {
		let contents = fs.readFileSync(testDataFileRelative, "utf-8")
		expect(contents.length).toBeGreaterThan(3)
	})
})

describe("getAllSmoothies with one smoothie", () => {
	it("should get a smoothie if one exists", () => {
		// Pass an empty req object
		expect(Object.keys(utilities.getAllSmoothies({})).length).toBe(1)
	})
	it("user of first smoothie should be Glow", () => {
		expect(utilities.getAllSmoothies({})["1"].name).toBe("Glow")
	})
})

describe("getSmoothieById", () => {
	// Define a req object with the expected structure to pass a parameter
	const req = {
		params: {
			id: "1"
		}
	}
	it("user of quote with id 1 should be Batman", () => {
		expect(utilities.getSmoothieById(req).name).toBe("Glow")
	})
})

describe("postSmoothie", () => {
	const req = {
		body: {
			name: "glow",
      category: "pregnancy",
      fyi: "smoothies makes you glow"
      ingredients: "coconut water, spinach, lemon, banana, apple"
    }
		}
	it("should add a smoothie", () => {
		// define a req object with expected structure
		let addSmoothie = utilities.addSmoothie(req)
		expect(smoothie.name).toBe(req.body.name)
	})
	it("should update all Smoothies", () => {
		let smoothie = utilities.addSmoothie(req)
		let smoothies= utilities.getAllSmoothies({})
		expect(Object.keys(quotes).length).toBe(2)
	})
})

// delete
/*describe("deleteSmoothie", () => {
	let id = "1"
	it("should delete the specified quote", () => {
		let Smoothies = utilities.deleteSmoothie(id)
		let ids = Object.keys(Smoothies)
		expect(ids.includes("1")).toBe(false)
	})
})

// update
describe("updateSmoothie", () => {
	it("should update a smoothie", () => {
		// set up a req object
		const req = {
			params: {
				id: "1"
			},
			body: {
				name: "Updated name",
        category: "updated category",
                fyi: "this updates fyi!"
                ingredients: "ingredients updated"
			}
		}
		let smoothie = utilities.updateSmoothie(req)
		expect(smoothie.name).toBe(req.body.name)
	})
})
*/
// Setup and tear down functions
function setupData() {
	//let testSmoothieData = {}
	let testSmoothie = {}
    testSmoothie.name = "Glow"
    testSmoothie.category ="pregnancy"
  testSmoothie.fyi = "this smoothie makes you glow"
	testSmoothie.ingredients = "coconut water, spinach, lemon, banana, apple"
	testSmoothieData["1"] = testSmoothie

	fs.writeFileSync(testDataFileRelative, JSON.stringify(testSmoothieData))
	testSmoothies = utilities.loadData(testDataFileRelative)
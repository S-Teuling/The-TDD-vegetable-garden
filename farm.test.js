
const { 
    getYieldForPlant,
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
} = require("./farm.js");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

// ----------- tests for additional functionalities ---------//

describe("getCostsForCrop", ()=> {
    test("Calculate total costs for a crop", () =>{
        const corn = {
            name: "corn",
            yield: 3,
        };
        const cropVariables ={
            crop: corn,
            cost: 2,
            numCrops: 5,
        }
        expect(getCostsForCrop(cropVariables)).toBe(10);
    })
})

describe("getRevenueForCrop", ()=> {
    test("Calculate total revenue for a crop", () =>{
        const corn = {
            name: "corn",
            yield: 3,
        };
        const cropVariables ={
            crop: corn,
            cost: 2,
            retailPrice: 4,
            numCrops: 5,
        }
        expect(getRevenueForCrop(cropVariables)).toBe(60);
    })
})

describe("getProfitForCrop", ()=> {
    test("Calculate total profit for a crop", () =>{
        const corn = {
            name: "corn",
            yield: 3,
        };
        const cropVariables ={
            crop: corn,
            cost: 2,
            retailPrice: 4,
            numCrops: 5,
        }
        expect(getProfitForCrop(cropVariables)).toBe(50);
    })
})

describe("getTotalProfit", () => {
    test("Calculate total profit for all crop", () =>{
        const corn = {
            name: "corn",
            yield: 3,
          //cost: 2,
          //retailPrice: 4,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
          //cost: 4,
          //retailPrice: 6,
        };
        const crops = [
            { crop: corn, numCrops: 5, cost: 2, retailPrice: 4 },
            { crop: pumpkin, numCrops: 2, cost: 4, retailPrice: 6 },
        ];
        expect(getTotalProfit({crops})).toBe(90);
    })
})

// ----------- tests with environmenttal factors --------------//

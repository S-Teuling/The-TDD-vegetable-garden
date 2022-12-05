
const { 
    getYieldForPlant,
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    //--------------//
    getYieldForPlantPlusFactors,
    getYieldForCropPlusFactors,
    getTotalYieldPlusFactors,
    getRevenueForCropPlusFactors,
    getProfitForCropPlusFactors,
    getTotalProfitPlusFactors,

} = require("./farm.js");

//----------------------------------------------------------------------------------//

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
            low: -50,
            medium: 0,
            high: 50,
            },
        },
        };
    const environmentFactors = {
            sun: "low",
    };

    test("Get yield for plant without environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
    test("Get yield for plant WITH environmental factors", () => {
        expect(getYieldForPlantPlusFactors(corn,environmentFactors)).toBe(15);
    });
});
//----------------------------------------------------------------------------------//
describe("getYieldForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factor:{
          humidity:{
            low:-60,
            medium: 10,
            high:60,
            },
          sun:{
            low: -50,
            medium: 10,
            high: 50,
            },
        },
    };
    const crops = {
        crop: corn,
        numCrops: 10,
    };
    const environmentFactors ={
        sun: "high",
        humidity: "medium",
        
    };

    test("Get yield for crop without environmental factor", () => {
        expect(getYieldForCrop(crops)).toBe(30);
    });
    test("Get yield for crop WITH 2 environmental factors", () => {
        expect(getYieldForCropPlusFactors(crops,environmentFactors)).toBe(49.5);
    });
});
//----------------------------------------------------------------------------------//
describe("getTotalYield", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor:{
                humidity:{
                  low:-60,
                  medium: 10,
                  high:60,
                  },
                sun:{
                  low: -50,
                  medium: 10,
                  high: 50,
                  },
                },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor:{
                humidity:{
                  low:-60,
                  medium: 10,
                  high:60,
                  },
                sun:{
                  low: -40,
                  medium: 20,
                  high: 50,
                  },
                },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 5 },
        ];
        const environmentFactors={
            humidity: "low",
            sun:"medium",
        }
    test("Calculate total yield with multiple crops", () => {
        expect(getTotalYield({ crops })).toBe(35);
    });

    test("Calculate total yield with 0 amount", () => {
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
    test("Calculate TOTAL yield WITH 2 environmental factors", ()=> {
        expect(getTotalYieldPlusFactors({crops}, environmentFactors)).toBe(16.2);
    })
    
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
        console.log(getCostsForCrop(cropVariables));
    })
})
//----------------------------------------------------------------------------------//
describe("getRevenueForCrop", ()=> {
    const corn = {
        name: "corn",
        yield: 3,
        cost: 2,
        retailPrice: 4,
        factor:{
            humidity:{
              low:-60,
              medium: 10,
              high:60,
              },
            sun:{
              low: -50,
              medium: 10,
              high: 50,
              },
            },
    };
    const cropVariables ={
        crop: corn,
        cost: 2,
        retailPrice: 4,
        numCrops: 5,
    }
    const crops ={
        crop: corn, 
        numCrops: 5,
    }
    const environmentFactors={
        humidity: "low",
        sun:"medium",
    }
    test("Calculate total revenue for a crop", () =>{
        expect(getRevenueForCrop(cropVariables)).toBe(60);
    })
    test("Calculate total revenue for a crop WITH environmental factors", () =>{
        expect(getRevenueForCropPlusFactors(crops,environmentFactors)).toBe(26.4);
    })
})
//----------------------------------------------------------------------------------//
describe("getProfitForCrop", ()=> {
    const corn = {
        name: "corn",
        yield: 3,
        cost: 2,
        retailPrice: 4,
        factor:{
            humidity:{
              low:-60,
              medium: 10,
              high:60,
              },
            sun:{
              low: -50,
              medium: 10,
              high: 50,
              },
            },
    };
    const cropVariables ={
        crop: corn,
        cost: 2,
        retailPrice: 4,
        numCrops: 5,
    }
 
    const environmentFactors={
        humidity: "low",
        sun:"medium",
    }
    test("Calculate total profit for a crop", () =>{
        expect(getProfitForCrop(cropVariables)).toBe(50);
    })
    test("Calculate total profit for a crop WITH environmental factors", () =>{
        expect(getProfitForCropPlusFactors(cropVariables,environmentFactors)).toBe(16.4);
    })
})
//----------------------------------------------------------------------------------//
describe("getTotalProfit", () => {
    const corn = {
        name: "corn",
        yield: 3,
        cost: 2,
        retailPrice: 4,
      factor:{
        humidity:{
          low:-60,
          medium: 10,
          high:60,
          },
        sun:{
          low: -50,
          medium: 10,
          high: 50,
          },
        },
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        cost: 4,
        retailPrice: 6,
        factor:{
            humidity:{
              low:-60,
              medium: 10,
              high:60,
              },
            sun:{
              low: -40,
              medium: 20,
              high: 50,
              },
            },
    };
    const environmentFactors={
        humidity: "low",
        sun:"medium",
    };
    const crops = [
        { crop: corn, numCrops: 5, cost: 2, retailPrice: 4 },
        { crop: pumpkin, numCrops: 2, cost: 4, retailPrice: 6 },
    ];
    test("Calculate total profit for all crops", () =>{
        expect(getTotalProfit({crops})).toBe(90);
    })
    test("Calculate total profit for all crops WITH environmental factors", () =>{
        expect(getTotalProfitPlusFactors({crops},environmentFactors)).toBe(31);
    })
})



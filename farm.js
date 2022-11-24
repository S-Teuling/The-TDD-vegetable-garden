// ------------- basic functions ---------------- // 

const getYieldForPlant = (item) => item.yield;

const getYieldForCrop = (item) => item.crop.yield * item.numCrops;

const getTotalYield = (item) => {
    let totalYield = 0
    item.crops.forEach((crops)=> {
        totalYield += getYieldForCrop(crops)
    })
    return totalYield;
}

// ----------- additional functionalities without environmental factors---------//

const getCostsForCrop = (item) => item.cost * item.numCrops;

const getRevenueForCrop = (item) => item.crop.yield * item.numCrops * item.retailPrice;

const getProfitForCrop = (item) => getRevenueForCrop(item) - getCostsForCrop(item);

const getTotalProfit = (item) => {
    let totalProfit = 0
    item.crops.forEach((crops) => {
    totalProfit += getProfitForCrop(crops)
    })
    return totalProfit;
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};
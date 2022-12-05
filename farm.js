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

// ----------- additional functionalities WITHOUT environmental factors---------//

const getCostsForCrop = (item) => {
    let result = 0
    result = item.cost * item.numCrops;
    return result;

}

const getRevenueForCrop = (item) => item.crop.yield * item.numCrops * item.retailPrice;

const getProfitForCrop = (item) => getRevenueForCrop(item) - getCostsForCrop(item);

const getTotalProfit = (item) => {
    let totalProfit = 0
    item.crops.forEach((crops) => {
    totalProfit += getProfitForCrop(crops)
    })
    return totalProfit;
}

// ----------- additional functionalities WITH environmental factors---------//


const getYieldForPlantPlusFactors = (item,environmentFactors) => {
    let result=0;
    const percentageSun=(100 + item.factor.sun[environmentFactors.sun])/100;
    result += item.yield* percentageSun;
    return result;
}

const getYieldForCropPlusFactors = (item,environmentFactors) => {
    let result=0;
    const percentageSun=(100 + item.crop.factor.sun[environmentFactors.sun])/100;
    const percentageHumidity=(100 + item.crop.factor.humidity[environmentFactors.humidity])/100;
    result=Math.round(item.crop.yield * item.numCrops * percentageSun * percentageHumidity *10) / 10;
    return result;       

}

const getTotalYieldPlusFactors = (item,environmentFactors) => {
    let totalYield=0;
    item.crops.forEach((crops)=>{
        totalYield+=getYieldForCropPlusFactors(crops,environmentFactors);
    })
    return totalYield;
}

const getRevenueForCropPlusFactors=(item,environmentFactors)=>{
    let revenueCrop=0
    const cropYield=getYieldForCropPlusFactors(item,environmentFactors);
    revenueCrop=cropYield * item.crop.retailPrice;
    return revenueCrop;
}

const getProfitForCropPlusFactors=(item,environmentFactors)=>{
  let totalProfit= 0;
  const totalRevenue = getRevenueForCropPlusFactors(item,environmentFactors);
  const totalCosts = getCostsForCrop(item);
  totalProfit = totalRevenue - totalCosts;
  //console.log("revenue: ", totalRevenue, "cost: ", totalCosts);
  return totalProfit;
};

const getTotalProfitPlusFactors=(item,environmentFactors)=>{
    let result = 0 ;
    item.crops.forEach((crops) =>{
        result+=Math.round(getProfitForCropPlusFactors(crops,environmentFactors));
    })
    return result;
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,

//----------- additional functionalities WITH environmental factors---------//

    getYieldForPlantPlusFactors,
    getYieldForCropPlusFactors,
    getTotalYieldPlusFactors,
    getRevenueForCropPlusFactors,
    getProfitForCropPlusFactors,
    getTotalProfitPlusFactors,
};
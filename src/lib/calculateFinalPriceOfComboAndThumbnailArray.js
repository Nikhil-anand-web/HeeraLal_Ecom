import calculateFinalPrice from "./calculateFinalPrice"

export default function calculateFinalPriceOfComboAndThumbnailArray(combo) {
    var totalMrp = 0
    const percentageDiscount = parseFloat(combo.discountInPercent)
    
   combo.productVarients.forEach((varient) => {
        totalMrp+=parseFloat(varient.mrp)

    })
    const actualPrice = calculateFinalPrice(totalMrp,percentageDiscount)
    return {actualPrice,totalMrp}
    
}
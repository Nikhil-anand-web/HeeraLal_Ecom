import calculateFinalPrice from "./calculateFinalPrice";
import calculateFinalPriceOfComboAndThumbnailArray from "./calculateFinalPriceOfComboAndThumbnailArray";

export default function totalCartValue(cart) {
    var simpleProductValue = 0

    
    for (let i = 0; i < cart.cartItem.length; i++) {
        const varientMrp = cart.cartItem[i].varient.mrp;
        const discount = cart.cartItem[i].varient.discount;
        const finalvalue = calculateFinalPrice(varientMrp,discount)
        
        simpleProductValue+=(finalvalue*cart.cartItem[i].qty)

        
    }
    

    var comboMrp = 0
    for (let i = 0; i < cart.cartComboItems.length; i++) {
        const {actualPrice} = calculateFinalPriceOfComboAndThumbnailArray(cart.cartComboItems[i].combo)
        comboMrp+=(actualPrice*cart.cartComboItems[i].qty)

        
    }
    console.log(comboMrp,"simple c")
    return comboMrp+simpleProductValue
    
}
export default function calculateFinalPrice(mrp, discount) {
    // Parse mrp and discount to numbers
    const parsedMrp = parseFloat(mrp);
    const parsedDiscount = parseFloat(discount);

 

    // Ensure discount is within valid range (e.g., 10% should be input as 10)
    if (parsedDiscount <= 0 || parsedDiscount >= 100) {
        return parsedMrp;
    }

    // Calculate the discount amount
    const discountAmount = (parsedMrp * parsedDiscount) / 100;

    // Calculate the final price after discount
    const finalPrice = parsedMrp - discountAmount;

    return Math.round(finalPrice);
}
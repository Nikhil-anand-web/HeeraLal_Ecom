function generateOrderId() {
    const timestamp = Date.now(); // Get the current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 100000); // Generate a random 5-digit number
    const orderId = `${timestamp}${randomNum}`; // Combine them to create a unique ID
    return orderId;
  }

  export default generateOrderId
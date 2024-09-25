export default function gramsToKg(value) {
    // Parse the input, whether it's a string or number
    const grams = typeof value === 'string' ? parseInt(value, 10) : value;
  
    // Check if the result is a valid number
    if (isNaN(grams)) {
      throw new Error('Invalid input: value must be a valid number or numeric string.');
    }
  
    return grams / 1000; // Convert grams to kilograms
  }
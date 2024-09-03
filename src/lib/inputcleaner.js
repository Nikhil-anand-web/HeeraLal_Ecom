function inputcleaner(obj) {
    // Helper function to trim strings
    function trimStrings(value) {
      if (typeof value === 'string') {
        return value.trim();
      }
      return value;
    }
  
    // Iterate over the object keys
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          // Recursively trim nested objects
          inputcleaner(obj[key]);
        } else {
          // Trim string values
          obj[key] = trimStrings(obj[key]);
        }
      }
    }
  }
  export default inputcleaner
function camelCaseToNormal(camelStr) {
    // Insert a space before each uppercase letter, except the first one
    const result = camelStr.replace(/([a-z])([A-Z])/g, '$1 $2');
    
    // Convert the result to lowercase (optional, if you want all lowercase)
    return result.toLowerCase();
  }
  export default camelCaseToNormal
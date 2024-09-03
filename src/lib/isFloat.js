export default function isFloat(str) {
    // Try to convert the string to a number using parseFloat
    const floatVal = parseFloat(str);

    // Check if the result is a number and the string matches the float value
    return !isNaN(floatVal) && floatVal.toString() === str;
}
export default function isInt(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
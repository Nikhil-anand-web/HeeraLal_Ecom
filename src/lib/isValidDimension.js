export default function isValidDimension(dimension) {
  // Regex for exactly four dimensions in the format '44X44X44X44' without spaces
  const regex = /^\d+X\d+X\d+X\d+$/;

  // Test the dimension string against the regex (which inherently doesn't allow spaces)
  return regex.test(dimension);
}

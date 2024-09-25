export default function roundToXDigits(number, x) {
    const factor = Math.pow(10, x); // 10^x
    return Math.round(number * factor) / factor;
}

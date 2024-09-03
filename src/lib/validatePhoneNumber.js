export default function validatePhoneNumber(phoneNumber) {
    // Regular expression to validate and capture parts of the phone number
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    if (phoneRegex.test(phoneNumber)) {
        // Check if the number already has a country code
        if (phoneNumber.startsWith('+91')) {
            return phoneNumber;  // If it already has +91, return as is
        } else if (phoneNumber.startsWith('+')) {
            return phoneNumber;  // If it has a different country code, return as is
        } else {
            return `+91${phoneNumber}`;  // If no country code, prepend +91
        }
    } else {
        return null;  // Invalid phone number format
    }
}

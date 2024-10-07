export default function isUnderDuration(durationInDays ,startDateString) {
    // Parse the input start date
    const startDate = new Date(startDateString);
    
    // Get today's date
    const today = new Date();
    
    // Calculate the end date by adding the duration to the start date
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationInDays);
    
    // Check if today's date is between the start date and the end date
    
    return today >= startDate && today <= endDate;
  }
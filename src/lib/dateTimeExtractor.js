 export default function dateTimeExtractor(dateString) {
    // Extract the timestamp from the string
    const match = dateString.match(/\/Date\((\d+)(?:[+-]\d{4})?\)\//);
  
    if (!match) {
      return "Invalid date string format";
    }
  
    const timestamp = parseInt(match[1], 10);
  
    // Convert the timestamp to a JavaScript Date object
    const date = new Date(timestamp);
  
    // Format the date as dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    // Get hours and minutes for the time
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, set it to 12
  
    // Format the time as hh:mm AM/PM
    const formattedTime = `${hours}:${minutes} ${ampm}`;
  
    // Combine date and time
    return `${day}/${month}/${year} ${formattedTime}`;
  }
  
 
  
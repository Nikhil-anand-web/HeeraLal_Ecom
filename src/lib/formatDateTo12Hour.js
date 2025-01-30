const formatDateTo12Hour = (date) => {
    const parsedDate = new Date(date);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return parsedDate.toLocaleString("en-US", options); // Formats in 12-hour format
  };

  export default formatDateTo12Hour
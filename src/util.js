function formatDate(date) {
  if (!date instanceof Date || isNaN(date)) {
    console.error('INVALID DATE');
    return;
  }
  
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${date.getFullYear()}-${month}-${day}`;
}

function stringToDate(dateString) {
  let date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function datesEqual(date1, date2) {
  if (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getDate() == date2.getDate()
  ) {
    return true;
  }
  return false;
}

export { formatDate, stringToDate, datesEqual };
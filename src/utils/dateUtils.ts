const months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const days = ["Sunday", "Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"]

export const getMonth = (monthIndex:any) => {
  return months[monthIndex-1];
}

export const getDay = (dayIndex:any) => {
  return days[dayIndex];
}

export const getToday = () => {
    let day = ""
    switch (new Date().getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
    }

    return day;
}
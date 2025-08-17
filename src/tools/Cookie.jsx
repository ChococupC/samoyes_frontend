import Cookies from "js-cookie";

function setCookieMidNight(key, value) {
  // Get today's date
  const now = new Date();

  // Create a new date for **midnight tonight**
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // tomorrow
    0,
    0,
    0,
    0 // 00:00:00
  );
  // Set the cookie to expire at midnight
  Cookies.set(key, value, { expires: midnight });
}

export default setCookieMidNight;

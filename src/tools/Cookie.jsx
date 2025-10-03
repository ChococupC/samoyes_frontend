import Cookies from "js-cookie";

export function setCookieMidNight(key, value) {
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

export function setCookie(key, value, time) {
  // Set the cookie to expire at midnight
  Cookies.set(key, value, { expires: time });
}

export function fetchCookie(cookieKey, error = true) {
  const cookieValue = Cookies.get(cookieKey);
  if (cookieValue) {
    return cookieValue;
  }
  if (error) {
    console.error(`CookieNotFound with key ${cookieKey}`);
  }
  return;
}

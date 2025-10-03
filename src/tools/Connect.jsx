// example response from api: {
//   code: 200,
//   message: "success",
//   data: {
//     date: "2025-08-15",
//     categories: [],
//     words: [
//       [],
//       [],
//       [],
//       [],
//     ],
//     puzzle_words: [],
//   },
//   status: "success",
// };

function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function getCategories(url) {
  if (!url.endsWith("/")) {
    console.error("Please provide full url, missing '/'.");
    return NaN;
  }
  const dt = getLocalDate();
  const response = await fetch(`${url}?date=${dt}`);
  const data = await response.json();
  return data;
}

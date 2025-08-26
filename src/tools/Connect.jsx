// response looks like: {
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

async function getCategories() {
  const dt = getLocalDate();
  const res = await fetch(
    `https://samoyes.onrender.com/samoyes_API/categorize/?date=${dt}`
  );
  const data = await res.json();
  return data;
}

export default getCategories;

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
async function getCategories() {
  const res = await fetch(
    "https://samoyes.onrender.com/samoyes_API/categorize/"
  );
  const data = await res.json();
  return data;
}

export default getCategories;

import { setCookieMidNight } from "../../tools/Cookie";

async function CheckWinHandler({
  selectedBoxes,
  setSelectedBoxes,
  words,
  setCategoriesWin,
  categoriesWin,
  setPuzzleWords,
  setMessage,
  setTries,
  tries,
  setUsedCategories,
  usedCategories,
  setStart,
  setWin,
  tutorial,
}) {
  const usedMatches = usedCategories.some((category) =>
    category.every((word) => selectedBoxes[word])
  );
  if (usedMatches) {
    Message(setMessage, "You tried this already...");
    return;
  }

  const selectedBoxesKeys = Object.keys(selectedBoxes);

  for (let i = 0; i < words.length; i++) {
    const targetWords = words[i];

    const matches = selectedBoxesKeys.filter((word) =>
      targetWords.includes(word)
    ).length;

    // if matach
    if (matches === 4) {
      // if win
      if (categoriesWin.length === 3) {
        if (!tutorial) {
          setCookieMidNight("categorize", `${tries}0123`);
        }
        setWin(true);
        Message(setMessage, "Congratulations!");
        setTimeout(() => setStart("animate_end"), 2500);
      }

      setPuzzleWords((prev) => [
        ...selectedBoxesKeys,
        ...prev.filter((word) => !selectedBoxesKeys.includes(word)),
      ]);
      setTimeout(() => {
        RemoveSelectedBoxes(selectedBoxesKeys, setPuzzleWords);
        setCategoriesWin((prev) => {
          return [...prev, i];
        });
        if (!tutorial) {
          setCookieMidNight(
            "categorize",
            `${tries}${categoriesWin.join("")}${i}`
          );
        }
        setSelectedBoxes([]);
      }, 400);
      return;
    } else if (matches === 3) {
      Message(setMessage, "You're Close...");
    }
  }
  //lose try
  const current_tries = tries - 1;
  if (!tutorial) {
    setCookieMidNight(
      "categorize",
      `${current_tries}${categoriesWin.join("")}`
    );
  }
  setTries((prev) => prev - 1);

  //if fail
  setSelectedBoxes((prev) => {
    return BoxAnimate({ prev: prev, animation: "animate_fail" });
  });

  setUsedCategories((prev) => [...prev, selectedBoxesKeys]);

  setTimeout(() => {
    setSelectedBoxes((prev) => {
      return BoxAnimate({ prev: prev });
    });
  }, 500);

  //if lose
  if (current_tries == 0) {
    if (!tutorial) {
      setCookieMidNight("categorize", `00123`);
    }
    setTimeout(function () {
      Message(setMessage, "Try again tomorrow!");
      setSelectedBoxes([]);
      Lose(setCategoriesWin, categoriesWin, words, setPuzzleWords, setStart);
    }, 800);
    return;
  }
}

function BoxAnimate({ prev, animation }) {
  const updated = {};

  for (const word in prev) {
    updated[word] = {
      animation: animation || null,
    };
  }

  return updated;
}

function RemoveSelectedBoxes(words, setPuzzleWords) {
  setPuzzleWords((prev) => prev.filter((word) => !words.includes(word)));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function lose_category(
  array,
  setCategoriesWin,
  words,
  setPuzzleWords,
  setStart
) {
  for (let i = 0; i < array.length; i++) {
    const words_array = words[array[i]];
    setPuzzleWords((prev) => [
      ...words_array,
      ...prev.filter((word) => !words_array.includes(word)),
    ]);
    setTimeout(() => {
      RemoveSelectedBoxes(words[array[i]], setPuzzleWords);
      setCategoriesWin((prev) => [...prev, array[i]]);
    }, 500);
    await sleep(2500);
  }
  setStart("animate_end");
}

function Lose(
  setCategoriesWin,
  categoriesWin,
  words,
  setPuzzleWords,
  setStart
) {
  const ids = words
    .map((_, index) => index)
    .filter((index) => !categoriesWin.includes(index));
  lose_category(ids, setCategoriesWin, words, setPuzzleWords, setStart);
}

function Message(setMessage, message) {
  setMessage(message);
  setTimeout(() => {
    setMessage();
  }, 2000);
}

export { CheckWinHandler, RemoveSelectedBoxes };

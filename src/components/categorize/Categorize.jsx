import { useEffect, useRef, useState } from "react";
import setCookieMidNight from "../../tools/Cookie";

function Confetti({ win }) {
  if (!win) {
    return;
  }
  const colors = ["#ff6347", "#ffa500", "#32cd32", "#1e90ff", "#ff69b4"];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setConfettiPieces((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(), // unique id
          left: `${Math.random() * 100}%`,
          fallDuration: `${Math.random() * 3 + 3}s`,
          color: getRandomColor(),
        },
      ]);
    }, 400); // new piece every 400ms

    return () => clearInterval(interval);
  }, []);

  // Remove pieces after their animation is done
  useEffect(() => {
    if (!confettiPieces.length) return;

    const cleanup = setTimeout(() => {
      setConfettiPieces(
        (prev) => prev.filter((p) => Date.now() - p.id < 4000) // keep within fall duration
      );
    }, 4000);

    return () => clearTimeout(cleanup);
  }, [confettiPieces]);

  return (
    <div className="confetti_wrapper">
      {confettiPieces.map(({ id, left, fallDuration, color }) => (
        <div
          key={id}
          className="confetti-piece"
          style={{
            left,
            "--fall-duration": fallDuration,
            "--confetti-color": color,
          }}
        />
      ))}
    </div>
  );
}

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
        setCookieMidNight("categorize", `${tries}0123`);
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
        setCookieMidNight(
          "categorize",
          `${tries}${categoriesWin.join("")}${i}`
        );
        setSelectedBoxes([]);
      }, 300);
      return;
    } else if (matches === 3) {
      Message(setMessage, "You're Close...");
    }
  }
  //lose try
  const current_tries = tries - 1;
  setCookieMidNight("categorize", `${current_tries}${categoriesWin.join("")}`);
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

function CategoryList({ categories, words, categoriesWin, boxSize }) {
  return (
    <>
      {categoriesWin.map((category, index) => {
        return (
          <CreateCategory
            key={index}
            category={category}
            categories={categories}
            words={words}
            boxSize={boxSize}
            latest={index == categoriesWin.length - 1}
          ></CreateCategory>
        );
      })}
    </>
  );
}

function CreateCategory({ category, categories, words, boxSize, latest }) {
  const [animation, setAnimation] = useState(Boolean);
  const [animationType, setAnimationType] = useState(true);
  const id = category;
  const word = words[id];
  const height = boxSize.height;
  useEffect(() => {
    if (latest) {
      setAnimation(true);
      setAnimationType(false);
      const timer = setTimeout(() => {
        setAnimationType(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [latest]);

  return (
    <div
      className={`category ${
        latest ? (animationType ? "animate_appear" : "animate_fade") : ""
      }`}
      id={`category${id}`}
      style={{ height: height }}
    >
      <h3>{categories[id]}</h3>
      <p>{word.join(", ")}</p>
    </div>
  );
}

function RemoveSelectedBoxes(words, setPuzzleWords) {
  setPuzzleWords((prev) => prev.filter((word) => !words.includes(word)));
}

function CreateTries({ tries }) {
  const tries_items = [];
  for (let i = 0; i < tries; i++) {
    if (tries != 4 && i == tries - 1) {
      tries_items.push([
        <div key={`try-${i + 1}`} className="try" id={`try${i + 1}`}></div>,
        <div key={`try-${4}`} className="try animate_pop" id={`try${4}`}></div>,
      ]);
    } else {
      tries_items.push(
        <div key={`try-${i + 1}`} className="try" id={`try${i + 1}`}></div>
      );
    }
  }
  for (let i = 0; i < 3 - tries; i++) {
    tries_items.push(
      <div key={`pop${i + 1}`} className="try_pop" style={{ opacity: 0 }}></div>
    );
  }
  if (tries == 0) {
    tries_items.push(
      <div key={`pop${4}`} className="try_pop" style={{ opacity: 0 }}></div>
    );
  }
  return <>{tries_items}</>;
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

export {
  CheckWinHandler,
  CategoryList,
  CreateTries,
  Confetti,
  RemoveSelectedBoxes,
};

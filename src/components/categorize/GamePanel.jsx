import style from "../../pages/categorize/categorize.module.css";
import { Button } from "../Button";
import { CheckWinHandler } from "./CategorizeMechanic";

export const GamePanel = ({
  selectedBoxes,
  setSelectedBoxes,
  words,
  setCategoriesWin,
  categoriesWin,
  setPuzzleWords,
  puzzlewords,
  setMessage,
  setTries,
  tries,
  setUsedCategories,
  usedCategories,
  setStart,
  setWin,
  tutorial,
}) => {
  return (
    <>
      <div
        className={style.game_tries_wrapper}
        style={categoriesWin.length === 4 ? { height: 0, opacity: 0 } : {}}
      >
        <p>Tries Remaining:</p>
        <CreateTries tries={tries}></CreateTries>
      </div>
      <div className={style.game_button_wrapper}>
        {categoriesWin.length === 4 ? (
          "Come Again tommorrow!"
        ) : (
          <>
            <Button
              onClick={() =>
                setPuzzleWords([...puzzlewords.sort(() => Math.random() - 0.5)])
              }
              id="categorize_button_shuffle"
              className={style.game_button}
              isDisabled={categoriesWin.length === 4}
            >
              Shuffle
            </Button>
            <Button
              onClick={() => setSelectedBoxes({})}
              id="categorize_button_deselect"
              className={style.game_button}
              isDisabled={categoriesWin.length === 4}
            >
              Deselect All
            </Button>
            <Button
              onClick={() =>
                CheckWinHandler({
                  selectedBoxes: selectedBoxes,
                  setSelectedBoxes: setSelectedBoxes,
                  words: words,
                  setCategoriesWin: setCategoriesWin,
                  categoriesWin: categoriesWin,
                  setPuzzleWords: setPuzzleWords,
                  setMessage: setMessage,
                  setTries: setTries,
                  tries: tries,
                  setUsedCategories: setUsedCategories,
                  usedCategories: usedCategories,
                  setStart: setStart,
                  setWin: setWin,
                  tutorial: tutorial,
                })
              }
              id="categorize_button_submit"
              className={`${style.Submit} ${
                Object.keys(selectedBoxes).length === 4 ? style.ready : ""
              }`}
              isDisabled={Object.keys(selectedBoxes).length !== 4}
            >
              Categorize
            </Button>
          </>
        )}
      </div>
    </>
  );
};

function CreateTries({ tries }) {
  const tries_items = [];
  for (let i = 0; i < tries; i++) {
    tries_items.push(
      <div
        key={`try-${i + 1}`}
        className={`${style.try} ${style[`try${i + 1}`]}`}
      ></div>
    );
  }

  if (tries < 4 && tries > 0) {
    tries_items.push(
      <div
        key={`try-${tries + 1}`}
        className={`${style.try} ${style.animate_pop} ${
          style[`try${tries + 1}`]
        }`}
      ></div>
    );
  }

  for (let i = 0; i < 3 - tries; i++) {
    tries_items.push(
      <div
        key={`try_pop${i + 1}`}
        className={style.try_pop}
        style={{ opacity: 0 }}
      ></div>
    );
  }
  if (tries == 0) {
    tries_items.push(
      <div
        key={`try_pop${4}`}
        className={style.try_pop}
        style={{ opacity: 0 }}
      ></div>
    );
  }
  return <>{tries_items}</>;
}

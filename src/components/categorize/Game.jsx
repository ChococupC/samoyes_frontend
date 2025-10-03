import { useState, useEffect } from "react";
import style from "../../pages/categorize/categorize.module.css";
import { Button, Button_Link } from "../Button";
import { fetchCookie, setCookie } from "../../tools/Cookie";
import { GameBoxWrapper } from "./GameBox";
import { RemoveSelectedBoxes } from "./CategorizeMechanic";
import { Confetti } from "./Confetti";
import { CategoryWrapper } from "./Category";
import { GamePanel } from "./GamePanel";
import { Tool } from "./Tool";
import { HashLink } from "react-router-hash-link";

export function Game({ res, isTutorial }) {
  // Data
  const categories = res.data.categories;
  const words = res.data.words;
  const [puzzlewords, setPuzzleWords] = useState(res.data.puzzle_words);

  // Game
  const [message, setMessage] = useState();
  const [categoriesWin, setCategoriesWin] = useState([]);
  const [selectedBoxes, setSelectedBoxes] = useState({});
  const [usedCategories, setUsedCategories] = useState([]);
  const [boxSize, setBoxSize] = useState({});
  const [start, setStart] = useState();
  const [tutorial, setTutorial] = useState(false);
  const [first, setFirst] = useState(false);
  const [tries, setTries] = useState(4);
  const [win, setWin] = useState(Boolean);
  const startMessage = {
    0: "Lets Start!",
    1: "1/4 Done, Great!",
    2: "2/4 Done, Sweet!",
    3: "3/4 Done, Almost!",
    4: "Show Result!",
  };

  useEffect(() => {
    if (!isTutorial) {
      const cookieValue = fetchCookie("categorize", false);
      if (cookieValue) {
        setTries(cookieValue[0]);
        const cookieCategory = cookieValue.slice(1).split("");
        setCategoriesWin(cookieCategory);
        for (let i = 0; i < cookieCategory.length; i++) {
          RemoveSelectedBoxes(words[cookieCategory[i]], setPuzzleWords);
        }
      }
      const cookieTutorialValue = fetchCookie("tutorial", false);
      if (!cookieTutorialValue) {
        setFirst(true);
      }
    }
  }, []);
  return (
    <>
      <div className={`${style.startingwrapper} ${style[start]}`}>
        <div className={style.startanimation}>
          <img src="/categorize.jpg" className={style.category_image} />
          <h1>Categorize</h1>
          <p>Match AP Psychology Words into Groups of Four!</p>
          <Button
            onClick={() => {
              setStart("animate_start");
              if (first) {
                setTutorial(true);
              }
            }}
            id="category_button_start"
            className={style.start_button}
          >
            {startMessage[categoriesWin.length]}
          </Button>
        </div>
      </div>
      <div className={`${style.tip_wrapper} ${tutorial ? style.activate : ""}`}>
        <div className={style.tutorial}>
          <h1>Would you like to do an easier one?</h1>
          <div className={style.tutorial_button_wrapper}>
            <Button_Link
              className={style.yes}
              to={"/categorize/tutorial"}
              onClick={() => setCookie("tutorial", 1, 3650)}
            >
              Yes!
            </Button_Link>
            <Button className={style.no} onClick={() => setTutorial(false)}>
              Nope
            </Button>
          </div>
        </div>
      </div>
      <div className={style.content_wrapper}>
        <Confetti win={win} />
        <div
          className={`${style.message} ${message ? style.animate_message : ""}`}
        >
          {message}
        </div>
        <div className={style.game_wrapper}>
          <div className={style.tool_wrapper}>
            {!isTutorial ? (
              <Tool onClick={() => setTutorial(true)} tooltext={"Tutorial"}>
                ?
              </Tool>
            ) : (
              <HashLink to="/categorize">
                <Tool tooltext={"Real Game"}>!</Tool>
              </HashLink>
            )}
          </div>
          <p>Categorize Them into Four Groups!</p>
          <main>
            <CategoryWrapper
              categories={categories}
              words={words}
              categoriesWin={categoriesWin}
              boxSize={boxSize}
            />
            <GameBoxWrapper
              selectedBoxes={selectedBoxes}
              setSelectedBoxes={setSelectedBoxes}
              words={puzzlewords}
              setBoxSize={setBoxSize}
            />
            <GamePanel
              selectedBoxes={selectedBoxes}
              setSelectedBoxes={setSelectedBoxes}
              words={words}
              setCategoriesWin={setCategoriesWin}
              categoriesWin={categoriesWin}
              setPuzzleWords={setPuzzleWords}
              puzzlewords={puzzlewords}
              setMessage={setMessage}
              setTries={setTries}
              tries={tries}
              setUsedCategories={setUsedCategories}
              usedCategories={usedCategories}
              setStart={setStart}
              setWin={setWin}
              tutorial={isTutorial}
            />
          </main>
        </div>
      </div>
    </>
  );
}

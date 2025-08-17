import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import GridGameBox from "./components/categorize/GridGameBox";
import Button from "./components/button/Button";
import {
  CheckWinHandler,
  CategoryList,
  CreateTries,
  Confetti,
  RemoveSelectedBoxes,
} from "./components/categorize/Categorize";
import getCategories from "./tools/Connect";
import { Shuffle } from "./components/button/on_click";

const response = await getCategories();

function Game() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [puzzlewords, setPuzzleWords] = useState("");
  const [message, setMessage] = useState();
  const [categoriesWin, setCategoriesWin] = useState([]);
  const [selectedBoxes, setSelectedBoxes] = useState({});
  const [usedCategories, setUsedCategories] = useState([]);
  const [boxSize, setBoxSize] = useState({});
  const [start, setStart] = useState(false);
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
    async function fetchData() {
      try {
        const res = await getCategories();
        const res_words = res.data.words;
        setResponse(res);
        setCategories(res.data.categories);
        setWords(res_words);
        setPuzzleWords(res.data.puzzle_words);
        const cookieValue = Cookies.get("categorize");
        if (cookieValue) {
          const cookieTries = cookieValue[0];
          const cookieCategory = cookieValue.slice(1).split("");
          setTries(cookieTries);
          setCategoriesWin(cookieCategory);
          for (let i = 0; i < cookieCategory.length; i++) {
            RemoveSelectedBoxes(res_words[i], setPuzzleWords);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:");
      } finally {
        setLoading(false); // always stop loading
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="startingwrapper">
        <div className="startanimation">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  // Handle API error
  if (response.code !== 200) {
    return (
      <div className="startingwrapper">
        <div className="startanimation">
          <img src="categorize.jpg" className="category_image" />
          <h1>Categorize</h1>
          <p>So sorry!</p>
          <h3>{response.message}</h3>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={`startingwrapper ${start ? "animate_start" : ""}`}>
        <div className={"startanimation"}>
          <img src="categorize.jpg" className="category_image" />
          <h1>Categorize</h1>
          <p>Match AP Psychology Words into Groups of Four!</p>
          <Button
            onClick={() => setStart(true)}
            id="start_button"
            className="start_button"
          >
            {startMessage[categoriesWin.length]}
          </Button>
        </div>
      </div>
      <div className="content_wrapper">
        <Confetti win={win}></Confetti>
        <div className={`message ${message ? "animate_message" : ""}`}>
          {message}
        </div>
        <div className="game_wrapper">
          <p>Categorize Them into Four Groups!</p>
          <main>
            <div
              className="game_category_wrapper"
              style={{ width: boxSize.width }}
            >
              <hr />
              <CategoryList
                categories={categories}
                words={words}
                categoriesWin={categoriesWin}
                boxSize={boxSize}
                fast={start ? true : false}
              />
            </div>
            <div className="main_game_wrapper">
              <GridGameBox
                selectedBoxes={selectedBoxes}
                setSelectedBoxes={setSelectedBoxes}
                words={puzzlewords}
                setBoxSize={setBoxSize}
              />
              <span></span>
            </div>
            <div
              className="game_tries_wrapper"
              style={
                categoriesWin.length === 4 ? { height: 0, opacity: 0 } : {}
              }
            >
              <p>Tries Remaining:</p>
              <CreateTries
                tries={tries}
                setCategoriesWin={setCategoriesWin}
                words={words}
              ></CreateTries>
            </div>
            <div className="game_button_wrapper">
              {categoriesWin.length === 4 ? (
                "Come Again tommorrow!"
              ) : (
                <>
                  <Button
                    onClick={() => setPuzzleWords(Shuffle([...puzzlewords]))}
                    id="Shuffle"
                    className="game_button"
                    isDisabled={categoriesWin.length === 4}
                  >
                    Shuffle
                  </Button>
                  <Button
                    onClick={() => setSelectedBoxes({})}
                    id="Deselect"
                    className="game_button"
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
                      })
                    }
                    id="Submit"
                    className={
                      Object.keys(selectedBoxes).length === 4 ? "ready" : ""
                    }
                    isDisabled={Object.keys(selectedBoxes).length !== 4}
                  >
                    Categorize
                  </Button>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Game;

import { Game } from "../../components/categorize/Game";
import { Layout } from "../../components/Layout";
import style from "./categorize.module.css";

export function PageTutorial() {
  const res = {
    code: 200,
    message: "success",
    data: {
      date: "2025-08-15",
      categories: [
        "Famous UCLA Buildings / People",
        "Fruits",
        "Numbers",
        "Snacks",
      ],
      words: [
        ["Bruin", "John Wooden", "Powell Library", "The Hill"],
        ["Grape", "Apple", "Orange", "Peach"],
        ["1919", "5", "9", "7"],
        ["Oreo", "Kitkat", "Lay's", "Reese's"],
      ],
      puzzle_words: [
        "1919",
        "Bruin",
        "Grape",
        "5",
        "Oreo",
        "John Wooden",
        "Apple",
        "Kitkat",
        "9",
        "Powell Library",
        "Orange",
        "Lay's",
        "7",
        "Reese's",
        "Peach",
        "The Hill",
      ],
    },
    status: "success",
  };

  // Handle Game
  return (
    <Layout className={style.body}>
      <Game res={res} isTutorial={true} />
    </Layout>
  );
}

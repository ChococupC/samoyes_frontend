import style from "../../pages/categorize/categorize.module.css";
import { useEffect, useState } from "react";

export const CategoryWrapper = ({
  categories,
  words,
  categoriesWin,
  boxSize,
}) => {
  return (
    <div
      className={style.game_category_wrapper}
      style={{ width: boxSize.width }}
    >
      <hr />
      {categoriesWin.map((category, index) => (
        <CreateCategory
          key={index}
          category={category}
          categories={categories}
          words={words}
          boxSize={boxSize}
          latest={index == categoriesWin.length - 1}
        />
      ))}
    </div>
  );
};

function CreateCategory({ category, categories, words, boxSize, latest }) {
  const [animationType, setAnimationType] = useState(true);
  const id = category;
  const word = words[id];
  const height = boxSize.height;
  useEffect(() => {
    if (latest) {
      setAnimationType(false);
      const timer = setTimeout(() => {
        setAnimationType(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [latest]);

  return (
    <div
      className={`${style.category} ${
        latest
          ? animationType
            ? style.animate_appear
            : style.animate_fade
          : ""
      } ${style[`category${id}`]}`}
      style={{ height: height }}
    >
      <h3>{categories[id]}</h3>
      <p>{word.join(", ")}</p>
    </div>
  );
}

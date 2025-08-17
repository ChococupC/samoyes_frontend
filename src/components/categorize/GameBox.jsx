import { useEffect, useRef, useState } from "react";

function GameBox({ text, isSelected, onClick, setBoxSize }) {
  const boxRef = useRef(null);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const resizeText = () => {
      if (!boxRef.current) return;
      const mediaQuery = window.matchMedia(
        "only screen and (max-width: 64em) and (orientation: landscape)"
      );
      const element = boxRef.current;
      const containerWidth = mediaQuery.matches
        ? element.offsetHeight + 8
        : element.offsetWidth;
      setBoxSize({
        width: containerWidth * 4 + 15,
        height: element.offsetHeight,
      });
      let textRatio = 1;

      const getTextWidth = (word, factor) => word.length * 16 * factor;

      if (text.includes(" ")) {
        text.split(" ").forEach((word) => {
          const textWidth = getTextWidth(word, 0.75);
          textRatio = Math.min(textRatio, containerWidth / textWidth);
        });
      } else if (text.includes("-")) {
        text.split("-").forEach((word) => {
          const textWidth = getTextWidth(word, 1.01);
          textRatio = Math.min(textRatio, containerWidth / textWidth);
        });
      } else {
        const textWidth = getTextWidth(text, 0.78);
        if (textWidth > containerWidth) {
          textRatio = containerWidth / textWidth;
        }
      }

      const newFontSize = Math.round(16 * textRatio);
      setFontSize(newFontSize);
    };

    const observer = new ResizeObserver(resizeText);
    observer.observe(boxRef.current);
    resizeText();

    return () => observer.disconnect();
  }, [text]);

  return (
    <div
      ref={boxRef}
      className={`game_box ${isSelected ? "game_box_selected" : ""} ${
        isSelected?.animation || ""
      }`}
      style={{
        fontSize: `${fontSize}px`,
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default GameBox;

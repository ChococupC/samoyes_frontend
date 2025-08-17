import GameBox from "./GameBox";

function GridGameBox({ selectedBoxes, setSelectedBoxes, words, setBoxSize }) {
  const HandleBoxClick = (word) => {
    if (selectedBoxes[word]) {
      setSelectedBoxes((prevSelectedBoxes) => {
        const newSelectedBoxes = { ...prevSelectedBoxes };
        delete newSelectedBoxes[word];
        return newSelectedBoxes;
      });
    } else if (Object.keys(selectedBoxes).length < 4) {
      setSelectedBoxes({ ...selectedBoxes, [word]: { animation: null } });
    }
  };

  return (
    <>
      {words.map((word, index) => (
        <GameBox
          key={index}
          text={word}
          isSelected={selectedBoxes[word]}
          onClick={() => HandleBoxClick(word)}
          setBoxSize={setBoxSize}
        />
      ))}
    </>
  );
}

export default GridGameBox;

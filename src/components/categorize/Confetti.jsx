import style from "../../pages/categorize/categorize.module.css";
import { useState, useEffect } from "react";

export const Confetti = ({ win }) => {
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
    <div className={style.confetti_wrapper}>
      {confettiPieces.map(({ id, left, fallDuration, color }) => (
        <div
          key={id}
          className={style.confetti_piece}
          style={{
            left,
            "--fall-duration": fallDuration,
            "--confetti-color": color,
          }}
        />
      ))}
    </div>
  );
};

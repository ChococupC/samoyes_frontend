import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [onTop, setOnTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset === 0) {
        setOnTop(false);
      } else {
        setOnTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={onTop ? "border_bottom" : ""}>
      <Link to="/" className="logo">
        <img src={"/logo.png"} className="logo" />
        <p className="samoyes">
          Samo<span className="yes">Yes</span>
        </p>
      </Link>
    </header>
  );
}

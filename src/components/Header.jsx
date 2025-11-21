import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [onTop, setOnTop] = useState(window.pageYOffset > 0);

  useEffect(() => {
    const handleScroll = () => setOnTop(window.pageYOffset > 0);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header>
        <nav>
        <Link to="/" className="logo">
          <img src={"/logo.png"} className="logo" />
          <p className="samoyes">
            Samo<span className="yes">Yes</span>
          </p>
        </Link>
        </nav>
        <hr className={onTop ? "border_bottom" : ""}></hr>
      </header>
    </>
  );
}

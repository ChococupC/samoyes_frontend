import { Link } from "react-router-dom";

export const Button = ({ children, onClick, id, className, isDisabled }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      id={id}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export const Button_Link = ({
  children,
  onClick,
  to = "",
  id,
  className,
  isDisabled,
}) => {
  return (
    <Link to={to}>
      <button
        className={className}
        id={id}
        disabled={isDisabled}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
};

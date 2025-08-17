const Button = ({ children, onClick, id, className, isDisabled }) => {
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

export default Button;

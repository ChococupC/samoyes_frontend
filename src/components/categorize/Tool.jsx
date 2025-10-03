import style from "../../pages/categorize/categorize.module.css";

export const Tool = ({ children, onClick, tooltext }) => {
  return (
    <button className={style.tool} onClick={onClick}>
      {children}
      <span className={style.tooltext}>{tooltext}</span>
    </button>
  );
};

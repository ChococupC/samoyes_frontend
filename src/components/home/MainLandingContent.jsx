import style from "../../pages/home/home.module.css";

export function MainLandingContent({ contentClass, children }) {
  return (
    <div className={`${style.main_landing_content} ${contentClass}`}>
      {children}
    </div>
  );
}

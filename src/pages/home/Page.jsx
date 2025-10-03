import style from "./home.module.css";
import { Layout } from "../../components/Layout";
import { Button_Link } from "../../components/Button";
import { MainLandingContent } from "../../components/home/MainLandingContent";

export function Page() {
  return (
    <Layout className={style.body}>
      <div className={style.main_landing}>
        <img alt="yesidog" src="yesi.png"></img>
        <div className={style.title_wrapper}>
          <div className={style.title}>
            <h1>
              Samo<span className="yes">Yes</span>
            </h1>
            <h2>
              Study AP <span className="yes">Free</span> and{" "}
              <span className="yes">Fun</span>!
            </h2>
          </div>
          <Button_Link
            id="main_landing_button"
            to="categorize/"
            className={style.main_landing_button}
            isDisabled={false}
          >
            Start Now
          </Button_Link>
        </div>
      </div>
      <MainLandingContent contentClass={style.goal}>
        <div className={style.title}>
          <h1>Say More Yes</h1>
          <h4>
            Solidify your AP knowledge through daily game. We will{" "}
            <span className="gold">automatically</span> adjust to most recent
            course materials. So you can always say more yes to questions,
            grades, and schools.
          </h4>
        </div>
        <img alt="pawcoin" src="paw_coin.png" className={style.pawCoin}></img>
      </MainLandingContent>
      <MainLandingContent contentClass={style.categorize}>
        <img
          alt="categorize"
          src="categorize_title.png"
          className={style.categorize_img}
        ></img>
        <div className={style.title}>
          <div className={style.categorize_title}>
            <img
              alt="categorize_icon"
              src="categorize.jpg"
              className={style.categorize_icon}
            />
            <h1>Categorize</h1>
          </div>
          <h4>
            Challenge your ability to recognize{" "}
            <span className="white">AP Psychology</span> words and definitions
            with Categorize! We collected 131 categories over 5 units, so you
            can best eliminate the moment, "I've seen this word, but I don't
            know what it <span className="white">means</span>".
          </h4>
        </div>
      </MainLandingContent>
    </Layout>
  );
}

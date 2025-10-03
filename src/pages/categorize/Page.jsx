import { useState, useEffect } from "react";
import { Game } from "../../components/categorize/Game";
import { getCategories } from "../../tools/Connect";
import { Layout } from "../../components/Layout";
import style from "./categorize.module.css";

export function Page() {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await getCategories(
        "https://samoyes.onrender.com/samoyes_API/categorize/"
      );
      setResponse(res);
      setLoading(false); // hide loader
    }
    fetchData();
  }, []);

  // Handle loading
  if (loading) {
    return (
      <Layout className={style.body}>
        <div className={style.startingwrapper}>
          <div className={style.startanimation}>
            <div className={style.loader}></div>
          </div>
        </div>
      </Layout>
    );
  }

  // // Handle API error
  if (response.code !== 200) {
    return (
      <Layout className={style.body}>
        <div className={style.startingwrapper}>
          <div className={style.startanimation}>
            <img src="categorize.jpg" className={style.category_image} />
            <h1>Categorize</h1>
            <p>So sorry!</p>
            <h3>{response.message}</h3>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle Game
  return (
    <Layout className={style.body}>
      <Game res={response} isTutorial={false} />
    </Layout>
  );
}

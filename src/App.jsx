import { useState, useEffect } from "react";
import Header from "./components/Header";
import Game from "./Game";
import Footer from "./components/Footer";
import getCategories from "./tools/Connect";

function App() {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await getCategories();
      setResponse(res);
      setLoading(false); // hide loader
    }
    fetchData();
  }, []);

  // Handle loading
  if (loading) {
    return (
      <>
        <Header />
        <div className="startingwrapper">
          <div className="startanimation">
            <div className="loader"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Handle API error
  if (response.code !== 200) {
    return (
      <div className="startingwrapper">
        <div className="startanimation">
          <img src="categorize.jpg" className="category_image" />
          <h1>Categorize</h1>
          <p>So sorry!</p>
          <h3>{response.message}</h3>
        </div>
      </div>
    );
  }

  // Handle Game
  return (
    <>
      <div id="rotate-device-warning">
        <img src="rotate_device.png" />
      </div>
      <Header />
      <Game res={response} />
      <Footer />
    </>
  );
}

export default App;

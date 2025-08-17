import Header from "./components/Header";
import Game from "./Game";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div id="rotate-device-warning">
        <img src="rotate_device.png" />
      </div>
      <Header />
      <Game />
      <Footer />
    </>
  );
}

export default App;

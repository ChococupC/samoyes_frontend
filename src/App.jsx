import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page as CatePage } from "./pages/categorize/Page";
import { PageTutorial as CateTutorialPage } from "./pages/categorize/PageTutorial";
import { Page as HomePage } from "./pages/home/Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorize" element={<CatePage />} />
        <Route path="/categorize/tutorial" element={<CateTutorialPage />} />
      </Routes>
    </Router>
  );
}

export default App;

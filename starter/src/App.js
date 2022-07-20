import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

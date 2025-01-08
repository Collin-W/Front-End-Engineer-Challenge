import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@infinite-table/infinite-react/index.css";
import SearchPage from "./pages/SearchPage.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/repo-details/:repoId" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCampaign from "./campaigns/AddCampaign";
import EditCampaign from "./campaigns/EditCampaign";
import ViewCampaign from "./campaigns/ViewCampaign";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addCampaign" element={<AddCampaign />} />
          <Route exact path="/editCampaign/:id" element={<EditCampaign />} />
          <Route exact path="/viewCampaign/:id" element={<ViewCampaign />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

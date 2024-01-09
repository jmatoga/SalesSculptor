import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import AddCampaign from "./campaigns/AddCampaign";
import EditCampaign from "./campaigns/EditCampaign";
import ViewCampaign from "./campaigns/ViewCampaign";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("loggedIn"); // Check if the user is logged in to localStorage
    if (isLoggedIn) {
      setLoggedIn(true); // setting the logged in status based on data from localStorage
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {!loggedIn && <Route path="/" element={<Login />} />}
          {loggedIn && (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/campaigns" element={<Home />} />
              <Route path="/addCampaign" element={<AddCampaign />} />
              <Route path="/editCampaign/:id" element={<EditCampaign />} />
              <Route path="/viewCampaign/:id" element={<ViewCampaign />} />
            </>
          )}
          {!loggedIn && (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

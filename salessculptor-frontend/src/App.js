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
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("loggedIn") === "true"
  );

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.setItem("loggedIn", "false");
    sessionStorage.removeItem("loggedId");
  };

  return (
    <div className="App">
      <Router>
        {loggedIn && <Navbar />}
        <Routes>
          {!loggedIn && (
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
          )}
          {loggedIn && (
            <>
              <Route path="/" element={<Login handleLogin={handleLogin} />} />
              <Route
                path="/campaigns"
                element={<Home handleLogoutApp={handleLogout} />}
              />
              <Route
                path="/addCampaign"
                element={<AddCampaign handleLogoutApp={handleLogout} />}
              />
              <Route
                path="/editCampaign/:id"
                element={<EditCampaign handleLogoutApp={handleLogout} />}
              />
              <Route
                path="/viewCampaign/:id"
                element={<ViewCampaign handleLogoutApp={handleLogout} />}
              />
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

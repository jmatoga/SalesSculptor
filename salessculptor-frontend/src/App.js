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
    const isLoggedIn = sessionStorage.getItem("loggedIn"); // Sprawdzenie, czy użytkownik jest zalogowany w localStorage
    if (isLoggedIn) {
      setLoggedIn(true); // Ustawienie stanu loggedIn na podstawie danych z localStorage
    }
    // Tutaj możesz dodać logikę sprawdzającą stan zalogowania
    // np. sprawdzenie localStorage, sessionStorage itp.
    // i ustawienie stanu loggedIn na tej podstawie
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

  // return (
  //   <div className="App">
  //     <Router>
  //       <Navbar />
  //       <Routes>
  //         {!loggedIn ? (
  //           <Route path="/" element={<Navigate to="/" replace />} />
  //         ) : (
  //           <>
  //             <Route path="/campaigns" element={<Home />} />
  //             <Route path="/addCampaign" element={<AddCampaign />} />
  //             <Route path="/editCampaign/:id" element={<EditCampaign />} />
  //             <Route path="/viewCampaign/:id" element={<ViewCampaign />} />
  //           </>
  //         )}
  //       </Routes>
  //     </Router>
  //   </div>
  // );

  // const PrivateRoute = ({ element, path }) => {
  //   return loggedIn ? (
  //     <Route path={path} element={element} />
  //   ) : (
  //     <Navigate to="/" />
  //   );
  // };

  // return (
  //   <div className="App">
  //     <Router>
  //       <Navbar />
  //       <Routes>
  //         <Route exact path="/" element={<Login />} />
  //         {loggedIn ? (
  //           <>
  //             <Route path="/campaigns" element={<Home />} />
  //             <Route path="/addCampaign" element={<AddCampaign />} />
  //             <Route path="/editCampaign/:id" element={<EditCampaign />} />
  //             <Route path="/viewCampaign/:id" element={<ViewCampaign />} />
  //           </>
  //         ) : (
  //           <Navigate to="/" />
  //         )}
  //       </Routes>
  //     </Router>
  //   </div>
  // );
}

export default App;

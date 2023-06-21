import React from "react";
import ReactDOM from "react-dom/client";
import LoginAdmin from "./LoginAdmin.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Content from "./Dashboard/Content.jsx";
import Client from "./Dashboard/Client.jsx";
import "../comps/styling.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* CREDITS */
// Home BG: Image by <a href="https://www.freepik.com/free-vector/colorful-palm-silhouettes-background-design_8355292.htm?query=chill%20background%20cartoon#from_view=detail_alsolike">Freepik</a>
// Boat : <a href="https://www.freepik.com/free-vector/ships-icons-set_3886855.htm#page=2&query=ship%20cartoon&position=0&from_view=search&track=ais">Image by macrovector</a> on Freepik
ReactDOM.createRoot(document.getElementById("digitalNote")).render(
  <Router>
    <Routes>
      <Route path="/login" element={<LoginAdmin />} />
      <Route path="/dashboard/home" element={<Dashboard />} />
      <Route path="/dashboard/overview" element={<Dashboard />} />
      <Route path="/dashboard/client" element={<Dashboard />} />
      <Route path="/dashboard/private" element={<Dashboard />} />
    </Routes>
  </Router>
);

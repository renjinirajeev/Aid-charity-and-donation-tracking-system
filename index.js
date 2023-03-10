import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { MetamaskStateProvider } from "use-metamask";

import App from "./App";
import "./index.css"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MetamaskStateProvider>
  <Router>
    <App />
  </Router>
  </MetamaskStateProvider>
);

import React, {
  useState, useEffect, useRef,
  useContext, createContext, Suspense, lazy
} from "react";
import {
  BrowserRouter as Router, Routes, Route,
  Outlet, Link, useParams,
  Navigate, useNavigate, useLocation
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<Router>
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
</Router>
)


import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import AuthPage from "./AuthPage";
import PredictorPage from "./PredictorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing user={null} />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/app" element={<PredictorPage />} />
    </Routes>
  );
}

export default App;

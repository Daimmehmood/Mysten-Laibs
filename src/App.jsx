import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import VotePage from "./Pages/VotePage";
import AgentPage from "./Pages/AgentPage";
import CreateProposal from "./Pages/CreateProposal";
import { Toaster } from "react-hot-toast";
import { ConnectButton } from "@suiet/wallet-kit";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/vote" element={<VotePage />} exact />
        <Route path="/create" element={<CreateProposal />} exact />
        <Route path="/agent" element={<AgentPage />} exact />
        <Route path="/test" element={
          <div style={{ padding: '20px' }}>
            <h1>Test Page</h1>
            <ConnectButton />
          </div>
        } exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

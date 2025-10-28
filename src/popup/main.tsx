import React from 'react';
import { createRoot } from 'react-dom/client';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

const App: React.FC = () => (
    <Container>
        <h2>Placeholder</h2>
    </Container>
);

createRoot(document.getElementById('root')!).render(<App />);

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("openSidebar");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) throw new Error("No active tab");

      await chrome.sidePanel.setOptions({ tabId: tab.id, enabled: true, path: "src/sidePanel/index.html" });
      await chrome.sidePanel.open({ tabId: tab.id });
      console.log("Side panel opened");
    } catch (e) {
      console.error("Failed to open side panel:", e);
    }
  });
});
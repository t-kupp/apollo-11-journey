import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GSAPProvider from "./providers/GSAPProvider.tsx";

gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GSAPProvider>
      <App />
    </GSAPProvider>
  </StrictMode>
);

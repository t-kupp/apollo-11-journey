import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useState } from "react";
import SaturnVDiagram from "./components/SaturnVDiagram/SaturnVDiagram";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [masterTl, setMasterTl] = useState<GSAPTimeline | null>(null);

  useGSAP(() => {
    console.log("Creating masterTl");
    const tl = gsap.timeline();
    setMasterTl(tl);
  });

  return (
    <main className="h-[100dvh] w-screen">
      <SaturnVDiagram masterTl={masterTl} />
    </main>
  );
}

export default App;

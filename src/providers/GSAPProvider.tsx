import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, type ReactNode } from "react";
import { GSAPContext } from "../context/GSAPContext";

interface GSAPProviderProps {
  children: ReactNode;
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  const masterTlRef = useRef<GSAPTimeline | null>(null);

  const [isReady, setIsReady] = useState(false);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ paused: true });
    masterTlRef.current = tl;
    setIsReady(true); // Timeline is ready

    return () => {
      tl.kill();
      ScrollTrigger.killAll();
      setIsReady(false);
    };
  }, []);

  return (
    <GSAPContext.Provider value={{ masterTl: masterTlRef.current, isReady }}>
      {children}
    </GSAPContext.Provider>
  );
}

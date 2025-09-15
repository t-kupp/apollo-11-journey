import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAPContext } from "../../context/GSAPContext";
import SaturnVModel from "./SaturnVModel";

export default function SaturnVDiagram() {
  const timelineRef = useRef<GSAPTimeline | null>(null);

  const { masterTl } = useGSAPContext();

  useGSAP(() => {
    const saturnVDiagramTimeline = gsap.timeline();
    timelineRef.current = saturnVDiagramTimeline;
    masterTl?.add(saturnVDiagramTimeline);
  });

  return (
    <section className="h-full w-full">
      <SaturnVModel className="" timelineRef={timelineRef} />
    </section>
  );
}

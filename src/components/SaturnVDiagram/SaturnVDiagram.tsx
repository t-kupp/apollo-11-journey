import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import SaturnInfoText from "./SaturnInfoText";
import SaturnVModel from "./SaturnVModel";

interface SaturnVDiagramProps {
  masterTl: GSAPTimeline | null;
}

export default function SaturnVDiagram({ masterTl }: SaturnVDiagramProps) {
  const [saturnVTimeline, setSaturnVTimeline] = useState<GSAPTimeline | null>(null);

  useGSAP(() => {
    if (!masterTl) return;
    console.log("Creating saturnVDiagramTimeline");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".diagram-section",
        start: "top top",
        end: "+=2000",
        scrub: true,
        pin: true,
      },
    });
    tl.addLabel("diagram-start");
    setSaturnVTimeline(tl);
    masterTl.add(tl);
  }, [masterTl]);

  return (
    <section className="diagram-section flex h-full w-full bg-neutral-900">
      <SaturnVModel className="w-1/2" saturnVTimeline={saturnVTimeline} />
      <SaturnInfoText className="w-1/2" saturnVTimeline={saturnVTimeline} />
    </section>
  );
}

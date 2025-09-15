import { useGSAP } from "@gsap/react";

interface SaturnInfoTextProps {
  saturnVTimeline: GSAPTimeline | null;
  className?: string;
}

const SATURN_V_DESCRIPTION_TEXT = [
  { title: "Apollo Spacecraft", desc: "The Lunar Module" },
  { title: "Instrument Unit", desc: "Weighs about 4,100 pounds" },
  { title: "Third Stage", desc: "One J-2 engine: 200,000 pounds thrust" },
  { title: "Second Stage", desc: "Five J-2 engines: 1,000,000 pounds thrust" },
  { title: "First Stage", desc: "Five F-1 engines: 7,500,000 pounds thrust" },
];

export default function SaturnInfoText({ saturnVTimeline, className }: SaturnInfoTextProps) {
  useGSAP(() => {
    if (!saturnVTimeline) return;
    console.log("Adding text tl");
    saturnVTimeline.from(".title-0", { yPercent: 100 }, "diagram-start");
  }, [saturnVTimeline]);

  return (
    <div className={className + " flex h-full flex-col justify-between py-16"}>
      {SATURN_V_DESCRIPTION_TEXT.map((text, i) => (
        <div key={i} className={`container`}>
          <p className={`title-${i} text-lg font-bold text-neutral-200 uppercase`}>{text.title}</p>
          <p className={`desc-${i} text-neutral-400`}>{text.desc}</p>
        </div>
      ))}
    </div>
  );
}

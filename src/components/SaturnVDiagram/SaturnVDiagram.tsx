import { useGSAPContext } from "../../context/GSAPContext";
import SaturnVModel from "./SaturnVModel";

export default function SaturnVDiagram() {
  const { masterTl } = useGSAPContext();

  return (
    <section className="h-full w-full">
      <SaturnVModel className="" masterTl={masterTl} />
    </section>
  );
}

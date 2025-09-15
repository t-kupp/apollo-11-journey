import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import * as THREE from "three";

function ModelWithScaling({ saturnVTimeline }: { saturnVTimeline: GSAPTimeline | null }) {
  const { scene } = useGLTF("/models/saturnV.glb", true);
  const nodeRef = useRef<THREE.Group | null>(null);

  const modelRef = useCallback((node: THREE.Group | null) => {
    if (!node) return;

    // Store the node in a ref
    nodeRef.current = node;

    // Calculate bounding box and center model
    const box = new THREE.Box3().setFromObject(node);
    const center = box.getCenter(new THREE.Vector3());
    node.position.sub(center);
  }, []);

  useGSAP(() => {
    if (!nodeRef.current) return;

    console.log("Adding rotation animation");
    saturnVTimeline?.to(
      nodeRef.current.rotation,
      {
        y: Math.PI * 2,
        ease: "none",
      },
      "diagram-start"
    );
  }, [saturnVTimeline]);

  return <primitive scale={0.06} ref={modelRef} object={scene} />;
}

export default function SaturnVModel({
  saturnVTimeline,
  className,
}: {
  saturnVTimeline: GSAPTimeline | null;
  className?: string;
}) {
  return (
    <div className={className + " model-section h-full"}>
      {/* Wrapper div */}
      <Canvas className="h-full w-full">
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.75} />
        <ModelWithScaling saturnVTimeline={saturnVTimeline} />
      </Canvas>
    </div>
  );
}

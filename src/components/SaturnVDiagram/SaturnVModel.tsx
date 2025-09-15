import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useCallback, useRef } from "react";
import * as THREE from "three";

function ModelWithScaling({
  timelineRef,
}: {
  timelineRef: React.RefObject<gsap.core.Timeline | null>;
}) {
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

    // Setup GSAP animation with pin
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".model-section",
        start: "top top",
        end: "2000",
        scrub: true,
        pin: true,
      },
    });

    tl.to(nodeRef.current.rotation, {
      y: Math.PI * 2,
      ease: "none",
    });

    timelineRef.current?.add(tl);
  }, []);

  return <primitive scale={0.06} ref={modelRef} object={scene} />;
}

export default function SaturnVModel({
  timelineRef,
  className,
}: {
  timelineRef: React.RefObject<gsap.core.Timeline | null>;
  className?: string;
}) {
  return (
    <div className={className + " model-section h-full"}>
      {/* Wrapper div */}
      <Canvas className="h-full w-full">
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.75} />
        <ModelWithScaling timelineRef={timelineRef} />
      </Canvas>
    </div>
  );
}

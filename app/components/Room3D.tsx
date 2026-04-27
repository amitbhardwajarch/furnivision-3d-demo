"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Text } from "@react-three/drei";
import { useState } from "react";

type Room3DProps = {
  onAddToCart?: () => void;
};

function Sofa({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <group position={[-1.6, 0.55, 0.4]} onClick={onClick}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.6, 0.55, 0.85]} />
        <meshStandardMaterial color={selected ? "#d6b37a" : "#d9c1a0"} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.85, 0.42]}>
        <boxGeometry args={[2.6, 0.85, 0.22]} />
        <meshStandardMaterial color="#cfae82" roughness={0.5} />
      </mesh>
      <mesh position={[-1.05, 0.82, -0.05]}>
        <boxGeometry args={[0.45, 0.45, 0.55]} />
        <meshStandardMaterial color="#f0e2ce" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.82, -0.05]}>
        <boxGeometry args={[0.45, 0.45, 0.55]} />
        <meshStandardMaterial color="#f0e2ce" roughness={0.6} />
      </mesh>
      <mesh position={[1.05, 0.82, -0.05]}>
        <boxGeometry args={[0.45, 0.45, 0.55]} />
        <meshStandardMaterial color="#f0e2ce" roughness={0.6} />
      </mesh>
    </group>
  );
}

function CoffeeTable({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <group position={[-1.45, 0.35, -1.05]} onClick={onClick}>
      <mesh>
        <cylinderGeometry args={[0.78, 0.78, 0.18, 48]} />
        <meshStandardMaterial color={selected ? "#d6b37a" : "#5b341f"} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.6, 24]} />
        <meshStandardMaterial color="#2a1b13" />
      </mesh>
    </group>
  );
}

function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.45, 0.015, -1.05]}>
      <circleGeometry args={[1.45, 64]} />
      <meshStandardMaterial color="#efe6d4" roughness={0.9} />
    </mesh>
  );
}

function TvConsole({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <group position={[1.55, 0.45, 0.55]} rotation={[0, -0.35, 0]} onClick={onClick}>
      <mesh>
        <boxGeometry args={[2.1, 0.45, 0.45]} />
        <meshStandardMaterial color={selected ? "#d6b37a" : "#51331f"} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.75, -0.06]}>
        <boxGeometry args={[1.7, 0.75, 0.08]} />
        <meshStandardMaterial color="#121212" roughness={0.2} />
      </mesh>
    </group>
  );
}

function FloorLamp({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <group position={[1.95, 0.8, -1.25]} onClick={onClick}>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.45, 24]} />
        <meshStandardMaterial color="#2a211b" />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshStandardMaterial
          color={selected ? "#ffffff" : "#d6b37a"}
          emissive="#d6b37a"
          emissiveIntensity={selected ? 1.2 : 0.65}
        />
      </mesh>
      <pointLight position={[0, 0.72, 0]} intensity={1.8} distance={4} color="#ffd898" />
      <mesh position={[0, -0.98, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.06, 32]} />
        <meshStandardMaterial color="#2a211b" />
      </mesh>
    </group>
  );
}

function AccentChair({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <group position={[-3.0, 0.55, -1.0]} rotation={[0, 0.45, 0]} onClick={onClick}>
      <mesh>
        <boxGeometry args={[0.85, 0.5, 0.85]} />
        <meshStandardMaterial color={selected ? "#d6b37a" : "#c5966e"} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.55, 0.35]}>
        <boxGeometry args={[0.85, 0.8, 0.18]} />
        <meshStandardMaterial color="#e5ceb3" roughness={0.6} />
      </mesh>
    </group>
  );
}

function RoomScene() {
  const [selected, setSelected] = useState("sofa");

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <spotLight position={[-3, 5, -2]} angle={0.5} penumbra={0.6} intensity={1.2} color="#ffdca3" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial color="#b99263" roughness={0.85} />
      </mesh>

      <gridHelper args={[7, 14, "#7b5838", "#d2ad7b"]} position={[0, 0.02, 0]} />

      <mesh position={[0, 1.5, 2.5]}>
        <boxGeometry args={[7, 3, 0.08]} />
        <meshStandardMaterial color="#d8c8b6" roughness={0.75} />
      </mesh>

      <mesh position={[-3.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5, 3, 0.08]} />
        <meshStandardMaterial color="#cdb79d" roughness={0.75} />
      </mesh>

      <Rug />
      <Sofa selected={selected === "sofa"} onClick={() => setSelected("sofa")} />
      <CoffeeTable selected={selected === "table"} onClick={() => setSelected("table")} />
      <TvConsole selected={selected === "tv"} onClick={() => setSelected("tv")} />
      <FloorLamp selected={selected === "lamp"} onClick={() => setSelected("lamp")} />
      <AccentChair selected={selected === "chair"} onClick={() => setSelected("chair")} />

      <Text position={[0, 2.75, 2.42]} fontSize={0.22} color="#5b341f" anchorX="center">
        FurniVision 3D Room Simulation
      </Text>

      <ContactShadows position={[0, 0.04, 0]} opacity={0.45} scale={7} blur={2.5} far={3} />

      <OrbitControls enablePan enableZoom enableRotate maxPolarAngle={Math.PI / 2.05} />
    </>
  );
}

export default function Room3D({ onAddToCart }: Room3DProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#d6b37a]/30 bg-[#171412] shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-xs font-bold text-[#d6b37a]">Real 3D Preview</p>
          <h3 className="text-xl font-black text-white">Interactive 3D Room Viewer</h3>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-white/70">
          <span className="rounded-full bg-white/10 px-3 py-2">Drag to rotate</span>
          <span className="rounded-full bg-white/10 px-3 py-2">Scroll to zoom</span>
          <span className="rounded-full bg-white/10 px-3 py-2">Click furniture</span>
        </div>
      </div>

      <div className="h-[560px] w-full">
        <Canvas camera={{ position: [4.8, 3.2, 5.2], fov: 45 }} shadows>
          <RoomScene />
        </Canvas>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#d6b37a]/10 px-5 py-4">
        <div>
          <p className="text-xs text-white/55">3D Room Package</p>
          <p className="text-2xl font-black text-[#d6b37a]">₹4,72,000</p>
        </div>
        <button
          onClick={onAddToCart}
          className="rounded-2xl bg-[#d6b37a] px-6 py-3 font-black text-[#15110e]"
        >
          Add 3D Room Package to Cart
        </button>
      </div>
    </div>
  );
}
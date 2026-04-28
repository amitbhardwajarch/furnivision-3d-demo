"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Html,
  Grid,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import {
  BedDouble,
  ShoppingCart,
  RotateCcw,
  Home,
  Ruler,
  Save,
  Cuboid,
  Maximize2,
  Table2,
} from "lucide-react";

function Button({ children, className = "", ...props }: any) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }: any) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }: any) {
  return <div className={className}>{children}</div>;
}

const products = [
  {
    id: "bed",
    name: "Modern Bed",
    category: "Bedroom",
    price: 89999,
    icon: BedDouble,
    dimensions: "King size bed",
    modelPath: "/models/bed.glb",
  },
  {
    id: "modern-table",
    name: "Modern Table",
    category: "Living Room / Dining",
    price: 34999,
    icon: Table2,
    dimensions: "Modern table",
    modelPath: "/models/modern_table.glb",
  },
  {
    id: "office-table",
    name: "Office Table",
    category: "Home Office",
    price: 44999,
    icon: Table2,
    dimensions: "Office workstation table",
    modelPath: "/models/office_table.glb",
  },
];

const rooms = [
  {
    id: "living",
    name: "Living Room",
    wall: "#ede7df",
    floor: "#b99b7d",
    width: 8,
    depth: 6,
    hint: "For tables, sofas, recliners and TV units.",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    wall: "#e8edf2",
    floor: "#a88f78",
    width: 7,
    depth: 6,
    hint: "For beds, wardrobes, side tables and dressing units.",
  },
  {
    id: "office",
    name: "Home Office",
    wall: "#eef0ea",
    floor: "#9d8c78",
    width: 6,
    depth: 5,
    hint: "For office tables, chairs, shelves and workstations.",
  },
];

function Currency({ value }: { value: number }) {
  return <span>₹{value.toLocaleString("en-IN")}</span>;
}

function RoomShell({ room }: any) {
  return (
    <group>
      <mesh position={[0, -0.03, 0]} receiveShadow>
        <boxGeometry args={[room.width, 0.06, room.depth]} />
        <meshStandardMaterial color={room.floor} roughness={0.8} />
      </mesh>

      <mesh position={[0, 1.5, -room.depth / 2]} receiveShadow>
        <boxGeometry args={[room.width, 3, 0.08]} />
        <meshStandardMaterial color={room.wall} roughness={0.75} />
      </mesh>

      <mesh position={[-room.width / 2, 1.5, 0]} receiveShadow>
        <boxGeometry args={[0.08, 3, room.depth]} />
        <meshStandardMaterial color={room.wall} roughness={0.75} />
      </mesh>

      <Grid
        args={[room.width, room.depth]}
        cellSize={0.5}
        cellThickness={0.4}
        sectionSize={1}
        sectionThickness={0.8}
        fadeDistance={18}
        fadeStrength={1}
        position={[0, 0.01, 0]}
      />
    </group>
  );
}

function GLBModel({ product, position, rotation }: any) {
  const { scene } = useGLTF(product.modelPath);
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxDimension = Math.max(size.x, size.y, size.z);
    const targetSize = 2.2;
    const scale = targetSize / maxDimension;

    model.scale.setScalar(scale);
    model.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale
    );

    model.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model]);

  return (
    <group position={[position[0], 0, position[2]]} rotation={[0, rotation, 0]}>
      <primitive object={model} />

      <Html position={[0, 2.4, 0]} center>
        <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-sm">
          {product.name}
        </div>
      </Html>
    </group>
  );
}

function Scene({ room, product, position, rotation }: any) {
  return (
    <Canvas shadows camera={{ position: [5, 3.5, 5], fov: 50 }}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 7, 5]} intensity={1.6} castShadow />

      <Suspense fallback={null}>
        <RoomShell room={room} />
        <GLBModel product={product} position={position} rotation={rotation} />
        <ContactShadows
          opacity={0.35}
          scale={9}
          blur={2.8}
          far={3}
          position={[0, 0.02, 0]}
        />
        <Environment preset="apartment" />
      </Suspense>

      <OrbitControls
        target={[0, 1, 0]}
        enablePan
        enableZoom
        minDistance={2}
        maxDistance={12}
      />
    </Canvas>
  );
}

export default function FurnitureSimulationPlatform() {
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[1].id);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState(0);
  const [cart, setCart] = useState<any[]>([]);

  const selectedProduct: any = useMemo(
    () => products.find((p) => p.id === selectedProductId),
    [selectedProductId]
  );

  const selectedRoom: any = useMemo(
    () => rooms.find((r) => r.id === selectedRoomId),
    [selectedRoomId]
  );

  function chooseProduct(product: any) {
    setSelectedProductId(product.id);
    setPosition([0, 0, 0]);
    setRotation(0);
  }

  function move(axis: 0 | 2, delta: number) {
    setPosition((prev) => {
      const next: [number, number, number] = [...prev];
      next[axis] = Math.max(
        -3,
        Math.min(3, Number((next[axis] + delta).toFixed(2)))
      );
      return next;
    });
  }

  function addToCart() {
    setCart((prev) => [
      ...prev,
      {
        id: `${selectedProduct.id}-${Date.now()}`,
        product: selectedProduct.name,
        room: selectedRoom.name,
        position,
        rotation,
        price: selectedProduct.price,
      },
    ]);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-white/10 bg-neutral-950 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-amber-300">
              <Cuboid className="h-4 w-4" />
              3D Furniture Simulation Platform
            </div>
            <h1 className="mt-1 text-2xl font-semibold md:text-3xl">
              Visualize real furniture models inside different room layouts
            </h1>
          </div>

          <Button
            className="bg-amber-400 text-neutral-950 hover:bg-amber-300"
            onClick={addToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add Design
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-6 py-6 lg:grid-cols-[300px_1fr_330px]">
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <Card className="rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-2xl">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <Table2 className="h-5 w-5 text-amber-300" />
                Furniture Catalog
              </div>

              <div className="space-y-3">
                {products.map((product) => {
                  const Icon = product.icon;
                  const active = selectedProduct.id === product.id;

                  return (
                    <button
                      key={product.id}
                      onClick={() => chooseProduct(product)}
                      className={`w-full rounded-2xl border p-3 text-left transition ${
                        active
                          ? "border-amber-300 bg-amber-300/15"
                          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-white/10 p-2">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-neutral-400">
                            {product.category}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-amber-200">
                        <Currency value={product.price} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-2xl">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <Home className="h-5 w-5 text-amber-300" />
                Room Templates
              </div>

              <div className="space-y-2">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`w-full rounded-2xl border p-3 text-left text-sm transition ${
                      selectedRoom.id === room.id
                        ? "border-amber-300 bg-amber-300/15"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="font-medium">{room.name}</div>
                    <div className="mt-1 text-xs text-neutral-400">
                      {room.hint}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.aside>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div>
              <div className="text-sm text-neutral-400">
                Interactive 3D simulation
              </div>
              <div className="font-semibold">
                {selectedProduct.name} in {selectedRoom.name}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="bg-white/10 text-white hover:bg-white/20"
                onClick={() => setRotation((r) => r + Math.PI / 8)}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Rotate
              </Button>

              <Button className="bg-white/10 text-white hover:bg-white/20">
                <Maximize2 className="mr-2 h-4 w-4" />
                AR Preview
              </Button>
            </div>
          </div>

          <div className="h-[620px] w-full">
            <Scene
              room={selectedRoom}
              product={selectedProduct}
              position={position}
              rotation={rotation}
            />
          </div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <Card className="rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-2xl">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <Ruler className="h-5 w-5 text-amber-300" />
                Product Details
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-3">
                <div className="text-sm text-neutral-400">Selected item</div>
                <div className="mt-1 font-semibold">{selectedProduct.name}</div>
                <div className="mt-1 text-sm text-neutral-300">
                  Dimensions: {selectedProduct.dimensions}
                </div>
                <div className="mt-1 text-sm text-neutral-300">
                  Model: {selectedProduct.modelPath}
                </div>
                <div className="mt-1 text-amber-200">
                  <Currency value={selectedProduct.price} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-2xl">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <Ruler className="h-5 w-5 text-amber-300" />
                Placement Controls
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div />
                <Button
                  className="bg-white/10 text-white hover:bg-white/20"
                  onClick={() => move(2, -0.25)}
                >
                  Forward
                </Button>
                <div />

                <Button
                  className="bg-white/10 text-white hover:bg-white/20"
                  onClick={() => move(0, -0.25)}
                >
                  Left
                </Button>
                <Button
                  className="bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setPosition([0, 0, 0])}
                >
                  Reset
                </Button>
                <Button
                  className="bg-white/10 text-white hover:bg-white/20"
                  onClick={() => move(0, 0.25)}
                >
                  Right
                </Button>

                <div />
                <Button
                  className="bg-white/10 text-white hover:bg-white/20"
                  onClick={() => move(2, 0.25)}
                >
                  Back
                </Button>
                <div />
              </div>

              <div className="mt-3 rounded-2xl bg-white/[0.04] p-3 text-xs text-neutral-300">
                Position X: {position[0].toFixed(2)}m · Z:{" "}
                {position[2].toFixed(2)}m · Rotation:{" "}
                {Math.round((rotation * 180) / Math.PI)}°
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-2xl">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <Save className="h-5 w-5 text-amber-300" />
                Design Cart
              </div>

              {cart.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 p-4 text-sm text-neutral-400">
                  No saved designs yet. Add a configured product-room simulation.
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.slice(-3).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white/[0.04] p-3 text-sm"
                    >
                      <div className="font-medium">{item.product}</div>
                      <div className="text-neutral-400">{item.room}</div>
                      <div className="mt-1 text-amber-200">
                        <Currency value={item.price} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                className="mt-4 w-full bg-amber-400 text-neutral-950 hover:bg-amber-300"
                onClick={addToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Save & Add To Cart
              </Button>
            </CardContent>
          </Card>
        </motion.aside>
      </main>
    </div>
  );
}

// Disabled for Azure runtime stability.
// Models will load only when selected in the 3D viewer.

// useGLTF.preload("/models/bed.glb");
// useGLTF.preload("/models/modern_table.glb");
// useGLTF.preload("/models/office_table.glb");
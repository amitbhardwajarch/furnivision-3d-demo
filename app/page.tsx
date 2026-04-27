"use client";

import { useMemo, useState } from "react";

type FurnitureItem = {
  id: string;
  name: string;
  shortName: string;
  price: number;
  priceLabel: string;
  type: "sofa" | "table" | "rug" | "lamp" | "tv" | "chair" | "bed";
  image?: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

const library = [
  {
    name: "Signature Cloud Sofa",
    shortName: "Sofa",
    price: 185000,
    priceLabel: "₹1,85,000",
    type: "sofa" as const,
    image: "/products/sofa.jpg",
  },
  {
    name: "Siena Coffee Table",
    shortName: "Table",
    price: 68000,
    priceLabel: "₹68,000",
    type: "table" as const,
    image: "",
  },
  {
    name: "Handwoven Rug",
    shortName: "Rug",
    price: 15000,
    priceLabel: "₹15,000",
    type: "rug" as const,
    image: "",
  },
  {
    name: "Aurelia Floor Lamp",
    shortName: "Lamp",
    price: 42000,
    priceLabel: "₹42,000",
    type: "lamp" as const,
    image: "",
  },
  {
    name: "Modular TV Console",
    shortName: "TV Unit",
    price: 88000,
    priceLabel: "₹88,000",
    type: "tv" as const,
    image: "",
  },
  {
    name: "Velvet Accent Chair",
    shortName: "Chair",
    price: 74000,
    priceLabel: "₹74,000",
    type: "chair" as const,
    image: "/products/accent-chair.jpg",
  },
  {
    name: "Royale King Bed",
    shortName: "Bed",
    price: 285000,
    priceLabel: "₹2,85,000",
    type: "bed" as const,
    image: "",
  },
];

const catalog = [
  ["Signature Cloud Sofa", "₹1,85,000", "Beige boucle fabric", "8ft x 3.2ft", "Living"],
  ["Imperial Walnut Dining Table", "₹2,40,000", "Solid walnut", "8-seater", "Dining"],
  ["Milano Recliner", "₹92,000", "Italian leather", "3.5ft x 3ft", "Lounge"],
  ["Royale King Bed", "₹2,85,000", "Luxury upholstered frame", "King size", "Bedroom"],
  ["Arcadia Wardrobe", "₹1,75,000", "Walnut veneer", "9ft x 7ft", "Storage"],
  ["Executive Office Chair", "₹58,000", "Leather ergonomic", "Adjustable", "Office"],
];

function rupee(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [items, setItems] = useState<FurnitureItem[]>([
    {
      id: "demo-sofa",
      name: "Signature Cloud Sofa",
      shortName: "Sofa",
      price: 185000,
      priceLabel: "₹1,85,000",
      type: "sofa",
      x: 45,
      y: 58,
      rotate: 0,
      scale: 1,
    },
    {
      id: "demo-table",
      name: "Siena Coffee Table",
      shortName: "Table",
      price: 68000,
      priceLabel: "₹68,000",
      type: "table",
      x: 50,
      y: 74,
      rotate: 0,
      scale: 1,
    },
    {
      id: "demo-rug",
      name: "Handwoven Rug",
      shortName: "Rug",
      price: 15000,
      priceLabel: "₹15,000",
      type: "rug",
      x: 50,
      y: 80,
      rotate: 0,
      scale: 1,
    },
  ]);

  const [selectedId, setSelectedId] = useState("demo-sofa");
  const [cart, setCart] = useState(0);
  const [fabric, setFabric] = useState("Champagne Beige");
  const [roomPreset, setRoomPreset] = useState("Living Room");

  const selected = items.find((item) => item.id === selectedId);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const cartLabel = useMemo(() => (cart > 0 ? `Cart (${cart})` : "Cart"), [cart]);

 function placeItem(product: (typeof library)[number]) {
  const newItem: FurnitureItem = {
    id: `${product.type}-${Date.now()}`,
    name: product.name,
    shortName: product.shortName,
    price: product.price,
    priceLabel: product.priceLabel,
    type: product.type,
    image: product.image,
    x: 38 + Math.random() * 24,
    y: 48 + Math.random() * 28,
    rotate: 0,
    scale: 1,
  };

  setItems((current) => [...current, newItem]);
  setSelectedId(newItem.id);
}

  function updateSelected(update: Partial<FurnitureItem>) {
    if (!selected) return;
    setItems((current) =>
      current.map((item) => (item.id === selected.id ? { ...item, ...update } : item))
    );
  }

  function moveSelected(dx: number, dy: number) {
    if (!selected) return;
    updateSelected({
      x: Math.min(92, Math.max(8, selected.x + dx)),
      y: Math.min(92, Math.max(18, selected.y + dy)),
    });
  }

  function removeSelected() {
    if (!selected) return;
    setItems((current) => current.filter((item) => item.id !== selected.id));
    setSelectedId(items[0]?.id || "");
  }

  function applyAiDesign() {
    const design: FurnitureItem[] = [
      {
        id: "ai-sofa",
        name: "Signature Cloud Sofa",
        shortName: "Sofa",
        price: 185000,
        priceLabel: "₹1,85,000",
        type: "sofa",
        x: 44,
        y: 58,
        rotate: 0,
        scale: 1,
      },
      {
        id: "ai-table",
        name: "Siena Coffee Table",
        shortName: "Table",
        price: 68000,
        priceLabel: "₹68,000",
        type: "table",
        x: 50,
        y: 74,
        rotate: 0,
        scale: 1,
      },
      {
        id: "ai-rug",
        name: "Handwoven Rug",
        shortName: "Rug",
        price: 15000,
        priceLabel: "₹15,000",
        type: "rug",
        x: 50,
        y: 82,
        rotate: 0,
        scale: 1.1,
      },
      {
        id: "ai-lamp",
        name: "Aurelia Floor Lamp",
        shortName: "Lamp",
        price: 42000,
        priceLabel: "₹42,000",
        type: "lamp",
        x: 80,
        y: 48,
        rotate: 0,
        scale: 1,
      },
      {
        id: "ai-tv",
        name: "Modular TV Console",
        shortName: "TV Unit",
        price: 88000,
        priceLabel: "₹88,000",
        type: "tv",
        x: 50,
        y: 33,
        rotate: 0,
        scale: 1,
      },
      {
        id: "ai-chair",
        name: "Velvet Accent Chair",
        shortName: "Chair",
        price: 74000,
        priceLabel: "₹74,000",
        type: "chair",
        x: 24,
        y: 66,
        rotate: -12,
        scale: 1,
      },
    ];

    setItems(design);
    setSelectedId("ai-sofa");
  }

  return (
    <main className="min-h-screen bg-[#11100f] text-[#f8f1e7]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#11100f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-black tracking-tight text-[#d6b37a]">
            FurniVision <span className="block text-xl text-white">3D</span>
          </div>

          <nav className="hidden gap-8 text-sm font-semibold text-white/80 md:flex">
            <a href="#collection">Collection</a>
            <a href="#simulator">3D Simulator</a>
            <a href="#ai">AI Designer</a>
            <a href="#architecture">Enterprise</a>
            <button className="text-[#d6b37a]">{cartLabel}</button>
          </nav>
        </div>
      </header>

      <section id="simulator" className="relative overflow-hidden px-6 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(214,179,122,.22),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(126,83,42,.25),transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[#d6b37a]/40 bg-[#d6b37a]/10 px-4 py-2 text-sm font-semibold text-[#d6b37a]">
                Luxury AI-Powered 3D Furniture Commerce
              </p>
              <h1 className="text-5xl font-black leading-tight md:text-7xl">
                Luxury Furniture.
                <span className="block text-[#d6b37a]">Placed Inside Your Room.</span>
              </h1>
            </div>

            <p className="text-lg leading-8 text-white/70">
              Interactive customer demo: select furniture, place it into the room, move,
              rotate, resize, remove, apply AI design, and add the complete room to cart.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#1a1714]/95 p-4 shadow-2xl shadow-black/40">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-black/25 px-4 py-3 text-xs font-semibold text-white/75">
              {["Living Room", "Bedroom", "Dining", "Office"].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setRoomPreset(preset)}
                  className={`rounded-full px-3 py-2 ${
                    roomPreset === preset ? "bg-[#d6b37a] text-[#15110e]" : "bg-transparent"
                  }`}
                >
                  {preset}
                </button>
              ))}
              <span className="text-[#d6b37a]">Camera 3D</span>
              <span>Top View</span>
              <span>Save Design</span>
              <span>Share Proposal</span>
            </div>

            <div className="grid gap-4 lg:grid-cols-[230px_1fr_260px]">
              <aside className="rounded-2xl border border-white/10 bg-white/[.05] p-4">
                <h3 className="mb-1 text-sm font-bold text-[#d6b37a]">Furniture Library</h3>
                <p className="mb-4 text-xs text-white/45">Click any item to place it in the room.</p>

                <div className="space-y-3">
                  {library.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => placeItem(product)}
                      className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-left transition hover:border-[#d6b37a]/60 hover:bg-[#d6b37a]/10"
                    >
                      <div className="text-xs font-bold">{product.name}</div>
                      <div className="mt-1 text-xs text-[#d6b37a]">{product.priceLabel}</div>
                      <div className="mt-2 text-[10px] text-white/35">Click to place</div>
                    </button>
                  ))}
                </div>
              </aside>

              <section className="relative min-h-[620px] overflow-hidden rounded-3xl border border-[#d6b37a]/20 bg-[#e8dfd1]">
                <div className="absolute left-5 top-5 z-20 rounded-2xl bg-[#11100f]/80 px-4 py-3 text-sm font-bold text-[#d6b37a] backdrop-blur">
                  {roomPreset} Simulation Canvas
                </div>

                <div className="absolute inset-x-0 top-0 h-[43%] bg-gradient-to-b from-[#d8c8b6] to-[#efe7dc]" />
                <div className="absolute left-0 top-0 h-full w-[22%] bg-gradient-to-r from-[#cdb79d] to-transparent opacity-70" />
                <div className="absolute right-0 top-0 h-full w-[22%] bg-gradient-to-l from-[#cdb79d] to-transparent opacity-70" />

                <div className="absolute bottom-0 h-[60%] w-full origin-bottom bg-[linear-gradient(90deg,rgba(91,58,34,.18)_1px,transparent_1px),linear-gradient(rgba(91,58,34,.18)_1px,transparent_1px)] bg-[size:42px_42px] bg-[#b99263] [transform:perspective(760px)_rotateX(62deg)_scale(1.32)]" />

                <div className="absolute left-[14%] top-[18%] h-28 w-44 rounded-2xl bg-white/70 shadow-2xl" />
                <div className="absolute right-[12%] top-[18%] h-28 w-44 rounded-2xl bg-white/70 shadow-2xl" />

                {items.map((item) => (
                  <PlacedFurniture
                    key={item.id}
                    item={item}
                    selected={item.id === selectedId}
                    onSelect={() => setSelectedId(item.id)}
                  />
                ))}

                <div className="absolute bottom-5 left-5 rounded-2xl border border-black/10 bg-white/75 p-4 text-[#241b15] shadow-xl backdrop-blur">
                  <div className="text-xs font-semibold">Room Total</div>
                  <div className="text-2xl font-black">{rupee(total)}</div>
                </div>

                <div className="absolute bottom-5 right-5 rounded-2xl border border-black/10 bg-white/75 p-4 text-[#241b15] shadow-xl backdrop-blur">
                  <div className="text-xs font-semibold">Placed Items</div>
                  <div className="text-2xl font-black">{items.length}</div>
                </div>
              </section>

              <aside className="rounded-2xl border border-white/10 bg-white/[.05] p-4">
                <h3 className="mb-4 text-sm font-bold text-[#d6b37a]">Selected Item Controls</h3>

                {selected ? (
                  <>
                    <p className="text-xs text-white/60">Selected</p>
                    <p className="mt-1 font-black">{selected.name}</p>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <button onClick={() => moveSelected(0, -4)} className="col-start-2 rounded-xl bg-white/10 p-3">↑</button>
                      <button onClick={() => moveSelected(-4, 0)} className="rounded-xl bg-white/10 p-3">←</button>
                      <button onClick={() => moveSelected(0, 4)} className="rounded-xl bg-white/10 p-3">↓</button>
                      <button onClick={() => moveSelected(4, 0)} className="rounded-xl bg-white/10 p-3">→</button>
                    </div>

                    <label className="mt-5 block text-xs text-white/60">Rotate: {selected.rotate}°</label>
                    <input
                      className="mt-2 w-full accent-[#d6b37a]"
                      type="range"
                      min="-180"
                      max="180"
                      value={selected.rotate}
                      onChange={(e) => updateSelected({ rotate: Number(e.target.value) })}
                    />

                    <label className="mt-5 block text-xs text-white/60">
                      Size: {Math.round(selected.scale * 100)}%
                    </label>
                    <input
                      className="mt-2 w-full accent-[#d6b37a]"
                      type="range"
                      min="50"
                      max="160"
                      value={selected.scale * 100}
                      onChange={(e) => updateSelected({ scale: Number(e.target.value) / 100 })}
                    />

                    <div className="mt-5 text-xs text-white/60">Fabric: {fabric}</div>
                    <div className="mt-2 flex gap-2">
                      {[
                        ["Champagne Beige", "#ddb974"],
                        ["Ivory", "#f6ead6"],
                        ["Charcoal", "#3a3938"],
                        ["Tan", "#bd8c55"],
                      ].map(([name, color]) => (
                        <button
                          key={name}
                          onClick={() => setFabric(name)}
                          className="h-8 w-8 rounded-full border border-white/40"
                          style={{ background: color }}
                          title={name}
                        />
                      ))}
                    </div>

                    <div className="mt-5 rounded-xl bg-black/25 p-3 text-xs leading-6 text-white/70">
                      Position<br />
                      <b className="text-white">X: {Math.round(selected.x)}%, Y: {Math.round(selected.y)}%</b>
                      <br />
                      Dimensions<br />
                      <b className="text-white">8ft x 3.2ft x 2.9ft</b>
                    </div>

                    <button
                      onClick={removeSelected}
                      className="mt-5 w-full rounded-xl border border-red-300/30 px-4 py-3 text-xs font-bold text-red-200"
                    >
                      Remove Item
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-white/55">Select or place furniture to edit it.</p>
                )}
              </aside>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto]">
              <div className="rounded-2xl border border-[#d6b37a]/30 bg-[#d6b37a]/10 p-4">
                <div className="text-xs text-white/55">Complete Room Package</div>
                <div className="text-2xl font-black text-[#d6b37a]">
                  {rupee(total)} · {items.length} selected items
                </div>
              </div>
              <button
                onClick={() => setCart((v) => v + items.length)}
                className="rounded-2xl bg-[#d6b37a] px-8 py-4 font-black text-[#15110e]"
              >
                Add Complete Room to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="ai" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-[#d6b37a]/20 bg-gradient-to-br from-white/[.08] to-[#d6b37a]/10 p-8">
          <p className="text-sm font-bold text-[#d6b37a]">Powered by Azure OpenAI + Azure AI Search</p>
          <h2 className="mt-2 text-4xl font-black">AI Interior Design Assistant</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-black/25 p-6">
              <div className="rounded-2xl bg-white/10 p-4 text-white/80">
                Create a luxury modern living room under ₹5,00,000 with beige, walnut and gold accents.
              </div>
              <div className="mt-4 rounded-2xl border border-[#d6b37a]/30 bg-[#d6b37a]/10 p-4">
                AI recommends: Signature Cloud Sofa, Siena Coffee Table, Aurelia Floor Lamp,
                Velvet Accent Chair, Modular TV Console, and Handwoven Rug.
                <br /><br />
                Estimated total: <b className="text-[#d6b37a]">₹4,72,000</b>. Budget fit confirmed.
              </div>
              <button onClick={applyAiDesign} className="mt-5 rounded-xl bg-[#d6b37a] px-6 py-3 font-black text-[#15110e]">
                Apply AI Design to Room
              </button>
            </div>

            <div className="rounded-3xl bg-black/25 p-6">
              <h3 className="text-xl font-black">Customer Experience Impact</h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Lower purchase doubt", "Higher cart value", "Complete room packages", "Premium digital experience"].map((x) => (
                  <div key={x} className="rounded-2xl bg-white/[.06] p-4 text-sm font-bold">{x}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#d6b37a]">Luxury Collection</p>
            <h2 className="mt-2 text-4xl font-black">Premium Furniture Catalog</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {["Room", "Style", "Material", "Color", "Price"].map((f) => (
              <span key={f} className="rounded-full border border-white/10 bg-white/[.06] px-4 py-2">{f}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {catalog.map(([name, price, material, dimension, tag]) => (
            <article key={name} className="rounded-3xl border border-white/10 bg-white/[.06] p-5 shadow-xl transition hover:-translate-y-1 hover:border-[#d6b37a]/50">
              <div className="mb-4 flex h-44 items-end justify-center rounded-2xl bg-gradient-to-br from-[#efe4d3] to-[#a57947] p-6">
                <div className="h-20 w-52 rounded-t-[2rem] rounded-b-xl bg-[#e7d4b8] shadow-2xl" />
              </div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#d6b37a]/15 px-3 py-1 text-xs font-bold text-[#d6b37a]">{tag}</span>
                <span className="text-sm">⭐ 4.8</span>
              </div>
              <h3 className="mt-4 text-xl font-black">{name}</h3>
              <p className="mt-2 text-sm text-white/60">{material}</p>
              <p className="mt-1 text-sm text-white/45">{dimension}</p>
              <div className="mt-5 flex items-center justify-between">
                <strong className="text-xl text-[#d6b37a]">{price}</strong>
                <div className="flex gap-2">
                  <button className="rounded-xl border border-white/10 px-3 py-2 text-xs">View in 3D</button>
                  <button onClick={() => setCart((v) => v + 1)} className="rounded-xl bg-[#d6b37a] px-3 py-2 text-xs font-bold text-[#15110e]">
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[.06] p-8">
            <h2 className="text-4xl font-black">Complete Room Checkout</h2>
            <div className="mt-6 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between rounded-2xl bg-black/20 p-4">
                  <span>{item.name}</span>
                  <b className="text-[#d6b37a]">{item.priceLabel}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-[#d6b37a]/30 bg-[#d6b37a]/10 p-8">
            <p className="text-white/60">Delivery + Installation</p>
            <h3 className="mt-2 text-3xl font-black">Included</h3>
            <p className="mt-6 text-white/60">Warranty</p>
            <h3 className="mt-2 text-3xl font-black">5 Years</h3>
            <p className="mt-8 text-white/60">Total</p>
            <h3 className="text-5xl font-black text-[#d6b37a]">{rupee(total)}</h3>
            <button className="mt-8 w-full rounded-xl bg-[#d6b37a] px-6 py-4 font-black text-[#15110e]">
              Proceed to Luxury Checkout
            </button>
          </div>
        </div>
      </section>

      <section id="architecture" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-bold text-[#d6b37a]">Enterprise Architecture</p>
        <h2 className="mt-2 text-4xl font-black">Azure-Ready Platform Blueprint</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            "Customer Web App",
            "3D Simulation Engine",
            "Azure OpenAI",
            "Azure AI Search",
            "Cosmos DB",
            "Blob Storage for 3D Assets",
            "Payment Gateway",
            "Admin Dashboard",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[.06] p-5 text-center font-bold shadow-xl">
              {item}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/45">
        FurniVision 3D — Luxury AI-Powered Interactive Furniture Commerce Demo
      </footer>
    </main>
  );
}

function PlacedFurniture({
  item,
  selected,
  onSelect,
}: {
  item: FurnitureItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const style = {
    left: `${item.x}%`,
    top: `${item.y}%`,
    transform: `translate(-50%, -50%) rotate(${item.rotate}deg) scale(${item.scale})`,
    zIndex: item.type === "rug" ? 4 : item.type === "table" ? 8 : 10,
  };

  return (
    <button
      onClick={onSelect}
      className={`absolute transition-all duration-200 ${selected ? "drop-shadow-[0_0_18px_rgba(214,179,122,.9)]" : ""}`}
      style={style}
      title={item.name}
    >
      {selected && (
        <>
          <span className="absolute -inset-5 rounded-[2rem] border-2 border-dashed border-[#d6b37a]" />
          <span className="absolute -right-8 -top-8 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d6b37a] bg-white/70 text-[#5b3b24]">
            ↻
          </span>
          <span className="absolute -left-6 -top-6 h-4 w-4 rounded-full bg-[#d6b37a]" />
          <span className="absolute -right-6 -bottom-6 h-4 w-4 rounded-full bg-[#d6b37a]" />
        </>
      )}

      {item.type === "sofa" && <Sofa label={item.shortName} />}
      {item.type === "table" && <Table label={item.shortName} />}
      {item.type === "rug" && <Rug label={item.shortName} />}
      {item.type === "lamp" && <Lamp label={item.shortName} />}
      {item.type === "tv" && <TvUnit label={item.shortName} />}
      {item.type === "chair" && <Chair label={item.shortName} />}
      {item.type === "bed" && <Bed label={item.shortName} />}
    </button>
  );
}

function Sofa({ label }: { label: string }) {
  return (
    <div className="relative h-28 w-64 rounded-[2rem] bg-[#dfc6a6] shadow-2xl">
      <div className="absolute -top-8 left-7 h-24 w-24 rounded-3xl bg-[#f1e5d2] shadow-xl" />
      <div className="absolute -top-8 right-7 h-24 w-24 rounded-3xl bg-[#f1e5d2] shadow-xl" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-black text-[#5b3b24]">{label}</div>
    </div>
  );
}

function Table({ label }: { label: string }) {
  return (
    <div className="relative h-20 w-44 rounded-[50%] bg-[#5b341f] shadow-2xl">
      <div className="absolute inset-3 rounded-[50%] border border-[#d6b37a]/40" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-black text-[#efd8b1]">{label}</div>
    </div>
  );
}

function Rug({ label }: { label: string }) {
  return (
    <div className="relative h-32 w-80 rounded-[50%] bg-[#efe6d4]/90 shadow-xl">
      <div className="absolute inset-5 rounded-[50%] border border-[#b68a55]/50" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-black text-[#5b3b24]">{label}</div>
    </div>
  );
}

function Lamp({ label }: { label: string }) {
  return (
    <div className="relative h-48 w-24">
      <div className="absolute left-1/2 top-8 h-24 w-2 -translate-x-1/2 bg-[#3a2a20]" />
      <div className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-[#d6b37a] shadow-[0_0_55px_rgba(214,179,122,.9)]" />
      <div className="absolute bottom-5 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-[#3a2a20]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-black text-[#5b3b24]">{label}</div>
    </div>
  );
}

function TvUnit({ label }: { label: string }) {
  return (
    <div className="relative h-24 w-72 rounded-xl bg-[#51331f] shadow-2xl">
      <div className="absolute -top-20 left-8 h-16 w-56 rounded-xl bg-[#191817] shadow-xl" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-black text-[#efd8b1]">{label}</div>
    </div>
  );
}

function Chair({ label }: { label: string }) {
  return (
    <div className="relative h-28 w-28 rounded-3xl bg-[#c69b72] shadow-2xl">
      <div className="absolute -top-7 left-4 h-20 w-20 rounded-3xl bg-[#e5ceb3]" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-black text-[#5b3b24]">{label}</div>
    </div>
  );
}

function Bed({ label }: { label: string }) {
  return (
    <div className="relative h-44 w-72 rounded-3xl bg-[#dbc3a2] shadow-2xl">
      <div className="absolute -top-8 left-0 h-14 w-full rounded-2xl bg-[#8b5d38]" />
      <div className="absolute left-8 top-6 h-20 w-24 rounded-2xl bg-[#f3e7d4]" />
      <div className="absolute right-8 top-6 h-20 w-24 rounded-2xl bg-[#f3e7d4]" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-black text-[#5b3b24]">{label}</div>
    </div>
  );
}
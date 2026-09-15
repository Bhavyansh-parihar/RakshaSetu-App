import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const shelters = [
  { name: "Seva Shelter — Andheri East", distance: "1.2 km", capacity: "842/1200", eta: "8 min", status: "open", tags: ["Food", "Water", "Medical"], lat: 19.1136, lng: 72.8697 },
  { name: "Bandra Relief Camp", distance: "2.8 km", capacity: "1100/1200", eta: "15 min", status: "open", tags: ["Food", "Water"], lat: 19.0596, lng: 72.8295 },
  { name: "Dharavi Shelter Point", distance: "4.1 km", capacity: "1200/1200", eta: "22 min", status: "full", tags: ["Water"], lat: 19.0402, lng: 72.8553 },
  { name: "Kurla Community Hall", distance: "5.3 km", capacity: "330/800", eta: "28 min", status: "open", tags: ["Food", "Water", "Medical", "Children"], lat: 19.0728, lng: 72.8789 },
];

const filters = ["All", "Open", "Nearby", "Medical", "Food", "Water"];

export default function SheltersScreen({ onBack }: { onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = shelters.filter((s) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Open") return s.status === "open";
    if (activeFilter === "Nearby") return parseFloat(s.distance) < 3;
    return s.tags.includes(activeFilter);
  });

  return (
    <div className="absolute inset-0 bg-white flex flex-col" style={{ paddingTop: 48 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <h1 className="font-bold text-slate-900 text-lg">Nearby Shelters</h1>
          <p className="text-xs text-slate-400">4 shelters found near you</p>
        </div>
        <div className="ml-auto w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      {/* Full-screen map */}
      <div className="h-48 relative flex-shrink-0">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
          initialViewState={{
            longitude: 72.85,
            latitude: 19.07,
            zoom: 11
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          {filtered.map((shelter, i) => (
            <Marker key={i} longitude={shelter.lng} latitude={shelter.lat}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-md ${shelter.status === "full" ? "bg-red-500" : "bg-green-600"}`}>
                <span className="text-white text-xs font-bold">S</span>
              </div>
            </Marker>
          ))}
          {/* User */}
          <Marker longitude={72.8777} latitude={19.0760}>
            <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg" />
          </Marker>
        </Map>
      </div>

      {/* Bottom sheet */}
      <div className="flex-1 flex flex-col">
        {/* Drag handle */}
        <div className="flex justify-center py-2.5">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Search */}
        <div className="px-4 mb-3">
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input placeholder="Search shelters..." className="flex-1 bg-transparent text-sm text-slate-700 outline-none" />
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 px-4 overflow-x-auto pb-2 mb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeFilter === f ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-500 bg-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Shelter list */}
        <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-3" style={{ paddingBottom: 80 }}>
          {filtered.map((shelter, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${shelter.status === "full" ? "bg-red-100" : "bg-green-100"}`}>
                  ⛺
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-slate-900 text-sm">{shelter.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${shelter.status === "full" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                      {shelter.status === "full" ? "Full" : "Open"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                    <p className="text-xs text-slate-500">📍 {shelter.distance}</p>
                    <p className="text-xs text-slate-500">👥 {shelter.capacity}</p>
                    <p className="text-xs text-slate-500">⏱ {shelter.eta}</p>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {shelter.tags.map((t) => (
                      <span key={t} className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <button
                  disabled={shelter.status === "full"}
                  className={`px-3 py-2 rounded-xl text-xs font-bold text-white ${shelter.status === "full" ? "bg-slate-300" : "bg-blue-600"}`}
                >
                  {shelter.status === "full" ? "Full" : "Navigate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

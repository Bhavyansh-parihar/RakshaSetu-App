import { useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
  navigate: (screen: string) => void;
}

export default function Navigation({ navigate }: Props) {
  const [started, setStarted] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#111827] relative">
      {/* Mapbox Map */}
      <div className="flex-1 relative overflow-hidden">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
          initialViewState={{
            longitude: 72.8777,
            latitude: 19.0760,
            zoom: 14
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          {/* Simple route line (straight for now) */}
          <Source id="route" type="geojson" data={{
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: [[72.8777, 19.0760], [72.885, 19.085]] }
          }}>
            <Layer
              id="route-line"
              type="line"
              paint={{ "line-color": "#FF4F38", "line-width": 5, "line-dasharray": [2, 1] }}
            />
          </Source>

          {/* Shelter markers */}
          <Marker longitude={72.89} latitude={19.08}>
            <div className="w-5 h-5 rounded-full bg-[#30D158] flex items-center justify-center opacity-90">
              <span className="text-white text-[10px] font-bold">S</span>
            </div>
          </Marker>

          {/* Destination */}
          <Marker longitude={72.885} latitude={19.085}>
            <div className="w-6 h-6 rounded-full bg-[#FF3B30] flex items-center justify-center opacity-90 shadow-lg shadow-red-500/50">
              <span className="text-white text-xs font-bold">🆘</span>
            </div>
          </Marker>

          {/* Responder (Me) */}
          <Marker longitude={72.8777} latitude={19.0760}>
            <div className="relative">
              <div className="w-5 h-5 rounded-full bg-[#0A84FF] border-2 border-white shadow-lg shadow-blue-500/50" />
            </div>
          </Marker>
        </Map>

        {/* Top info bar */}
        <div className="absolute top-0 left-0 right-0 pt-10 px-4 pb-3 bg-gradient-to-b from-[#111827] to-transparent pointer-events-none">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("incident-details")} className="w-9 h-9 bg-[#1E2D42]/90 border border-[#2D4160] rounded-xl flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="#F0F5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex-1 bg-[#1A2234]/90 backdrop-blur border border-[#2D4160] rounded-2xl px-4 py-2.5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
              <div>
                <p className="text-[#F0F5FA] text-sm font-600">47-B Nehru Nagar, Kolhapur</p>
                <p className="text-[#8BAFC8] text-xs">Bhavyansh Parihar · INC-2847</p>
              </div>
            </div>
          </div>
        </div>

        {/* ETA Card */}
        <div className="absolute top-24 right-4 bg-[#1A2234]/90 backdrop-blur border border-[#2D4160] rounded-2xl px-4 py-3 text-center">
          <p className="text-[#4D6E8A] text-xs mono">ETA</p>
          <p className="font-display text-2xl font-700 text-[#F0F5FA]">6 min</p>
          <p className="text-[#8BAFC8] text-xs">1.4 km</p>
        </div>

        {/* Shelter legend */}
        <div className="absolute bottom-44 right-4 bg-[#1A2234]/90 backdrop-blur border border-[#2D4160] rounded-xl px-3 py-2.5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#30D158]" />
            <span className="text-[#F0F5FA] text-xs">Shelter</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#FF3B30]" />
            <span className="text-[#F0F5FA] text-xs">Target</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#0A84FF]" />
            <span className="text-[#F0F5FA] text-xs">You</span>
          </div>
        </div>

        {/* OSM credit */}
        <div className="absolute bottom-36 left-2 text-[#4D6E8A] text-xs opacity-60">© OpenStreetMap</div>
      </div>

      {/* Bottom navigation panel */}
      <div className="bg-[#1A2234] border-t border-[#2D4160] px-4 py-4">
        {/* Turn instructions */}
        <div className="flex items-center gap-3 bg-[#1E2D42] border border-[#2D4160] rounded-2xl px-4 py-3 mb-3">
          <div className="w-10 h-10 bg-[#FF4F38] rounded-xl flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M4 12h16M12 4l8 8-8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[#F0F5FA] font-600 text-sm">Turn right on MG Road</p>
            <p className="text-[#8BAFC8] text-xs">In 280m — then straight 900m</p>
          </div>
          <span className="text-[#F0F5FA] font-display text-xl font-700">280m</span>
        </div>

        {/* Conditions */}
        <div className="flex gap-2 mb-4">
          {[
            { label: "Traffic", value: "Moderate", color: "#FFB800" },
            { label: "Flood Risk", value: "High", color: "#FF3B30" },
            { label: "Signal", value: "4G", color: "#30D158" },
          ].map((c) => (
            <div key={c.label} className="flex-1 bg-[#1E2D42] border border-[#2D4160] rounded-xl px-2 py-2 text-center">
              <p className="text-xs font-600" style={{ color: c.color }}>{c.value}</p>
              <p className="text-[#4D6E8A] text-xs">{c.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setStarted(true); setTimeout(() => navigate("active-rescue"), 400); }}
          className="w-full bg-[#FF4F38] text-white font-display text-xl font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-transform"
          style={{ boxShadow: "0 4px 24px #FF4F3840" }}
        >
          {started ? "ARRIVED — STARTING RESCUE..." : "CONFIRM ARRIVAL AT SCENE"}
        </button>
      </div>
    </div>
  );
}

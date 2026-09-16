import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
  navigate: (screen: string) => void;
}

const shelters = [
  { id: "SH-01", name: "Rajaram College Grounds", dist: "0.9 km", cap: 850, current: 612, status: "OPEN", type: "Primary", lng: 72.87, lat: 19.07 },
  { id: "SH-02", name: "Govt. High School Annex", dist: "1.3 km", cap: 400, current: 380, status: "NEAR FULL", type: "Secondary", lng: 72.88, lat: 19.08 },
  { id: "SH-03", name: "Sports Complex, Sector 4", dist: "2.1 km", cap: 1200, current: 430, status: "OPEN", type: "Primary", lng: 72.86, lat: 19.06 },
  { id: "SH-04", name: "Community Hall Block-C", dist: "3.4 km", cap: 200, current: 198, status: "FULL", type: "Overflow", lng: 72.89, lat: 19.09 },
];

export default function NearbyShelters({ navigate }: Props) {
  const statusColor = (s: string) =>
    s === "OPEN" ? "#30D158" : s === "NEAR FULL" ? "#FFB800" : "#FF3B30";

  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto">
      <div className="bg-[#1A2234] border-b border-[#2D4160] px-4 pt-10 pb-4">
        <h1 className="font-display text-3xl font-800 text-[#F0F5FA] tracking-wide">NEARBY SHELTERS</h1>
        <p className="text-[#8BAFC8] text-xs mt-1">Kolhapur district · Updated 3 min ago</p>
        <div className="flex gap-2 mt-3">
          {["All", "Open", "Medical"].map((f) => (
            <button key={f} className={`px-4 py-2 rounded-xl text-xs font-600 border ${f === "All" ? "bg-[#FF4F38] border-[#FF4F38] text-white" : "bg-[#1E2D42] border-[#2D4160] text-[#8BAFC8]"}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Mapbox Map */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden border border-[#2D4160] relative h-[140px]">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
          initialViewState={{
            longitude: 72.875,
            latitude: 19.075,
            zoom: 12
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          {shelters.map((s) => (
            <Marker key={s.id} longitude={s.lng} latitude={s.lat}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center opacity-90" style={{ backgroundColor: statusColor(s.status) }}>
                <span className="text-[#111827] text-[10px] font-bold">S</span>
              </div>
            </Marker>
          ))}
          {/* User Marker */}
          <Marker longitude={72.8777} latitude={19.0760}>
            <div className="w-4 h-4 rounded-full bg-[#0A84FF] border border-white shadow-lg shadow-blue-500/50" />
          </Marker>
        </Map>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4">
        {shelters.map((s) => {
          const pct = Math.round((s.current / s.cap) * 100);
          return (
            <div key={s.id} className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#4D6E8A] text-xs mono">{s.id}</span>
                    <span className="text-[#8BAFC8] text-xs border border-[#2D4160] rounded-lg px-2 py-0.5">{s.type}</span>
                  </div>
                  <p className="text-[#F0F5FA] font-600 text-sm">{s.name}</p>
                  <p className="text-[#8BAFC8] text-xs mt-0.5">{s.dist} from scene</p>
                </div>
                <span
                  className="text-xs font-700 px-2.5 py-1.5 rounded-xl shrink-0"
                  style={{ color: statusColor(s.status), background: statusColor(s.status) + "20", border: `1px solid ${statusColor(s.status)}40` }}
                >
                  {s.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#8BAFC8]">Occupancy</span>
                <span className="text-[#F0F5FA] font-600">{s.current} / {s.cap}</span>
              </div>
              <div className="bg-[#1A2234] rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: statusColor(s.status) }}
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[#4D6E8A] text-xs">{pct}% full · {s.cap - s.current} spots available</span>
                <button className="text-[#0A84FF] text-xs font-600 bg-[#0A84FF15] border border-[#0A84FF30] rounded-lg px-3 py-1.5">Navigate →</button>
              </div>
            </div>
          );
        })}
        <div className="pb-4" />
      </div>
    </div>
  );
}

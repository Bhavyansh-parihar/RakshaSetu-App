import { useState, useEffect, useMemo } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// Haversine distance in km
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

// Generate circular polygon points for Mapbox
function createGeoJSONCircle(center: [number, number], radiusInKm: number, points = 64) {
  const coords = {
    latitude: center[1],
    longitude: center[0]
  };
  const km = radiusInKm;
  const ret = [];
  const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
  const distanceY = km / 110.574;

  let theta, x, y;
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);
    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);
  
  return {
    type: "Feature" as const,
    geometry: {
      type: "Polygon" as const,
      coordinates: [ret]
    }
  };
}

const filters = ["All", "Open", "Nearby", "Medical", "Food", "Water"];

export default function SheltersScreen({ onBack }: { onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const [shelters, setShelters] = useState<any[]>([]);
  const [inDanger, setDanger] = useState(false);
  const [nearestSafe, setNearestSafe] = useState<any>(null);
  const [dangerZones, setDangerZones] = useState<any[]>([]);
  
  useEffect(() => {
    // Get real location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLoc({ lat, lng });
        
        // Generate dynamic shelters around user
        const generatedShelters = [
          { name: "Seva Shelter", capacity: "842/1200", status: "open", tags: ["Food", "Water", "Medical"], lat: lat + 0.015, lng: lng + 0.01 },
          { name: "Relief Camp Beta", capacity: "1100/1200", status: "open", tags: ["Food", "Water"], lat: lat - 0.012, lng: lng - 0.008 },
          { name: "Shelter Point C", capacity: "1200/1200", status: "full", tags: ["Water"], lat: lat + 0.008, lng: lng - 0.015 },
          { name: "Community Hall", capacity: "330/800", status: "open", tags: ["Food", "Water", "Medical", "Children"], lat: lat - 0.01, lng: lng + 0.012 },
        ].map(s => {
          const dist = getDistance(lat, lng, s.lat, s.lng);
          return { ...s, distance: dist.toFixed(1) + " km", distNum: dist, eta: Math.round(dist * 12) + " min" };
        });
        setShelters(generatedShelters);

        // Danger zones (red)
        const dZones = [
          { center: [lng + 0.002, lat + 0.002] as [number, number], radius: 0.8, type: "Flood" }, // very close to user
          { center: [lng - 0.02, lat - 0.02] as [number, number], radius: 1.5, type: "Collapsed Building" }
        ];
        setDangerZones(dZones);
        
        // Check if user in danger zone
        let isInDanger = false;
        for (const dz of dZones) {
          const dist = getDistance(lat, lng, dz.center[1], dz.center[0]);
          if (dist < dz.radius) {
            isInDanger = true;
            break;
          }
        }
        setDanger(isInDanger);
        
        if (isInDanger) {
          // Find nearest open shelter
          const openShelters = generatedShelters.filter(s => s.status === 'open');
          if (openShelters.length > 0) {
            const nearest = openShelters.reduce((prev, curr) => prev.distNum < curr.distNum ? prev : curr);
            setNearestSafe(nearest);
          }
        }

      }, (error) => {
        console.error("Error getting location", error);
      });
    }
  }, []);

  const filtered = shelters.filter((s) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Open") return s.status === "open";
    if (activeFilter === "Nearby") return s.distNum < 3;
    return s.tags.includes(activeFilter);
  });

  const mapData = useMemo(() => {
    if (!userLoc) return null;
    
    // Danger polygons
    const dangerPolys = dangerZones.map(dz => createGeoJSONCircle(dz.center, dz.radius));
    
    // Safe polygons (around open shelters)
    const safePolys = shelters.filter(s => s.status === 'open').map(s => createGeoJSONCircle([s.lng, s.lat], 0.3));

    return { dangerPolys, safePolys };
  }, [userLoc, dangerZones, shelters]);

  return (
    <div className="absolute inset-0 bg-white flex flex-col" style={{ paddingTop: 48 }}>
      {/* Danger Alert Overlay */}
      {inDanger && (
        <div className="absolute top-16 left-4 right-4 z-50 bg-red-600 rounded-2xl p-4 shadow-2xl border-2 border-red-400 animate-pulse">
          <div className="flex items-start gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">DANGER ZONE</h2>
              <p className="text-red-100 text-xs mt-1">Get out of this area ASAP to avoid disaster!</p>
              {nearestSafe && (
                <div className="mt-2 bg-red-700/50 rounded-lg p-2">
                  <p className="text-white text-xs font-semibold">Nearest Safe Zone: {nearestSafe.name} ({nearestSafe.distance})</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 relative z-40 bg-white">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <h1 className="font-bold text-slate-900 text-lg">Nearby Shelters</h1>
          <p className="text-xs text-slate-400">{filtered.length} shelters found near you</p>
        </div>
        <div className="ml-auto w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      {/* Full-screen map */}
      <div className="h-48 relative flex-shrink-0">
        {userLoc && (
          <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
            initialViewState={{
              longitude: userLoc.lng,
              latitude: userLoc.lat,
              zoom: 12
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            {/* Safe Zones */}
            {mapData?.safePolys.map((poly, i) => (
              <Source key={`safe-${i}`} id={`safe-${i}`} type="geojson" data={poly}>
                <Layer id={`safe-layer-${i}`} type="fill" paint={{ "fill-color": "#22c55e", "fill-opacity": 0.2 }} />
                <Layer id={`safe-line-${i}`} type="line" paint={{ "line-color": "#16a34a", "line-width": 2, "line-dasharray": [2, 2] }} />
              </Source>
            ))}

            {/* Danger Zones */}
            {mapData?.dangerPolys.map((poly, i) => (
              <Source key={`danger-${i}`} id={`danger-${i}`} type="geojson" data={poly}>
                <Layer id={`danger-layer-${i}`} type="fill" paint={{ "fill-color": "#ef4444", "fill-opacity": 0.3 }} />
                <Layer id={`danger-line-${i}`} type="line" paint={{ "line-color": "#dc2626", "line-width": 2 }} />
              </Source>
            ))}

            {/* Danger Centers */}
            {dangerZones.map((dz, i) => (
              <Marker key={`dzm-${i}`} longitude={dz.center[0]} latitude={dz.center[1]}>
                <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
                  {dz.type}
                </div>
              </Marker>
            ))}

            {/* Route Line */}
            {inDanger && nearestSafe && (
              <Source
                id="route"
                type="geojson"
                data={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: [
                      [userLoc.lng, userLoc.lat],
                      [nearestSafe.lng, nearestSafe.lat]
                    ]
                  }
                }}
              >
                <Layer
                  id="route-layer"
                  type="line"
                  paint={{
                    "line-color": "#3b82f6",
                    "line-width": 4,
                    "line-dasharray": [2, 2]
                  }}
                />
              </Source>
            )}

            {/* Shelter Markers */}
            {filtered.map((shelter, i) => (
              <Marker key={`sh-${i}`} longitude={shelter.lng} latitude={shelter.lat}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-md ${shelter.status === "full" ? "bg-red-500" : "bg-green-600"}`}>
                  <span className="text-white text-xs font-bold">S</span>
                </div>
              </Marker>
            ))}

            {/* User Marker */}
            <Marker longitude={userLoc.lng} latitude={userLoc.lat}>
              <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg relative">
                <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-75"></div>
              </div>
            </Marker>
          </Map>
        )}
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
                    {shelter.tags.map((t: string) => (
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

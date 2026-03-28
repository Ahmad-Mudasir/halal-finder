import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useCallback } from "react";
import { restaurantKey } from "../utils/restaurantKey";

delete L.Icon.Default.prototype._getIconUrl;

const FINLAND_CENTER = [61.9241, 25.7482];

/** Recalculates map size when the layout changes (e.g. sidebar). */
const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

/** Pans/zooms to a target when user location is available. */
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] !== 0) {
      map.flyTo(center, 15, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const MapView = ({ restaurants, onSelect, userLocation }) => {
  const isMobile = useMemo(() => typeof window !== "undefined" && window.innerWidth < 640, []);

  const createIcon = useCallback(
    (name, cuisine) => {
      const emojis = { Syrian: "🥗", Bangladeshi: "🍲", Turkish: "🥙", Indian: "🍛" };
      const emoji = emojis[cuisine] || "🍽️";
      const shortName = String(name || "").replace(/</g, "");

      return L.divIcon({
        className: "custom-marker",
        html: `
        <div style="position:relative; display:flex; align-items:center; justify-content:center;">
          <div style="position:absolute; width:28px; height:28px; background:rgba(6, 78, 59, 0.15); border-radius:50%; animation: p 2s infinite;"></div>
          <div style="background:#064e3b; border:2px solid #fff; color:#fff; font-size:10px; font-weight:900; padding:6px 12px; border-radius:12px; box-shadow:0 8px 15px rgba(0,0,0,0.15); display:flex; align-items:center; gap:6px;">
            <span>${emoji}</span> <span class="m-hide">${shortName}</span>
          </div>
        </div>
        <style>
          @keyframes p { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(1.8);opacity:0} }
          @media (max-width: 640px) { .m-hide { display:none; } }
        </style>
      `,
        iconSize: [isMobile ? 40 : 120, 32],
        iconAnchor: [isMobile ? 20 : 60, 16],
      });
    },
    [isMobile]
  );

  const withCoords = useMemo(
    () => (restaurants || []).filter((r) => r.latitude && r.longitude),
    [restaurants]
  );

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#f1f5f9]">
      <style>
        {`
          .leaflet-control-zoom { border:none!important; box-shadow:0 4px 12px rgba(0,0,0,0.1)!important; margin-right:16px!important; margin-bottom:24px!important; }
          .leaflet-control-zoom-in, .leaflet-control-zoom-out { background:#fff!important; color:#5f6368!important; height:40px!important; width:40px!important; line-height:40px!important; border:none!important; font-size:20px!important; border-radius:8px!important; }
          .leaflet-control-zoom-in { border-bottom:1px solid #f1f3f4!important; }
        `}
      </style>

      <MapContainer
        center={FINLAND_CENTER}
        zoom={isMobile ? 5 : 6}
        minZoom={4}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          noWrap={false}
        />

        <ResizeMap />
        <ZoomControl position="bottomright" />
        {userLocation && <ChangeView center={userLocation} />}

        {withCoords.map((r) => (
          <Marker
            key={restaurantKey(r)}
            position={[r.latitude, r.longitude]}
            icon={createIcon(r.name, r.cuisine)}
            eventHandlers={{ click: () => onSelect(r) }}
          >
            <Popup>
              <div className="font-extrabold text-slate-800 text-[11px]">{r.name}</div>
              <div className="text-slate-600 text-[10px] font-semibold mt-0.5">{r.city || "—"}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

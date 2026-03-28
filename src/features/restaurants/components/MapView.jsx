import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useCallback } from "react";
import { listItemKey } from "../utils/restaurantHelpers";

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

/** Slightly softer scroll-zoom so wheel input feels less jumpy. */
const ScrollZoomTuning = () => {
  const map = useMap();
  useEffect(() => {
    const o = map.options;
    o.wheelDebounceTime = 48;
    o.wheelPxPerZoomLevel = 100;
    o.zoomAnimation = true;
    o.fadeAnimation = true;
    o.markerZoomAnimation = true;
  }, [map]);
  return null;
};

/** Pans/zooms to a target when user location is available. */
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] !== 0) {
      map.flyTo(center, 15, { animate: true, duration: 1.35, easeLinearity: 0.22 });
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
        <div class="marker-pin-root" style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
          <div class="marker-pulse" style="position:absolute;width:32px;height:32px;background:rgba(6,78,59,0.12);border-radius:50%;"></div>
          <div class="marker-chip" style="background:#064e3b;border:2px solid #fff;color:#fff;font-size:10px;font-weight:900;padding:7px 13px;border-radius:14px;box-shadow:0 10px 28px -6px rgba(15,23,42,0.35);display:flex;align-items:center;gap:6px;transition:transform 0.25s cubic-bezier(0.16,1,0.3,1),box-shadow 0.25s ease;">
            <span>${emoji}</span><span class="m-hide">${shortName}</span>
          </div>
        </div>
        <style>
          @keyframes markerPulse { 0%{transform:scale(0.85);opacity:0.55} 70%{opacity:0} 100%{transform:scale(2);opacity:0} }
          .marker-pulse { animation: markerPulse 3.2s ease-out infinite; }
          .marker-pin-root:hover .marker-chip { transform:translateY(-2px); box-shadow:0 16px 36px -8px rgba(6,78,59,0.45); }
          @media (max-width:640px){ .m-hide{display:none} }
        </style>
      `,
        iconSize: [isMobile ? 44 : 128, 36],
        iconAnchor: [isMobile ? 22 : 64, 18],
      });
    },
    [isMobile]
  );

  const withCoords = useMemo(
    () => (restaurants || []).filter((r) => r.latitude && r.longitude),
    [restaurants]
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#e8eef3]">
      <style>
        {`
          .leaflet-control-zoom {
            border: none !important;
            box-shadow: 0 8px 24px -6px rgba(15,23,42,0.15) !important;
            margin-right: 14px !important;
            margin-bottom: 20px !important;
            border-radius: 14px !important;
            overflow: hidden;
          }
          .leaflet-control-zoom-in,
          .leaflet-control-zoom-out {
            background: #fff !important;
            color: #475569 !important;
            height: 42px !important;
            width: 42px !important;
            line-height: 42px !important;
            border: none !important;
            font-size: 20px !important;
            transition: background 0.2s ease, color 0.2s ease;
          }
          .leaflet-control-zoom-in:hover,
          .leaflet-control-zoom-out:hover {
            background: #f1f5f9 !important;
            color: #064e3b !important;
          }
          .leaflet-control-zoom-in { border-bottom: 1px solid #e2e8f0 !important; }
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
        maxBoundsViscosity={0.85}
        zoomControl={false}
        scrollWheelZoom
        doubleClickZoom
        dragging
        keyboard
        zoomAnimation
        fadeAnimation
        markerZoomAnimation
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          noWrap={false}
        />

        <ResizeMap />
        <ScrollZoomTuning />
        <ZoomControl position="bottomright" />
        {userLocation && <ChangeView center={userLocation} />}

        {withCoords.map((r) => (
          <Marker
            key={listItemKey(r)}
            position={[r.latitude, r.longitude]}
            icon={createIcon(r.name, r.cuisine)}
            eventHandlers={{
              click: () => onSelect(r),
            }}
          >
            <Popup closeButton autoPan autoPanPadding={[20, 20]} className="halal-popup">
              <div className="font-extrabold tracking-tight text-slate-900 text-[12px] leading-tight">{r.name}</div>
              <div className="mt-1 font-semibold text-slate-600 text-[11px]">{r.city || "—"}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

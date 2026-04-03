/**
 * Detail view for a single restaurant: sheet fields per task (address, cuisine, halal, hours, website, phone).
 */
import { getCuisineImage } from "../constants/cuisineImages";

// The sheet often stores "example.com" without https; <a href> needs a proper URL.
function websiteHrefFromCell(raw) {
  const t = String(raw || "").trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

const RestaurantDetail = ({ restaurant, onBack }) => {
  if (!restaurant) return null;

  const imageSrc = getCuisineImage(restaurant.cuisine);

  const halalLabel = (restaurant.halal_status || "").trim() || "Halal status not listed";
  const hoursText = (restaurant.hours || "").trim();
  const websiteHref = websiteHrefFromCell(restaurant.website);
  const phoneRaw = (restaurant.phone || "").trim();
  const phoneHref = phoneRaw.replace(/\s+/g, "");

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${restaurant.name} ${restaurant.address || ""} ${restaurant.city || ""}`
  )}`;

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto no-scrollbar pb-16 animate-in slide-in-from-right duration-500">
      <div className="relative h-[250px] md:h-[320px] lg:h-[380px] w-full shrink-0">
        <img src={imageSrc} className="w-full h-full object-cover shadow-2xl" alt={restaurant.name} loading="lazy" />
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back to list"
          className="absolute top-5 left-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/95 text-lg text-slate-800 shadow-2xl backdrop-blur-md transition-all hover:bg-emerald-50 active:scale-95"
        >
          ←
        </button>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
      </div>

      <div className="px-6 md:px-10 py-6 md:py-8 space-y-6 md:space-y-8">
        <div className="flex flex-wrap gap-2">
          <span className="bg-emerald-700 text-white text-[9px] font-black px-3 py-1 rounded-md shadow-sm border border-emerald-600 tracking-tighter uppercase">
            {halalLabel}
          </span>
          <span className="bg-slate-50 text-slate-500 text-[9px] font-black px-3 py-1 rounded-md border border-slate-100 uppercase tracking-tighter">
            {restaurant.cuisine || "Cuisine N/A"}
          </span>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none mb-4">
            {restaurant.name}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-tighter p-1 bg-slate-50 rounded-xl w-fit">
            <span className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm text-slate-600">
              <span className="text-lg">🍴</span> {restaurant.cuisine || "—"}
            </span>
            <span className="px-3 py-2 text-emerald-700">$$ • {restaurant.type || "RESTAURANT"}</span>
          </div>
        </div>

        {phoneRaw && (
          <a
            href={`tel:${phoneHref}`}
            className="inline-flex cursor-pointer items-center gap-2 text-emerald-800 font-black text-sm hover:underline"
          >
            📞 {phoneRaw}
          </a>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-2">
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Location</p>
            <div className="bg-slate-50/50 p-5 rounded-[24px] border border-slate-100">
              <p className="text-[11px] font-extrabold text-slate-600 leading-relaxed">
                {restaurant.address || "Address not listed"}
                <br />
                {restaurant.city ? `${restaurant.city}, Finland` : "Finland"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Opening hours</p>
            <div className="bg-slate-50/50 p-5 rounded-[24px] border border-slate-100 text-[11px] font-bold text-slate-600 whitespace-pre-line">
              {hoursText ? hoursText : "Hours not listed — check the venue website or call ahead."}
            </div>
          </div>
        </div>

        {websiteHref && (
          <a
            href={websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full cursor-pointer text-center bg-white border-2 border-emerald-900 text-emerald-950 py-4 rounded-[20px] font-black text-[11px] uppercase tracking-widest hover:bg-emerald-50 transition-colors"
          >
            Visit website
          </a>
        )}

        <div className="pt-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex cursor-pointer items-center justify-center gap-3 bg-emerald-950 hover:bg-black text-white py-5 rounded-[24px] font-black shadow-2xl hover:shadow-black/20 transition-all active:scale-95 text-[11px] uppercase tracking-widest"
          >
            <span>🧭</span> Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ===================== DATA =====================
const agriculturalData = {
  locations: [
    {
      id: 1,
      name: "Jendouba",
      type: "Zone Agricole",
      lat: 36.5,
      lng: 8.78,
      color: "#0cd827",
      description: "منطقة فلاحية متنوعة",
      crops: ["Blé", "Orge", "Olive"],
      tips: ["السقي المنتظم", "مراقبة الآفات"],
      calendar: [
        { month: "Jan", planting: 40, harvesting: 10 },
        { month: "Feb", planting: 60, harvesting: 20 }
      ]
    },
    {
      id: 2,
      name: "Aïn Draham",
      type: "Zone Forestière",
      lat: 36.77,
      lng: 8.68,
      color: "#3498db",
      description: "منطقة جبلية رطبة",
      crops: ["Pomme", "Poire"],
      tips: ["الانتباه للصقيع"],
      calendar: [
        { month: "Mar", planting: 50, harvesting: 10 },
        { month: "Apr", planting: 70, harvesting: 30 }
      ]
    }
  ],
  cropDetails: {
    Blé: { season: "Hiver", water: "Moyen", duration: "6 mois" },
    Olive: { season: "Annuel", water: "Faible", duration: "12 mois" },
    Pomme: { season: "Printemps", water: "Élevé", duration: "8 mois" }
  }
};

// ===================== MAP MOVE =====================
function FlyTo({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 12);
    }
  }, [position, map]);

  return null;
}

// ===================== COMPONENT =====================
export default function Newmaps() {
  const [selectedLocation, setSelectedLocation] = useState(
    agriculturalData.locations[0]
  );
  const [postalCode, setPostalCode] = useState("");
  const [cropModal, setCropModal] = useState(null);

  // ========== خريطة الرمز البريدي ==========
  const postalMap = {
    "8100": 1,
    "8110": 2
  };

  // ================== useEffect لتغيير الموقع بناءً على الرمز البريدي ==================
  useEffect(() => {
    if (postalCode.length === 4 && postalMap[postalCode]) {
      const loc = agriculturalData.locations.find(
        (l) => l.id === postalMap[postalCode]
      );
      setSelectedLocation(loc);
    }
  }, [postalCode, postalMap]); // ✅ أضفنا postalMap لتجنب التحذير

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* ===== SIDEBAR ===== */}
      <div style={{ width: "30%", padding: 15, overflowY: "auto" }}>
        <h2>📍 معلومات زراعية</h2>

        <input
          placeholder="أدخل الرمز البريدي"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ""))}
          style={{ width: "100%", padding: 8 }}
        />

        {selectedLocation && (
          <>
            <h3>{selectedLocation.name}</h3>
            <p><b>النوع:</b> {selectedLocation.type}</p>
            <p>{selectedLocation.description}</p>

            <h4>🌱 المحاصيل</h4>
            {selectedLocation.crops.map((crop) => (
              <div
                key={crop}
                style={{ cursor: "pointer", color: "#2c7744" }}
                onClick={() => setCropModal(crop)}
              >
                {crop}
              </div>
            ))}

            <h4>💡 نصائح</h4>
            <ul>
              {selectedLocation.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* ===== MAP ===== */}
      <div style={{ width: "70%" }}>
        <MapContainer center={[36.5, 8.78]} zoom={10} style={{ height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {agriculturalData.locations.map((loc) => (
            <CircleMarker
              key={loc.id}
              center={[loc.lat, loc.lng]}
              radius={15}
              pathOptions={{
                color: loc.color,
                fillColor: loc.color,
                fillOpacity: selectedLocation?.id === loc.id ? 0.9 : 0.6,
                weight: selectedLocation?.id === loc.id ? 4 : 2
              }}
              eventHandlers={{
                click: () => setSelectedLocation(loc)
              }}
            >
              <Popup>
                <b>{loc.name}</b><br />
                {loc.type}
              </Popup>
            </CircleMarker>
          ))}

          <FlyTo
            position={
              selectedLocation
                ? [selectedLocation.lat, selectedLocation.lng]
                : null
            }
          />
        </MapContainer>
      </div>

      {/* ===== CROP MODAL ===== */}
      {cropModal && (
        <div
          onClick={() => setCropModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              width: 300,
              margin: "100px auto"
            }}
          >
            <h3>{cropModal}</h3>
            <p>الموسم: {agriculturalData.cropDetails[cropModal]?.season}</p>
            <p>الماء: {agriculturalData.cropDetails[cropModal]?.water}</p>
            <p>المدة: {agriculturalData.cropDetails[cropModal]?.duration}</p>
            <button onClick={() => setCropModal(null)}>إغلاق</button>
          </div>
        </div>
      )}
    </div>
  );
}

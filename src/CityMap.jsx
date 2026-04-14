import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { cityMapData } from "./mapData";

// Leaflet 기본 마커 아이콘 깨짐 수정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// 커스텀 핀 생성 함수
function makeIcon(color, emoji) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:36px; height:36px; border-radius:50% 50% 50% 0;
        background:${color}; border:3px solid #fff;
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
        display:flex; align-items:center; justify-content:center;
        font-size:16px; transform:rotate(-45deg);
      ">
        <span style="transform:rotate(45deg); line-height:1;">${emoji}</span>
      </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  });
}

const hotelIcon   = (color) => makeIcon(color, "🏨");
const restaurantIcon = (color) => makeIcon(color, "🍽️");

export default function CityMap({ city, color }) {
  const data = cityMapData[city];
  if (!data) return null;

  return (
    <MapContainer
      center={data.center}
      zoom={data.zoom}
      style={{ height: "340px", width: "100%", borderRadius: "14px", zIndex: 0 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 숙소 핀 */}
      {data.hotels.map((h, i) => (
        <Marker key={`h-${i}`} position={[h.lat, h.lng]} icon={hotelIcon(color)}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 4 }}>🏨 {h.name}</div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>{h.type}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#333" }}>{h.price} / 1박</div>
              <div style={{ fontSize: 11, color: "#777", marginTop: 4, lineHeight: 1.5 }}>{h.point}</div>
              <span style={{
                display: "inline-block", marginTop: 6, fontSize: 10, fontWeight: 700,
                color: "#fff", background: color, padding: "2px 8px", borderRadius: 20,
              }}>{h.tag}</span>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* 맛집 핀 */}
      {data.restaurants.map((r, i) => (
        <Marker key={`r-${i}`} position={[r.lat, r.lng]} icon={restaurantIcon(color)}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#C4573A", marginBottom: 4 }}>🍽️ {r.name}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color, marginBottom: 4 }}>{r.category} · {r.price}</div>
              <div style={{ fontSize: 11, color: "#555", lineHeight: 1.6 }}>{r.desc}</div>
              {r.menu && (
                <div style={{ marginTop: 6, fontSize: 11, color: "#888" }}>
                  <strong>추천 메뉴:</strong> {r.menu}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}


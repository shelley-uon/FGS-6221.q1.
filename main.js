// 1) Map setup 
let map = L.map("map", {
  center: [-1.286389, 36.817223], // Nairobi
  zoom: 5
});

// 2) Tile layer (base map) 
let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// 3) Travel locations (name + [lat, lon])
let places = [
  { name: "Nairobi, Kenya", coords: [-1.286389, 36.817223] },
  { name: "Mombasa, Kenya", coords: [-4.043477, 39.668206] },
  { name: "Zanzibar, Tanzania", coords: [-6.165917, 39.202641] },
  { name: "Dubai, UAE", coords: [25.204849, 55.270783] }
];

// 4) Add markers + popups (required) 
places.forEach((p) => {
  L.marker(p.coords)
    .addTo(map)
    .bindPopup(`<b>${p.name}</b>`);
});

// 5) Create a travel path (polyline) joining the locations
let pathCoords = places.map(p => p.coords);

let travelPath = L.polyline(pathCoords, {
  weight: 4,
  opacity: 0.9
}).addTo(map);

travelPath.bindPopup("<b>My Travel Path</b>");

// Fit map to your route nicely
map.fitBounds(travelPath.getBounds(), { padding: [20, 20] });

// 6) Legend (required)
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "legend");
  div.innerHTML = `
    <b>Legend</b><br><br>
    <i style="background:black;"></i> Travel Path<br>
    <i style="background:gray;"></i> Visit Location (Marker)
  `;
  return div;
};

legend.addTo(map);

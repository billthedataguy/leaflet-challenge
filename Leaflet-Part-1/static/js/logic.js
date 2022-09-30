// logic.js

console.log("This is logic.js");

let map = L.map('map').setView([44.986656, -93.258133], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker = L.marker([44.986656, -93.258133]).addTo(map);

let circle = L.circle([44.986656, -93.258133], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
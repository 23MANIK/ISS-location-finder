var mymap = L.map('ISSmap').setView([0, 0], 2);

const attribution =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
// Making a map with custom icon
var issIcon = L.icon({
iconUrl: 'ISS.png',
iconSize: [60, 40],
iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);

let cnt=true;

async function getISS() {
const url = 'https://api.wheretheiss.at/v1/satellites/25544';
const response = await fetch(url);
const data = await response.json();
const { longitude, latitude } = data;
// L.marker([latitude, longitude]).addTo(mymap);
marker.setLatLng([latitude, longitude]);
if(cnt==true){
mymap.setView([latitude,longitude]);
cnt=false;
}

document.getElementById('lat').textContent = latitude.toFixed(2);
document.getElementById('lon').textContent = longitude.toFixed(2);
}
setInterval(getISS,1000);
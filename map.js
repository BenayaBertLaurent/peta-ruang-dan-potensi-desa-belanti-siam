// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Add a satellite tile layer
var satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; <a href="https://www.google.com/intl/en/permissions/geoguidelines/">Google Maps</a>'
}).addTo(map);

// Function to add KML layer
function addKMLLayer(url) {
    fetch(url)
        .then(response => response.text())
        .then(kmlText => {
            var parser = new DOMParser();
            var kml = parser.parseFromString(kmlText, 'text/xml');
            var track = new L.KML(kml);
            map.addLayer(track);

            // Customize placemark icons to use Google's icons
            track.on('add', function(e) {
                e.layer.eachLayer(function(layer) {
                    if (layer instanceof L.Marker) {
                        var iconUrl = 'https://maps.google.com/mapfiles/kml/paddle/ylw-stars.png'; // Example Google icon URL
                        layer.setIcon(L.icon({
                            iconUrl: iconUrl,
                            iconSize: [32, 32],
                            iconAnchor: [16, 32],
                            popupAnchor: [0, -32]
                        }));
                    }
                });
            });
        })
        .catch(error => console.error('Error loading KML:', error));
}

// Add your KML file URL here
addKMLLayer('peta-potensi-belantisiam.kml');

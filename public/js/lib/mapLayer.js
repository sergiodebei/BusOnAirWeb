(function (w, L) {

var baseURL = 'http://localhost:8888';

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map("map", {zoomControl: false});

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 20, attribution: osmAttrib});	

//Extend the Default marker class
var RedIcon = L.Icon.Default.extend({
	options: {
		iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png' 
	}
});
var redIcon = new RedIcon();

// $.getJSON( baseURL + "/stations/getall", function( data ) {
// $.each( data.stationlist, function( key, val ) {
//   $.getJSON( baseURL + val, function( datata ) {
//      L.marker([datata.latLon.lat, datata.latLon.lon],{title : datata.name, alt : datata.url }).addTo(map);
//     });
//   });
// });

var marker = L.marker([42.345, 13.400],{icon:redIcon, draggable:true}).addTo(map);

marker.on('dragend', function(event) {
    var marker = event.target;  // you could also simply access the marker through the closure
    var result = marker.getLatLng();  // but using the passed event is cleaner
    $.getJSON( baseURL + "/stations/getneareststations?lat=" + result.lat + "&lon=" + result.lng + "&range=900", function( data ) {
		$.each( data.stationlist, function( key, val ) {
			$.getJSON( baseURL + val, function( datata ) {
					L.marker([datata.latLon.lat, datata.latLon.lon],{title : datata.name, alt : datata.url }).addTo(map);
			});
		});
	});

});




map.setView([42.351, 13.389], 15);
map.addLayer(osm);

map.addControl( L.control.zoom({position: 'topright'}) );


// map.addControl( L.myIcon('icon', {position: 'topright'}) );

var logo = L.control({position: 'bottomright'});

logo.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
    '<img src="img/BusOnAir.png" alt="legend" width="200" height="54">';
return div;
};

// Add this one (only) for now, as the Population layer is on by default
logo.addTo(map);


})(window, window.L);
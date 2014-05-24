(function (w, L) {

var baseURL = 'http://localhost:8888';

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map("map", {zoomControl: false});

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 20, attribution: osmAttrib});	

// Extend the Default marker class - Red icon
var RedIcon = L.Icon.Default.extend({
	options: {
		iconUrl: 'img/redMarker.png',
		iconSize:     [41, 41], // size of the icon
	}
});
var redIcon = new RedIcon();

// Extend the Default marker class - Bus stop icon
var busStop = L.Icon.Default.extend({
	options: {
		iconUrl: 'img/busStop.png',
		// iconSize:     [21, 75], // size of the icon
	}
});
var busStop = new busStop();

// Extend the Default marker class - Start icon
var startIcon = L.Icon.Default.extend({
	options: {
		iconUrl: 'img/startIcon.png',
	}
});
var startIcon = new startIcon();

// Extend the Default marker class - End icon
var endIcon = L.Icon.Default.extend({
	options: {
		iconUrl: 'img/endIcon.png',
	}
});
var endIcon = new endIcon();


// start the map in l'aquila
map.locate({setView: true, minZoom: 14, maxZoom: 16});


// creare un marker





function onLocationFound(e) {
    var radius = 150;
    var markers = [];
    layer=undefined;
    L.marker(e.latlng,{icon:redIcon,draggable:true})
		.addTo(map)
		.bindPopup("You are here").openPopup()
		.on('dragend', function(event) {
		    if(typeof layer !== 'undefined') map.removeLayer(layer);
		    var marker = event.target;  // you could also simply access the marker through the closure
		    var result = marker.getLatLng();  // but using the passed event is cleaner
		    $.getJSON( baseURL + "/stations/getneareststations?lat=" + result.lat + "&lon=" + result.lng + "&range=500", function( data ) {
				$.each( data.stationlist, function( key, val ) {
					$.getJSON( baseURL + val, function( datata ) {
							markers [key] = L.marker([datata.latLon.lat, datata.latLon.lon],{
								icon:busStop, title : datata.name, alt : datata.url });
					});
				});
				setTimeout(function(){
					layer = L.layerGroup(markers).addTo(map);
				},300)
			});
		});

}
map.on('locationfound', onLocationFound);



layerTrip=undefined;
markersTrip = [];
//mostra la partenza 
fromto = function() {
	var that = this;
	var URL = 'http://nominatim.openstreetmap.org/search?q=';
   	var val = this.value.replace(" ","%20");
   	var citta = ',+laquila';
  	var format = 'json';
    $.getJSON(URL + val + citta + "&format=" + format, function( nomi ) {
    	if(typeof layerTrip !== 'undefined') map.removeLayer(layerTrip);	
		var via_lat = (nomi[0].lat);
		var via_lon = (nomi[0].lon);
		if (that.id == 'nominatim1') {
			markersTrip[0] = L.marker([via_lat, via_lon],{icon:startIcon,draggable:true});

			markersTrip[0].on('dragend', function(event) {
			    var marker = event.target;  // you could also simply access the marker through the closure
			    start = marker.getLatLng();  // but using the passed event is cleaner
			    // console.log(start.lat);
			    // console.log(start.lng);
				var URL = 'http://nominatim.openstreetmap.org/reverse?';
			  	var format = 'json';
	   			$.getJSON(URL + "&format=" + format + "&lat=" + start.lat + "&lon=" + start.lng, function( reverse ){
	   				nominatim1.value = reverse.address.road;
	   			});
			});
		} 
		if(that.id == 'nominatim2'){
			markersTrip[1] = L.marker([via_lat, via_lon],{icon:endIcon,draggable:true});

					markersTrip[1].on('dragend', function(event) {
				    var marker = event.target;  // you could also simply access the marker through the closure
				    end = marker.getLatLng();  // but using the passed event is cleaner
				    // console.log(end.lat);
				    // console.log(end.lng);
					var URL = 'http://nominatim.openstreetmap.org/reverse?';
				  	var format = 'json';
		   			$.getJSON(URL + "&format=" + format + "&lat=" + end.lat + "&lon=" + end.lng, function( reverse ){
			   			nominatim2.value = reverse.address.road;
			   		});
					});


			};
		layerTrip = L.layerGroup(markersTrip).addTo(map);
		// layerTrip.addTo(map);
	});
};



stopLayer=undefined;
line=undefined;
showRoute = function(data) {

	if(typeof stopLayer !== 'undefined') map.removeLayer(stopLayer);
	if(typeof line !== 'undefined') map.removeLayer(line);

	var markers = [];
	// 			$.each( data.routelist, function( key, val ) {
	// 							markers [key] = L.marker([data.routelist[key].latLon.lat, data.routelist[key].latLon.lon],{
	// 							icon:busStop, title : data.routelist[key].stopId, alt : data.routelist[key].stopName });
	// 				});
	

var marker = data.routelist;
var linePts = [];
	for (var it in marker) {
		// console.log([data.routelist[it].latLon.lat,data.routelist[it].latLon.lon]);
		linePts[it] = [data.routelist[it].latLon.lat,data.routelist[it].latLon.lon];
	}

	for( i=0; i < linePts.length; i=i+1 ) {
	    // turn this coordinate into a LatLng
	  linePts[i] = new L.LatLng( linePts[ i ][ 0 ], linePts[ i ][ 1 ] );
	 		markers [i] = L.marker([linePts[ i ].lat, linePts[ i ].lng],{
			icon:busStop});
	}

	// add the line
	line = new L.Polyline( linePts, { 
						color: 'rgb(31, 177, 154)',
	               		weight: 5,
	                	opacity: .7
									} );
	map.addLayer(line);
	stopLayer = L.layerGroup(markers).addTo(map);
	// zoom the map to the polyline
	map.fitBounds(line.getBounds());
}
	

map.addLayer(osm);

map.addControl( L.control.zoom({position: 'topright'}) );


// map.addControl( L.myIcon('icon', {position: 'topright'}) );



// create the logo BusOnAir on the right
var logo = L.control({position: 'bottomright'});

logo.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
    '<img src="img/BusOnAir.png" alt="legend" width="200" height="54">';
return div;
};

logo.addTo(map);


})(window, window.L);




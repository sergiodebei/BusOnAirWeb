
$(function	()	{
	var baseURL = 'http://localhost:8888';

	ttttt = toa.toaObjectsList;
	for (var it in ttttt) {
		ddd = "";
		for (var jj in ttttt[it].bus) {
			qqq = "<ul><li style='padding-left:25px;'>" + ttttt[it].bus[jj].bus + "<span style='color:" + ttttt[it].bus[jj].color + "; padding-left:15px;'>" + ttttt[it].bus[jj].time +" min</span></a></li></ul>";
			ddd = ddd + qqq;
		}
		ccc = "<ul class='submenu'><li><div class='search-block'><div class='input-group'>"+ddd+"</div><!-- /input-group --></div><!-- /search-group --></li></ul>";
		ppp = "<li class='openable'><a href='#'><span class='submenu-label'>" + ttttt[it].cod + " " + ttttt[it].name + "</span></a>"+ccc+"</li>";
		$('#stoplightOpenable').append($(ppp))
		
	}

	//Collapsible Sidebar Menu
	$('.openable > a').click(function()	{
		
		if(!$('#wrapper').hasClass('sidebar-mini'))	
		{}
		else{
			$('#wrapper').removeClass('sidebar-mini');
		}
		if( $(this).parent().children('.submenu').is(':hidden') ) {
			$(this).parent().siblings().removeClass('open').children('.submenu').slideUp();
			$(this).parent().addClass('open').children('.submenu').slideDown();
		}
		else	{
			$(this).parent().removeClass('open').children('.submenu').slideUp();
		}
		return false;
	});
		
	//Toggle Menu
	$('#sidebarToggle').click(function()	{
		$('#wrapper').toggleClass('sidebar-display');
		$('.main-menu').find('.openable').removeClass('open');
		$('.main-menu').find('.submenu').removeAttr('style');
	});
	
	$('#sizeToggle').click(function()	{
	
		$('#wrapper').off("resize");
	
		$('#wrapper').toggleClass('sidebar-mini');
		$('.main-menu').find('.openable').removeClass('open');
		$('.main-menu').find('.submenu').removeAttr('style');
	});
	
	if(!$('#wrapper').hasClass('sidebar-mini'))	{ 
		if (Modernizr.mq('(min-width: 768px)') && Modernizr.mq('(max-width: 868px)')) {
			$('#wrapper').addClass('sidebar-mini');
		}
		else if (Modernizr.mq('(min-width: 869px)'))	{
			if(!$('#wrapper').hasClass('sidebar-mini'))	{
			}
		}
	}
	
	$(window).resize(function() {
		if (Modernizr.mq('(min-width: 768px)') && Modernizr.mq('(max-width: 868px)')) {
			$('#wrapper').addClass('sidebar-mini').addClass('window-resize');
			$('.main-menu').find('.openable').removeClass('open');
			$('.main-menu').find('.submenu').removeAttr('style');
		}
		else if (Modernizr.mq('(min-width: 869px)'))	{
			if($('#wrapper').hasClass('window-resize'))	{
				$('#wrapper').removeClass('sidebar-mini window-resize');
				$('.main-menu').find('.openable').removeClass('open');
				$('.main-menu').find('.submenu').removeAttr('style');
			}
		}
		else	{
			$('#wrapper').removeClass('sidebar-mini window-resize');
			$('.main-menu').find('.openable').removeClass('open');
			$('.main-menu').find('.submenu').removeAttr('style');
		}
	});
	
	//fixed Sidebar
        $('#fixedSidebar').click(function()     {
            if($(this).prop('checked'))     {
                    $('aside').addClass('fixed');
            }
            else    {
                    $('aside').removeClass('fixed');
            }
    });


    $("#main-container").css("height",$(window).height() -45+"px");

	//autobus
	item = [];
	$("<li class='li-search li-search-message' style='display:none'><a href><span class='submenu-label'>No results</span></a></li>").appendTo($('#myline'))
	 $.each(routes.routesObjectsList, function( key, datata ) {
			var from;
			var to;
			for (var i in stations.stationsObjectsList) {
				var station = stations.stationsObjectsList[i];
				if (station['id'] == datata.from) {
					from = {
		     			id : station.id,
		     			name : station.name,
						lat : station.latLon.lat,
						lon : station.latLon.lon
		     		};
				}
				if (station['id'] == datata.towards) {
					to = {
		     			id : station.id,
		     			name : station.name,
						lat : station.latLon.lat,
						lon : station.latLon.lon
		     		};
				}
			};
			item.push({
	 			id : datata.id,
	 			name : datata.line,
	 			from : from,
				toward : to
	 		});
	 		$("<li class='li-search route_" + datata.id + "' data-id=\"" + datata.id + "\"><a href=''><span class='submenu-label'>" + datata.line + " " + to.name + "</span></a></li>").appendTo($('#myline'))
	  });



    $("#spotlight").on('keyup',function(e){
    	/*if(!((e.which > 47 && e.which < 58) || (e.which >68 && e.which< 91))) {
    		e.preventDefault();
    		return
    	}*/
    	var search = $(this).val();
    	if (search.length) {
    		var arr = [];
    		var i = 0;
    		var str = "";
    		var first = true;
    		ss = search.toLowerCase().trim().split(' ');

    		for (var it in item) {
    			var ok = true;
				for(var s in ss) {
					if (ss[s].length) {
						if ((item[it].name+" "+item[it].toward['name']).toLowerCase().indexOf(ss[s]) == -1){
							ok = false;
						}
					}
				}
    			if (ok){
    				arr[i] = "route_" + item[it].id;
    				if (!first) {
    					str += ","
    				}
    				str += " .route_" + item[it].id;
    				first = false;
    				i++;
    			}
    		}
    		if (str.length) {
    			$('.li-search-message').hide();
    			$('.li-search').addClass('disable-route');
    			$(str).removeClass('disable-route')
    		} else {
    			$('.li-search').addClass('disable-route');
    			$('.li-search-message').show();
    			console.log("Non ci sono elementi")
    		}
    		
    	} else {
    		$('.li-search-message').hide();
    		$('.li-search.disable-route').removeClass('disable-route');
    	}
    });
	
//timepicker
$('#timepicker').timepicker();

//on blur from nominatim field the function fromto is called
$('.nominatim').blur(fromto);



$('#searchgo').click(function(){
	if(nominatim1.value.length == 0){
		$("#nominatim1").addClass("error");
	}
	else
		$("#nominatim1").removeClass("error");

	if(nominatim2.value.length == 0){
		$("#nominatim2").addClass("error");
	}
	else
		$("#nominatim2").removeClass("error");
});

$('.li-search').click(function(e){
		e.preventDefault();
		var aData = $(e.currentTarget).data("id");
		$.getJSON( baseURL + "/routesearch?routeId="+ aData, function(data) {
			showRoute(data);
		});
	});


function dateToInt() {
	var time = $("#timepicker").val();
	var array = time.split(":");
	var hours = parseFloat(array[0]);
	var minutes = parseFloat(array[1]);
	var dayVal;
	switch ($("#stato").val()) {
	case ("0"):
		dayVal = 2880;
		break;
	case ("6"):
		dayVal = 1440;
		break;
	default:
		dayVal = 0;
	}
	if (hours === 12 && time.indexOf('AM') !== -1) {
		hours = 0;
	} else if (hours !== 12 && time.indexOf('PM') !== -1) {
		hours += 12;
	}
	return (dayVal + (hours * 60 + minutes));
}

// setTimeout(
//   function() 
//   {$('#myline').slimScroll({
//       alwaysVisible: true,
//       railVisible: true,

//       railColor: '#BECFE0'
//   });
//   }, 0);





$(".photon-input").on('keyup',function(e){
	var input = $(e.currentTarget)
	var that = $(e.currentTarget).parent();
	if (this.value.length > 4) {
	$('.photon-autocomplete').empty();	
	var komoot = 'http://photon.komoot.de/api/?q=';
	// var city = 'l%27aquila';
	var street = this.value.replace(" ","%20");
	var lat = '42.3540';
	var lon = '13.3919';
	var result = 2;
	var lang = 'it'; 
	
	$.getJSON(komoot + street + "&limit=" + result + "&lat="+ lat + "&lon=" + lon + "&lang=" + lang, function(data) {
		$('.photon-autocomplete').hide();
		$(".photon-autocomplete li.photon-row").remove();
		if(data.features.length == 0){
			that.addClass("photon-no-result");
				$("<li class='photon-row'><strong class=''>" + "No results" + "</strong><small class=''></small></li>").appendTo($('ul.photon-autocomplete',that))

			}
		else {	

		var uniquename = [];

		for (var i in data.features) {
			if (uniquename.indexOf(data.features[i].properties.name) == -1) {

				uniquename.push(data.features[i].properties.name)
				$("<li class='photon-row' id='" + data.features[i].properties.osm_id + "'><strong class='' data-name='" + data.features[i].properties.name + "'>" + data.features[i].properties.name + "</strong><small class=''>" + data.features[i].properties.city + "</small></li>")
					.on('click', function(ev){
						input.val($("strong", ev.currentTarget).attr('data-name'))
					})
					.appendTo($('ul.photon-autocomplete',that));
			}
			// console.log(data.features[i].properties.osm_id); 
			// console.log(data.features[i].properties.name);
			// console.log(data.features[i].properties.city);
		}	
		}	
		$('ul.photon-autocomplete',that).show();
	});
    }
});



$('.nominatim').blur(function(){
	setTimeout(function(){$('.photon-autocomplete').hide();}, 200)
		
});


// $('#item1').blur(function () {
//     var item1var = $('#item1').val();
//     $('#item2').val(item1var);
// });


// $('#photon-autocomplete').click(function(e){
// 		e.preventDefault();
// 		var aData = $(e.currentTarget).data("name");
// 		debugger;
// 		console.log(aData);
// 	});


var results = [];//global scope
var resultsInterval = -1;

function latlon(e, niente) {
	var URL = 'http://nominatim.openstreetmap.org/search?q=';
   	var citta = ',+laquila';
  	var format = 'json';
  	var start = e.replace(" ","%20");
	$.getJSON(URL + start + citta + "&format=" + format, function( nomi ) {
		if (nomi[0]) {
			results[niente] = nomi[0];
		} else {
			results[niente] = 'noresult';
		}
	});
};


$('#searchgo').click(function(e){
	var time = dateToInt(timepicker);

	clearInterval(resultsInterval);
	results = []

	var directions =$('#directionsPanel');
	directions.empty();
	var gggg = $("<div></div>");
	gggg.css({
		"height":"10px",
		"width":"10px",
		"textAlign":"center"
	});
	directions.append(gggg);
	gggg.spin();
  	latlon($("#nominatim1").val(), 0);
  	latlon($("#nominatim2").val(), 1);
  	
  	resultsInterval = setInterval(function(){
  		if (results[0] && results[1] ) {
  			clearInterval(resultsInterval);
  			if (results[0] == 'noresult' || results[1] == 'noresult') {
  				var directions =$('#directionsPanel');
				directions.hide();
				directions.empty();
  				$("#statusPanel").html("<p>No Path Found</p>")
				$("#statusPanel").addClass("error");
  			} else {
  				var URL2 =  baseURL + "directions?lat1=";
				item = [];
				$("<li class='' style='display:none'><a href><span class='submenu-label'>No results</span></a></li>").appendTo($('#prova'))			
				$.getJSON(URL2 + results[0].lat + "&lon1=" + results[0].lon + "&lat2="+ results[1].lat + "&lon2=" + results[1].lon + "&time=" + time, function(data) {
					$('#directionsPanel .outstage').remove();
					if (data == null) {
						var directions =$('#directionsPanel');
						directions.hide();
						directions.empty();
						$("#statusPanel").html("<p>No Path Found</p>")
						$("#statusPanel").addClass("error");
						console.log("No Path Found");
					} else {
						showDirections(data);
					}
				});
  			}

  			
  		}
  		
  	},300);
	

	
});


function showDirections(json) {
	var directions =$('#directionsPanel');
	directions.hide();
	directions.empty();
    directions.prepend("<div id='about'><div id='about_in' class='acc_container_dir'><h4>directions</h4></div></div>");
	$("#statusPanel").empty();
	processWalks(json);
	processRoutes(json);
	directions.slideDown();

}

function processWalks(json) {
	var walks = json.directionslist[0].walks;
	
	for (i = 0; i < walks.length; i++) {
		console.log(walks[i]);
		var deptStation = (i==walks.length-1) ?  "to Destination" : json.directionslist[0].routes[i].deptStation;
		var stg = $('<div id="stage'+i+'" class="outstage"></div>');
		var walk = $('<div id="walk'+i+'" class="stage walk">'+
			'<span class="directionsDisplayIcon directionsWalkIcon">'+
			'<small> Walk to ' + deptStation + '</small>'+
			'</span>'+
			'<p>' + walks[i].distance + ' mins</p>'+
			'</div>');

		stg.append(walk);

		$('#directionsPanel').append(stg);
	}

	

	}

function processRoutes(json) {
	var routes = json.directionslist[0].routes;
	
	for (i = 0; i < routes.length; i++) {

		var routetemplate = '<div id="route'+i+'" class="stage bus"><span class="directionsDisplayIcon directionsBusIcon"> \
			<small> Take the <%= routeId %>  Bus (<%= numOfStops %> Stops)</small> \
			</span> <p><%= deptTime %> - <%= arrTime %></p> \
			<p><i>Get off at: </i><%= arrStation %></p></div>';

		routetemplate = routetemplate.replace('<%= routeId %>', routes[i].routeId);
		routetemplate = routetemplate.replace('<%= numOfStops %>', routes[i].numOfStops);
		routetemplate = routetemplate.replace('<%= deptTime %>', routes[i].deptTime);
		routetemplate = routetemplate.replace('<%= arrTime %>', routes[i].arrTime);
		routetemplate = routetemplate.replace('<%= arrStation %>', routes[i].arrStation);

		var stg = $('div#stage'+i);

		var route = $(routetemplate);

		stg.append(route);

	}

}




});

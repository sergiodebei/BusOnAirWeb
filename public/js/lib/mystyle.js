
$(function	()	{

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

	
	var item = [];

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
	 		$("<li><a href=''><span class='submenu-label'>" + datata.line + " " + from.name + "</span></a></li>").appendTo($('#myline'))
	  });



	 $(function() {

    var availableTags = [
      "ActionScript",
      "AppleScript",
      "AppleScript2",
      "AppleScript3",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdF",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
        
        
    $("#spotlight").autocomplete({
		source: availableTags,
		appendTo: $("#myline")
	});
	
	$("#spotlight").data( "ui-autocomplete" )._renderMenu = function( ul, items ) {
		var that = this;		
		ul.attr("class", "nav nav-pills nav-stacked");
		$.each( items, function( index, item ) {
			that._renderItemData( ul, item );
		});
	};	    
    
});
});



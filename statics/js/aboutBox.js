// unlike you may think, this aboutBox.js was not ripped from internet but made by Kevin.

$(document).ready(function() {

	$('#btnAbout').click(function() {
		drawAboutBox();		
	});	

	function drawAboutBox() {
		var fader = '<div id="fader"></div>';
		var pop = '<div class="popBox"></div>';
		var boxContent = '<span class="boxMessage">This applications was created by Raoul & Kevin.<br/><br/><img src="images/icon_2.png"/><br/><br/><br/>using:<br/><a href="http://www.highcharts.com" target="_blank">Highcharts</a><br/><a href="http://www.nodejs.org" target="_blank">NodeJS</a><br/><a href="http://www.raspberrypi.org" target="_blank">Raspberry Pi</a></span>';
		$(fader).appendTo("body").animate({
			opacity: 0.8
			}, 500, function(){
				$('#fader').on("click", function() {
					$(this).animate({
						opacity: 0
					}, 600, function() {
						$(this).remove();
					});
				});				
				// draw popBox
				$(pop).appendTo("body").animate({
					opacity: 1,
					width: 400,
					height: 300,
					top: (($(window).height()) /2) - 150,
					left: (($(window).width()) /2) - 200
				}, 250, function() {
					$(boxContent).appendTo(this).hide().fadeIn(500);
					$('#fader').on("click", function() {
						$('.popBox').remove();
					});
				});			
		});
	}	
}); // document ready

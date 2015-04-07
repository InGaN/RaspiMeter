var server = new api('');
var dataArray = [];
var dataStart = Date.UTC(2015, 2, 25);
var dataInterval = 3600 * 1000 * 24;
var kwString;
var token = window.localStorage.getItem('token');
var chart1;

if (token) {
	$.ajaxSetup({
		headers: {
			'x-access-token': token
		}
	});
}
	
server.getDaily(function(content){		
	$.each(content.data, function(index, value) {		
		dataArray.push(value.daily);
	});
});



$(document).ready(function() {
	console.log('document ready');	
	
	$('.prettyTable').dataTable();
		
	reloadMeetingen();
			
	drawHighCharts();
	
	add((dataArray[dataArray.length-1] / 600).toString() + " Kilowatt afgelopen dag");
	
	if ($('#dropdownInterval').length > 0) {
		$('#dropdownInterval').change(function() {	
			var selection = $('#dropdownInterval option:selected').text();		
			if(selection != "") {	
				console.log(dataArray);
				dataArray = [];
				switch(selection) {	
					case "days":
						server.getDaily(function(content) {		
							$.each(content.data, function(index, value) {		
								dataArray.push(value.daily);
							});
						});	
						dataStart = Date.UTC(2015, 2, 25);
						dataInterval = 3600 * 1000 * 24;
						kwString = " Kilowatt afgelopen dag";
						break;					
					case "months":	
						server.getMonthly(function(content) {		
							$.each(content.data, function(index, value) {		
								dataArray.push(value.monthly);
							});
						});	
						dataStart = Date.UTC(2015, 2, 1);
						dataInterval = 3600 * 1000 * 24 * 31;						
						kwString = " Kilowatt afgelopen dag";
						break;
					case "years":	
						server.getYearly(function(content) {		
							$.each(content.data, function(index, value) {		
								dataArray.push(value.yearly);
							});
						});	
						dataStart = Date.UTC(2015, 2, 1);
						dataInterval = 3600 * 1000 * 24 * 31 * 12;						
						kwString = " Kilowatt afgelopen jaar";
						break;
				}
				
				setTimeout( function() { // wait until array push has finished...
					add((dataArray[dataArray.length-1] / 600).toString() + kwString);
					console.log(dataArray);
					chart1.series[0].update({	
						data: dataArray,
						pointStart: dataStart,
						pointInterval: dataInterval						
					}, true);
				}, 800);			
			}		
		});
	}	
}); // document ready

function reloadMeetingen()
{
	if ($('.prettyTable').length > 0) {
		table = $('.prettyTable').dataTable();
		oSettings = table.fnSettings();
		table.fnClearTable(this);
					
		server.exportValueToday(function(content){
			
			$.each(content.data, function(index, value)
			{			
				table.oApi._fnAddData(oSettings, [value.timestamp]);
			});
			oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			table.fnDraw();
		});
	}
}

function drawHighCharts() {
	if ($('#highchartsContainer').length > 0) {
		setTimeout(function(){
			$(function () { 
				Highcharts.setOptions({
					chart: {
						backgroundColor: {
							linearGradient: [0, 0, 500, 500],
							stops: [[0, 'rgba(255, 255, 255, 0.4)'],
								[1, 'rgba(240, 240, 255, 0.4)']]
						},
						borderColor: '#E4E4E4',
						borderWidth: 2,
						plotBackgroundColor: 'rgba(255, 255, 255, .9)',
						plotShadow: true,
						plotBorderWidth: 1
					}
				});
				
				chart1 = new Highcharts.Chart({
					chart: {
						renderTo: 'highchartsContainer',
						type: "column"
					},
					colors: ['#ff6000'],			
					series: [{
						data: dataArray,
						name: "measurements",
						pointStart: dataStart,
						pointInterval: dataInterval
					}],
					title: {
						text: "SmartMeter measurements"
					},
					xAxis: {
						type: 'datetime'
					},
					yAxis: {
						allowDecimals: false,
						title: {
							text: "amount of measurements"
						}
					}
				});
			});
		}, 500);
	}
}

function add(text){
	if ($('#txtOutput').length > 0) {
		var TheTextBox = document.getElementById("txtOutput");
		TheTextBox.value = text;
	}
}

var server = new api('');


$(document).ready(function() {
	
		$('.prettyTable').dataTable();
		
		reloadMeetingen();

		$('#getMeetingen').click(function(event){
			event.preventDefault();
			reloadMeetingen();
			return false;
		});		
});

function reloadMeetingen()
{
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

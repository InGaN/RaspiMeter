var server = new api('');

$(document).ready(function() {
		
		$('#getAPIKey').click(function(event){
			event.preventDefault();
			var username = $('[name="username"]').val();
			var password = $('[name="password"]').val();
			server.getAPIKey(username, password, function(result){
				if(result != 1) {
					alert("Er is iets niet goed gegaan");
				}
				else{
					alert("Welkom!");
					window.location.href = "/";
				}
			});
			return false;
		});
});
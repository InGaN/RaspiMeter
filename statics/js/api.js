function api(server) {
    this.server = server;
    
	this.exportValueToday = function(done) {
		$.get( this.server + '/api/exportValueToday', function( data ) {
			if(data.status != 1) {
				alert(data.data);
			}
			else {
				done(data);
			}
		});
	}
	
	this.getDaily = function(done) {
		$.get( this.server + '/api/getDaily', function( data ) {
			if(data.status != 1) {
				alert(data.data);
			}
			else {
				done(data);
			}
		});
	}
	
	this.getMonthly = function(done) {
		$.get( this.server + '/api/getMonthly', function( data ) {
			if(data.status != 1) {
				alert(data.data);
			}
			else {
				done(data);
			}
		});
	}
	
	this.getYearly = function(done) {
		$.get( this.server + '/api/getYearly', function( data ) {
			if(data.status != 1) {
				alert(data.data);
			}
			else {
				done(data);
			}
		});
	}
	
	this.getAPIKey = function(username, password, result) {
		$.post( this.server + '/api/login', {username: username, password: password})
		.done(function(data) {
			if(data.status != 1) {
				alert(data.message);
				window.localStorage.setItem('token', '');
				result(0);
			}
			else {
				window.localStorage.setItem('token', data.token);
				result(1);
			}
		});
	};
} 
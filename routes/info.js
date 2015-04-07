var info = {
	exportValueToday:  function(req, res) {
		var query;
		var db = req.app.get('dbConnection');
	
		query = QUERY_EXPORT_TODAY;
		db.query(query, function (err, rows, fields){	
			var results = [];
			if(err){
				res.json({ status:2, melding:'de query is onjuist '});
				return;
			}
			
			rows.forEach(function(item){
				results.push({
					timestamp: item.time
				});
			});

			res.json({status:1, data : results});
		});
	},
	
	getDaily:	function(req, res) {
		var query;
		var db = req.app.get('dbConnection');
	
		query = QUERY_DAILY;		
		db.query(query, function(err, rows, fields){			
			var results = [];
			if(err){
				res.json({ status:2, melding:'de query is onjuist '});
				return;
			}
			rows.forEach(function(item) {
				results.push({
					daily : item.amount
				});
			});
			res.json({status:1, data : results});
		});
	},
	
	getMonthly:	function(req, res) {
		var query;
		var db = req.app.get('dbConnection');
	
		query = QUERY_MONTHLY;		
		db.query(query, function(err, rows, fields){			
			var results = [];
			if(err){
				res.json({ status:2, melding:'de query is onjuist '});
				return;
			}
			rows.forEach(function(item) {
				results.push({
					monthly : item.amount
				});
			});
			res.json({status:1, data : results});
		});
	},
	
	getYearly:	function(req, res) {
		var query;
		var db = req.app.get('dbConnection');
	
		query = QUERY_YEARLY;		
		db.query(query, function(err, rows, fields){			
			var results = [];
			if(err){
				res.json({ status:2, melding:'de query is onjuist '});
				return;
			}
			rows.forEach(function(item) {
				results.push({
					yearly : item.amount
				});
			});
			res.json({status:1, data : results});
		});
	},
	
	insertValue:  function(req, res) {
		var query;
		var db = req.app.get('dbConnection');
		var timestamp = parseFloat(req.body.timestamp) || "t";
		
		if(isNaN(timestamp))
		{
			res.json({status:3, message:'Er is geen timestamp', time: req.body});
			return;
		}
				
		query = QUERY_INSERT1;
		db.query(query, function (err, rows, fields){
			if(err){
				res.json({ message: 'de query kon niet uitgevoert worden', error: err});
				return;
			}
			res.json({status:1, message: 'OK!'});
		});
	}
};

module.exports = info;
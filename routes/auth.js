var jwt = require('jwt-simple');
var auth = {

	login: function(req, res) {

		var username = req.body.username || '';
		var password = req.body.password || '';
		
        // Get username set in app.js
        var loginName = req.app.get('username');
		var loginPass = req.app.get('password');

		// Check for empy body
		if( username == '' || password == '' )
		{
			res.json( { "status": 401,
						"message":"Unknown USER, bye"
			});
			return;
		}

		// Check for valid user/passwd combo
        if ((username == loginName) && (password == loginPass)) {
            var now = new Date();
            var expires = now.setHours(now.getDay() + 10);
            var token = jwt.encode({
                iss: username,
                exp: expires
            }, req.app.get('secretkey'));

            res.json({
				status: 1,
                token: token,
                expires: expires,
                user: username
            });
        }
        else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Unknown USER"
            });
        }
    } 
}

module.exports = auth;
var bcrypt = require('bcrypt');
exports.login = function(req, res, next){
  		req.getConnection(function(error, connection){
  			
  			var input = JSON.parse(JSON.stringify(req.body));
			var username = input.username;
			var password = input.password;
  			if(error){
  				return next(error);
  			}

			connection.query('SELECT  * FROM users WHERE username = ?', username, function(error, users) {
			     var user = users[0];
			     console.log(users);

			    bcrypt.compare(input.password, users[0].password, function(err, pass){
			  	// bcrypt.compare(input.Admin, users.Admin, function(err, admin){
			    	if (err) {
			    		console.log(err);
			    	}

			    	console.log(pass);

			    	if (pass) {
			    		req.session.user = username;
			    		req.session.role =  user.role;
			    		return res.render("home")
			    		console.log(pass);
			    		//console.log(Admin);
			    	} else {
			    		 res.redirect('/home');
			    	
			    	};
				//});
			  	});
			});
		    });
  		};
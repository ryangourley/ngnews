'use strict';

app.factory('User', function($firebase, FIREBASE_URL, Auth, $rootScope){
	var ref = new Firebase(FIREBASE_URL + 'users');

	var users = $firebase(ref);

	function setCurrentUser (username){
		$rootScope.currentUser = User.findByUsername(username);
	}

	var User = {
		create: function (authUser, username) {
			users[username] = {
				/* jshint ignore:start */
				md5_hash: authUser.md5_hash,
				/*jshint ignore:end */
				username: username,
				$priority: authUser.uid
			};

			users.$save(username).then(function(){
				setCurrentUser(username);
			});
		},

		findByUsername: function (username) {
			if (username){
				return users.$child(username);
			}
		},
		getCurrent: function () {
    	return $rootScope.currentUser;
    },
    signedIn: function () {
    	return $rootScope.currentUser !== undefined;
    }
	};

	//handles the 'current user' when page is refreshed or logout initiated

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));
     
    	query.$on('loaded', function () {
    		setCurrentUser(query.$getIndex()[0]);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    delete $rootScope.currentUser;
  });


	return User;

});
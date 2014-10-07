app.models.signin = (function () {
    var title = 'signin';
    
    var $loginUsername;
    var $loginPassword;

    var init = function () {
      $loginUsername = $('#loginUsername');
      $loginPassword = $('#loginPassword');
    };

    var show = function () {
        $loginUsername.val('');
        $loginPassword.val('');
    };

    // Authenticate to use Backend Services as a particular user
    var login = function () {
      var username = $loginUsername.val();
      var password = $loginPassword.val();

      // Authenticate using the username and password
      app.everlive.Users.login(username, password)
      .then(function () {
          analytics.TrackFeature('Login.Regular');
          
          return app.models.Users.load();
      })
      .then(function () {
        // Determine where to navigate the user based on whether they have a
        // verification code set
        if (!app.models.Users.currentUser.data['AhaToken']) {
          app.mobileApp.navigate('views/ahaAuth.html');
        } else {
           app.mobileApp.navigate('views/products.html');
        }
      })
      .then(null,
        function (err) {
            app.showError(err.message);
        }
      );
    };

    var loginWithFacebook = function() {};
    var loginWithGoogle = function () {};

    return {
      init: init,
      show: show,
      getYear: app.getYear,
      login: login,
      loginWithFacebook: loginWithFacebook,
      loginWithGoogle: loginWithGoogle,
      title: title
    };
})();

/*
        // Authenticate using Facebook credentials
        var loginWithFacebook = function() {

            if (!isFacebookLogin) {
                return;
            }
            if (isInMistSimulator) {
                showMistAlert();
                return;
            }
            var facebookConfig = {
                name: 'Facebook',
                loginMethodName: 'loginWithFacebook',
                endpoint: 'https://www.facebook.com/dialog/oauth',
                response_type: 'token',
                client_id: appSettings.facebook.appId,
                redirect_uri: appSettings.facebook.redirectUri,
                access_type: 'online',
                scope: 'email',
                display: 'touch'
            };
            var facebook = new IdentityProvider(facebookConfig);
            app.mobileApp.showLoading();

            facebook.getAccessToken(function(token) {
                app.everlive.Users.loginWithFacebook(token)
                .then(function () {
                    // EQATEC analytics monitor - track login type
                    if (isAnalytics) {
                        analytics.TrackFeature('Login.Facebook');
                    }
                    return app.Users.load();
                })
                .then(function () {
                    app.mobileApp.hideLoading();
                    app.mobileApp.navigate('views/activitiesView.html');
                })
                .then(null, function (err) {
                    app.mobileApp.hideLoading();
                    if (err.code == 214) {
                        app.showError('The specified identity provider is not enabled in the backend portal.');
                    } else {
                        app.showError(err.message);
                    }
                });
            });
        };

        var loginWithGoogle = function () {

            if (!isGoogleLogin) {
                return;
            }
            if (isInMistSimulator) {
                showMistAlert();
                return;
            }
            var googleConfig = {
                name: 'Google',
                loginMethodName: 'loginWithGoogle',
                endpoint: 'https://accounts.google.com/o/oauth2/auth',
                response_type: 'token',
                client_id: appSettings.google.clientId,
                redirect_uri: appSettings.google.redirectUri,
                scope: 'https://www.googleapis.com/auth/userinfo.profile',
                access_type: 'online',
                display: 'touch'
            };
            var google = new IdentityProvider(googleConfig);
            app.mobileApp.showLoading();

            google.getAccessToken(function(token) {
                app.everlive.Users.loginWithGoogle(token)
                .then(function () {
                    // EQATEC analytics monitor - track login type
                    if (isAnalytics) {
                        analytics.TrackFeature('Login.Google');
                    }
                    return app.Users.load();
                })
                .then(function () {
                    app.mobileApp.hideLoading();
                    app.mobileApp.navigate('views/activitiesView.html');
                })
                .then(null, function (err) {
                    app.mobileApp.hideLoading();
                    if (err.code == 214) {
                        app.showError('The specified identity provider is not enabled in the backend portal.');
                    } else {
                        app.showError(err.message);
                    }
                });
            });
        };

*/
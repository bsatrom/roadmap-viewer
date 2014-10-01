app.models.ahaAuth = (function () {
    var client_id = '1d6653c08451fbfcebb340183630da718bc0138b957dcd187969ca8185486c66',
      redirect_uri = 'urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob',
      auth_url_base = 'https://secure.aha.io/oauth/authorize',
      response_type = 'token';

    var auth_url = auth_url_base + '?client_id=' + client_id +
      '&redirect_uri=' + redirect_uri + '&response_type=' +
      response_type;   
    
    var setToken = function(token) {
      var userData = app.models.Users.currentUser.data;
      
      if (userData['AhaToken'] !== token) {
        userData['AhaToken'] = token;

        alert("Code: " + userData['AhaToken']);
        Everlive.$.Users.updateSingle({'Id': userData.Id, 'AhaToken': userData['AhaToken']}, 
        function(data) {
          analytics.TrackFeature('Aha.Authorization');
        }, function(err) {
          app.showError(JSON.stringify(err));
        });
      }

      app.mobileApp.navigate('views/home.html');
    };

    var getToken = function() {
      return app.models.Users.currentUser.data['AhaToken'];
    };

    var connectAha = function() {
      win = window.open(auth_url, '_blank', 'location=yes');
      
      win.addEventListener('loadstop', function(e) {
        var end = e.url.substr(e.url.lastIndexOf('/') + 1);
        
        if (end != 'new') {
          setToken(end);
          win.close();
        }
      });
    };

    var connectGuest = function() {
      alert('feature coming soon');
    };

    return {
      getToken: getToken,
      connect: connectAha,
      connectAsGuest: connectGuest
    }
})();
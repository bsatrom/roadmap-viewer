app.aha = (function () {
    var client_id = '1d6653c08451fbfcebb340183630da718bc0138b957dcd187969ca8185486c66',
      redirect_uri = 'urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob',
      auth_url_base = 'https://secure.aha.io/oauth/authorize',
      response_type = 'token';

    var win;
    return {
        auth_url: auth_url_base + '?client_id=' + client_id +
          '&redirect_uri=' + redirect_uri + '&response_type=' +
          response_type,
        setToken: function(token) {
          alert(token);
        }
    }
})();
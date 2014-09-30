app.models.home = (function () {
    var title = 'home';
    var win;
    return {
        connectAha: function() {
          win = window.open(app.aha.auth_url, '_blank', 'location=yes');
          
          win.addEventListener('loadstop', function(e) {
            var end = e.url.substr(e.url.lastIndexOf('/') + 1);
            
            if (end != 'new') {
              app.aha.setToken(end);
              win.close();
            }
          });
        },

        title: title
    }
})();
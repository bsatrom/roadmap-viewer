app.models.home = (function () {
    var title = 'home';
    var win;
    return {
        connectAha: function() {
          win = window.open(app.aha.auth_url, '_blank', 'location=yes');
          
          win.addEventListener('loadstop', function(e) {
            alert(e.url);
          });
        },

        title: title
    }
})();
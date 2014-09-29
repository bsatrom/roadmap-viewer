app.models.home = (function () {
    var title = 'home';
    var win;
    return {
        connectAha: function() {
          win = window.open(app.aha.auth_url, '_blank', 'location=yes');
        },

        title: title
    }
})();
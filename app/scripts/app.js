(function () {
    var os = kendo.support.mobileOS;
    
    var showAlert = function(message, title, callback) {
      if (navigator.notification) { 
        navigator.notification.alert(message, callback || function() {}, title, 'OK');
      } else {
        console.log(message);
      }
    }

    var showError = function(message) {
        showAlert(message, 'Error occured');
    }

    window.addEventListener('error', function(e) {
        e.preventDefault();

        // TODO: Re-enable exception tracking
        //analytics.Monitor().TrackException(e, e.message);

        var msg = e.message + ' from ' + e.filename + ':' + e.lineno;

        showAlert(msg, 'Error occured'); 

        return true;
    });

    // Handle device back button tap
    var onBackKeyDown = function(e) {
        e.preventDefault();

        navigator.notification.confirm('Do you really want to exit?', function (confirmed) {
            var exit = function () {
                navigator.app.exitApp();
            };

            if (confirmed === true || confirmed === 1) {
                analytics.Stop();
                appHelper.logout().then(exit, exit);
            }

        }, 'Exit', 'Ok,Cancel');
    };

    // Initialize Everlive SDK
    var el = new Everlive({
        apiKey: window.app.settings.everlive.apiKey,
        scheme: window .app.settings.everlive.scheme
    });

    var appHelper = {

        // Return user profile picture url
        resolveProfilePictureUrl: function (id) {
            if (id && id !== emptyGuid) {
                return el.Files.getDownloadUrl(id);
            } else {
                return 'styles/images/avatar.png';
            }
        },

        // Current user logout
        logout: function () {
            return el.Users.logout();
        }
    };

    var getYear = (function () {
        var currentTime = new Date();
        return currentTime.getFullYear();
    }());

    var app = {
        models: {},
        showAlert: showAlert,
        helper: appHelper,
        everlive: el,
        getYear: getYear
    }; 
    
    app.mobileApp = new kendo.mobile.Application(document.body, {
        skin: 'flat',
        statusBarStyle: os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black',
        initial: 'views/signin.html'
    });
    
    document.addEventListener('deviceready', function () {
      navigator.splashscreen.hide();
      feedback.initialize(window.app.settings.feedback.apiKey);
    }, false);
    

    $.extend(window.app, app);
}());
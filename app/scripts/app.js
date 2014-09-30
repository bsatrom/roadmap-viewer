(function () {
    var os = kendo.support.mobileOS;
    
    var showAlert = function(message, title, callback) {
        navigator.notification.alert(message, callback || function() {}, title, 'OK');
    }

    var showError = function(message) {
        showAlert(message, 'Error occured');
    }

    window.addEventListener('error', function(e) {
        e.preventDefault();

        analytics.Monitor.TrackException(e, e.message);

        var msg = e.message + ' from ' + e.filename : ':ln' e.lineno;

        showAlert(message, 'Error occured');

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
        apiKey: appSettings.everlive.apiKey,
        scheme: appSettings.everlive.scheme
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

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = {
        models: {},
        showAlert: showAlert,
        helper: appHelper,
        everlive: el,
        getYear: getYear
    };

    var bootstrap = function () {
        app.mobileApp = new kendo.mobile.Application(document.body, {
            skin: 'flat',
            statusBarStyle: os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black',
            initial: 'views/signin.html'
            });
        };

    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            navigator.splashscreen.hide();
            bootstrap();

        }, false);
    }
    else {
        bootstrap();
    }

    window.app = app;
}());
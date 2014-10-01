app.models.Users = (function () {
    'use strict';

    var currentUser = kendo.observable({ data: null });
    var usersData;

    // Retrieve current user and all users data from Backend Services
    var loadUsers = function () {
        // Get the data about the currently logged in user
        return app.everlive.Users.currentUser()
        .then(function (data) {
            currentUser.set('data', data.result);
        })
        .then(null,
          function (err) {
            app.showError(err.message);
          }
        );
    };

    return {
        load: loadUsers,
        currentUser: currentUser
    };
}());
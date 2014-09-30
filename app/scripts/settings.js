(function() {
  var appSettings = {

      everlive: {
          apiKey: '8tvzSOnNUmFUnYnj',
          scheme: 'http'
      },

      eqatec: {
          productKey: '2eca48442c944b76a7026230232f037d',
          version: '1.0.0.0' // Put your application version here
      },
      
      feedback: {
          apiKey: '0a984460-4867-11e4-b447-d9fbe196dadc'
      },

      facebook: {
          appId: '1408629486049918', // Put your Facebook App ID here
          redirectUri: 'https://www.facebook.com/connect/login_success.html' // Put your Facebook Redirect URI here
      },

      google: {
          clientId: '406987471724-q1sorfhhcbulk6r5r317l482u9f62ti8.apps.googleusercontent.com', // Put your Google Client ID here
          redirectUri: 'http://localhost' // Put your Google Redirect URI here
      }
  };

  app.settings = appSettings;
}());
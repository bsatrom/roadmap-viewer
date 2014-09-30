app.models.signup = (function () {
    var title = 'signup';
    
    var dataSource;
    var $signUpForm;
    var $formFields;
    var $signupBtnWrp;
    var validator;

    var signup = function() {
      Everlive.$.Users.register(
            dataSource.Username,
            dataSource.Password,
            dataSource)
        .then(function () {
            app.showAlert("Registration successful");
            app.mobileApp.navigate('#signin');
        },
        function (err) {
            app.showError(err.message);
        });
    };

    // Initialize the signup
    var init = function () {
      $signUpForm = $('#signup');
      $formFields = $signUpForm.find('input, textarea, select');
      $signupBtnWrp = $('#signupBtnWrp');
      validator = $signUpForm.kendoValidator({ validateOnBlur: false }).data('kendoValidator');

      $formFields.on('keyup keypress blur change input', function () {
        if (validator.validate()) {
          $signupBtnWrp.removeClass('disabled');
        } else {
          $signupBtnWrp.addClass('disabled');
        }
      });
    };

    // Executed after show of the Signup view
    var show = function () {
      dataSource = kendo.observable({
        Username: '',
        Password: '',
        DisplayName: '',
        Email: ''
      });
      kendo.bind($('#signup-form'), dataSource, kendo.mobile.ui);
    };

    // Executed after hide of the Signup view
    // disable signup button
    var hide = function () {
      $signupBtnWrp.addClass('disabled');
    };

    var onSelectChange = function (sel) {
      var selected = sel.options[sel.selectedIndex].value;
      sel.style.color = (selected == 0) ? '#b6c5c6' : '#34495e';
    }

    return {
      title: title,
      init: init,
      show: show,
      hide: hide,
      onSelectChange: onSelectChange,
      signup: signup
    }
})();
$(document).ready(function () {
    $('#reg-form').submit(function (event) { 
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "/users/register",
            data: {
                'user_name':event.target.inputUsername.value,
                'password':event.target.inputPassword1.value
            },
            dataType: "json",
            success: function (token) {
                $(location).attr('href', '/feed');
            },
            error: function (errMsg) {
                swal(
                    'Oops...',
                    errMsg.responseJSON.body,
                    'error'
                );

              }
        });
        
    });

    $("#log-form").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/users/login',
            dataType: 'json',
            data: {
                'user_name': event.target.inputUsername.value,
                'password': event.target.inputPassword1.value
            },
            success: function(token){
                 $(location).attr('href', '/feed' );
      // Redirect to logged in page
            },
            error: function(errMsg) {
                swal(
                    'Oops...',
                    errMsg.responseJSON.body,
                    'error'
                )
            }
        });
    });
});


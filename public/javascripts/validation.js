$(document).ready(function () {
    //alert(1);
    $('#myform').validate({ // initialize the plugin
        rules: {
        	name: {
                required: true
            },
            username: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
    });

});
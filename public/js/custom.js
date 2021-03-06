$(document).ready(function () {
  var first_name, last_name, phone, email, message;
  $("#contact_form").submit(function () {
    event.preventDefault();
    first_name = $("#first_name").val();
    last_name = $("#last_name").val();
    phone = $("#phone").val();
    email = $("#email").val();
    message = $("#message").val();
    $.post("/contact", { first_name: first_name, last_name: last_name, phone: phone, email: email, message: message },
      function (data, status) {
        if (data === 'ok' && status == "success") {
          // console.log("ok success");
          $("#success-popup").toggleClass('show');
          setTimeout(function () {
            // console.log("ok timeout");

            $("#success-popup").toggleClass('show');
          }, 2000
          );
          document.getElementById("contact_form").reset();
        }
      });
  });

});

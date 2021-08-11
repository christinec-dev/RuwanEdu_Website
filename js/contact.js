$(document).ready(function() {
  (function($) {
    "use strict";

    jQuery.validator.addMethod(
      "answercheck",
      function(value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      "type the correct answer -_-"
    );

    // validate contactForm form
    $(function() {
      $("#contactForm").validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          surname: {
            required: true,
            minlength: 2
          },
          subject: {
            required: true,
            minlength: 4
          },
          email: {
            required: true,
            email: true
          },
          message: {
            required: true,
            minlength: 20
          }
        },
        messages: {
          name: {
            required: "Please enter a name",
            minlength: "Your name must consist of at least 2 characters"
          },
          surname: {
            required: "Please enter a surname",
            minlength: "Your surname must consist of at least 2 characters"
          },
          subject: {
            required: "Please enter a subject",
            minlength: "your subject must consist of at least 4 characters"
          },
          email: {
            required: "Please enter a valid email"
          },
          message: {
            required: "Please tell us what it is about",
            minlength: "thats all? really?"
          }
        },
        submitHandler: function(form) {
          $(form).ajaxSubmit({
            type: "POST",
            data: $(form).serialize(),
            url: "contact_process.php",
            success: function() {
              $("#contactForm :input").attr("disabled", "disabled");
              $("#contactForm").fadeTo("slow", 1, function() {
                $(this)
                  .find(":input")
                  .attr("disabled", "disabled");
                $(this)
                  .find("label")
                  .css("cursor", "default");
                $("#success").fadeIn();
                $(".modal").modal("hide");
                $("#success").modal("show");
              });
            },
            error: function() {
              $("#contactForm").fadeTo("slow", 1, function() {
                $("#error").fadeIn();
                $(".modal").modal("hide");
                $("#error").modal("show");
              });
            }
          });
        }
      });
    });
  })(jQuery);
});

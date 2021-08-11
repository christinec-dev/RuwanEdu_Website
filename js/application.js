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
      $("#myForm").validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          surname: {
            required: true,
            minlength: 2
          },
          description: {
            required: true,
            minlength: 10
          },
          number: {
            required: true,
            minlength: 5
          },
          email: {
            required: true,
            email: true
          },
          city: {
            required: true,
            minlength: 2
          },
          country: {
            required: true,
            minlength: 2
          }
        },
        messages: {
          name: {
            required: "I won't tell anybody your name, so enter it!",
            minlength: "Your name must consist of at least 2 characters."
          },
          subject: {
            required: "What's it about?",
            minlength: "Your subject must consist of at least 4 characters."
          },
          number: {
            required: "Please enter your number.",
            minlength: "Your number must consist of at least 5 characters."
          },
          email: {
            required: "Uhm, I'm pretty sure you need an email address for this."
          },
          description: {
            required:
              "Sorry but you have to write something to send this form.",
            minlength: "Tell me a bit more."
          }
        },
        submitHandler: function(form) {
          $(form).ajaxSubmit({
            type: "POST",
            data: $(form).serialize(),
            url: "application.php",
            success: function() {
              $("#contactForm :input").attr("disabled", "disabled");
              $("#contactForm").fadeTo("slow", 0.1, function() {
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
              $("#contactForm").fadeTo("slow", 0.1, function() {
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

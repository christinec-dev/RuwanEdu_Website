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
    $(function() {
      $("#subscriptionForm").validate({
        rules: { email: { required: !0, email: !0 } },
        messages: {
          email: { required: "Please enter a valid email address." }
        },
        submitHandler: function(form) {
          $(form).ajaxSubmit({
            type: "POST",
            data: $(form).serialize(),
            url: "subscribe.php",
            success: function() {
              $("#subscriptionForm :input").attr("disabled", "disabled");
              $("#subscriptionForm").fadeTo("slow", 0.1, function() {
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
              $("#subscriptionForm").fadeTo("slow", 0.1, function() {
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

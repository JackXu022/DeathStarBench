var hide = document.getElementById("hide-post");
var show = document.getElementById("show-post");

hide.addEventListener("click", function () {
  $("#compose").hide();
});

// show.addEventListener("click", function () {
//     $("#compose").show();
// })
show.addEventListener("click", function () {
  $("#compose").toggle();
});

$(document).ready(function () {
  // Check Radio-box
  $(".rating input:radio").attr("checked", false);

  $(".rating input").click(function () {
    $(".rating span").removeClass("checked");
    $(this).parent().addClass("checked");
  });

  $("input:radio").change(function () {
    var userRating = this.value;
    alert(userRating);
  });
});

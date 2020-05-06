function uploadPost() {
  if (document.getElementById("post-content").value !== "") {
    const Http = new XMLHttpRequest();
    const url =
      "http://" + window.location.hostname + ":18080/wk2-api/review/compose";
    Http.open("POST", url, true);
    var body =
      "text=" +
      document.getElementById("post-content").value +
      "&username=username_1&password=password&rating=" +
      userRating +
      "&title=" +
      document.getElementById("movie-title").value;
    alert(body);
    Http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(Http.responseText);
      }
    };
    Http.send(body);
    window.location.reload();
  }
}

var hide = document.getElementById("hide-post");
var show = document.getElementById("show-post");
var userRating;

hide.addEventListener("click", function () {
  $("#compose").hide();
});

// show.addEventListener("click", function () {
//   $("#compose").show();
// });
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
    userRating = this.value;
  });
});

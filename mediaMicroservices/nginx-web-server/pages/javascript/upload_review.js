const uploadReview = (uploadRating) => {
    const url =
        "http://" + window.location.hostname + ":18080/wrk2-api/review/compose";
    // const url = "http://ath-8.ece.cornell.edu:18080/wrk2-api/review/compose";
    const username = "username_1";
    const password = "password_1";
    let title = $("#data-title").text().trim();
    let review = $("#upload-text").val().trim();
    let rating = uploadRating;
    const data = {
        title: title,
        text: review,
        username: username,
        password: password,
        rating: rating,
    };
    console.log(data);
    if (rating > 0 && review != "" && review != null) {
        $.ajax(url, {
            data: data,
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            success: function (data, textStatus, jqXHR) {
                location.reload(true);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error:" + errorThrown);
            },
        });
    }
};

// upload stars

let stars = $(".upload-star");
let starsDiv = $("#upload-rating-div");
var uploadRating = 0;

stars.on("click", function (event) {
    let index = stars.index($(this)) + 1;
    for (let i = 1; i <= 5; i++) {
        if (i <= index) {
            $("#star" + i).addClass("star-active");
        } else {
            $("#star" + i).removeClass("star-active");
        }
    }

    uploadRating = index;
});

// buttons
$("#review-button").click(function () {
    $("#upload-div").toggleClass("hidden");
});

$("#upload-button").click(function () {
    uploadReview(uploadRating);
});

$("#cancel-button").click(function () {
    $("#upload-div").addClass("hidden");
});

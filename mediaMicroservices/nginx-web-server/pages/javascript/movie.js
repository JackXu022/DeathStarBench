// get movie id from URL
const getMovieId = () => {
    let vars = [];
    let hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
    for (var i = 0; i < hashes.length; i++) {
        let hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars["movie_id"];
};

// send movie id to Lua
// return JSON file
const sendMovieId = (movieId) => {
    let url = ""; // TODO: get URL there
    let sendData = { movie_id: movieId };
    let returnData;
    $.getJSON(url, sendData, function (data) {
        returnData = data;
    });
    return returnData;
};

// generate review list
const generateReviewList = (reviewList) => {
    reviewList.forEach(function (item, i) {
        let reviewItem =
            '<div class="card review-list-item"><div class="card-header"><p id="review-list-username">Anonymous User</p><p id="review-list-rating">Rating:' +
            item["rating"] +
            '</p></div><div class="card-body"><p class="card-text">' +
            item["text"] +
            "</p></div></div>";
        $("#review-list").append(reviewItem);
    });
};

const generateCastList = (castList) => {
    castList.forEach(function (item, i) {
        let castItem =
            '<div class="card"><div class="card-body"><h3 class="card-title">' +
            item["name"] +
            "</h3></div></div>";
        $("#cast-list").append(castItem);
    });
};

// render the data in the HTML
const renderData = (data) => {
    console.log(data);
    // get data
    let title = data["title"];
    let rating = data["rating"];
    let plot = data["plot"];
    // check the following index
    let reviews = data["reviews"];
    let casts = data["cast_infos"];

    // fill data in HTML
    $("#data-title").text(title);
    $("#data-rating").text(rating);
    $("#data-plot").text(plot);

    generateReviewList(reviews);
    generateCastList(casts);
};

// main codes

let movieId = getMovieId();

let data = sendMovieId(movieId);

renderData(data);

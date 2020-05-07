const generateStars = (num) => {
    const star = '<span class="rating-star">&#9733</span>';
    const star_active = '<span class="rating-star star-active">&#9733</span>';

    let res = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= num) {
            res += star_active;
        } else {
            res += star;
        }
    }

    return res;
};

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
    // const url = "http://" + window.location.hostname + ":18080/wk2-api/movie-info/read";
    const url = "http://ath-1.ece.cornell.edu:18080/wrk2-api/movie-info/read";
    let sendData = { movie_id: movieId, start: 0, stop: 1000 };
    let returnData;
    $.getJSON(url, sendData, function (data) {
        returnData = data;
    });
    return returnData;
};

// generate review list
const generateReviewList = (reviewList) => {
    reviewList.forEach(function (item, i) {
        let rating = item["rating"];
        let stars = generateStars(rating);
        let reviewItem =
            '<div class="card review-list-item"><div class="card-header"><p id="review-list-username">Anonymous User</p><p id="review-list-rating">Rating:' +
            stars +
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
    // get data
    let title = data["title"];
    let plot = data["plot"];
    let rating = Number(data["movie_id"]["avg_rating"]);
    rating = Math.floor(rating / 2);
    // check the following index
    let reviews = data["reviews"];
    let casts = data["cast_infos"];

    // fill data in HTML
    $("#data-title").text(title);
    $("#data-plot").text(plot);

    $("#data-rating").html(generateStars(rating));

    generateReviewList(reviews);
    generateCastList(casts);
};

// main codes

let movieId = getMovieId();

let data = sendMovieId(movieId);

console.log(data);

renderData(data);

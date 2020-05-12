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
    const url =
        "http://" + window.location.hostname + ":18080/wk2-api/movie-info/read";
    // const url = "http://ath-8.ece.cornell.edu:18080/wrk2-api/movie-info/read";
    let sendData = { movie_id: movieId, start: 0, stop: 1000 };
    $.getJSON(url, sendData, function (data) {
        renderData(data);
    });
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

const getRating = (reviewList) => {
    let sum = 0;
    let count = 0;
    reviewList.forEach(function (item, i) {
        sum += item["rating"];
        count++;
    });
    // take average and convert from 5 base to 10 base
    let rating = (sum / count) * 2;
    return rating.toFixed(1);
};

// render the data in the HTML
const renderData = (data) => {
    console.log(data);
    // get data
    let movie_info = data["movie_info"];
    let title = movie_info["title"];
    let plot = data["plot"];
    // let rating = Number(movie_info["avg_rating"]);
    // rating = Math.floor(rating / 2);
    let reviews = data["reviews"];
    let casts = data["cast_infos"];

    // fill data in HTML
    $("#data-title").text(title);
    $("#data-plot").text(plot);

    let rating = getRating(reviews);

    $("#data-rating").text(rating);

    generateReviewList(reviews);
    generateCastList(casts);
};

// main codes

let movieId = getMovieId();

sendMovieId(movieId);

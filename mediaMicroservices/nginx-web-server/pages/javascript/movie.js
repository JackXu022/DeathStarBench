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
    $.get(url, sendData, function (data) {
        returnData = data;
    });
    return returnData;
};

// render the data in the HTML
const renderData = (data) => {
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
};

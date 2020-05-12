const getMovieList = () => {
    $.getJSON("../../../datasets/tmdb/movies.json", function (data) {
        renderData(data);
    });
};

const getPageNum = (maxPage) => {
    let vars = [];
    let hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
    for (var i = 0; i < hashes.length; i++) {
        let hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    let pageNum = Math.floor(vars["page"]);
    if (!pageNum) {
        return 1;
    } else if (pageNum > maxPage || pageNum < 1) {
        window.location.replace("index.html");
    } else {
        return pageNum;
    }
};

const generateMovieItem = (title, id, poster) => {
    let movieItem =
        '<div class="movie-list-item col-4"><a href="movie.html?movie_id=' +
        id +
        '"><div class="card"><img src="https://image.tmdb.org/t/p/w500' +
        poster +
        '"class="card-img-top"alt="' +
        title +
        ' poster"/><div class="card-body"><h5 class="card-title">' +
        title +
        "</h5></div></div></a></div>";

    $("#movie-list").append(movieItem);
};

const buttonHandler = (pageNum, maxPage) => {
    if (pageNum > 1) {
        $("#prev-button").click(function () {
            window.location.href = "index.html?page=" + (pageNum - 1);
        });
    } else {
        $("#prev-button").hide();
    }

    if (pageNum < maxPage) {
        $("#next-button").click(function () {
            window.location.href = "index.html?page=" + (pageNum + 1);
        });
    } else {
        $("#next-button").hide();
    }
};

const renderData = (movies) => {
    let moviesNum = movies.length;
    let showNum = 9;
    let maxPage = Math.ceil(moviesNum / showNum);
    let pageNum = getPageNum(maxPage);

    buttonHandler(pageNum, maxPage);
    // window.pageNum = pageNum;

    let start = (pageNum - 1) * showNum;
    let end = Math.min(pageNum * showNum, moviesNum);

    for (let i = start; i < end; i++) {
        let movie = movies[i];
        let title = movie["title"];
        let poster = movie["poster_path"];
        let id = movie["id"];
        generateMovieItem(title, id, poster);
    }
};

getMovieList();

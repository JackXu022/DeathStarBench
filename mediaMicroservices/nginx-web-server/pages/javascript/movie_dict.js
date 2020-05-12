const getMovieDict = () => {
    let dict = {};
    let data = {};
    $.getJSON("../../../datasets/tmdb/movies.json", function (json) {
        data = json;
        console.log(data);
        for (i in json) {
            dict[json[i]["title"]] = json[i]["id"];
        }
    });
    console.log(dict);
    console.log(data);
    return dict;
};
getMovieDict();

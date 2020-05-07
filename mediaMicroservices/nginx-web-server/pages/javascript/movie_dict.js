const getMovieDict = () => {
var dict = {}
$.getJSON("/DeathStarBench/mediaMicroservices/datasets/tmdb/movies.json", function(json) {
  for(i in json){
    dict[json[i]['title']] = json[i]['id'];
  }
});
console.log(dict);
return dict;
};
getMovieDict();
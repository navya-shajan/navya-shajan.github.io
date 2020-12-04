const API_KEY="daf7b11fd7dfe1a364da7a86d79ba727";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const URL = "https://api.themoviedb.org";
/*----------------------url fetch-----------------------*/
function api_request(url,onComplete,onError){
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}
/*----------------------Movie Url Path----------------------- */
function movieDBUrl(path){
    const url = `${URL}/3${path}?api_key=${API_KEY}`;
    return url;
}
/*----------------------Trending Movies----------------------- */
function getTrendingMovies(){
    const url = movieDBUrl('/trending/movie/day');
    const render = renderMovies.bind({ title: 'Trending Movies' })
    api_request(url,render,handleGeneralError);
}
/*----------------------Upcomming Movies----------------------- */
function getUpcommingMovies(){
    const url = movieDBUrl('/movie/upcoming');
    const render = renderMovies.bind({ title: 'Upcoming Movies' })
    api_request(url,render,handleGeneralError);
}
/*------------------------Top Rated Movies--------------------- */
function getTopRatedMovies() {
    const url = movieDBUrl(`/movie/top_rated`);
    const render = renderMovies.bind({ title: 'Top Rated Movies' })
    api_request(url, render, handleGeneralError);
}
/*-----------------------Search Movies--------------------------------------- */
function searchMovie(value) {
    const url = movieDBUrl('/search/movie') + '&query=' + value;
    api_request(url, renderSearchMovies, handleGeneralError);
}
/*----------------------------Get Video-----------------------------------*/
function getVideoByMovieId(movieId, content){
    const url = movieDBUrl(`/movie/${movieId}/videos`);
    const render = createVideoTemplate.bind({content});
    api_request(url,render,handleGeneralError);
}
/*----------------------------Get Genre list---------------------------------*/
function getGenresId(genreName){
const url = movieDBUrl(`/genre/movie/list`);
const render = getMovieByGenreId.bind({genreName});
api_request(url,render,handleGeneralError);
}
/*-------------------------------Get Movie by Genre----------------*/
function getMovieByGenre(genreId){
    const url = movieDBUrl(`/discover/movie`);
    const newUrl =url+`&with_genres=${genreId}`;
    api_request(newUrl,renderSearchMovies,handleGeneralError);
}
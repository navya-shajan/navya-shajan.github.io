const API_KEY="daf7b11fd7dfe1a364da7a86d79ba727";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const URL = "https://api.themoviedb.org/3/search/movie?api_key=";

//selecting search elements from DOM
const inputElement=document.querySelector("#searchBox");
const movieSearchable=document.querySelector("#movies-searchable");

inputElement.onsearch=function(event){
   
    const value=inputElement.value;
    const newUrl= URL+API_KEY+'&query='+value;
    fetch(newUrl)
        .then((res) => res.json())
        .then((data) => {
            //clearing the values inside
            movieSearchable.innerHTML = '';
            const movies = data.results;
            const movieBlock = movieContainer(movies);
            movieSearchable.appendChild(movieBlock);
        })
        .catch((error)=>{
            console.log('Error:',error);
        });
    console.log('Value: ',value);
}

function movieContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');
    const movieTemplate =`
    <section class = "section">
    ${movies.map((movie) => {
        if(movie.poster_path){
        return`
        <img src = ${IMG_URL + movie.poster_path} data-movie-id=${movie.id}/>
        `;
        }
    })}
    </section>
    <div class = "content">
    <p id = "content-close">X</p>
    </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}
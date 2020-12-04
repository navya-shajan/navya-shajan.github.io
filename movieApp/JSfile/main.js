//selecting elements from DOM
const inputElement=document.querySelector("#searchBox");
const movieSearchable=document.querySelector("#movies-searchable");
const containerElement=document.querySelector("#Container");
function resetInput(){
    inputElement.value = '';
}
function handleGeneralError(error){
console.log('Error: ',error.message);
alert(error.message||'Internal Server');
}
function createSectionHeader(title){
    const header = document.createElement('h2');
    header.setAttribute('class','titleHeader');
    header.innerHTML = title;
    return header;
}
function renderMovies(data){
    const moviesBlock = generateMoviesBlock(data);
    const header = createSectionHeader(this.title);
    moviesBlock.insertBefore(header,moviesBlock.firstChild);
    containerElement.appendChild(moviesBlock);
}
function renderSearchMovies(data){
    movieSearchable.innerHTML = "";
    const movieBlock = generateMoviesBlock(data);
    movieSearchable.appendChild(movieBlock);
}
function generateMoviesBlock(data){
    const movies = data.results;
    const section = document.createElement('section');
    section.setAttribute('class','section');
        for(let i=0;i<movies.length;i++){
            const {poster_path, id} = movies[i];
                if(poster_path){
                    const imageUrl=IMG_URL+poster_path;
                    const imageContainer = createImageContainer(imageUrl, id);
                    section.appendChild(imageContainer);
                }
        }
        const movieSectionContent = createMovieContainer(section);
        return movieSectionContent;   
}
function createImageContainer(imageUrl, id){
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class','imgContainer');
    tempDiv.setAttribute('data_id', id);
        const movieEle =`
        <img src="${imageUrl}" data_movie_id="${id}">`;
        tempDiv.innerHTML = movieEle;
        return tempDiv;
}
function createMovieContainer(section){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');
        const template = `
        <div class="content">
        <p id="content-close">X</p>
        </div>`;
        movieElement.innerHTML = template;
        movieElement.insertBefore(section, movieElement.firstChild);
        return movieElement;
}
function createIframe(video){
    const videoKey = (video && video.key) || 'No key found!!!';
        const iframe = document.createElement('iframe');
        iframe.src = `http://www.youtube.com/embed/${videoKey}`;
        iframe.width = 360;
        iframe.height = 315;
        iframe.allowFullscreen = true;
        return iframe;
}
function insertIframeIntoContent(video, content) {
    const videoContent = document.createElement('div');
    const iframe = createIframe(video);
    videoContent.appendChild(iframe);
    content.appendChild(videoContent);
}
function createVideoTemplate(data) {
    const content = this.content;
    content.innerHTML = '<p id="content-close">X</p>';
    const movieId = data.id;
    const videos = data.results || [];
    let len = videos.length > 4 ? 4 : videos.length;
    if (len === 0) {
        content.innerHTML = `
        <p id="content-close">X</p>
            <p>No Trailer Found</p>
        `;
        return;
    }
    for (let i = 0; i < len; i++) {
        const video = videos[i];
        insertIframeIntoContent(video, content);
    }
}
// Click on any movies
document.onclick = function (event) {
    console.log('Event: ', event);
    const {tagName, id} = event.target;
    if (tagName.toLowerCase() === 'img') {//whenever img clicked show content section with vedios
        const movieId = event.target.attributes.data_movie_id.value;
        const section = event.target.parentElement.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
        getVideoByMovieId(movieId, content);
    }
    else if(tagName.toLowerCase()==='a'){//to get submenu anchortag for identifying genres 
        const genre = event.target.id;
        getGenresId(genre);
    }
    if (id === 'content-close') {
        const content = event.target.parentElement;
        content.classList.remove('content-display');
    }
}
function getMovieByGenreId(data){
    const genreName = this.genreName;
    let id=0;
    let len = data.genres.length;
    for(let i=0;i<len;i++){
        if(genreName == data.genres[i].name){
                id=data.genres[i].id;
                break;
                  }           
    }
    getMovieByGenre(id);
}
inputElement.onsearch=function(event){
    event.preventDefault();
    const value=inputElement.value;
    if(value){
        searchMovie(value);
    }
    resetInput();    
}
searchMovie('spiderman');//initial value spiderman for search
getUpcommingMovies();
getTopRatedMovies();
getTrendingMovies();

const searchRequest = async (value) => {
    const url = 'https://imdb-api.com/ru/API/Search/k_1vylyr66/' + value
    return await fetch(url).then(response => response.json()).then(result => result.results || [])
}

const searchMovie = async (value) => {
    const response = await searchRequest(value)
    if (Array.isArray(response) && response?.length) outputMovieList(response)
}

/** @arrayMovie { description, id, image, title, resultType }[]  */
const outputMovieList = (arrayMovie) => {
    console.log(arrayMovie)
    const movieField = document.getElementById('outputMovieList');
    movieField.innerHTML = ''
    arrayMovie.forEach(movie => {
        movieField.innerHTML += movieFieldPattern(movie);
    })
}

/** @movieData { description, image, title } */
const movieFieldPattern = (movieData) => {
    return `<div class="movie-field--movie">
        <h2>${movieData.title}</h2>
        <h3>${movieData.description}</h3>
        <div class="movie-field--movie--image-container">
            <img class="movie-field--movie--image" src="${movieData.image}"/>
        </div>
    </div>`
}

window.onload = () => {
    const input = document.getElementById('inputMovieName');
    let debugTimer = null
    input.addEventListener('input', () => {
        if (debugTimer) clearTimeout(debugTimer);
        debugTimer = setTimeout(() => {
            if (input.value) searchMovie(input.value)
        }, 350)
    })
}
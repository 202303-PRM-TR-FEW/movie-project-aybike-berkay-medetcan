'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".movie-container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${'9c7643a821f2dd01a5781799a3e78f7c'}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};


// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title
      } poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = async (movie) => {
  let similar = await similarDetails(movie);
  let slicedSimilar = similar.results.splice(0,10);

  let acts = await actorsDetails(movie);
  let slicedActs = acts.cast.splice(0, 10)
  const director = acts.crew.find( item => item.name)
  console.log(director)
  CONTAINER.innerHTML = `
    <div class="container mx-auto ">
        <div class="text-center">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
        </div>
        <div class="">
            <h1 id="movie-title" class='text-4xl font-bold'>${movie.title}</h1>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3 class='font-bold'>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
            <h3 class='font-bold'>Language:</h3>
            <p> ${movie.original_language}  </p>
            <h3 class='font-bold'>Director:</h3>
            <p> ${director.name} </p>
        </div>
        </div>
            <h3 class='text-3xl font-bold'>Actors:</h3>
            <ul id="actors" class="container flex flex-wrap space-x-12   gap-y-6 py-6">
            ${slicedActs.map(actor => `
              <li>
                <img width='100' height='100' class='rounded-full' src=${BACKDROP_BASE_URL + actor.profile_path} alt='${actor.name}'>
                <p class=''> ${actor.name} </p>
              </li>
            `).join('')}
            </ul>
            <h3 class='text-3xl font-bold'>Related movies</h3>
            <ul id="actors" class="container flex flex-wrap space-x-12  gap-y-6 py-6">
                ${slicedSimilar.map(similar => `
                <li>
                <img onclick="similarClick()" width='150' height='150' class='rounded-full' src=${BACKDROP_BASE_URL + similar.backdrop_path} alt='${similar.title}'>
                <p class=''> ${similar.title} </p>
              </li>
                `).join('')}
            </ul>
            <h3 class='text-3xl font-bold'>Production Companies</h3>
            <ul id="actors" class="container flex flex-wrap space-x-12  gap-y-6 py-6">
                ${movie.production_companies
                  .map(comp => `
                <li>
                <img onclick="similarClick()" width='200' height='200'  src=${BACKDROP_BASE_URL + comp.logo_path} alt='${movie.name}'>
              </li>
                `).join('')}
            </ul>
    </div>`;
};


document.addEventListener("DOMContentLoaded", autorun);



// fetching actors 

const fetchActors = async (actor) => {
  const url = constructUrl(`movie/${actor}/credits`);
  const res = await fetch(url);
  return res.json();
}

const actorsDetails = async (movie) => {
  const actorRes = await fetchActors(movie.id);
  return actorRes;
};

const fetchSimilar = async (similar) => {
  const url = constructUrl(`/movie/${similar}/similar`);
  const res = await fetch(url);
  return res.json();
};

const similarDetails = async (movie) => {
  const similarRes = await fetchSimilar(movie.id);
  return similarRes
}








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

// // This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
// const fetchMovies = async () => {
//   const url = constructUrl(`movie/now_playing`);
//   const res = await fetch(url);
//   return res.json();
// };

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// // You'll need to play with this function in order to add features and enhance the style.
// const renderMovies = (movies) => {
//   movies.map((movie) => {
//     const movieDiv = document.createElement("div");
//     movieDiv.innerHTML = `
//         <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
//       movie.title
//     } poster">
//         <h3>${movie.title}</h3>`;
//     movieDiv.addEventListener("click", () => {
//       movieDetails(movie);
//     });
//     CONTAINER.appendChild(movieDiv);
//   });
// };

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

let movies, genres;

// Fetch movies
const fetchMovies = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=9c7643a821f2dd01a5781799a3e78f7c');
  const data = await response.json();
  movies = data.results;
};

// Fetch genres
const fetchGenres = async () => {
  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9c7643a821f2dd01a5781799a3e78f7c');
  const data = await response.json();
  genres = data.genres;
};

// Render movies
const renderMovies = (moviesToRender) => {
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = '';

  moviesToRender.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
      <h3>${movie.title}</h3>
      <p>Genres: ${movie.genre_ids}</p>`;
    movieContainer.appendChild(movieDiv);
  });
};

// Render genres
const renderGenres = () => {
  const genreDropdown = document.querySelector('#genre-dropdown');
  genreDropdown.innerHTML = '';

  genres.forEach((genre) => {
    const genreLink = document.createElement('a');
    genreLink.href = '#';
    genreLink.textContent = genre.name;
    genreLink.classList.add('hover:bg-yellow-300');
    genreLink.classList.add('hover:text-black');
    genreLink.classList.add('rounded-md');
    genreLink.classList.add('p-1.5');
    genreLink.addEventListener('click', () => {
      filterMoviesByGenre(genre.id);
    });
    genreDropdown.appendChild(genreLink);
  });
};

// Filter movies by genre
const filterMoviesByGenre = (genreId) => {
  const selectedGenre = genreId !== 0 ? genreId : null;
  const moviesToShow = movies.filter((movie) => {
    return selectedGenre ? movie.genre_ids.includes(selectedGenre) : true;
  });
  renderMovies(moviesToShow);
};

// Fetch and render movies and genres
fetchMovies()
  .then(() => fetchGenres())
  .then(() => {
    renderMovies(movies);
    renderGenres();
  })
  .catch((error) => console.log(error));


document.addEventListener("DOMContentLoaded", autorun);


// genre menu manipulation 
const genreMenu = document.querySelectorAll(".genre-menu")
const genreDropdown = document.querySelector("#genre-dropdown")
const genreCaret = document.querySelectorAll(".genre-caret")

genreMenu.forEach(menu => {
  menu.addEventListener('click', e => {
    genreDropdown.classList.toggle('hidden')
    menu.classList.toggle('bg-yellow-300')
    menu.classList.toggle('text-black')
    genreCaret.forEach(caret => {
      if (caret.classList.contains('fa-caret-down')) {
        caret.classList.remove('fa-caret-down')
        caret.classList.add('fa-caret-up')
      }
      else if (caret.classList.contains('fa-caret-up')) {
        caret.classList.remove('fa-caret-up')
        caret.classList.add('fa-caret-down')
      }
    })
  })
})

// filter menu manipulation 
const filterMenu = document.querySelectorAll(".filter-menu")
const filterDropdown = document.querySelector("#filter-dropdown")
const filterCaret = document.querySelectorAll(".filter-caret")

filterMenu.forEach(menu => {
  menu.addEventListener('click', e => {
    filterDropdown.classList.toggle('hidden')
    menu.classList.toggle('bg-yellow-300')
    menu.classList.toggle('text-black')
    filterCaret.forEach(caret => {
      if (caret.classList.contains('fa-caret-down')) {
        caret.classList.remove('fa-caret-down')
        caret.classList.add('fa-caret-up')
      }
      else if (caret.classList.contains('fa-caret-up')) {
        caret.classList.remove('fa-caret-up')
        caret.classList.add('fa-caret-down')
      }
    })
  })
})
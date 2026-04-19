function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
  }
}

function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  const target = document.getElementById(tabId);
  if (target) {
    target.classList.add("active");
  }
}

function renderMovies() {
  const container = document.getElementById("movies-tab");
  if (!container) return;

  container.innerHTML = '<div class="movie-grid"></div>';
  const grid = container.querySelector(".movie-grid");

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const alreadySaved = isFavorite(movie.title);

    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Director: ${movie.director}</p>

      <div class="rating">
        ${renderRatingStars(movie.title)}
      </div>

      <button ${alreadySaved ? "disabled" : ""}>
        ${alreadySaved ? "Already in Favorites" : "Add to Favorites"}
      </button>
    `;

    card.querySelectorAll(".star").forEach(star => {
      star.addEventListener("click", () => {
        const rating = Number(star.dataset.value);
        saveRating(movie, rating);
      });
    });

    const button = card.querySelector("button");
    if (!alreadySaved) {
      button.addEventListener("click", () => {
        addToFavorites(movie);
      });
    }

    grid.appendChild(card);
  });
}

function renderFavorites() {
  const container = document.getElementById("favorites-tab");
  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  container.innerHTML = '<div class="favorites-grid"></div>';
  const grid = container.querySelector(".favorites-grid");

  favorites.forEach(movie => {
    const title = movie.movie_title || movie.title;
    const director = movie.movie_director || movie.director;
    const image = movie.movie_image || movie.image;
    const rating = getRating(title);

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${image}" alt="${title}">
      <h3>${title}</h3>
      <p>Director: ${director}</p>
      <p>Rating: ${rating ? "★".repeat(rating) + "☆".repeat(5 - rating) : "Not rated yet"}</p>
      <button>Remove</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      removeFromFavorites(title);
    });

    grid.appendChild(card);
  });
}
const movies = [
  {
    image: "https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_VERT_TSR_W_TALENT_2764x4096_DOM_rgb.jpg?w=800",
    title: "Barbie",
    director: "Greta Gerwig"
  },
  {
    image: "https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    title: "Guardians of the Galaxy",
    director: "James Gunn"
  },
  {
    image: "https://www.comingsoon.net/wp-content/uploads/sites/3/2023/04/spider-man-across-the-spider-verse-poster.png?w=691",
    title: "Spiderman into the Spiderverse",
    director: "Peter Ramsey"
  },
  {
    image: "https://m.media-amazon.com/images/M/MV5BZTg3ZWY5MDctNjAxNy00MzZhLWJiZTEtNzI3MzJjNzdiNTkyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
    title: "Tetris",
    director: "Jon S. Baird"
  },
  {
    image: "https://assets-prd.ignimgs.com/2023/02/17/fplwbzoaaaedkev-1676653861423.jpg",
    title: "The Marvels",
    director: "Nia DaCosta"
  }
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || {};

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

function persistFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addToFavorites(movie) {
  if (favorites[movie.title]) {
    alert("This movie is already in your favorites.");
    return;
  }

  favorites[movie.title] = movie;
  persistFavorites();
  renderFavorites();
  showTab("favorites-tab");
}

function removeFromFavorites(title) {
  delete favorites[title];
  persistFavorites();
  renderFavorites();
}

function renderMovies() {
  const container = document.getElementById("movies-tab");
  if (!container) return;

  container.innerHTML = '<div class="movie-grid"></div>';
  const grid = container.querySelector(".movie-grid");

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Director: ${movie.director}</p>
      <button>Add to Favorites</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      addToFavorites(movie);
    });

    grid.appendChild(card);
  });
}

function renderFavorites() {
  const container = document.getElementById("favorites-tab");
  if (!container) return;

  const items = Object.values(favorites);

  if (items.length === 0) {
    container.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  container.innerHTML = '<div class="favorites-grid"></div>';
  const grid = container.querySelector(".favorites-grid");

  items.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Director: ${movie.director}</p>
      <button>Remove</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      removeFromFavorites(movie.title);
    });

    grid.appendChild(card);
  });
}

function saveProfile() {
  const name = document.getElementById("profile-name").value;
  const bio = document.getElementById("profile-bio").value;

  localStorage.setItem("profileName", name);
  localStorage.setItem("profileBio", bio);

  alert("Profile saved");
}

function loadProfile() {
  const name = localStorage.getItem("profileName") || "";
  const bio = localStorage.getItem("profileBio") || "";

  const nameInput = document.getElementById("profile-name");
  const bioInput = document.getElementById("profile-bio");

  if (nameInput) nameInput.value = name;
  if (bioInput) bioInput.value = bio;
}

function login() {
  showScreen("main-screen");
  showTab("movies-tab");
}

function signup() {
  const name = document.getElementById("signup-name").value.trim();

  if (!name) {
    alert("Name field is required");
    return;
  }

  alert("Signup successful");
  showScreen("login-screen");
}

function logout() {
  showScreen("login-screen");
}

document.addEventListener("DOMContentLoaded", () => {
  renderMovies();
  renderFavorites();
  loadProfile();

  const enterBtn = document.getElementById("enter-btn");
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const gotoSignupBtn = document.getElementById("goto-signup-btn");
  const backLoginBtn = document.getElementById("back-login-btn");
  const saveProfileBtn = document.getElementById("save-profile-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (enterBtn) {
    enterBtn.addEventListener("click", () => showScreen("login-screen"));
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", login);
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", signup);
  }

  if (gotoSignupBtn) {
    gotoSignupBtn.addEventListener("click", () => showScreen("signup-screen"));
  }

  if (backLoginBtn) {
    backLoginBtn.addEventListener("click", () => showScreen("login-screen"));
  }

  if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", saveProfile);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
      showTab(button.dataset.tab);
    });
  });
});
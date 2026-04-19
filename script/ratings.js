function getRating(title) {
  return ratings[title] || 0;
}

async function loadRatings() {
  try {
    const data = await apiRequest("get_ratings.php");
    ratings = data.success ? data.ratings : {};
  } catch (error) {
    ratings = {};
  }
}

async function saveRating(movie, rating) {
  try {
    const data = await apiRequest("save_rating.php", {
      method: "POST",
      body: JSON.stringify({
        title: movie.title,
        director: movie.director,
        image: movie.image,
        rating
      })
    });

    if (data.success) {
      ratings[movie.title] = rating;
      renderMovies();
      renderFavorites();
    } else {
      alert(data.message || "Could not save rating.");
    }
  } catch (error) {
    alert(error.message);
  }
}

function renderRatingStars(title) {
  return [1, 2, 3, 4, 5].map(num => `
    <span
      class="star"
      data-value="${num}"
      style="cursor:pointer; font-size:20px;"
    >
      ${getRating(title) >= num ? "★" : "☆"}
    </span>
  `).join("");
}
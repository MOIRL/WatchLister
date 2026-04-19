function isFavorite(title) {
	return favorites.some(movie => movie.movie_title === title || movie.title === title);
}

async function loadFavorites() {
	try {
		const data = await apiRequest("get_favorites.php");
		favorites = data.success ? data.favorites : [];
	} catch (error) {
		favorites = [];
	}
}

async function addToFavorites(movie) {
	try {
		const data = await apiRequest("add_favorite.php", {
method: "POST",
body: JSON.stringify(movie)
		});

		alert(data.message);

		if (data.success) {
			await loadFavorites();
			renderMovies();
			renderFavorites();
			showTab("favorites-tab");
		}
	} catch (error) {
		alert(error.message);
	}
}

async function removeFromFavorites(title) {
	try {
		const data = await apiRequest("remove_favorite.php", {
method: "POST",
body: JSON.stringify({ title })
		});

		alert(data.message);

		if (data.success) {
			await loadFavorites();
			renderMovies();
			renderFavorites();
		}
	} catch (error) {
		alert(error.message);
	}
}
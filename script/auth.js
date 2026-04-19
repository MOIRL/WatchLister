async function login() {
	const email = document.getElementById("login-email").value.trim();
	const password = document.getElementById("login-password").value.trim();

	if (!email || !password) {
		alert("Email and password are required.");
		return;
	}

	try {
		const data = await apiRequest("login.php", {
method: "POST",
body: JSON.stringify({ email, password })
		});

		if (!data.success) {
			alert(data.message);
			return;
		}

		currentUser = data.user;

		await loadProfile();
		await loadFavorites();
		await loadRatings();

		renderMovies();
		renderFavorites();

		showScreen("main-screen");
		showTab("movies-tab");
	} catch (error) {
		alert(error.message);
	}
}

async function signup() {
	const name = document.getElementById("signup-name").value.trim();
	const email = document.getElementById("signup-email").value.trim();
	const password = document.getElementById("signup-password").value.trim();

	if (!name || !email || !password) {
		alert("All fields are required.");
		return;
	}

	try {
		const data = await apiRequest("signup.php", {
method: "POST",
body: JSON.stringify({ name, email, password })
		});

		alert(data.message);

		if (data.success) {
			document.getElementById("signup-name").value = "";
			document.getElementById("signup-email").value = "";
			document.getElementById("signup-password").value = "";
			showScreen("login-screen");
		}
	} catch (error) {
		alert(error.message);
	}
}

async function logout() {
	try {
		await apiRequest("logout.php", { method: "POST" });
	} catch (error) {
		console.error(error);
	}

	currentUser = null;
	favorites = [];
	ratings = {};

	document.getElementById("login-email").value = "";
	document.getElementById("login-password").value = "";

	showScreen("login-screen");
}

async function checkSession() {
	try {
		const data = await apiRequest("get_profile.php");

		if (!data.success) {
			showScreen("pop-up-screen");
			return;
		}

		currentUser = data.user;

		await loadFavorites();
		await loadRatings();

		renderMovies();
		renderFavorites();

		document.getElementById("profile-name").value = data.user.name || "";
		document.getElementById("profile-bio").value = data.user.bio || "";

		showScreen("main-screen");
		showTab("movies-tab");
	} catch (error) {
		showScreen("pop-up-screen");
	}
}
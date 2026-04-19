document.addEventListener("DOMContentLoaded", async () => {
	renderMovies();
	renderFavorites();

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

	await checkSession();
});
async function loadProfile() {
	try {
		const data = await apiRequest("get_profile.php");

		if (!data.success) return;

		currentUser = data.user;

		const nameInput = document.getElementById("profile-name");
		const bioInput = document.getElementById("profile-bio");

		if (nameInput) nameInput.value = data.user.name || "";
		if (bioInput) bioInput.value = data.user.bio || "";
	} catch (error) {
		console.error(error);
	}
}

async function saveProfile() {
	const name = document.getElementById("profile-name").value.trim();
	const bio = document.getElementById("profile-bio").value.trim();

	try {
		const data = await apiRequest("save_profile.php", {
method: "POST",
body: JSON.stringify({ name, bio })
		});

		if (data.success) {
			currentUser = { ...(currentUser || {}), name, bio };
		}

		alert(data.message);
	} catch (error) {
		alert(error.message);
	}
}
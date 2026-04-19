# WatchLister PHP + MySQL Version

This version adds:
- real user signup and login
- PHP sessions
- user-specific profiles
- user-specific favorites
- MySQL persistence

## Folder structure

```text
watchlister-php/
├── index.html
├── style.css
├── script.js
├── watchlister.sql
└── backend/
    ├── config.php
    ├── signup.php
    ├── login.php
    ├── logout.php
    ├── get_profile.php
    ├── save_profile.php
    ├── get_favorites.php
    ├── add_favorite.php
    └── remove_favorite.php
```

## Run locally with XAMPP

1. Copy the `watchlister-php` folder into:
   - `C:/xampp/htdocs/`

2. Start:
   - Apache
   - MySQL

3. Open phpMyAdmin.

4. Import `watchlister.sql`.

5. Update `backend/config.php` only if your MySQL username/password is different.

Default config:
- database: `watchlister`
- username: `root`
- password: empty string

6. Open the app in your browser:

```text
http://localhost/watchlister-php/
```

## Notes

- `script.js` now uses `fetch()` to talk to the PHP backend.
- Session login is stored server-side with PHP sessions.
- Each user's favorites are saved in the database instead of browser local storage.
- If you move the backend folder, update `const API_BASE = "backend";` in `script.js`.

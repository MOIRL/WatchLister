<?php
include 'config.php';

$userId = requireLogin();
$data = getJsonInput();

$title = trim($data['title'] ?? '');
$director = trim($data['director'] ?? '');
$image = trim($data['image'] ?? '');
$rating = (int) ($data['rating'] ?? 0);

if ($title === '' || $director === '' || $image === '') {
    echo json_encode([
        'success' => false,
        'message' => 'Movie title, director, and image are required'
    ]);
    exit;
}

if ($rating < 1 || $rating > 5) {
    echo json_encode([
        'success' => false,
        'message' => 'Rating must be between 1 and 5'
    ]);
    exit;
}

$sql = "
    INSERT INTO ratings (user_id, movie_title, movie_director, movie_image, rating)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        movie_director = VALUES(movie_director),
        movie_image = VALUES(movie_image),
        rating = VALUES(rating)
";

$stmt = $conn->prepare($sql);
$stmt->bind_param('isssi', $userId, $title, $director, $image, $rating);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Rating saved successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Could not save rating'
    ]);
}
?>
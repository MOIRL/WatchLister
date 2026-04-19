<?php
include 'config.php';

$userId = requireLogin();
$data = getJsonInput();

$title = trim($data['title'] ?? '');
$director = trim($data['director'] ?? '');
$image = trim($data['image'] ?? '');

if ($title === '') {
    echo json_encode([
        'success' => false,
        'message' => 'Movie title is required'
    ]);
    exit;
}

$check = $conn->prepare('SELECT id FROM favorites WHERE user_id = ? AND movie_title = ?');
$check->bind_param('is', $userId, $title);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'This movie is already in your favorites'
    ]);
    exit;
}

$stmt = $conn->prepare('INSERT INTO favorites (user_id, movie_title, movie_director, movie_image) VALUES (?, ?, ?, ?)');
$stmt->bind_param('isss', $userId, $title, $director, $image);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Movie added to favorites'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to add favorite'
    ]);
}
?>

<?php
include 'config.php';

$userId = requireLogin();
$data = getJsonInput();

$title = trim($data['title'] ?? '');

if ($title === '') {
    echo json_encode([
        'success' => false,
        'message' => 'Movie title is required'
    ]);
    exit;
}

$stmt = $conn->prepare('DELETE FROM favorites WHERE user_id = ? AND movie_title = ?');
$stmt->bind_param('is', $userId, $title);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Movie removed from favorites'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to remove favorite'
    ]);
}
?>

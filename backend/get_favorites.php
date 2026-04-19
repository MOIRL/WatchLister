<?php
include 'config.php';

$userId = requireLogin();

$stmt = $conn->prepare('SELECT id, movie_title, movie_director, movie_image FROM favorites WHERE user_id = ? ORDER BY id DESC');
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

$favorites = [];
while ($row = $result->fetch_assoc()) {
    $favorites[] = [
        'id' => (int) $row['id'],
        'movie_title' => $row['movie_title'],
        'movie_director' => $row['movie_director'],
        'movie_image' => $row['movie_image']
    ];
}

echo json_encode([
    'success' => true,
    'favorites' => $favorites
]);
?>

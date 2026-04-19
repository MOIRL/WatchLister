<?php
include 'config.php';

$userId = requireLogin();

$stmt = $conn->prepare('SELECT movie_title, rating FROM ratings WHERE user_id = ?');
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

$ratings = [];

while ($row = $result->fetch_assoc()) {
    $ratings[$row['movie_title']] = (int) $row['rating'];
}

echo json_encode([
    'success' => true,
    'ratings' => $ratings
]);
?>
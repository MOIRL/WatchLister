<?php
include 'config.php';

$userId = requireLogin();
$data = getJsonInput();

$name = trim($data['name'] ?? '');
$bio = trim($data['bio'] ?? '');

if ($name === '') {
    echo json_encode([
        'success' => false,
        'message' => 'Name cannot be empty'
    ]);
    exit;
}

$stmt = $conn->prepare('UPDATE users SET name = ?, bio = ? WHERE id = ?');
$stmt->bind_param('ssi', $name, $bio, $userId);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Profile updated successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to update profile'
    ]);
}
?>

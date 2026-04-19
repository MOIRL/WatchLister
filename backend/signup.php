<?php
include 'config.php';

$data = getJsonInput();

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if ($name === '' || $email === '' || $password === '') {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required'
    ]);
    exit;
}

$check = $conn->prepare('SELECT id FROM users WHERE email = ?');
$check->bind_param('s', $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'An account with this email already exists'
    ]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare('INSERT INTO users (name, email, password, bio) VALUES (?, ?, ?, ?)');
$emptyBio = '';
$stmt->bind_param('ssss', $name, $email, $hashedPassword, $emptyBio);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Signup successful'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Signup failed'
    ]);
}
?>

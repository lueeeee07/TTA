<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, email, and message are required']);
    exit;
}

try {
    $db = (new Database())->getConnection();
    $stmt = $db->prepare('INSERT INTO contact_messages (name, email, phone, topic, message) VALUES (:name, :email, :phone, :topic, :message)');
    $stmt->execute([
        ':name'    => $data['name'],
        ':email'   => $data['email'],
        ':phone'   => $data['phone'] ?? '',
        ':topic'   => $data['topic'] ?? 'General Inquiry',
        ':message' => $data['message']
    ]);

    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Message sent successfully', 'id' => $db->lastInsertId()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save message']);
}

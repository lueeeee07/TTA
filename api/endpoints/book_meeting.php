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
if (empty($data['meeting_type']) || empty($data['officer']) || empty($data['preferred_date']) || empty($data['time_slot']) || empty($data['name']) || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

try {
    $db = (new Database())->getConnection();
    $stmt = $db->prepare('INSERT INTO meeting_bookings (meeting_type, officer, preferred_date, time_slot, name, email) VALUES (:meeting_type, :officer, :preferred_date, :time_slot, :name, :email)');
    $stmt->execute([
        ':meeting_type'   => $data['meeting_type'],
        ':officer'        => $data['officer'],
        ':preferred_date' => $data['preferred_date'],
        ':time_slot'      => $data['time_slot'],
        ':name'           => $data['name'],
        ':email'          => $data['email']
    ]);

    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Meeting booked successfully', 'id' => $db->lastInsertId()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to book meeting']);
}

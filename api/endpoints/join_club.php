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
if (empty($data['applicant_name']) || empty($data['phone']) || empty($data['region'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, phone, and region are required']);
    exit;
}

try {
    $db = (new Database())->getConnection();
    $stmt = $db->prepare('INSERT INTO club_applications (region, club_name, applicant_name, email, phone, category) VALUES (:region, :club_name, :applicant_name, :email, :phone, :category)');
    $stmt->execute([
        ':region'         => $data['region'],
        ':club_name'      => $data['club_name'] ?? '',
        ':applicant_name' => $data['applicant_name'],
        ':email'          => $data['email'] ?? '',
        ':phone'          => $data['phone'],
        ':category'       => $data['category'] ?? ''
    ]);

    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Application submitted successfully', 'id' => $db->lastInsertId()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save application']);
}

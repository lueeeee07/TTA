<?php
require_once __DIR__ . '/../config/database.php';
api_headers();

try {
    $db = (new Database())->getConnection();
    $stmt = $db->query('SELECT * FROM objectives WHERE is_active = 1 ORDER BY num ASC');
    echo json_encode($stmt->fetchAll());
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch objectives']);
}

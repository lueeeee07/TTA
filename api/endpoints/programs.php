<?php
require_once __DIR__ . '/../config/database.php';
api_headers();

try {
    $db = (new Database())->getConnection();
    $stmt = $db->query('SELECT * FROM programs WHERE is_active = 1');
    $programs = $stmt->fetchAll();
    foreach ($programs as &$p) {
        $p['full_content'] = json_decode($p['full_content'], true);
    }
    echo json_encode($programs);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch programs']);
}

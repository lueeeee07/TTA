<?php
require_once __DIR__ . '/../config/database.php';
api_headers();

try {
    $db = (new Database())->getConnection();
    $stmt = $db->query('SELECT * FROM national_teams WHERE is_active = 1');
    $teams = $stmt->fetchAll();
    foreach ($teams as &$t) {
        $t['achievements'] = json_decode($t['achievements'], true);
    }
    echo json_encode($teams);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch national teams']);
}

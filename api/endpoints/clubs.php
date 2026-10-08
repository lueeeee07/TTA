<?php
require_once __DIR__ . '/../config/database.php';
api_headers();

try {
    $db = (new Database())->getConnection();
    $region = isset($_GET['region']) ? $_GET['region'] : null;

    if ($region) {
        $stmt = $db->prepare('SELECT c.*, r.name AS region FROM clubs c LEFT JOIN regions r ON c.region_id = r.id WHERE r.name = :region AND c.is_active = 1 AND r.is_active = 1');
        $stmt->execute([':region' => $region]);
    } else {
        $stmt = $db->query('SELECT c.*, r.name AS region FROM clubs c LEFT JOIN regions r ON c.region_id = r.id WHERE c.is_active = 1 AND (r.is_active = 1 OR r.id IS NULL)');
    }

    $clubs = $stmt->fetchAll();
    foreach ($clubs as &$club) {
        $club['features'] = json_decode($club['features'], true);
    }

    echo json_encode($clubs);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch clubs']);
}

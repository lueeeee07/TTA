<?php
require_once __DIR__ . '/../config/database.php';
api_headers();

try {
    $db = (new Database())->getConnection();

    if (isset($_GET['slug'])) {
        $stmt = $db->prepare('SELECT * FROM news WHERE slug = :slug AND is_active = 1');
        $stmt->execute([':slug' => $_GET['slug']]);
        $article = $stmt->fetch();
        echo json_encode($article ?: ['error' => 'Article not found']);
    } else {
        $stmt = $db->query('SELECT * FROM news WHERE is_active = 1 ORDER BY created_at DESC');
        echo json_encode($stmt->fetchAll());
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch news']);
}

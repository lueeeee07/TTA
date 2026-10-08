<?php

function api_headers(): void {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma, Origin, Accept');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('Expires: 0');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

function ensure_is_active(PDO $db, string $table): void {
    static $ensured = [];
    if (isset($ensured[$table])) {
        return;
    }
    $ensured[$table] = true;
    try {
        $exists = $db->query("SHOW COLUMNS FROM `$table` LIKE 'is_active'")->fetch();
        if (!$exists) {
            $db->exec("ALTER TABLE `$table` ADD COLUMN `is_active` TINYINT(1) NOT NULL DEFAULT 1");
        }
    } catch (Exception $e) {
        // Table may not exist yet
    }
}

function ensure_content_active_columns(PDO $db): void {
    foreach ([
        'regions',
        'clubs',
        'programs',
        'tournaments',
        'national_teams',
        'news',
        'gallery',
        'leadership',
        'partners',
        'stats',
        'core_values',
        'objectives',
    ] as $table) {
        ensure_is_active($db, $table);
    }
}

<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if (isset($_SESSION['admin_id'])) {
    echo json_encode([
        'logged_in' => true,
        'user' => [
            'id'    => $_SESSION['admin_id'],
            'email' => $_SESSION['admin_email'],
            'name'  => $_SESSION['admin_name']
        ]
    ]);
} else {
    echo json_encode(['logged_in' => false]);
}

<?php
require_once __DIR__ . '/../../api/config/helpers.php';

function try_toggle_active(PDO $db, string $table, &$success): bool {
    if (($_POST['action'] ?? '') !== 'toggle_active') {
        return false;
    }
    ensure_is_active($db, $table);
    $db->prepare("UPDATE `$table` SET is_active = IF(is_active = 1, 0, 1) WHERE id = :id")
        ->execute([':id' => $_POST['id']]);
    $success = 'Website visibility updated successfully.';
    return true;
}

function is_row_active(array $row): bool {
    return !isset($row['is_active']) || (int) $row['is_active'] === 1;
}

function active_toggle_button(array $row): string {
    $active = is_row_active($row);
    $id = (int) $row['id'];
    
    if ($active) {
        return '<form method="POST" class="d-inline active-toggle-form">'
            . '<input type="hidden" name="action" value="toggle_active">'
            . '<input type="hidden" name="id" value="' . $id . '">'
            . '<button type="submit" class="status-toggle-badge active" title="Visible on public website &bull; Click to hide">'
            . '<span class="status-dot"></span> Published'
            . '</button>'
            . '</form>';
    } else {
        return '<form method="POST" class="d-inline active-toggle-form">'
            . '<input type="hidden" name="action" value="toggle_active">'
            . '<input type="hidden" name="id" value="' . $id . '">'
            . '<button type="submit" class="status-toggle-badge inactive" title="Hidden from public website &bull; Click to publish">'
            . '<span class="status-dot"></span> Hidden'
            . '</button>'
            . '</form>';
    }
}

<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';

$db = (new Database())->getConnection();
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'update_status') {
        $db->prepare('UPDATE meeting_bookings SET status = :status WHERE id = :id')->execute([
            ':status' => $_POST['status'],
            ':id'     => $_POST['id']
        ]);
        $success = 'Meeting booking status updated.';
    } elseif ($action === 'delete') {
        $db->prepare('DELETE FROM meeting_bookings WHERE id = :id')->execute([':id' => $_POST['id']]);
        $success = 'Booking record deleted.';
    }
}

$bookings = $db->query('SELECT * FROM meeting_bookings ORDER BY created_at DESC')->fetchAll();
$pendingCount = (int) $db->query("SELECT COUNT(*) FROM meeting_bookings WHERE status = 'pending'")->fetchColumn();

$pageTitle = 'Meeting Bookings & Appointments';
$currentPage = 'bookings';
require_once __DIR__ . '/includes/header.php';
?>

<?php if ($success): ?>
    <div class="alert alert-success alert-dismissible fade show mb-4">
        <i class="fas fa-check-circle fs-5"></i>
        <div><?= htmlspecialchars($success) ?></div>
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<div class="page-toolbar">
    <div class="page-toolbar-info">
        <div class="count-pill">
            <i class="fas fa-calendar-check text-primary"></i> Total Bookings: <span><?= count($bookings) ?></span>
        </div>
        <?php if ($pendingCount > 0): ?>
            <span class="badge bg-info text-dark px-3 py-2 shadow-sm">
                <i class="fas fa-clock me-1"></i> <?= $pendingCount ?> Pending Confirmation
            </span>
        <?php else: ?>
            <span class="badge badge-soft-success px-3 py-2">
                <i class="fas fa-check-double me-1"></i> All Bookings Handled
            </span>
        <?php endif; ?>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Booker Contact</th>
                    <th>Meeting Objective</th>
                    <th>Requested Officer</th>
                    <th>Scheduled Date</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($bookings as $b): ?>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-2.5">
                            <div class="table-avatar d-flex align-items-center justify-content-center fw-bold bg-primary text-white" style="width: 36px; height: 36px;">
                                <?= strtoupper(substr($b['name'], 0, 1)) ?>
                            </div>
                            <div>
                                <div class="fw-bold text-dark"><?= htmlspecialchars($b['name']) ?></div>
                                <div class="text-muted" style="font-size: 0.78rem;">
                                    <a href="mailto:<?= htmlspecialchars($b['email']) ?>" class="text-decoration-none text-muted">
                                        <?= htmlspecialchars($b['email']) ?>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-primary"><?= htmlspecialchars($b['meeting_type']) ?></span>
                    </td>
                    <td>
                        <div class="fw-semibold text-secondary" style="font-size: 0.85rem;">
                            <i class="fas fa-user-tie text-primary me-1"></i> <?= htmlspecialchars($b['officer']) ?>
                        </div>
                    </td>
                    <td>
                        <div class="text-dark fw-bold" style="font-size: 0.82rem;">
                            <i class="far fa-calendar text-primary me-1"></i> <?= htmlspecialchars($b['preferred_date']) ?>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-secondary">
                            <i class="far fa-clock me-1"></i> <?= htmlspecialchars($b['time_slot']) ?>
                        </span>
                    </td>
                    <td>
                        <form method="POST" class="d-inline">
                            <input type="hidden" name="action" value="update_status">
                            <input type="hidden" name="id" value="<?= $b['id'] ?>">
                            <?php
                                $selectBorder = $b['status'] === 'confirmed' ? 'border-success text-success' : ($b['status'] === 'cancelled' ? 'border-danger text-danger' : 'border-warning text-warning-emphasis');
                            ?>
                            <select name="status" class="form-select form-select-sm fw-bold <?= $selectBorder ?>" style="width: 140px; font-size: 0.78rem;" onchange="this.form.submit()">
                                <option value="pending" <?= $b['status']==='pending'?'selected':'' ?>>⏳ Pending</option>
                                <option value="confirmed" <?= $b['status']==='confirmed'?'selected':'' ?>>✅ Confirmed</option>
                                <option value="cancelled" <?= $b['status']==='cancelled'?'selected':'' ?>>❌ Cancelled</option>
                            </select>
                        </form>
                    </td>
                    <td class="text-end text-nowrap">
                        <form method="POST" class="d-inline" onsubmit="return confirm('Delete booking for <?= addslashes($b['name']) ?>?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $b['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete booking">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            <?php if (empty($bookings)): ?>
                <tr>
                    <td colspan="7">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-calendar-check"></i></div>
                            <div class="empty-state-title">No Meeting Bookings</div>
                            <div class="empty-state-desc">When stakeholders schedule an appointment with TTA leadership, reservations will appear here.</div>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

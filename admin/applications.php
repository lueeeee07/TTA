<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';

$db = (new Database())->getConnection();
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'update_status') {
        $db->prepare('UPDATE club_applications SET status = :status WHERE id = :id')->execute([
            ':status' => $_POST['status'],
            ':id'     => $_POST['id']
        ]);
        $success = 'Club application status updated.';
    } elseif ($action === 'delete') {
        $db->prepare('DELETE FROM club_applications WHERE id = :id')->execute([':id' => $_POST['id']]);
        $success = 'Application record deleted.';
    }
}

$apps = $db->query('SELECT * FROM club_applications ORDER BY created_at DESC')->fetchAll();
$pendingCount = (int) $db->query("SELECT COUNT(*) FROM club_applications WHERE status = 'pending'")->fetchColumn();

$pageTitle = 'Club Affiliation Applications';
$currentPage = 'applications';
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
            <i class="fas fa-file-signature text-primary"></i> Total Applications: <span><?= count($apps) ?></span>
        </div>
        <?php if ($pendingCount > 0): ?>
            <span class="badge bg-warning text-dark px-3 py-2 shadow-sm">
                <i class="fas fa-clock me-1"></i> <?= $pendingCount ?> Pending Review
            </span>
        <?php else: ?>
            <span class="badge badge-soft-success px-3 py-2">
                <i class="fas fa-check-double me-1"></i> All Applications Reviewed
            </span>
        <?php endif; ?>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Applicant Representative</th>
                    <th>Region</th>
                    <th>Club / Facility Name</th>
                    <th>Phone Contact</th>
                    <th>Affiliation Tier</th>
                    <th>Submitted</th>
                    <th>Review Status</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($apps as $a): ?>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-2.5">
                            <div class="table-avatar d-flex align-items-center justify-content-center fw-bold bg-primary text-white" style="width: 36px; height: 36px;">
                                <?= strtoupper(substr($a['applicant_name'], 0, 1)) ?>
                            </div>
                            <div>
                                <div class="fw-bold text-dark"><?= htmlspecialchars($a['applicant_name']) ?></div>
                                <div class="text-muted" style="font-size: 0.78rem;">
                                    <a href="mailto:<?= htmlspecialchars($a['email']) ?>" class="text-decoration-none text-muted">
                                        <?= htmlspecialchars($a['email']) ?>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-primary"><?= htmlspecialchars($a['region'] ?: 'National') ?></span>
                    </td>
                    <td>
                        <div class="fw-bold text-secondary"><?= htmlspecialchars($a['club_name']) ?></div>
                    </td>
                    <td>
                        <div class="text-muted" style="font-size: 0.82rem;">
                            <?= htmlspecialchars($a['phone'] ?: 'N/A') ?>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-info"><?= htmlspecialchars($a['category'] ?: 'Standard') ?></span>
                    </td>
                    <td>
                        <div class="text-muted" style="font-size: 0.8rem;">
                            <?= date('M j, Y', strtotime($a['created_at'])) ?>
                        </div>
                    </td>
                    <td>
                        <form method="POST" class="d-inline">
                            <input type="hidden" name="action" value="update_status">
                            <input type="hidden" name="id" value="<?= $a['id'] ?>">
                            <?php
                                $selectBorder = $a['status'] === 'approved' ? 'border-success text-success' : ($a['status'] === 'rejected' ? 'border-danger text-danger' : 'border-warning text-warning-emphasis');
                            ?>
                            <select name="status" class="form-select form-select-sm fw-bold <?= $selectBorder ?>" style="width: 130px; font-size: 0.78rem;" onchange="this.form.submit()">
                                <option value="pending" <?= $a['status']==='pending'?'selected':'' ?>>⏳ Pending</option>
                                <option value="approved" <?= $a['status']==='approved'?'selected':'' ?>>✅ Approved</option>
                                <option value="rejected" <?= $a['status']==='rejected'?'selected':'' ?>>❌ Rejected</option>
                            </select>
                        </form>
                    </td>
                    <td class="text-end text-nowrap">
                        <form method="POST" class="d-inline" onsubmit="return confirm('Delete application from <?= addslashes($a['applicant_name']) ?>?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $a['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete application">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            <?php if (empty($apps)): ?>
                <tr>
                    <td colspan="8">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-file-signature"></i></div>
                            <div class="empty-state-title">No Applications Received</div>
                            <div class="empty-state-desc">When clubs submit affiliation requests on the portal, they will be listed here for approval.</div>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

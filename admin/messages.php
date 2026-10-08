<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';

$db = (new Database())->getConnection();
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'toggle_read') {
        $msg = $db->prepare('SELECT is_read FROM contact_messages WHERE id = :id');
        $msg->execute([':id' => $_POST['id']]);
        $current = $msg->fetchColumn();
        $db->prepare('UPDATE contact_messages SET is_read = :val WHERE id = :id')->execute([':val' => $current ? 0 : 1, ':id' => $_POST['id']]);
        $success = 'Message read status updated.';
    } elseif ($action === 'delete') {
        $db->prepare('DELETE FROM contact_messages WHERE id = :id')->execute([':id' => $_POST['id']]);
        $success = 'Message removed from inbox.';
    }
}

$messages = $db->query('SELECT * FROM contact_messages ORDER BY created_at DESC')->fetchAll();
$unread = (int) $db->query("SELECT COUNT(*) FROM contact_messages WHERE is_read = 0")->fetchColumn();

$pageTitle = 'Contact Messages & Inquiries';
$currentPage = 'messages';
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
            <i class="fas fa-envelope-open-text text-primary"></i> Total Inquiries: <span><?= count($messages) ?></span>
        </div>
        <?php if ($unread > 0): ?>
            <span class="badge bg-danger shadow-sm px-3 py-2">
                <i class="fas fa-circle-exclamation me-1"></i> <?= $unread ?> Unread Action Required
            </span>
        <?php else: ?>
            <span class="badge badge-soft-success px-3 py-2">
                <i class="fas fa-check me-1"></i> All Messages Read
            </span>
        <?php endif; ?>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Sender Information</th>
                    <th>Topic</th>
                    <th>Message Excerpt</th>
                    <th>Received At</th>
                    <th>Status</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($messages as $m): ?>
                <tr class="<?= $m['is_read'] ? '' : 'bg-warning bg-opacity-10' ?>">
                    <td>
                        <div class="d-flex align-items-center gap-2.5">
                            <div class="table-avatar d-flex align-items-center justify-content-center fw-bold <?= $m['is_read'] ? 'bg-light text-secondary' : 'bg-primary text-white' ?>" style="width: 38px; height: 38px;">
                                <?= strtoupper(substr($m['name'], 0, 1)) ?>
                            </div>
                            <div>
                                <div class="fw-bold text-dark"><?= htmlspecialchars($m['name']) ?></div>
                                <div class="text-muted" style="font-size: 0.78rem;">
                                    <a href="mailto:<?= htmlspecialchars($m['email']) ?>" class="text-decoration-none text-muted">
                                        <?= htmlspecialchars($m['email']) ?>
                                    </a>
                                    <?php if (!empty($m['phone'])): ?>
                                        &bull; <span><?= htmlspecialchars($m['phone']) ?></span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-primary"><?= htmlspecialchars($m['topic'] ?: 'General') ?></span>
                    </td>
                    <td>
                        <div class="text-secondary text-truncate" style="max-width: 280px; font-size: 0.82rem;">
                            <?= htmlspecialchars($m['message']) ?>
                        </div>
                    </td>
                    <td>
                        <div class="text-muted" style="font-size: 0.82rem;">
                            <i class="far fa-clock me-1 text-secondary"></i> <?= date('M j, Y H:i', strtotime($m['created_at'])) ?>
                        </div>
                    </td>
                    <td>
                        <?php if ($m['is_read']): ?>
                            <span class="badge badge-soft-secondary">Read</span>
                        <?php else: ?>
                            <span class="badge badge-soft-danger"><i class="fas fa-circle text-danger me-1 fs-xs"></i> New</span>
                        <?php endif; ?>
                    </td>
                    <td class="text-end text-nowrap">
                        <button class="btn-action-icon view me-1" data-bs-toggle="modal" data-bs-target="#viewMsg<?= $m['id'] ?>" title="Read full message">
                            <i class="fas fa-eye"></i>
                        </button>
                        <form method="POST" class="d-inline">
                            <input type="hidden" name="action" value="toggle_read">
                            <input type="hidden" name="id" value="<?= $m['id'] ?>">
                            <button type="submit" class="btn-action-icon edit me-1" title="<?= $m['is_read'] ? 'Mark as Unread' : 'Mark as Read' ?>">
                                <i class="fas fa-<?= $m['is_read'] ? 'envelope' : 'envelope-open' ?>"></i>
                            </button>
                        </form>
                        <form method="POST" class="d-inline" onsubmit="return confirm('Delete message from <?= addslashes($m['name']) ?>?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $m['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete message">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>

                <!-- Read Message Modal -->
                <div class="modal fade" id="viewMsg<?= $m['id'] ?>" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="modal-title-wrap">
                                    <div class="modal-icon-badge">
                                        <i class="fas fa-envelope-open-text"></i>
                                    </div>
                                    <div>
                                        <h5 class="fw-bold mb-0">Inquiry Details</h5>
                                        <small class="text-muted"><?= htmlspecialchars($m['topic'] ?: 'General Inquiry') ?></small>
                                    </div>
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="p-3 bg-light rounded-3 mb-3 border">
                                    <div class="row g-2" style="font-size: 0.85rem;">
                                        <div class="col-6">
                                            <strong class="text-dark d-block">From:</strong>
                                            <span><?= htmlspecialchars($m['name']) ?></span>
                                        </div>
                                        <div class="col-6">
                                            <strong class="text-dark d-block">Date:</strong>
                                            <span><?= date('M j, Y &bull; H:i', strtotime($m['created_at'])) ?></span>
                                        </div>
                                        <div class="col-6">
                                            <strong class="text-dark d-block">Email:</strong>
                                            <a href="mailto:<?= htmlspecialchars($m['email']) ?>" class="text-primary text-decoration-none"><?= htmlspecialchars($m['email']) ?></a>
                                        </div>
                                        <div class="col-6">
                                            <strong class="text-dark d-block">Phone:</strong>
                                            <span><?= htmlspecialchars($m['phone'] ?: 'Not provided') ?></span>
                                        </div>
                                    </div>
                                </div>
                                <label class="form-label text-muted">Message Content</label>
                                <div class="p-3 bg-white border rounded-3 text-secondary" style="font-size: 0.92rem; line-height: 1.6; white-space: pre-line;">
                                    <?= htmlspecialchars($m['message']) ?>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <a href="mailto:<?= htmlspecialchars($m['email']) ?>?subject=Re: TTA Inquiry - <?= urlencode($m['topic']) ?>" class="btn btn-tta">
                                    <i class="fas fa-reply"></i> Reply via Email
                                </a>
                                <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
            <?php if (empty($messages)): ?>
                <tr>
                    <td colspan="6">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-envelope"></i></div>
                            <div class="empty-state-title">No Messages Received</div>
                            <div class="empty-state-desc">When visitors fill out the contact form on the website, their messages will appear here.</div>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

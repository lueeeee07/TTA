<?php
require_once __DIR__ . '/includes/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';
require_once __DIR__ . '/includes/active_toggle.php';

$db = (new Database())->getConnection();
$success = $error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if (try_toggle_active($db, 'leadership', $success)) {
        // visibility toggled
    } elseif ($action === 'add') {
        try {
            $stmt = $db->prepare('INSERT INTO leadership (role, organization, name, bio, avatar) VALUES (:role,:organization,:name,:bio,:avatar)');
            $stmt->execute([
                ':role'         => $_POST['role'],
                ':organization' => $_POST['organization'],
                ':name'         => $_POST['name'],
                ':bio'          => $_POST['bio'],
                ':avatar'       => $_POST['avatar'] ?: null
            ]);
            $success = 'Executive leader added successfully.';
        } catch (Exception $e) { $error = 'Failed to add leader.'; }
    } elseif ($action === 'edit') {
        try {
            $stmt = $db->prepare('UPDATE leadership SET role=:role, organization=:organization, name=:name, bio=:bio, avatar=:avatar WHERE id=:id');
            $stmt->execute([
                ':id'           => $_POST['id'],
                ':role'         => $_POST['role'],
                ':organization' => $_POST['organization'],
                ':name'         => $_POST['name'],
                ':bio'          => $_POST['bio'],
                ':avatar'       => $_POST['avatar'] ?: null
            ]);
            $success = 'Leader profile updated successfully.';
        } catch (Exception $e) { $error = 'Failed to update leader.'; }
    } elseif ($action === 'delete') {
        $db->prepare('DELETE FROM leadership WHERE id = :id')->execute([':id' => $_POST['id']]);
        $success = 'Leader profile removed.';
    }
}

$leaders = $db->query('SELECT * FROM leadership ORDER BY id ASC')->fetchAll();
$pageTitle = 'Executive Leadership';
$currentPage = 'leadership';
require_once __DIR__ . '/includes/header.php';
?>

<?php if ($success): ?>
    <div class="alert alert-success alert-dismissible fade show mb-4">
        <i class="fas fa-check-circle fs-5"></i>
        <div><?= htmlspecialchars($success) ?></div>
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<?php if ($error): ?>
    <div class="alert alert-danger alert-dismissible fade show mb-4">
        <i class="fas fa-exclamation-circle fs-5"></i>
        <div><?= htmlspecialchars($error) ?></div>
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<div class="page-toolbar">
    <div class="page-toolbar-info">
        <div class="count-pill">
            <i class="fas fa-user-tie text-primary"></i> Executive Board Members: <span><?= count($leaders) ?></span>
        </div>
    </div>
    <div>
        <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#lModal" onclick="clearForm()">
            <i class="fas fa-plus"></i> Add Board Member
        </button>
    </div>
</div>

<div class="card">
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Official</th>
                    <th>Executive Role</th>
                    <th>Organization / Affiliation</th>
                    <th>Website Visibility</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($leaders as $l): ?>
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-3">
                            <?php if (!empty($l['avatar'])): ?>
                                <img src="<?= htmlspecialchars($l['avatar']) ?>" alt="" class="table-avatar" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60'">
                            <?php else: ?>
                                <div class="table-avatar d-flex align-items-center justify-content-center fw-bold text-secondary bg-light">
                                    <?= strtoupper(substr($l['name'], 0, 1)) ?>
                                </div>
                            <?php endif; ?>
                            <div>
                                <div class="fw-bold text-dark"><?= htmlspecialchars($l['name']) ?></div>
                                <div class="text-muted text-truncate" style="max-width: 320px; font-size: 0.78rem;">
                                    <?= htmlspecialchars($l['bio'] ?: '') ?>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-soft-primary"><?= htmlspecialchars($l['role']) ?></span>
                    </td>
                    <td>
                        <div class="text-secondary" style="font-size: 0.85rem;">
                            <?= htmlspecialchars($l['organization'] ?: 'Tanzania Tennis Association') ?>
                        </div>
                    </td>
                    <td>
                        <?= active_toggle_button($l) ?>
                    </td>
                    <td class="text-end text-nowrap">
                        <button class="btn-action-icon edit me-1" onclick='editL(<?= json_encode($l) ?>)' title="Edit leader">
                            <i class="fas fa-pen-to-square"></i>
                        </button>
                        <form method="POST" class="d-inline" onsubmit="return confirm('Delete <?= addslashes($l['name']) ?>?')">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $l['id'] ?>">
                            <button class="btn-action-icon delete" title="Delete leader">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            <?php if (empty($leaders)): ?>
                <tr>
                    <td colspan="5">
                        <div class="empty-state-box">
                            <div class="empty-state-icon"><i class="fas fa-user-tie"></i></div>
                            <div class="empty-state-title">No Leadership Listed</div>
                            <div class="empty-state-desc">Add TTA executive committee members, board officers, and patrons.</div>
                            <button class="btn btn-tta" data-bs-toggle="modal" data-bs-target="#lModal" onclick="clearForm()">
                                <i class="fas fa-plus"></i> Add Board Member
                            </button>
                        </div>
                    </td>
                </tr>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- Add/Edit Leader Modal -->
<div class="modal fade" id="lModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <form method="POST">
                <div class="modal-header">
                    <div class="modal-title-wrap">
                        <div class="modal-icon-badge">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold mb-0" id="modalTitle">Add Board Member</h5>
                            <small class="text-muted">Executive profile, designation, and brief biography</small>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="action" id="formAction" value="add">
                    <input type="hidden" name="id" id="formId">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Full Name <span class="req">*</span></label>
                            <input type="text" name="name" id="fName" class="form-control" placeholder="e.g. Dennis Makoi" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Executive Role <span class="req">*</span></label>
                            <input type="text" name="role" id="fRole" class="form-control" placeholder="e.g. President, General Secretary, Treasurer" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Organization</label>
                            <input type="text" name="organization" id="fOrg" class="form-control" value="Tanzania Tennis Association">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Portrait Photo URL</label>
                            <input type="text" name="avatar" id="fAvatar" class="form-control" placeholder="https://images.unsplash.com/...">
                        </div>
                        <div class="col-12">
                            <label class="form-label">Biography & Leadership Profile</label>
                            <textarea name="bio" id="fBio" class="form-control" rows="4" placeholder="Overview of experience, tenure, and contributions to tennis in Tanzania..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-tta"><i class="fas fa-save"></i> Save Profile</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function clearForm() {
    document.getElementById('modalTitle').textContent = 'Add Board Member';
    document.getElementById('formAction').value = 'add';
    document.getElementById('formId').value = '';
    ['fName','fRole','fBio','fAvatar'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('fOrg').value = 'Tanzania Tennis Association';
}
function editL(l) {
    document.getElementById('modalTitle').textContent = 'Edit Board Member';
    document.getElementById('formAction').value = 'edit';
    document.getElementById('formId').value = l.id;
    document.getElementById('fName').value = l.name;
    document.getElementById('fRole').value = l.role || '';
    document.getElementById('fOrg').value = l.organization || 'Tanzania Tennis Association';
    document.getElementById('fBio').value = l.bio || '';
    document.getElementById('fAvatar').value = l.avatar || '';
    new bootstrap.Modal(document.getElementById('lModal')).show();
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
